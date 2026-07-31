import { AlertTriangle, CheckCircle2 } from "lucide-react";

function MissingSkills({ result }) {
  const missingSkills = result?.missing_skills || [];

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">

      <div className="flex items-center gap-3 mb-6">
        <AlertTriangle
          size={26}
          className="text-orange-400"
        />

        <div>
          <h2 className="text-2xl font-bold text-white">
            Missing Skills
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Skills required for the selected job that are missing from your resume.
          </p>
        </div>
      </div>

      {missingSkills.length === 0 ? (
        <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-xl p-4">

          <CheckCircle2
            size={22}
            className="text-green-400"
          />

          <p className="text-green-300">
            Great! No missing skills were detected.
          </p>

        </div>
      ) : (
        <div className="flex flex-wrap gap-3">

          {missingSkills.map((skill, index) => (
            <span
              key={index}
              className="px-4 py-2 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-300"
            >
              {skill}
            </span>
          ))}

        </div>
      )}

    </div>
  );
}

export default MissingSkills;