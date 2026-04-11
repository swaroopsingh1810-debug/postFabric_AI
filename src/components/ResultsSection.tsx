import { RotateCcw, Trash2, Loader2 } from "lucide-react";
import { PostContent } from "../services/aiService";
import PostCard from "./PostCard";

interface ResultsSectionProps {
  posts: PostContent[];
  onGenerateMore: () => void;
  onStartOver: () => void;
  onShowToast: (msg: string) => void;
  isGenerating: boolean;
}

export default function ResultsSection({
  posts,
  onGenerateMore,
  onStartOver,
  onShowToast,
  isGenerating,
}: ResultsSectionProps) {
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your 3 Post Options</h2>
        <div className="flex gap-4">
          <button
            onClick={onGenerateMore}
            disabled={isGenerating}
            className="flex items-center gap-2 text-sm text-white/60 hover:text-brand transition-colors disabled:opacity-30"
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RotateCcw className="w-4 h-4" />
            )}
            Generate 3 More
          </button>
          <button
            onClick={onStartOver}
            className="flex items-center gap-2 text-sm text-white/60 hover:text-red-400 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Start Over
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <PostCard
            key={index}
            post={post}
            index={index}
            onShowToast={onShowToast}
          />
        ))}
      </div>
    </div>
  );
}
