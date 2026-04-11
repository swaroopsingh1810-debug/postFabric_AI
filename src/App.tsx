/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { generatePosts, generateImage, PostContent } from "./services/aiService";
import Header from "./components/Header";
import InputSection from "./components/InputSection";
import ResultsSection from "./components/ResultsSection";
import Toast from "./components/Toast";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [businessDescription, setBusinessDescription] = useState("");
  const [platform, setPlatform] = useState("LinkedIn");
  const [goal, setGoal] = useState("Brand Awareness");
  const [tone, setTone] = useState("Professional");
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [posts, setPosts] = useState<PostContent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!businessDescription.trim()) {
      setError("Please describe your business first");
      return;
    }
    if (businessDescription.trim().length < 10) {
      setError("Please give a more detailed description");
      return;
    }

    setError(null);
    setIsGenerating(true);
    setPosts([]);

    try {
      // Step 1: Generate text content
      const generatedPosts = await generatePosts(businessDescription, platform, goal, tone);
      
      // Initialize posts with text content and loading state for images
      setPosts(generatedPosts);

      // Step 2: Generate images in parallel
      const imagePromises = generatedPosts.map(async (post, index) => {
        try {
          const imageUrl = await generateImage(post.image_prompt, platform);
          setPosts(prev => {
            const newPosts = [...prev];
            if (newPosts[index]) {
              newPosts[index] = { ...newPosts[index], imageUrl };
            }
            return newPosts;
          });
        } catch (err) {
          console.error(`Image ${index} failed:`, err);
        }
      });

      await Promise.all(imagePromises);
    } catch (err) {
      console.error("Generation failed:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleStartOver = () => {
    setBusinessDescription("");
    setPlatform("LinkedIn");
    setGoal("Brand Awareness");
    setTone("Professional");
    setPosts([]);
    setError(null);
  };

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <div className="min-h-screen pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto pt-12">
        <Header />
        
        <InputSection
          businessDescription={businessDescription}
          setBusinessDescription={setBusinessDescription}
          platform={platform}
          setPlatform={setPlatform}
          goal={goal}
          setGoal={setGoal}
          tone={tone}
          setTone={setTone}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
          error={error}
        />

        <AnimatePresence>
          {posts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-16"
            >
              <ResultsSection 
                posts={posts} 
                onGenerateMore={handleGenerate}
                onStartOver={handleStartOver}
                onShowToast={showToast}
                isGenerating={isGenerating}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {toast && <Toast message={toast} />}
      </AnimatePresence>
    </div>
  );
}

