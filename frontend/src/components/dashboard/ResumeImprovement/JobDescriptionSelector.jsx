import { useEffect, useState } from "react";
import axios from "axios";
import { Briefcase } from "lucide-react";

function JobDescriptionSelector({
  selectedJob,
  setSelectedJob,
}) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${API_BASE_URL}/job-description/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJobs(response.data);

      // Automatically select first Job Description
      if (response.data.length > 0) {
        setSelectedJob(response.data[0].id);
      }

    } catch (error) {
      console.error(
        "Failed to fetch job descriptions:",
        error
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">

      {/* Header */}

      <div className="flex items-center gap-3 mb-5">

        <Briefcase
          size={24}
          className="text-violet-400"
        />

        <div>
          <h2 className="text-xl font-bold">
            Select Job Description
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Choose the target job to optimize your resume.
          </p>
        </div>

      </div>

      {/* Job Description Dropdown */}

      {loading ? (

        <p className="text-slate-400">
          Loading job descriptions...
        </p>

      ) : jobs.length === 0 ? (

        <p className="text-yellow-400">
          No Job Descriptions found. Add one first.
        </p>

      ) : (

        <select
          value={selectedJob}
          onChange={(e) =>
            setSelectedJob(e.target.value)
          }
          className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white outline-none focus:border-violet-500"
        >

          <option value="">
            Select Job Description
          </option>

          {jobs.map((job) => (

            <option
              key={job.id}
              value={job.id}
            >
              {job.job_title}
              {job.company
                ? ` - ${job.company}`
                : ""}
            </option>

          ))}

        </select>

      )}

    </div>
  );
}

export default JobDescriptionSelector;