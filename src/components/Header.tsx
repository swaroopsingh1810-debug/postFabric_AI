import { Sparkles } from "lucide-react";

export default function Header() {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="bg-brand/20 p-3 rounded-2xl">
          <Sparkles className="w-8 h-8 text-brand" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Post Fabric <span className="text-brand">AI</span>
        </h1>
      </div>
      <p className="text-white/60 text-lg max-w-2xl mx-auto">
        Generate ready-to-post social media content in seconds with the power of Gemini and Nano Banana.
      </p>
    </div>
  );
}
