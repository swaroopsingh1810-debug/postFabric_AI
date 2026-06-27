import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

interface ToastProps {
  message: string;
}

export default function Toast({ message }: ToastProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="bg-neutral-900 text-white px-6 py-3.5 rounded-2xl shadow-2xl border border-neutral-800 flex items-center gap-3 font-semibold text-sm">
        <CheckCircle2 className="w-5 h-5 text-brand" />
        {message}
      </div>
    </motion.div>
  );
}
