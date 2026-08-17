import { useState } from "react";
import axios from "axios";
import { Search, Loader2 } from "lucide-react";

function RecommendJobsButton({
  selectedResume,
  setJobResult,
}) {
  const [loading, setLoading] = useState(false);

  const recommendJobs = async () => {
    if (!selectedResume) {
      alert("Please select a resume.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${API_BASE_URL}/job-recommendation/recommend",
        {
          resume_id: Number(selectedResume),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJobResult(response.data);

    } catch (error) {
      console.error(
        "Job recommendation failed:",
        error
      );

      alert(
        error.response?.data?.detail ||
          "Failed to generate job recommendations."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={recommendJobs}
      disabled={loading || !selectedResume}
      className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        <>
          <Loader2
            size={20}
            className="animate-spin"
          />
          Finding Jobs...
        </>
      ) : (
        <>
          <Search size={20} />
          Recommend Jobs
        </>
      )}
    </button>
  );
}

export default RecommendJobsButton;