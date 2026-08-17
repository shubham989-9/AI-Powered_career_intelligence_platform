import { useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";

function AnalyzeSkillGapButton({
  selectedResume,
  selectedJob,
  setSkillGapResult,
}) {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  const analyzeSkillGap = async () => {
    if (!selectedResume || !selectedJob) {
      alert("Please select Resume and Job Description.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_BASE_URL}/skill-gap/analyze",
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

      setSkillGapResult(response.data);
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.detail ||
          "Skill Gap Analysis failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={analyzeSkillGap}
      disabled={loading}
      className="flex items-center gap-2 px-8 py-4 rounded-xl bg-cyan-600 hover:bg-cyan-700 transition font-semibold disabled:opacity-50"
    >
      <Search size={20} />

      {loading
        ? "Analyzing..."
        : "Analyze Skill Gap"}
    </button>
  );
}

export default AnalyzeSkillGapButton;