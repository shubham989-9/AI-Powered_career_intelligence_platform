import { useState } from "react";

import ResumeSelector from "./ResumeSelector";
import JobDescriptionSelector from "./JobDescriptionSelector";
import RecommendCoursesButton from "./RecommendCoursesButton";
import MissingSkills from "./MissingSkills";
import CourseList from "./CourseList";
import LearningPath from "./LearningPath";

function CourseRecommendation() {
  const [selectedResume, setSelectedResume] = useState("");
  const [selectedJob, setSelectedJob] = useState("");

  const [courseResult, setCourseResult] = useState(null);

  return (
    <div className="p-10 text-white">

      {/* Header */}

      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-3">
          Course Recommendation
        </h1>

        <p className="text-slate-400">
          Discover relevant courses and build a learning path
          based on your missing skills.
        </p>
      </div>

      {/* Selectors */}

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

      {/* Recommend Button */}

      <div className="flex justify-center mt-10">

        <RecommendCoursesButton
          selectedResume={selectedResume}
          selectedJob={selectedJob}
          setCourseResult={setCourseResult}
        />

      </div>

      {/* Results */}

      {courseResult && (
        <div className="mt-12 space-y-8">

          <MissingSkills
            result={courseResult}
          />

          <CourseList
            result={courseResult}
          />

          <LearningPath
            result={courseResult}
          />

        </div>
      )}

    </div>
  );
}

export default CourseRecommendation;