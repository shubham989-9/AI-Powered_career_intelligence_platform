import { useState } from "react";

import ResumeSelector from "./ResumeSelector";
import JobDescriptionSelector from "./JobDescriptionSelector";
import AnalyzeImprovementButton from "./AnalyzeImprovementButton";

import ImprovedSummary from "./ImprovedSummary";
import MissingKeywords from "./MissingKeywords";
import ProjectImprovements from "./ProjectImprovements";
import RecommendedCertifications from "./RecommendedCertifications";


function ResumeImprovement() {

  const [selectedResume, setSelectedResume] = useState("");
  const [selectedJob, setSelectedJob] = useState("");

  const [improvementResult, setImprovementResult] = useState(null);

  return (
    <div className="p-10 text-white">

      {/* ================= Header ================= */}

      <div className="mb-10">

        <h1 className="text-3xl font-bold mb-3">
          Resume Improvement
        </h1>

        <p className="text-slate-400">
          Get personalized suggestions to improve your resume
          for the selected job opportunity.
        </p>

      </div>


      {/* ================= Selectors ================= */}

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


      {/* ================= Analyze Button ================= */}

      <div className="flex justify-center mt-10">

        <AnalyzeImprovementButton
          selectedResume={selectedResume}
          selectedJob={selectedJob}
          setImprovementResult={setImprovementResult}
        />

      </div>


      {/* ================= Results ================= */}

      {improvementResult && (

        <div className="mt-12 space-y-8">

          <ImprovedSummary
            result={improvementResult}
          />

          <MissingKeywords
            result={improvementResult}
          />

          <ProjectImprovements
            result={improvementResult}
          />

          <RecommendedCertifications
            result={improvementResult}
          />

        </div>

      )}

    </div>
  );
}


export default ResumeImprovement;