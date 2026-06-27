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

export function getVibrantFallbackImage(prompt: string, index: number): string {
  const combined = prompt.toLowerCase();
  
  // High-quality, extremely reliable direct Unsplash CDN URLs that never fail
  const techImages = [
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80", // Abstract vibrant green waves
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80", // Digital matrix code tech
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80"  // Elegant workspace tech
  ];

  const businessImages = [
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80", // Analytics, charts and marketing
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80", // Modern meeting success
    "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=800&q=80"  // Creative office strategy
  ];

  const creativeImages = [
    "https://images.unsplash.com/photo-1542744094-3f11267b1123?auto=format&fit=crop&w=800&q=80", // Designers at work
    "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80", // Abstract creative painting
    "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?auto=format&fit=crop&w=800&q=80"  // Creative post-its board
  ];

  const teamImages = [
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80", // Dynamic creative team
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80", // Happy teamwork success
    "https://images.unsplash.com/photo-1556761175-b813d53a9628?auto=format&fit=crop&w=800&q=80"  // Office collaboration
  ];

  const techKeywords = ["ai", "tech", "software", "code", "data", "robot", "algorithm", "digital", "system", "program", "developer", "machine"];
  const businessKeywords = ["market", "sale", "growth", "chart", "business", "lead", "strategy", "revenue", "roi", "product", "client", "customer"];
  const creativeKeywords = ["create", "design", "brand", "style", "art", "media", "social", "logo", "video", "content", "aesthetic", "post"];

  if (techKeywords.some(kw => combined.includes(kw))) {
    return techImages[index % techImages.length];
  }
  
  if (businessKeywords.some(kw => combined.includes(kw))) {
    return businessImages[index % businessImages.length];
  }

  if (creativeKeywords.some(kw => combined.includes(kw))) {
    return creativeImages[index % creativeImages.length];
  }

  return teamImages[index % teamImages.length];
}

