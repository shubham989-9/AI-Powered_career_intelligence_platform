import { useEffect, useState } from "react";
import axios from "axios";

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
      const response = await axios.get("http://127.0.0.1:8000/resume/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResumes(response.data);

      if (response.data.length > 0) {
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
    } catch {
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
    } catch {
      alert("Download Failed");
    }
  };

  const handleDelete = async (resumeId) => {
    if (!window.confirm("Delete this resume?")) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/resume/${resumeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
        response = await axios.put(
          `http://127.0.0.1:8000/resume/replace/${replaceResumeId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (e) => {
              if (e.total) {
                setUploadProgress(Math.round((e.loaded * 100) / e.total));
              }
            },
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
            onUploadProgress: (e) => {
              if (e.total) {
                setUploadProgress(Math.round((e.loaded * 100) / e.total));
              }
            },
          }
        );
      }

      setStatus(response.data.message || "Success");

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