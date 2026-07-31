import { CheckCircle } from "lucide-react";

function MatchingSkills({ result }) {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">

      <div className="flex items-center gap-3 mb-6">
        <CheckCircle
          size={26}
          className="text-green-400"
        />

        <h2 className="text-2xl font-bold text-white">
          Matching Skills
        </h2>
      </div>

      {result.matching_skills.length === 0 ? (
        <p className="text-slate-400">
          No matching skills found.
        </p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {result.matching_skills.map((skill, index) => (
            <span
              key={index}
              className="px-4 py-2 rounded-full bg-green-600/20 border border-green-500 text-green-300"
            >
              ✓ {skill}
            </span>
          ))}
        </div>
      )}

    </div>
  );
}

export default MatchingSkills;