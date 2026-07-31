import {
  Map,
  CheckCircle2,
  ArrowDown,
  BookOpen,
} from "lucide-react";

function LearningPath({ result }) {
  const learningPath = result?.learning_path || [];

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">

      {/* Header */}

      <div className="flex items-center gap-3 mb-8">

        <div className="w-11 h-11 rounded-xl bg-violet-500/10 flex items-center justify-center">
          <Map
            size={24}
            className="text-violet-400"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            Learning Path
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Follow these steps to close your skill gap.
          </p>
        </div>

      </div>

      {/* No Learning Required */}

      {learningPath.length === 0 ? (

        <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-xl p-5">

          <CheckCircle2
            size={24}
            className="text-green-400"
          />

          <div>
            <p className="font-semibold text-green-300">
              Learning path completed!
            </p>

            <p className="text-sm text-slate-400 mt-1">
              No additional skills are currently required.
            </p>
          </div>

        </div>

      ) : (

        <div className="space-y-3">

          {learningPath.map((item, index) => (

            <div key={`${item.skill}-${index}`}>

              {/* Step */}

              <div className="flex items-center gap-5 bg-slate-800 border border-slate-700 rounded-xl p-5">

                {/* Step Number */}

                <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">

                  <span className="text-cyan-400 font-bold">
                    {item.step}
                  </span>

                </div>

                {/* Skill */}

                <div className="flex-1">

                  <div className="flex items-center gap-2">

                    <BookOpen
                      size={18}
                      className="text-violet-400"
                    />

                    <h3 className="text-lg font-semibold text-white capitalize">
                      {item.skill}
                    </h3>

                  </div>

                  <p className="text-sm text-slate-400 mt-1">
                    Learn and practice this skill before moving
                    to the next step.
                  </p>

                </div>

                {/* Status */}

                <span className="px-3 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/30 text-violet-300 text-sm">
                  {item.status}
                </span>

              </div>

              {/* Arrow */}

              {index < learningPath.length - 1 && (

                <div className="flex justify-center py-2">
                  <ArrowDown
                    size={22}
                    className="text-slate-500"
                  />
                </div>

              )}

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default LearningPath;