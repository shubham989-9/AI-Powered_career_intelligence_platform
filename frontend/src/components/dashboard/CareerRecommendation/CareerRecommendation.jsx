import { useState } from "react";

import ResumeSelector from "./ResumeSelector";
import JobDescriptionSelector from "./JobDescriptionSelector";
import AnalyzeCareerButton from "./AnalyzeCareerButton";

import BestCareerCard from "./BestCareerCard";
import CareerReasons from "./CareerReasons";
import AlternativeCareers from "./AlternativeCareers";
import GrowthOutlook from "./GrowthOutlook";

function CareerRecommendation() {

  const [selectedResume, setSelectedResume] = useState("");
  const [selectedJob, setSelectedJob] = useState("");

  const [careerResult, setCareerResult] = useState(null);

  return (
    <div className="p-10 text-white">

      <h1 className="text-3xl font-bold mb-3">
        Career Recommendation
      </h1>

      <p className="text-slate-400 mb-10">
        Discover the best career path based on your Resume and Job Description.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <ResumeSelector
          selectedResume={selectedResume}
          setSelectedResume={setSelectedResume}
        />

        <JobDescriptionSelector
          selectedJob={selectedJob}
          setSelectedJob={setSelectedJob}
        />

      </div>

      <div className="flex justify-center mt-10">

        <AnalyzeCareerButton
          selectedResume={selectedResume}
          selectedJob={selectedJob}
          setCareerResult={setCareerResult}
        />

      </div>

      {careerResult && (

        <div className="mt-12 space-y-8">

          <BestCareerCard result={careerResult} />

          <CareerReasons result={careerResult} />

          <AlternativeCareers result={careerResult} />

          <GrowthOutlook result={careerResult} />

        </div>

      )}

    </div>
  );
}

export default CareerRecommendation;