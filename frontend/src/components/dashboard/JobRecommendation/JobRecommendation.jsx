import { useState } from "react";

import ResumeSelector from "./ResumeSelector";
import RecommendJobsButton from "./RecommendJobsButton";
import JobRecommendationList from "./JobRecommendationList";

function JobRecommendation() {
  const [selectedResume, setSelectedResume] = useState("");
  const [jobResult, setJobResult] = useState(null);

  return (
    <div className="p-10 text-white">

      <h1 className="text-3xl font-bold mb-3">
        Job Recommendation
      </h1>

      <p className="text-slate-400 mb-10">
        Discover job roles that best match your resume skills.
      </p>

      <div className="max-w-3xl">

        <ResumeSelector
          selectedResume={selectedResume}
          setSelectedResume={setSelectedResume}
        />

      </div>

      <div className="mt-8">

        <RecommendJobsButton
          selectedResume={selectedResume}
          setJobResult={setJobResult}
        />

      </div>

      {jobResult && (
        <div className="mt-12">

          <JobRecommendationList
            result={jobResult}
          />

        </div>
      )}

    </div>
  );
}

export default JobRecommendation;