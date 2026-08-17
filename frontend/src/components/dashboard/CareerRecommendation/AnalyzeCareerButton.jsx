import axios from "axios";

function AnalyzeCareerButton({
  selectedResume,
  selectedJob,
  setCareerResult,
}) {
  const handleAnalyze = async () => {
    if (!selectedResume || !selectedJob) {
      alert("Please select Resume and Job Description.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${API_BASE_URL}/career-recommendation/analyze`,
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

      setCareerResult(response.data);
    } catch (error) {
      console.error(error);

      alert("Career Recommendation failed.");
    }
  };

  return (
    <button
      onClick={handleAnalyze}
      className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-semibold"
    >
      Analyze Career
    </button>
  );
}

export default AnalyzeCareerButton;