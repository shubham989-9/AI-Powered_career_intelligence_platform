import ResumeCard from "./ResumeCard";
import { FileText, FolderOpen } from "lucide-react";
import { motion } from "framer-motion";

function ResumeList({
  resumes,
  handleView,
  handleDownload,
  handleReplace,
  handleDelete,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl p-6 mt-6 shadow-xl"
    >
      {/* List Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
            <FileText className="text-cyan-400" size={18} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-100">My Resumes</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Manage and view all uploaded resumes
            </p>
          </div>
        </div>

        {/* Counter Badge */}
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-cyan-400 border border-slate-700">
          {resumes.length} {resumes.length === 1 ? "File" : "Files"}
        </span>
      </div>

      {/* Empty State vs Card List */}
      {resumes.length === 0 ? (
        <div className="py-12 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-center mb-4">
            <FolderOpen size={32} className="text-slate-500" />
          </div>

          <h3 className="text-base font-semibold text-slate-200">
            No Resume Found
          </h3>

          <p className="text-xs text-slate-400 mt-1 max-w-sm">
            Upload your first resume from above to view and analyze it here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {resumes.map((resume) => (
            <ResumeCard
              key={resume.id}
              resume={resume}
              handleView={handleView}
              handleDownload={handleDownload}
              handleReplace={handleReplace}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default ResumeList;