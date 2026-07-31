import { Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

function AISuggestions({ atsResult }) {
  const suggestions =
    atsResult?.recommendations || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 rounded-3xl border border-slate-700 bg-slate-900/70 backdrop-blur-xl p-8"
    >
      <div className="flex items-center gap-3 mb-8">
        <Sparkles className="text-yellow-400" />
        <h2 className="text-2xl font-bold">
          AI Suggestions
        </h2>
      </div>

      {suggestions.length === 0 ? (
        <div className="text-center py-10 text-slate-400">
          No AI suggestions available.
        </div>
      ) : (
        <div className="space-y-5">
          {suggestions.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              className="flex gap-4 rounded-2xl border border-slate-700 bg-slate-800/60 p-5"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-cyan-500 flex items-center justify-center">
                <CheckCircle2 className="text-white" />
              </div>

              <div>
                <h3 className="font-bold mb-1">
                  Suggestion {index + 1}
                </h3>

                <p className="text-slate-300 leading-7">
                  {item}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default AISuggestions;