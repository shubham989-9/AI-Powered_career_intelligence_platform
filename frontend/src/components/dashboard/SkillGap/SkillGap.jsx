import { useState } from "react";

import ResumeSelector from "./ResumeSelector";
import JobDescriptionSelector from "./JobDescriptionSelector";
import AnalyzeSkillGapButton from "./AnalyzeSkillGapButton";
import SkillMatchCard from "./SkillMatchCard";
import MatchingSkills from "./MatchingSkills";
import MissingSkills from "./MissingSkills";
import RecommendedSkills from "./RecommendedSkills";
import LearningRoadmap from "./LearningRoadmap";

function SkillGap() {
  const [selectedResume, setSelectedResume] = useState("");
  const [selectedJob, setSelectedJob] = useState("");
  const [skillGapResult, setSkillGapResult] = useState(null);

  return (
    <div className="p-10 text-white">

      <h1 className="text-3xl font-bold mb-3">
        Skill Gap Analysis
      </h1>

      <p className="text-slate-400 mb-10">
        Analyze the gap between your Resume and Job Description.
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

        <AnalyzeSkillGapButton
          selectedResume={selectedResume}
          selectedJob={selectedJob}
          setSkillGapResult={setSkillGapResult}
        />

      </div>

      {skillGapResult && (
        <div className="mt-12 space-y-8">

          <SkillMatchCard
            result={skillGapResult}
          />

          <MatchingSkills
            result={skillGapResult}
          />

          <MissingSkills
            result={skillGapResult}
          />

          <RecommendedSkills
            result={skillGapResult}
          />

          <LearningRoadmap
            result={skillGapResult}
          />

        </div>
      )}

    </div>
  );
}

export default SkillGap;