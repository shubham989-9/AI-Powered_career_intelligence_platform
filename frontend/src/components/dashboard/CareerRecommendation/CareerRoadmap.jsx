import {
  CheckCircle,
  Clock,
  ArrowDown,
} from "lucide-react";

function CareerRoadmap({ roadmap = [] }) {

  if (roadmap.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mt-8">

        <h2 className="text-2xl font-bold text-white">
          Career Roadmap
        </h2>

        <p className="text-gray-400 mt-3">
          Analyze your career recommendation to generate a personalized learning roadmap.
        </p>

      </div>
    );
  }

  return (

    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mt-8">

      <h2 className="text-3xl font-bold mb-2">
        Career Roadmap
      </h2>

      <p className="text-gray-400 mb-10">
        Follow this personalized roadmap to achieve your target career.
      </p>

      <div className="space-y-6">

        {roadmap.map((step, index) => (

          <div key={index}>

            <div className="flex gap-5">

              {/* Timeline */}

              <div className="flex flex-col items-center">

                <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center">

                  <CheckCircle size={22} className="text-white"/>

                </div>

                {index !== roadmap.length - 1 && (

                  <div className="w-1 h-24 bg-cyan-500 mt-2 rounded-full"></div>

                )}

              </div>

              {/* Card */}

              <div className="flex-1 bg-slate-800 rounded-xl border border-slate-700 p-6 hover:border-cyan-400 transition-all duration-300">

                <div className="flex justify-between items-center">

                  <div>

                    <h3 className="text-xl font-bold">

                      Step {step.step}

                    </h3>

                    <h4 className="text-cyan-400 text-lg mt-1">

                      {step.title}

                    </h4>

                  </div>

                  <div className="flex items-center gap-2 text-gray-400">

                    <Clock size={18}/>

                    <span>{step.duration}</span>

                  </div>

                </div>

                <div className="mt-6">

                  <h5 className="text-white font-semibold mb-3">

                    Topics to Learn

                  </h5>

                  <div className="flex flex-wrap gap-3">

                    {step.topics.map((topic, i)=>(

                      <span
                        key={i}
                        className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500 text-cyan-300 text-sm"
                      >

                        {topic}

                      </span>

                    ))}

                  </div>

                </div>

              </div>

            </div>

            {index !== roadmap.length-1 && (

              <div className="flex justify-center my-3">

                <ArrowDown className="text-cyan-400"/>

              </div>

            )}

          </div>

        ))}

      </div>

    </div>

  );

}

export default CareerRoadmap;