import { Loader2 } from "lucide-react";

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
          <select
            className="input-field appearance-none cursor-pointer"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option value="Instagram">Instagram</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Facebook">Facebook</option>
          </select>
        </div>

        <div>
          <label className="label-text">Content Goal</label>
          <select
            className="input-field appearance-none cursor-pointer"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          >
            <option value="Brand Awareness">Brand Awareness</option>
            <option value="Drive Sales">Drive Sales</option>
            <option value="Build Trust">Build Trust</option>
            <option value="Educate Audience">Educate Audience</option>
          </select>
        </div>

        <div>
          <label className="label-text">Tone</label>
          <select
            className="input-field appearance-none cursor-pointer"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >
            <option value="Professional">Professional</option>
            <option value="Casual">Casual</option>
            <option value="Bold">Bold</option>
            <option value="Inspirational">Inspirational</option>
          </select>
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
