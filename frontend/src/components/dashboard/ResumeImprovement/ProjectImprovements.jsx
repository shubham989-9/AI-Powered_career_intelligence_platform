import {
  FolderKanban,
  ArrowRight,
  Lightbulb,
} from "lucide-react";

function ProjectImprovements({ result }) {
  const improvements = result?.project_improvements || [];

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">

      {/* Header */}

      <div className="flex items-center gap-3 mb-7">

        <div className="w-11 h-11 rounded-xl bg-violet-500/10 flex items-center justify-center">
          <FolderKanban
            size={23}
            className="text-violet-400"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            Project Description Improvements
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Improve your project descriptions to make them
            more professional and impactful.
          </p>
        </div>

      </div>

      {/* Improvements */}

      {improvements.length === 0 ? (

        <p className="text-slate-400">
          No project improvement suggestions available.
        </p>

      ) : (

        <div className="space-y-6">

          {improvements.map((item, index) => (

            <div
              key={index}
              className="bg-slate-800/70 border border-slate-700 rounded-xl p-5"
            >

              {/* Suggestion Number */}

              <div className="flex items-center gap-2 mb-5">

                <Lightbulb
                  size={18}
                  className="text-yellow-400"
                />

                <span className="text-sm font-semibold text-yellow-300">
                  Suggestion #{index + 1}
                </span>

              </div>

              {/* Original */}

              <div>

                <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">
                  Current / Basic Description
                </p>

                <p className="text-slate-300">
                  {item.original_text}
                </p>

              </div>

              {/* Arrow */}

              <div className="flex justify-center my-5">

                <ArrowRight
                  size={24}
                  className="text-cyan-400"
                />

              </div>

              {/* Improved */}

              <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-4">

                <p className="text-xs uppercase tracking-wide text-cyan-400 mb-2">
                  Recommended Improvement
                </p>

                <p className="text-slate-200 leading-7">
                  {item.improved_text}
                </p>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default ProjectImprovements;