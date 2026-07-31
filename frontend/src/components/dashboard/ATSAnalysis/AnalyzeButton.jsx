import { motion } from "framer-motion";
import { ScanSearch } from "lucide-react";

function AnalyzeButton({
  loading,
  analyzeResume,
}) {
  return (
    <div className="mt-8 flex justify-center">
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        onClick={analyzeResume}
        disabled={loading}
        className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 font-bold text-lg shadow-lg disabled:opacity-60"
      >
        <ScanSearch size={22} />

        {loading
          ? "Analyzing Resume..."
          : "Analyze Resume"}
      </motion.button>
    </div>
  );
}

export default AnalyzeButton;