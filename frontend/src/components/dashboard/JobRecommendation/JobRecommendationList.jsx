import { BriefcaseBusiness } from "lucide-react";
import JobCard from "./JobCard";

function JobRecommendationList({ result }) {
  const recommendations = result?.recommendations || [];

  return (
    <div>

      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <div className="flex items-center gap-3">

          <BriefcaseBusiness
            size={28}
            className="text-cyan-400"
          />

          <div>
            <h2 className="text-2xl font-bold text-white">
              Recommended Jobs
            </h2>

            <p className="text-slate-400 text-sm mt-1">
              Jobs ranked according to your resume skills.
            </p>
          </div>

        </div>

        <div className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 px-4 py-2 rounded-xl">
          {result?.total_recommendations || 0} Matches
        </div>

      </div>

      {/* No Recommendations */}

      {recommendations.length === 0 ? (

        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-10 text-center">

          <BriefcaseBusiness
            size={42}
            className="text-slate-500 mx-auto mb-4"
          />

          <h3 className="text-xl font-semibold text-white">
            No Job Recommendations Found
          </h3>

          <p className="text-slate-400 mt-2">
            Add more relevant technical skills to your resume and try again.
          </p>

        </div>

      ) : (

        <div className="space-y-6">

          {recommendations.map((job, index) => (

            <JobCard
              key={`${job.job_title}-${index}`}
              job={job}
              rank={index + 1}
            />

          ))}

        </div>

      )}

    </div>
  );
}

export default JobRecommendationList;