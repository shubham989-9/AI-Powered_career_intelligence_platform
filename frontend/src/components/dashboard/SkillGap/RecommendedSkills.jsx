import { TrendingUp, Lightbulb } from "lucide-react";

function RecommendedSkills({ result }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* Strengths */}

      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">

        <div className="flex items-center gap-3 mb-5">
          <TrendingUp
            size={26}
            className="text-green-400"
          />

          <h2 className="text-2xl font-bold text-white">
            Strengths
          </h2>
        </div>

        <div className="space-y-3">
          {result.strengths.map((item, index) => (
            <div
              key={index}
              className="bg-green-600/10 border border-green-500 rounded-xl p-3 text-green-300"
            >
              ✓ {item}
            </div>
          ))}
        </div>

      </div>

      {/* Improvements */}

      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">

        <div className="flex items-center gap-3 mb-5">
          <Lightbulb
            size={26}
            className="text-yellow-400"
          />

          <h2 className="text-2xl font-bold text-white">
            Areas for Improvement
          </h2>
        </div>

        <div className="space-y-3">
          {result.improvements.map((item, index) => (
            <div
              key={index}
              className="bg-yellow-600/10 border border-yellow-500 rounded-xl p-3 text-yellow-300"
            >
              • {item}
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}

export default RecommendedSkills;