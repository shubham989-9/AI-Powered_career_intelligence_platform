import { Eye, Download, RefreshCw, Trash2, FileText } from "lucide-react";
import { motion } from "framer-motion";

function ResumeCard({
  resume,
  handleView,
  handleDownload,
  handleReplace,
  handleDelete,
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900/80 p-4 transition-all shadow-md hover:border-slate-700/80"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left Side: Info */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
            <FileText size={20} className="text-cyan-400" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-100 tracking-wide">
              {resume.file_name}
            </h3>

            <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-400">
              <span>{resume.email}</span>
              <span className="text-slate-600">•</span>
              <span className="font-mono text-slate-500">ID: #{resume.id}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
          <button
            onClick={() => handleView(resume)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-500/30 transition-all"
          >
            <Eye size={15} />
            <span>View</span>
          </button>

          <button
            onClick={() => handleDownload(resume.id, resume.file_name)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 hover:bg-emerald-500/20 hover:border-emerald-500/30 transition-all"
          >
            <Download size={15} />
            <span>Download</span>
          </button>

          <button
            onClick={() => handleReplace(resume.id)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-300 hover:bg-violet-500/20 hover:border-violet-500/30 transition-all"
          >
            <RefreshCw size={15} />
            <span>Replace</span>
          </button>

          <button
            onClick={() => handleDelete(resume.id)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 hover:bg-rose-500/20 hover:border-rose-500/30 transition-all"
          >
            <Trash2 size={15} />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ResumeCard;