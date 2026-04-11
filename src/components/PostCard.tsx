import React, { useState } from "react";
import { Copy, Download, Check } from "lucide-react";
import { PostContent } from "../services/aiService";

interface PostCardProps {
  post: PostContent;
  index: number;
  onShowToast: (msg: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, index, onShowToast }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    const fullText = `${post.hook}\n\n${post.body}\n\n${post.cta}\n\n${post.hashtags}`;
    try {
      await navigator.clipboard.writeText(fullText);
      setIsCopied(true);
      onShowToast("Copied!");
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleDownload = async () => {
    if (!post.imageUrl) return;
    try {
      const response = await fetch(post.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `postfabric-option-${index + 1}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  return (
    <div className="glass-card flex flex-col h-full group">
      {/* Top Section: Image */}
      <div className="relative aspect-square sm:aspect-video md:aspect-square overflow-hidden bg-white/5">
        {post.imageUrl ? (
          <img
            src={post.imageUrl}
            alt={`Option ${index + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full skeleton flex items-center justify-center">
            <div className="text-white/20 text-sm font-medium">Generating Visual...</div>
          </div>
        )}
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
          <span className="text-xs font-semibold text-white/90">Option {index + 1}</span>
        </div>
      </div>

      {/* Middle Section: Content */}
      <div className="p-5 flex-grow space-y-4">
        <div>
          <span className="text-[10px] font-bold text-brand uppercase tracking-widest block mb-1">Hook</span>
          <p className="text-white font-bold leading-snug">{post.hook}</p>
        </div>
        
        <div>
          <span className="text-[10px] font-bold text-brand uppercase tracking-widest block mb-1">Body</span>
          <p className="text-white/80 text-sm leading-relaxed">{post.body}</p>
        </div>

        <div>
          <span className="text-[10px] font-bold text-brand uppercase tracking-widest block mb-1">CTA</span>
          <p className="text-white italic text-sm">{post.cta}</p>
        </div>

        <div className="pt-2">
          <p className="text-brand text-xs font-medium">{post.hashtags}</p>
        </div>
      </div>

      {/* Bottom Section: Actions */}
      <div className="p-5 pt-0 grid grid-cols-2 gap-3">
        <button onClick={handleCopy} className="btn-outline text-xs py-2 px-2">
          {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          Copy Caption
        </button>
        <button 
          onClick={handleDownload} 
          disabled={!post.imageUrl}
          className="btn-outline text-xs py-2 px-2 disabled:opacity-30"
        >
          <Download className="w-4 h-4" />
          Download
        </button>
      </div>
    </div>
  );
};

export default PostCard;
