import { Tags, CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";

function KeywordComparison({ atsResult }) {
  const matchingKeywords = atsResult?.matching_keywords || [];
  const missingKeywords = atsResult?.missing_keywords || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 rounded-3xl border border-slate-700 bg-slate-900/70 backdrop-blur-xl p-8"
    >
      <div className="flex items-center gap-3 mb-8">
        <Tags className="text-yellow-400" />
        <h2 className="text-2xl font-bold">
          Keyword Comparison
        </h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-6">
          <div className="flex items-center gap-3 mb-5">
            <CheckCircle2 className="text-green-400" />
            <h3 className="text-xl font-bold text-green-400">
              Matching Keywords
            </h3>
          </div>

          {matchingKeywords.length === 0 ? (
            <p className="text-slate-400">
              No matching keywords found.
            </p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {matchingKeywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full border border-green-500/40 bg-green-500/20"
                >
                  {keyword}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6">
          <div className="flex items-center gap-3 mb-5">
            <XCircle className="text-red-400" />
            <h3 className="text-xl font-bold text-red-400">
              Missing Keywords
            </h3>
          </div>

          {missingKeywords.length === 0 ? (
            <p className="text-slate-400">
              No missing keywords.
            </p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {missingKeywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full border border-red-500/40 bg-red-500/20"
                >
                  {keyword}
                </span>
              ))}
            </div>
          )}
        </div>

      </div>
    </motion.div>
  );
}

export default KeywordComparison;