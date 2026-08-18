import { useEffect, useState } from "react";
import api from "../../../api";

import ResumeUpload from "./ResumeUpload";
import ResumeList from "./ResumeList";

function ResumeManagement() {
  const token = localStorage.getItem("token");

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [status, setStatus] = useState("");

  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);

  const fetchResumes = async () => {
    if (!token) return;

    try {
      const response = await api.get("/resume/");
      setResumes(response.data || []);

      if (response.data && response.data.length > 0) {
        setSelectedResume(response.data[0]);
      }
    } catch {
      setResumes([]);
      setSelectedResume(null);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleView = async (resume) => {
    setSelectedResume(resume);

    try {
      const token = localStorage.getItem("token");
      const response = await api.get(`/resume/view/${resume.id}?token=${token}`, {
        responseType: "blob",
      });

      const contentType = response.headers["content-type"] || "application/pdf";
      const fileBlob = new Blob([response.data], { type: contentType });
      const fileURL = window.URL.createObjectURL(fileBlob);
      window.open(fileURL, "_blank");
    } catch (error) {
      console.error("Error viewing resume:", error);
      alert("Unable to open resume");
    }
  };

  const handleDownload = async (resumeId, fileName) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get(`/resume/download/${resumeId}?token=${token}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName || "resume.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading resume:", error);
      alert("Unable to download resume");
    }
  };

  const handleDelete = async (resumeId) => {
    if (!window.confirm("Delete this resume?")) return;

    try {
      await api.delete(`/resume/${resumeId}`);
      await fetchResumes();
      alert("Resume Deleted Successfully");
    } catch {
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
        response = await api.put(`/resume/replace/${replaceResumeId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (e) => {
            if (e.total) {
              setUploadProgress(Math.round((e.loaded * 100) / e.total));
            }
          },
        });
        localStorage.removeItem("replaceResumeId");
      } else {
        response = await api.post("/resume/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (e) => {
            if (e.total) {
              setUploadProgress(Math.round((e.loaded * 100) / e.total));
            }
          },
        });
      }

      setStatus(response.data?.message || "Success");
      setFile(null);
      fetchResumes();
    } catch (err) {
      alert(err?.response?.data?.detail || "Upload Failed");
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="p-6 sm:p-8 text-white max-w-6xl mx-auto space-y-6">
      {/* Sleek Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Resume Management
        </h1>

        <p className="text-slate-400 text-sm mt-1">
          Upload, view, download, replace, and organize your career documents.
        </p>
      </div>

      <ResumeUpload
        file={file}
        setFile={setFile}
        loading={loading}
        uploadProgress={uploadProgress}
        status={status}
        handleUpload={handleUpload}
      />

      <ResumeList
        resumes={resumes}
        handleView={handleView}
        handleDownload={handleDownload}
        handleReplace={handleReplace}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default ResumeManagement;