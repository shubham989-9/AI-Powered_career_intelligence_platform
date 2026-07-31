import { Map, ArrowRight } from "lucide-react";

function LearningRoadmap({ result }) {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">

      <div className="flex items-center gap-3 mb-6">
        <Map
          size={26}
          className="text-cyan-400"
        />

        <h2 className="text-2xl font-bold text-white">
          Learning Roadmap
        </h2>
      </div>

      {result.learning_path.length === 0 ? (
        <p className="text-green-400">
          🎉 No learning roadmap required.
        </p>
      ) : (
        <div className="space-y-4">

          {result.learning_path.map((item, index) => (

            <div
              key={index}
              className="flex items-center justify-between bg-slate-800 border border-slate-700 rounded-xl p-4"
            >

              <div>

                <p className="text-lg font-semibold text-white">
                  {item.skill}
                </p>

                <p className="text-slate-400 text-sm">
                  Priority: {item.priority}
                </p>

              </div>

              <ArrowRight className="text-cyan-400" />

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default LearningRoadmap;