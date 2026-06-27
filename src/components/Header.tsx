import { Sparkles } from "lucide-react";

export default function Header() {
  return (
    <div className="text-center mb-12 relative">
      {/* Decorative floating badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-6 rounded-full bg-brand/10 border border-brand/20 text-xs font-semibold text-brand tracking-wide uppercase animate-pulse">
        <Sparkles className="w-3 h-3" />
        <span>Next-Gen Social Copywriting</span>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4">
        <div className="bg-gradient-to-tr from-brand to-teal-400 p-3 rounded-2xl shadow-lg shadow-brand/20 animate-bounce duration-[3000ms]">
          <Sparkles className="w-8 h-8 text-black font-bold" />
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-600 bg-clip-text text-transparent">
          Post Fabric <span className="bg-gradient-to-r from-brand via-emerald-500 to-teal-500 bg-clip-text text-transparent font-black">AI</span>
        </h1>
      </div>
      <p className="text-neutral-600 font-medium text-base sm:text-lg max-w-2xl mx-auto leading-relaxed px-4">
        Weave your brand stories into ready-to-post, high-converting social media posts in seconds with advanced AI.
      </p>
    </div>
  );
}
