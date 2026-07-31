import { useEffect, useState } from "react";
import axios from "axios";

import ResumeSelector from "./ResumeSelector";
import JobDescriptionSelector from "./JobDescriptionSelector";
import AnalyzeButton from "./AnalyzeButton";
import ATSScoreCard from "./ATSScoreCard";
import SkillsComparison from "./SkillsComparison";
import KeywordComparison from "./KeywordComparison";
import AISuggestions from "./AISuggestions";

function ATSAnalysis() {
  const token = localStorage.getItem("token");

  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState("");

  const [jobDescriptions, setJobDescriptions] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");

  const [loading, setLoading] = useState(false);

  const [atsResult, setATSResult] = useState(null);

  const fetchResumes = async () => {
    if (!token) return;

    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/resume/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResumes(response.data);

      if (response.data.length > 0) {
        setSelectedResume(response.data[0].id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchJobDescriptions = async () => {
    if (!token) return;

    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/job-description/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJobDescriptions(response.data);

      if (response.data.length > 0) {
        setSelectedJob(response.data[0].id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchResumes();
    fetchJobDescriptions();
  }, []);

  const analyzeResume = async () => {
    if (!selectedResume || !selectedJob) {
      alert("Please select Resume and Job Description");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/ats/analyze",
        {
          resume_id: selectedResume,
          job_description_id: selectedJob,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setATSResult(response.data.analysis);
    } catch (error) {
      console.log(error);

      alert("ATS Analysis Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 text-white">

      <h1 className="text-3xl font-bold mb-2">
        ATS Resume Analysis
      </h1>

      <p className="text-slate-400 mb-8">
        Compare Resume with Job Description using AI.
      </p>

      <div className="grid lg:grid-cols-2 gap-6">

        <ResumeSelector
          resumes={resumes}
          selectedResume={selectedResume}
          setSelectedResume={setSelectedResume}
        />

        <JobDescriptionSelector
          jobDescriptions={jobDescriptions}
          selectedJob={selectedJob}
          setSelectedJob={setSelectedJob}
        />

      </div>

      <AnalyzeButton
        loading={loading}
        analyzeResume={analyzeResume}
      />

      {atsResult && (
        <>
          <ATSScoreCard atsResult={atsResult} />

          <SkillsComparison atsResult={atsResult} />

          <KeywordComparison atsResult={atsResult} />

          <AISuggestions atsResult={atsResult} />
        </>
      )}

    </div>
  );
}

export default ATSAnalysis;