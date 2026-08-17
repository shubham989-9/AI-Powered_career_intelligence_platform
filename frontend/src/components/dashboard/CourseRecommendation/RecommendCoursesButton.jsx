import { useState } from "react";
import axios from "axios";
import { GraduationCap, Loader2 } from "lucide-react";

function RecommendCoursesButton({
  selectedResume,
  selectedJob,
  setCourseResult,
}) {
  const [loading, setLoading] = useState(false);

  const recommendCourses = async () => {
    if (!selectedResume || !selectedJob) {
      alert("Please select Resume and Job Description.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${API_BASE_URL}/course-recommendation/recommend",
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

      setCourseResult(response.data);

    } catch (error) {
      console.error(
        "Course recommendation failed:",
        error
      );

      alert(
        error.response?.data?.detail ||
          "Failed to generate course recommendations."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={recommendCourses}
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
          Finding Courses...
        </>
      ) : (
        <>
          <GraduationCap size={20} />
          Recommend Courses
        </>
      )}
    </button>
  );
}

export default RecommendCoursesButton;