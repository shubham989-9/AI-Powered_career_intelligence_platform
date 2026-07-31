import { Briefcase } from "lucide-react";

function JobDescriptionSelector({
  jobDescriptions,
  selectedJob,
  setSelectedJob,
}) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-6">
      <div className="flex items-center gap-3 mb-5">
        <Briefcase className="text-violet-400" />
        <h2 className="text-xl font-bold">
          Select Job Description
        </h2>
      </div>

      <select
        value={selectedJob}
        onChange={(e) => setSelectedJob(e.target.value)}
        className="w-full rounded-xl bg-slate-800 border border-slate-700 p-4 outline-none focus:border-violet-500"
      >
        <option value="">
          Select Job Description
        </option>

        {jobDescriptions.map((job) => (
          <option
            key={job.id}
            value={job.id}
          >
            {job.job_title} - {job.company}
          </option>
        ))}
      </select>
    </div>
  );
}

export default JobDescriptionSelector;