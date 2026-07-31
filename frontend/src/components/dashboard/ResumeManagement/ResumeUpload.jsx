import { motion } from "framer-motion";
import { Upload, FileText, CheckCircle2, ShieldCheck } from "lucide-react";

function ResumeUpload({
  file,
  setFile,
  loading,
  uploadProgress,
  status,
  handleUpload,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 shadow-xl"
    >
      <div className="rounded-xl bg-slate-800/40 border border-slate-800 p-6 flex flex-col items-center">
        {/* Compact Icon Badge */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 mb-3">
          <Upload size={24} className="text-white" />
        </div>

        <h2 className="text-lg font-bold text-slate-100">Upload Resume</h2>

        <p className="text-slate-400 text-xs mt-1">
          Supports PDF, DOC, and DOCX formats
        </p>

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          id="resume-upload"
          className="hidden"
          onChange={(e) => {
            const selected = e.target.files[0];

            if (!selected) return;

            setFile(selected);
          }}
        />

        {/* File Selection Action Button */}
        <label
          htmlFor="resume-upload"
          className="mt-5 inline-flex items-center gap-2 cursor-pointer rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-200 px-5 py-2.5 text-xs font-semibold transition"
        >
          <Upload size={16} className="text-cyan-400" />

          {localStorage.getItem("replaceResumeId")
            ? "Replace Resume File"
            : "Choose Resume File"}
        </label>

        {/* Selected File Card */}
        {file && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-5 w-full max-w-md rounded-xl border border-slate-700/80 bg-slate-900/80 p-3.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
                  <FileText className="text-pink-400" size={18} />
                </div>

                <div className="text-left">
                  <h3 className="font-semibold text-xs text-slate-200 truncate max-w-[200px]">
                    {file.name}
                  </h3>

                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>

              <CheckCircle2 size={20} className="text-emerald-400" />
            </div>

            <div className="mt-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 text-emerald-400 text-xs font-medium text-center">
              File Ready for Upload
            </div>
          </motion.div>
        )}

        {/* Progress Bar */}
        {loading && (
          <div className="mt-5 w-full max-w-md">
            <div className="flex justify-between mb-1 text-xs">
              <span className="text-slate-400">Uploading...</span>

              <span className="font-semibold text-cyan-400">
                {uploadProgress}%
              </span>
            </div>

            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-500 via-cyan-400 to-blue-600 transition-all duration-300"
                style={{
                  width: `${uploadProgress}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Submit Upload Button */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleUpload}
          disabled={loading}
          className="mt-5 w-full max-w-md rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 py-3 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 transition disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload Resume"}
        </motion.button>

        {/* Status Notification */}
        {status && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 w-full max-w-md rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3"
          >
            <div className="flex gap-2.5 items-center">
              <ShieldCheck size={20} className="text-emerald-400 flex-shrink-0" />

              <div className="text-left">
                <h4 className="font-semibold text-xs text-emerald-400">
                  Upload Successful
                </h4>

                <p className="text-[11px] text-emerald-300">
                  Your resume has been processed and saved.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default ResumeUpload;