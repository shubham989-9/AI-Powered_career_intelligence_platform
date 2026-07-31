import { FileText } from "lucide-react";

function ResumeSelector({
  resumes,
  selectedResume,
  setSelectedResume,
}) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-6">
      <div className="flex items-center gap-3 mb-5">
        <FileText className="text-cyan-400" />
        <h2 className="text-xl font-bold">
          Select Resume
        </h2>
      </div>

      <select
        value={selectedResume}
        onChange={(e) => setSelectedResume(e.target.value)}
        className="w-full rounded-xl bg-slate-800 border border-slate-700 p-4 outline-none focus:border-cyan-500"
      >
        <option value="">
          Select Resume
        </option>

        {resumes.map((resume) => (
          <option
            key={resume.id}
            value={resume.id}
          >
            {resume.file_name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ResumeSelector;