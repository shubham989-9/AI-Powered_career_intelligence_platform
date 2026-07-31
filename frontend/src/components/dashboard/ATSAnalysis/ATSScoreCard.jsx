import { Trophy } from "lucide-react";
import { motion } from "framer-motion";

function ATSScoreCard({ atsResult }) {
  const score = atsResult?.ats_score || 0;
  const match = atsResult?.match_percentage || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 rounded-3xl border border-slate-700 bg-slate-900/70 backdrop-blur-xl p-8"
    >
      <h2 className="text-2xl font-bold mb-8">
        ATS Analysis Result
      </h2>

      <div className="grid lg:grid-cols-2 gap-10 items-center">

        <div className="flex justify-center">
          <div className="relative w-56 h-56">

            <svg
              className="rotate-[-90deg]"
              width="224"
              height="224"
            >
              <circle
                cx="112"
                cy="112"
                r="90"
                stroke="#1e293b"
                strokeWidth="12"
                fill="none"
              />

              <circle
                cx="112"
                cy="112"
                r="90"
                stroke="#06b6d4"
                strokeWidth="12"
                fill="none"
                strokeDasharray={565}
                strokeDashoffset={
                  565 - (565 * score) / 100
                }
                strokeLinecap="round"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Trophy
                size={34}
                className="text-yellow-400 mb-2"
              />

              <h1 className="text-5xl font-black">
                {score}%
              </h1>

              <p className="text-slate-400">
                ATS Score
              </p>
            </div>

          </div>
        </div>

        <div className="space-y-6">

          <div className="rounded-2xl bg-slate-800 p-6 border border-slate-700">
            <h3 className="text-lg font-semibold">
              Match Percentage
            </h3>

            <p className="text-4xl font-bold text-cyan-400 mt-2">
              {match}%
            </p>
          </div>

          <div className="rounded-2xl bg-green-500/10 border border-green-500/30 p-6">
            <h3 className="font-semibold text-green-400">
              Overall Result
            </h3>

            <p className="text-slate-300 mt-2">
              {score >= 80
                ? "Excellent Resume Match"
                : score >= 60
                ? "Good Resume Match"
                : "Resume Needs Improvement"}
            </p>
          </div>

        </div>

      </div>
    </motion.div>
  );
}

export default ATSScoreCard;