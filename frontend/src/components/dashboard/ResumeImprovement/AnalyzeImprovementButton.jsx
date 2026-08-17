import { useState } from "react";
import axios from "axios";
import { Sparkles, Loader2 } from "lucide-react";

function AnalyzeImprovementButton({
  selectedResume,
  selectedJob,
  setImprovementResult,
}) {
  const [loading, setLoading] = useState(false);

  const analyzeResume = async () => {
    if (!selectedResume || !selectedJob) {
      alert("Please select Resume and Job Description.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${API_BASE_URL}/resume-improvement/analyze`,
        {
          resume_id: Number(selectedResume),
          job_description_id: Number(selectedJob),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setImprovementResult(response.data);

    } catch (error) {
      console.error(
        "Resume improvement analysis failed:",
        error
      );

      alert(
        error.response?.data?.detail ||
          "Failed to generate resume improvement suggestions."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={analyzeResume}
      disabled={
        loading ||
        !selectedResume ||
        !selectedJob
      }
      className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        <>
          <Loader2
            size={20}
            className="animate-spin"
          />
          Analyzing Resume...
        </>
      ) : (
        <>
          <Sparkles size={20} />
          Analyze & Improve Resume
        </>
      )}
    </button>
  );
}

export default AnalyzeImprovementButton;