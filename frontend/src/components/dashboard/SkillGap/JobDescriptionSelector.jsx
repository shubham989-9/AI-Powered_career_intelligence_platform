import { useEffect, useState } from "react";
import axios from "axios";
import { Briefcase } from "lucide-react";

function JobDescriptionSelector({
  selectedJob,
  setSelectedJob,
}) {
  const token = localStorage.getItem("token");

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/job-description/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJobs(response.data);

      if (response.data.length > 0) {
        setSelectedJob(response.data[0].id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">

      <div className="flex items-center gap-3 mb-5">
        <Briefcase className="text-cyan-400" size={24} />
        <h2 className="text-xl font-bold">
          Select Job Description
        </h2>
      </div>

      <select
        value={selectedJob}
        onChange={(e) => setSelectedJob(e.target.value)}
        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 outline-none focus:border-cyan-500"
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
          </option>
        ))}
      </select>

    </div>
  );
}

export default JobDescriptionSelector;