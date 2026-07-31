import axios from "axios";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import {
  Upload,
  FileText,
  Mail,
  Phone,
  Code,
  Trophy,
  Sparkles,
  CheckCircle2,
  User,
  ShieldCheck,
  Eye,
  Download,
  Trash2,
  RefreshCw,
} from "lucide-react";

function ResumeAnalysis() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [jobDescriptions, setJobDescriptions] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");
  const [atsResult, setAtsResult] = useState(null);

  const token = localStorage.getItem("token");

  const fetchResumes = async () => {
    if (!token) return;

    try {
      const response = await axios.get("http://127.0.0.1:8000/resume/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResumes(response.data);

      if (response.data.length > 0) {
        setSelectedResume(response.data[0]);
      }
    } catch (err) {
      setResumes([]);
      setSelectedResume(null);
    }
  };

  useEffect(() => {
    fetchResumes();
    fetchJobDescriptions();
  }, [token]);

  const fetchJobDescriptions = async () => {
    if (!token) return;

    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/job-description/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJobDescriptions(response.data);

      if (response.data.length > 0) {
        setSelectedJob(response.data[0].id);
      }
    } catch (error) {
      console.log(error);
    }
  };


const handleView = async (resume) => {
  setSelectedResume(resume);

  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/resume/download/${resume.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      }
    );

    const file = new Blob([response.data], {
      type: "application/pdf",
    });

    const fileURL = URL.createObjectURL(file);

    window.open(fileURL, "_blank");
  } catch (err) {
    console.log(err);
    alert("Unable to open resume");
  }
};

  const handleDownload = async (resumeId, fileName) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/resume/download/${resumeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");

      link.href = url;
      link.download = fileName || "resume.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert("Download Failed");
    }
  };

  const handleDelete = async (resumeId) => {
    if (!window.confirm("Delete this resume?")) return;

  try {
    await axios.delete(
      `http://127.0.0.1:8000/resume/${resumeId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    await fetchResumes();

    alert("Resume Deleted Successfully");
  } catch (err) {
    alert("Delete Failed");
  }
};

 const handleReplace = (resumeId) => {
  localStorage.setItem("replaceResumeId", resumeId);

  document.getElementById("resume-upload")?.click();
};


  const handleUpload = async () => {
    if (!file) {
      alert("Please select a resume.");
      return;
    }
    setLoading(true);
    setUploadProgress(10);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const replaceResumeId = localStorage.getItem("replaceResumeId");
      let response;
      if (replaceResumeId) {
        response = await axios.put(
          `http://127.0.0.1:8000/resume/replace/${replaceResumeId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (e)=>{
              if(e.total){
                setUploadProgress(Math.round((e.loaded*100)/e.total));
              }
            }
          }
        );
        localStorage.removeItem("replaceResumeId");
      } else {
        response = await axios.post(
          "http://127.0.0.1:8000/resume/upload",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (e)=>{
              if(e.total){
                setUploadProgress(Math.round((e.loaded*100)/e.total));
              }
            }
          }
        );
      }
      setStatus(response.data.message || "Success");
      setFile(null);
      await fetchResumes();
    } catch(err){
      alert(err?.response?.data?.detail || "Upload failed");
    } finally{
      setLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div
      className="min-h-screen text-white p-8"
      style={{
        background:
          "radial-gradient(circle at top left,#7c3aed22,transparent 40%), radial-gradient(circle at bottom right,#06b6d422,transparent 35%), #050816",
      }}
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,#7c3aed22,transparent_35%),radial-gradient(circle_at_bottom_right,#06b6d422,transparent_30%)]" />
      <div className="absolute blur-[180px] w-[400px] h-[400px] bg-violet-500/10 rounded-full top-20 left-20"></div>
      <div className="absolute blur-[180px] w-[300px] h-[300px] bg-cyan-500/10 rounded-full bottom-20 right-20"></div>

      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-black flex items-center gap-3">
            Resume Analysis
            <Sparkles className="text-violet-400" />
          </h1>
          <p className="text-slate-500 mt-3 text-lg">
            AI Powered Resume Scanner & ATS Analyzer
          </p>
        </div>

        <div className="flex items-center gap-4 rounded-3xl border border-slate-700 bg-slate-900/70 backdrop-blur-xl px-5 py-3">
          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 flex items-center justify-center">
            <User />
          </div>
          <div>
            <h2 className="font-bold">Student Dashboard</h2>
            <p className="text-slate-400 text-sm">Career Intelligence Platform</p>
          </div>
        </div>
      </div>

      <div className="grid xl:grid-cols-[420px_1fr] gap-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[30px] border border-slate-700 bg-slate-900/70 backdrop-blur-xl p-7 shadow-2xl"
        >
          <div className="rounded-[28px] bg-gradient-to-br from-violet-600/10 to-cyan-500/10 border border-violet-500/30 p-8">
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 flex items-center justify-center shadow-[0_0_50px_rgba(124,58,237,.5)]">
                <Upload size={45} />
              </div>
            </div>

            <h2 className="text-center text-2xl font-bold mt-7">Upload Resume</h2>
            <p className="text-center text-slate-400 mt-3">PDF • DOC • DOCX</p>

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

            <label
              htmlFor="resume-upload"
              className="mt-8 flex justify-center items-center gap-3 cursor-pointer rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 py-4 font-bold hover:scale-105 transition"
            >
              <Upload />
             {localStorage.getItem("replaceResumeId") ? "Replace Resume" : "Choose Resume"}
            </label>

            {file && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 rounded-2xl border border-slate-700 bg-slate-800/60 backdrop-blur-xl p-5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center">
                      <FileText className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{file.name}</h3>
                      <p className="text-slate-400">{(file.size / 1024).toFixed(2)} KB</p>
                    </div>
                  </div>
                  <CheckCircle2 size={28} className="text-green-400" />
                </div>

                <div className="mt-5 rounded-xl bg-green-500/10 border border-green-500/30 px-4 py-3 text-green-400 font-medium">
                  Ready For AI Analysis 🚀
                </div>
              </motion.div>
            )}

            {loading && (
              <div className="mt-8">
                <div className="flex justify-between mb-2">
                  <span className="text-slate-300">Uploading Resume...</span>
                  <span className="font-bold">{uploadProgress}%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-violet-500 via-cyan-400 to-blue-600 transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleUpload}
              disabled={loading}
              className="mt-8 w-full rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 py-4 text-lg font-bold shadow-[0_0_35px_rgba(59,130,246,.4)]"
            >
              {loading ? "Analyzing Resume..." : "✨ Analyze Resume"}
            </motion.button>

            {status && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 rounded-2xl border border-green-500/30 bg-green-500/10 p-5"
              >
                <div className="flex gap-4 items-center">
                  <ShieldCheck size={38} className="text-green-400" />
                  <div>
                    <h2 className="font-bold text-green-400">Resume Uploaded Successfully</h2>
                    <p className="text-green-300">Your Resume has been parsed successfully.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-[30px] border border-slate-700 bg-slate-900/70 backdrop-blur-xl p-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-black">Resume Overview</h2>
              <p className="text-slate-400 mt-2">AI Extracted Information</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-600 flex items-center justify-center">
              <FileText />
            </div>
          </div>

          {!selectedResume ? (
            <div className="h-[500px] flex items-center justify-center">
              <div className="text-center">
                <FileText size={90} className="mx-auto text-slate-600" />
                <h2 className="text-2xl font-bold mt-6">No Resume Uploaded</h2>
                <p className="text-slate-500 mt-3">Upload your resume to generate AI insights.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-7 mt-10">
              {resumes.length > 0 && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="mt-6 rounded-2xl border border-slate-700 bg-slate-900/60 p-5"
  >
    <h2 className="text-xl font-bold mb-5">
      Resume Management
    </h2>

    <div className="space-y-4">

      {resumes.map((resume) => (

        <div
          key={resume.id}
          className="rounded-xl border border-slate-700 p-4 bg-slate-800/60"
        >

          <div className="flex justify-between items-center">

            <div>

              <h3 className="font-bold">
                {resume.file_name}
              </h3>

              <p className="text-slate-400 text-sm">
                {resume.email}
              </p>

            </div>

            <div className="flex gap-3">

              <button
                onClick={() => handleView(resume)}
                className="px-3 py-2 rounded-lg bg-cyan-500/20"
              >
                <Eye />
              </button>

              <button
                onClick={() => handleDownload(resume.id, resume.file_name)}
                className="px-3 py-2 rounded-lg bg-green-500/20"
              >
                <Download />
              </button>

              <button
                onClick={() => handleReplace(resume.id)}
                className="px-3 py-2 rounded-lg bg-violet-500/20"
              >
                <RefreshCw />
              </button>

              <button
                onClick={() => handleDelete(resume.id)}
                className="px-3 py-2 rounded-lg bg-red-500/20"
              >
                <Trash2 />
              </button>

            </div>

          </div>

        </div>

      ))}

    </div>

  </motion.div>
)}
              
                  <div className="rounded-2xl bg-[#10172D] border border-slate-700 p-6">

                    <h2 className="text-xl font-bold mb-5">
                      Select Job Description
                    </h2>

                    <select
                      value={selectedJob}
                      onChange={(e) => setSelectedJob(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4"
                    >
                      <option value="">Select Job Description</option>

                      {jobDescriptions.map((job) => (
                        <option key={job.id} value={job.id}>
                          {job.job_title} - {job.company}
                        </option>
                      ))}

                    </select>

                  </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="rounded-2xl bg-[#10172D] border border-slate-700 p-5">
                  <div className="flex gap-3 items-center">
                    <Mail className="text-cyan-400" />
                    <div>
                      <p className="text-slate-400 text-sm">Email</p>
                      <h3 className="font-semibold">{selectedResume?.email}</h3>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-[#10172D] border border-slate-700 p-5">
                  <div className="flex gap-3 items-center">
                    <Phone className="text-violet-400" />
                    <div>
                      <p className="text-slate-400 text-sm">Phone</p>
                      <h3 className="font-semibold">{selectedResume?.phone}</h3>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-[#10172D] border border-slate-600 p-5">
                <div className="flex items-center gap-3 mb-5">
                  <Code className="text-cyan-400" />
                  <h2 className="text-2xl font-bold">Skills Detected</h2>
                </div>

                <div className="flex flex-wrap gap-3">
                  {selectedResume?.skills?.map((skill, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.08 }}
                      className="px-5 py-3 rounded-full bg-gradient-to-r from-violet-600/20 to-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-semibold"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="grid lg:grid-cols-[280px_1fr] gap-6">
                <div className="rounded-3xl bg-gradient-to-br from-violet-700 to-cyan-600 p-[2px]">
                  <div className="rounded-3xl bg-[#0B1225] p-8 h-full">
                    <div className="flex justify-center">
                      <div className="relative w-44 h-44">
                        <svg className="rotate-[-90deg]" width="176" height="176">
                          <circle cx="88" cy="88" r="72" stroke="#243244" strokeWidth="12" fill="none" />
                          <circle
                            cx="88"
                            cy="88"
                            r="72"
                            stroke="#06B6D4"
                            strokeWidth="12"
                            fill="none"
                            strokeDasharray={452}
                            strokeDashoffset={452 - (452 * (selectedResume?.ats_score ?? 0)) / 100}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col justify-center items-center">
                          <Trophy size={34} className="text-yellow-400 mb-2" />
                          <h1 className="text-4xl font-black">{(selectedResume?.ats_score ?? 0)}%</h1>
                          <p className="text-slate-300 text-sm">ATS Score</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 rounded-xl bg-green-500/10 border border-green-500/30 p-4">
                      <p className="text-green-400 font-semibold">Excellent Resume Quality 🚀</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl bg-[#10172D] border border-slate-700 p-7">
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="text-yellow-400" />
                    <h2 className="text-2xl font-bold">AI Suggestions</h2>
                  </div>

                  <div className="space-y-4">
                    {selectedResume?.suggestions?.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08 }}
                        whileHover={{ scale: 1.02 }}
                        className="rounded-2xl border border-slate-700 bg-slate-800/70 backdrop-blur-xl p-5 flex gap-4"
                      >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold mb-1">Suggestion {index + 1}</h3>
                          <p className="text-slate-300 leading-7">{item}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default ResumeAnalysis;