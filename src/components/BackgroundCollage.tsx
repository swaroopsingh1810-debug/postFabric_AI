import React from "react";
import { motion } from "motion/react";
import { 
  ThumbsUp, 
  MessageSquare, 
  Share2, 
  Heart, 
  MoreHorizontal, 
  Globe, 
  Linkedin, 
  Instagram, 
  Play, 
  Send, 
  Bookmark,
  Volume2
} from "lucide-react";

interface SocialPostItem {
  id: number;
  type: "linkedin" | "instagram";
  user: {
    name: string;
    handle: string;
    avatar: string;
    title?: string;
  };
  content: {
    text: string;
    image: string;
    likes: string;
    comments?: string;
    videoDuration?: string;
  };
  styleClass: string;
  delay: number;
  rotate: number;
}

const socialPosts: SocialPostItem[] = [
  // LEFT COLUMN: LinkedIn Posts
  {
    id: 1,
    type: "linkedin",
    user: {
      name: "Elena Rostova",
      handle: "@elenarostova",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80",
      title: "Co-Founder & CMO"
    },
    content: {
      text: "Our brand's social engagement just hit an all-time high! 📈 Thanks to Post Fabric AI, we craft premium hooks in seconds. Check this out! ✨",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80",
      likes: "482",
      comments: "64"
    },
    styleClass: "top-[6%] left-[2%] w-[280px] sm:w-[320px] hidden md:block",
    delay: 0,
    rotate: -4,
  },
  {
    id: 2,
    type: "linkedin",
    user: {
      name: "Marcus Sterling",
      handle: "@msterling",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
      title: "Director of Product Growth"
    },
    content: {
      text: "Stop overthinking your social posts. 🧠 Consistency is the absolute key. Use templates, select great visuals, and automate your hooks with Gemini!",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80",
      likes: "318",
      comments: "29"
    },
    styleClass: "top-[40%] left-[4%] w-[280px] sm:w-[320px] hidden lg:block",
    delay: 0.3,
    rotate: 3,
  },
  {
    id: 3,
    type: "linkedin",
    user: {
      name: "Devon Chen",
      handle: "@devon_ai",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&h=100&q=80",
      title: "AI Solutions Architect"
    },
    content: {
      text: "Woven AI directly into our creator workflow this week. Result? Content delivery time reduced by 70% with high engagement. Work smart! 🤖🚀",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=400&q=80",
      likes: "594",
      comments: "81"
    },
    styleClass: "top-[72%] left-[1.5%] w-[280px] sm:w-[320px] hidden md:block",
    delay: 0.15,
    rotate: -2,
  },

  // RIGHT COLUMN: Instagram Reels
  {
    id: 4,
    type: "instagram",
    user: {
      name: "pixel.creative",
      handle: "pixel.creative",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&h=100&q=80"
    },
    content: {
      text: "10x your video content output with premium styling! ⚡️ #socialmedia #creative",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
      likes: "18.4k",
      videoDuration: "0:15"
    },
    styleClass: "top-[8%] right-[2%] w-[200px] sm:w-[240px] hidden md:block",
    delay: 0.1,
    rotate: 5,
  },
  {
    id: 5,
    type: "instagram",
    user: {
      name: "wanderlust_lisa",
      handle: "wanderlust_lisa",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80"
    },
    content: {
      text: "Crafting beautiful reels that convert viewers into loyal fans 🏆✨",
      image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=400&q=80",
      likes: "9,251",
      videoDuration: "0:30"
    },
    styleClass: "top-[43%] right-[4%] w-[200px] sm:w-[240px] hidden lg:block",
    delay: 0.4,
    rotate: -4,
  },
  {
    id: 6,
    type: "instagram",
    user: {
      name: "fitness_flow",
      handle: "fitness_flow",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&h=100&q=80"
    },
    content: {
      text: "How we program the perfect marketing hook. Hint: It's all about empathy. ❤️",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
      likes: "12.1k",
      videoDuration: "0:22"
    },
    styleClass: "top-[73%] right-[2%] w-[200px] sm:w-[240px] hidden md:block",
    delay: 0.2,
    rotate: 6,
  }
];

export default function BackgroundCollage() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Soft radiant glowing blobs */}
      <div className="absolute top-[-5%] left-[-5%] w-[45vw] h-[45vw] rounded-full bg-emerald-400/20 blur-[130px] animate-pulse duration-[8000ms]" />
      <div className="absolute top-[35%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-indigo-400/20 blur-[160px] animate-pulse duration-[10000ms]" />
      <div className="absolute bottom-[-5%] left-[15%] w-[45vw] h-[45vw] rounded-full bg-green-400/15 blur-[140px] animate-pulse duration-[9000ms]" />
      <div className="absolute bottom-[25%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-pink-400/15 blur-[120px] animate-pulse duration-[11000ms]" />

      {/* Modern dotted paper grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.35]" 
        style={{
          backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.06) 1.2px, transparent 1.2px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Floating social posts container */}
      <div className="absolute inset-0 z-10">
        {socialPosts.map((post) => (
          <motion.div
            key={post.id}
            className={`absolute ${post.styleClass} pointer-events-auto select-none`}
            initial={{ opacity: 0, scale: 0.85, rotate: post.rotate - 8 }}
            animate={{ 
              opacity: 0.55, 
              scale: 1, 
              rotate: post.rotate,
              y: [0, -10, 0] 
            }}
            whileHover={{ 
              opacity: 1, 
              scale: 1.05, 
              rotate: post.rotate > 0 ? 1 : -1,
              zIndex: 30,
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)"
            }}
            transition={{
              opacity: { duration: 1 },
              scale: { duration: 1 },
              rotate: { duration: 1 },
              y: {
                duration: 5 + post.id,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: post.delay * 2
              },
              whileHover: {
                duration: 0.3,
                ease: "easeOut"
              }
            }}
          >
            {post.type === "linkedin" ? (
              // LINKEDIN POST MOCKUP
              <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-lg p-3.5 space-y-2.5 text-left transition-colors duration-300 hover:border-blue-400/50">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img 
                      src={post.user.avatar} 
                      alt={post.user.name} 
                      className="w-8 h-8 rounded-full object-cover border border-neutral-200"
                    />
                    <div className="leading-none">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-neutral-800">{post.user.name}</span>
                        <span className="text-[10px] text-neutral-400">• 1st</span>
                      </div>
                      <span className="text-[9px] text-neutral-500 block truncate max-w-[150px]">{post.user.title}</span>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-[8px] text-neutral-400">1h ago</span>
                        <span className="text-[8px] text-neutral-400">•</span>
                        <Globe className="w-2.5 h-2.5 text-neutral-400" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                    <MoreHorizontal className="w-4 h-4 text-neutral-400" />
                  </div>
                </div>

                {/* Caption Text */}
                <p className="text-[10.5px] text-neutral-700 leading-snug font-medium line-clamp-3">
                  {post.content.text}
                </p>

                {/* Media Image */}
                <div className="relative aspect-video rounded-lg overflow-hidden border border-neutral-100 bg-neutral-50">
                  <img 
                    src={post.content.image} 
                    alt="LinkedIn Content" 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Engagement Counts */}
                <div className="flex items-center justify-between border-b border-neutral-100 pb-1.5 text-[9px] text-neutral-500">
                  <div className="flex items-center gap-1">
                    <span className="bg-blue-100 text-blue-600 p-0.5 rounded-full text-[8px] flex items-center justify-center w-3.5 h-3.5 font-bold">👍</span>
                    <span className="bg-red-100 text-red-600 p-0.5 rounded-full text-[8px] flex items-center justify-center w-3.5 h-3.5 font-bold">❤️</span>
                    <span className="ml-0.5 font-medium">{post.content.likes}</span>
                  </div>
                  <span className="font-medium">{post.content.comments} comments</span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-0.5 text-neutral-500 text-[10px] font-bold">
                  <button className="flex items-center gap-1 hover:text-blue-600 transition-colors py-0.5 px-1.5 rounded-md hover:bg-neutral-50">
                    <ThumbsUp className="w-3 h-3" />
                    <span>Like</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-blue-600 transition-colors py-0.5 px-1.5 rounded-md hover:bg-neutral-50">
                    <MessageSquare className="w-3 h-3" />
                    <span>Comment</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-blue-600 transition-colors py-0.5 px-1.5 rounded-md hover:bg-neutral-50">
                    <Share2 className="w-3 h-3" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            ) : (
              // INSTAGRAM REEL MOCKUP
              <div className="relative aspect-[9/16] bg-neutral-900 rounded-3xl overflow-hidden shadow-xl border border-neutral-800/20 group">
                {/* Visual Cover Image */}
                <img 
                  src={post.content.image} 
                  alt="Instagram Reel Cover" 
                  className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                />

                {/* Vignette Shadow Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

                {/* Top Bar */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                  <div className="flex items-center gap-1 bg-black/30 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10 text-[9px] font-extrabold text-white tracking-wider uppercase">
                    <Play className="w-2.5 h-2.5 fill-current" />
                    <span>Reels</span>
                  </div>
                  <Instagram className="w-4 h-4 text-white drop-shadow" />
                </div>

                {/* Bottom Media Details */}
                <div className="absolute bottom-3 left-3 right-8 text-left text-white z-10 space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <img 
                      src={post.user.avatar} 
                      alt={post.user.name} 
                      className="w-5 h-5 rounded-full object-cover border border-white/20"
                    />
                    <span className="text-[10px] font-extrabold tracking-tight drop-shadow">{post.user.name}</span>
                    <button className="text-[8px] bg-white/20 hover:bg-white/30 backdrop-blur px-1.5 py-0.5 rounded-md font-bold transition-all">
                      Follow
                    </button>
                  </div>

                  <p className="text-[9.5px] leading-snug text-neutral-200 drop-shadow line-clamp-2">
                    {post.content.text}
                  </p>

                  <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-md py-0.5 px-1.5 rounded-full border border-white/5 w-fit">
                    <Volume2 className="w-2.5 h-2.5 text-neutral-300 animate-pulse" />
                    <span className="text-[8px] text-neutral-300 truncate max-w-[80px]">Original Audio</span>
                  </div>
                </div>

                {/* Right Interactive Sidebar Icons */}
                <div className="absolute bottom-12 right-2 flex flex-col items-center gap-3 text-white z-10">
                  <div className="flex flex-col items-center">
                    <button className="bg-black/30 hover:bg-black/40 backdrop-blur-md p-1.5 rounded-full border border-white/10 text-white transition-all active:scale-95">
                      <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                    </button>
                    <span className="text-[8px] font-extrabold mt-0.5 drop-shadow">{post.content.likes}</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <button className="bg-black/30 hover:bg-black/40 backdrop-blur-md p-1.5 rounded-full border border-white/10 text-white transition-all">
                      <MessageSquare className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[8px] font-extrabold mt-0.5 drop-shadow">48</span>
                  </div>

                  <button className="bg-black/30 hover:bg-black/40 backdrop-blur-md p-1.5 rounded-full border border-white/10 text-white transition-all">
                    <Send className="w-3.5 h-3.5" />
                  </button>

                  <button className="bg-black/30 hover:bg-black/40 backdrop-blur-md p-1.5 rounded-full border border-white/10 text-white transition-all">
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Exquisite translucent white overlay mask that is perfectly transparent so that the background collage stays beautifully clear and vivid! */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/20 to-white/40 z-20" />
    </div>
  );
}
