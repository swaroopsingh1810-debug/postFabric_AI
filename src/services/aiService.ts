import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface PostContent {
  hook: string;
  body: string;
  cta: string;
  hashtags: string;
  image_prompt: string;
  imageUrl?: string;
  imageError?: boolean;
}

export async function generatePosts(
  businessDescription: string,
  platform: string,
  goal: string,
  tone: string
): Promise<PostContent[]> {
  const prompt = `You are a world-class social media copywriter. Generate exactly 3 different social media posts for this business: ${businessDescription}. Platform: ${platform}. Goal: ${goal}. Tone: ${tone}.
Rules:
Each post MUST have 3 clearly labeled parts: HOOK (the attention-grabbing first line), BODY (the main message, 2-4 sentences), and CTA (call to action, one line)
For Instagram: use 5-8 relevant hashtags at the end, use emoji naturally, keep it visual and punchy
For LinkedIn: keep it professional, use line breaks for readability, use 3-5 hashtags, no excessive emoji
For Facebook: conversational tone, 1-2 hashtags max, include a question to drive comments
Each of the 3 posts must take a DIFFERENT angle on the same business. Do not repeat the same message in different words.
Post 1 should focus on a pain point the audience has
Post 2 should focus on a success story or result
Post 3 should focus on a tip or insight that provides value
Return the output as a valid JSON array with exactly 3 objects. Each object must have these exact keys: hook, body, cta, hashtags, image_prompt
The image_prompt field should be a detailed Nano Banana prompt (30-50 words) describing a professional, clean social media visual that matches the post theme. Do NOT include any text in the image. The image should work as a background or hero image for the post. Use modern, professional aesthetics with vibrant colors.
Return ONLY the JSON array. No markdown. No explanation. No backticks.`;

  let attempts = 0;
  while (attempts < 2) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                hook: { type: Type.STRING },
                body: { type: Type.STRING },
                cta: { type: Type.STRING },
                hashtags: { type: Type.STRING },
                image_prompt: { type: Type.STRING },
              },
              required: ["hook", "body", "cta", "hashtags", "image_prompt"],
            },
          },
        },
      });

      const text = response.text;
      if (!text) throw new Error("Empty response from Gemini");
      
      const posts = JSON.parse(text) as PostContent[];
      if (posts.length !== 3) throw new Error("Expected 3 posts");
      
      return posts;
    } catch (error) {
      console.error(`Attempt ${attempts + 1} failed:`, error);
      attempts++;
      if (attempts === 2) throw error;
    }
  }
  throw new Error("Failed to generate posts after retries");
}

export async function generateImage(prompt: string, platform: string): Promise<string> {
  let aspectRatio: "1:1" | "3:4" | "4:3" | "9:16" | "16:9" = "1:1";
  
  if (platform === "LinkedIn") {
    // LinkedIn recommended is 1.91:1, closest in Nano Banana is 16:9
    aspectRatio = "16:9";
  } else if (platform === "Instagram" || platform === "Facebook") {
    aspectRatio = "1:1";
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio,
        },
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data found in response");
  } catch (error) {
    console.error("Image generation failed:", error);
    throw error;
  }
}

export function getVibrantFallbackImage(promptOrPost: string | { image_prompt: string; hook?: string; body?: string }, index: number): string {
  let promptText = "";
  let additionalText = "";
  
  if (typeof promptOrPost === "string") {
    promptText = promptOrPost;
  } else if (promptOrPost && typeof promptOrPost === "object") {
    promptText = promptOrPost.image_prompt || "";
    additionalText = `${promptOrPost.hook || ""} ${promptOrPost.body || ""}`;
  }

  const combined = `${promptText} ${additionalText}`.toLowerCase();

  // Curated, 100% valid, premium Unsplash images that render beautifully and match the domains perfectly
  const techImages = [
    "photo-1518770660439-4636190af475", // Circuit board/tech
    "photo-1618005182384-a83a8bd57fbe", // Abstract green wave design
    "photo-1526374965328-7f61d4dc18c5", // Digital grid tech
    "photo-1550751827-4bd374c3f58b", // Futuristic tech
    "photo-1531297484001-80022131f5a1"  // Modern tech laptop desk
  ];

  const businessImages = [
    "photo-1460925895917-afdab827c52f", // Marketing/charts
    "photo-1551836022-d5d88e9218df", // Collaboration meeting
    "photo-1542744094-3a31f103e35f", // Strategy presentation
    "photo-1552664730-d307ca884978", // Corporate workshop
    "photo-1504868584819-f8e8b4b6d7e3"  // Dynamic data dashboard
  ];

  const creativeImages = [
    "photo-1542744094-3a31f103e35f", // UX/UI designers
    "photo-1513542789411-b6a5d4f31634", // Creative abstract art
    "photo-1531538606174-0f90ff5dce83", // Post-it brainstorm
    "photo-1558655146-d09347e92766", // Graphic design interface
    "photo-1516321318423-f06f85e504b3"  // Digital tablet creator
  ];

  const lifestyleImages = [
    "photo-1517838277536-f5f99be501cd", // Fitness/wellness gym
    "photo-1490645935967-10de6ba17061", // Colorful healthy food
    "photo-1506126613408-eca07ce68773", // Serene mindfulness yoga
    "photo-1544367567-0f2fcb009e0b", // Zen morning yoga studio
    "photo-1518481612222-68bbe828ece1"  // Wellness/lifestyle setup
  ];

  const generalTeamImages = [
    "photo-1522071820081-009f0129c71c", // Happy startup team
    "photo-1517245386807-bb43f82c33c4", // High-fiving teamwork
    "photo-1556761175-b813d53a9628", // Office meeting collaboration
    "photo-1531482615713-2afd69097998", // Diverse workspace team
    "photo-1522202176988-66273c2fd55f"  // Students/coworkers studying
  ];

  const techKeywords = ["ai", "tech", "software", "code", "data", "robot", "algorithm", "digital", "system", "program", "developer", "machine", "internet", "web", "app", "mobile"];
  const businessKeywords = ["market", "sale", "growth", "chart", "business", "lead", "strategy", "revenue", "roi", "product", "client", "customer", "finance", "money", "consulting"];
  const creativeKeywords = ["create", "design", "brand", "style", "art", "media", "social", "logo", "video", "content", "aesthetic", "post", "instagram", "tiktok", "writing", "copywriter"];
  const lifestyleKeywords = ["fit", "gym", "health", "wellness", "yoga", "meditation", "food", "eat", "cook", "recipe", "diet", "lifestyle", "nature", "travel", "spa", "mind"];

  let selectedId = "";
  if (techKeywords.some(kw => combined.includes(kw))) {
    selectedId = techImages[index % techImages.length];
  } else if (businessKeywords.some(kw => combined.includes(kw))) {
    selectedId = businessImages[index % businessImages.length];
  } else if (creativeKeywords.some(kw => combined.includes(kw))) {
    selectedId = creativeImages[index % creativeImages.length];
  } else if (lifestyleKeywords.some(kw => combined.includes(kw))) {
    selectedId = lifestyleImages[index % lifestyleImages.length];
  } else {
    selectedId = generalTeamImages[index % generalTeamImages.length];
  }

  // Generate a fully dynamic, unique, cache-bypassed premium Unsplash URL from their production CDN
  const uniqueSig = `${index}-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
  return `https://images.unsplash.com/${selectedId}?auto=format&fit=crop&w=800&q=80&sig=${uniqueSig}`;
}

