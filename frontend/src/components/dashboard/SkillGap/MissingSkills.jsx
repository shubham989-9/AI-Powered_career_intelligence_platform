import { XCircle } from "lucide-react";

function MissingSkills({ result }) {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">

      <div className="flex items-center gap-3 mb-6">
        <XCircle
          size={26}
          className="text-red-400"
        />

        <h2 className="text-2xl font-bold text-white">
          Missing Skills
        </h2>
      </div>

      {result.missing_skills.length === 0 ? (
        <p className="text-green-400 font-medium">
          🎉 No missing skills found.
        </p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {result.missing_skills.map((skill, index) => (
            <span
              key={index}
              className="px-4 py-2 rounded-full bg-red-600/20 border border-red-500 text-red-300"
            >
              ✗ {skill}
            </span>
          ))}
        </div>
      )}

    </div>
  );
}

export default MissingSkills;