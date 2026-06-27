import { Loader2, ChevronDown } from "lucide-react";

interface InputSectionProps {
  businessDescription: string;
  setBusinessDescription: (val: string) => void;
  platform: string;
  setPlatform: (val: string) => void;
  goal: string;
  setGoal: (val: string) => void;
  tone: string;
  setTone: (val: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  error: string | null;
}

export default function InputSection({
  businessDescription,
  setBusinessDescription,
  platform,
  setPlatform,
  goal,
  setGoal,
  tone,
  setTone,
  onGenerate,
  isGenerating,
  error,
}: InputSectionProps) {
  return (
    <div className="glass-card p-6 sm:p-8 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="label-text">Describe your business in one line</label>
          <input
            type="text"
            className={`input-field ${error ? "border-red-500/50" : ""}`}
            placeholder="e.g. AI training company helping Indian professionals learn artificial intelligence"
            value={businessDescription}
            onChange={(e) => setBusinessDescription(e.target.value)}
          />
          {error && (
            <p className="text-red-500 text-xs mt-2 font-medium">{error}</p>
          )}
        </div>

        <div>
          <label className="label-text">Platform</label>
          <div className="relative">
            <select
              className="input-field appearance-none cursor-pointer pr-10"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
            >
              <option value="Instagram" className="bg-[#171717] text-white">Instagram</option>
              <option value="LinkedIn" className="bg-[#171717] text-white">LinkedIn</option>
              <option value="Facebook" className="bg-[#171717] text-white">Facebook</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-white/50">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div>
          <label className="label-text">Content Goal</label>
          <div className="relative">
            <select
              className="input-field appearance-none cursor-pointer pr-10"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            >
              <option value="Brand Awareness" className="bg-[#171717] text-white">Brand Awareness</option>
              <option value="Drive Sales" className="bg-[#171717] text-white">Drive Sales</option>
              <option value="Build Trust" className="bg-[#171717] text-white">Build Trust</option>
              <option value="Educate Audience" className="bg-[#171717] text-white">Educate Audience</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-white/50">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div>
          <label className="label-text">Tone</label>
          <div className="relative">
            <select
              className="input-field appearance-none cursor-pointer pr-10"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            >
              <option value="Professional" className="bg-[#171717] text-white">Professional</option>
              <option value="Casual" className="bg-[#171717] text-white">Casual</option>
              <option value="Bold" className="bg-[#171717] text-white">Bold</option>
              <option value="Inspirational" className="bg-[#171717] text-white">Inspirational</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-white/50">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className="md:flex md:items-end">
          <button
            onClick={onGenerate}
            disabled={isGenerating}
            className="btn-primary w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate 3 Posts"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
