import {
  Briefcase,
  CheckCircle2,
  AlertCircle,
  Target,
} from "lucide-react";

function JobCard({ job, rank }) {
  const getMatchLabel = (percentage) => {
    if (percentage >= 80) return "Excellent Match";
    if (percentage >= 60) return "Good Match";
    if (percentage >= 40) return "Moderate Match";
    return "Low Match";
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 hover:border-cyan-500/50 transition">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

        <div className="flex items-center gap-4">

          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
            <Briefcase
              size={24}
              className="text-cyan-400"
            />
          </div>

          <div>

            <p className="text-sm text-slate-400 mb-1">
              Recommendation #{rank}
            </p>

            <h2 className="text-2xl font-bold text-white">
              {job.job_title}
            </h2>

          </div>

        </div>

        {/* Match Score */}

        <div className="text-left md:text-right">

          <div className="flex items-center md:justify-end gap-2">
            <Target
              size={20}
              className="text-cyan-400"
            />

            <span className="text-3xl font-bold text-cyan-400">
              {job.match_percentage}%
            </span>
          </div>

          <p className="text-sm text-slate-400 mt-1">
            {getMatchLabel(job.match_percentage)}
          </p>

        </div>

      </div>

      {/* Progress Bar */}

      <div className="mt-6">

        <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">

          <div
            className="h-full bg-cyan-500 rounded-full transition-all duration-500"
            style={{
              width: `${job.match_percentage}%`,
            }}
          />

        </div>

      </div>

      {/* Skills */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-7">

        {/* Matching Skills */}

        <div>

          <div className="flex items-center gap-2 mb-4">

            <CheckCircle2
              size={20}
              className="text-green-400"
            />

            <h3 className="font-semibold text-white">
              Matching Skills
            </h3>

          </div>

          {job.matching_skills.length > 0 ? (

            <div className="flex flex-wrap gap-2">

              {job.matching_skills.map((skill, index) => (

                <span
                  key={index}
                  className="px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/30 text-green-300 text-sm"
                >
                  {skill}
                </span>

              ))}

            </div>

          ) : (

            <p className="text-sm text-slate-500">
              No matching skills found.
            </p>

          )}

        </div>

        {/* Missing Skills */}

        <div>

          <div className="flex items-center gap-2 mb-4">

            <AlertCircle
              size={20}
              className="text-orange-400"
            />

            <h3 className="font-semibold text-white">
              Skills to Improve
            </h3>

          </div>

          {job.missing_skills.length > 0 ? (

            <div className="flex flex-wrap gap-2">

              {job.missing_skills.map((skill, index) => (

                <span
                  key={index}
                  className="px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-300 text-sm"
                >
                  {skill}
                </span>

              ))}

            </div>

          ) : (

            <p className="text-sm text-green-400">
              You have all required skills 🎉
            </p>

          )}

        </div>

      </div>

    </div>
  );
}

export default JobCard;