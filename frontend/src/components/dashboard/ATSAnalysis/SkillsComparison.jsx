import { CheckCircle2, XCircle, Code2 } from "lucide-react";
import { motion } from "framer-motion";

function SkillsComparison({ atsResult }) {
  const matchingSkills = atsResult?.matching_skills || [];
  const missingSkills = atsResult?.missing_skills || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 rounded-3xl border border-slate-700 bg-slate-900/70 backdrop-blur-xl p-8"
    >
      <div className="flex items-center gap-3 mb-8">
        <Code2 className="text-cyan-400" />
        <h2 className="text-2xl font-bold">
          Skills Comparison
        </h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Matching Skills */}

        <div className="rounded-2xl bg-green-500/10 border border-green-500/30 p-6">
          <div className="flex items-center gap-3 mb-5">
            <CheckCircle2 className="text-green-400" />
            <h3 className="text-xl font-bold text-green-400">
              Matching Skills
            </h3>
          </div>

          {matchingSkills.length === 0 ? (
            <p className="text-slate-400">
              No matching skills found.
            </p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {matchingSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full bg-green-500/20 border border-green-500/40"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Missing Skills */}

        <div className="rounded-2xl bg-red-500/10 border border-red-500/30 p-6">
          <div className="flex items-center gap-3 mb-5">
            <XCircle className="text-red-400" />
            <h3 className="text-xl font-bold text-red-400">
              Missing Skills
            </h3>
          </div>

          {missingSkills.length === 0 ? (
            <p className="text-slate-400">
              No missing skills.
            </p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {missingSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full bg-red-500/20 border border-red-500/40"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

      </div>
    </motion.div>
  );
}

export default SkillsComparison;