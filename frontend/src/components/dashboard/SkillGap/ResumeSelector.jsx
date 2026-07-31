import { useEffect, useState } from "react";
import axios from "axios";
import { FileText } from "lucide-react";

function ResumeSelector({
  selectedResume,
  setSelectedResume,
}) {
  const token = localStorage.getItem("token");

  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/resume/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResumes(response.data);

      if (response.data.length > 0) {
        setSelectedResume(response.data[0].id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">

      <div className="flex items-center gap-3 mb-5">
        <FileText className="text-cyan-400" size={24} />
        <h2 className="text-xl font-bold">
          Select Resume
        </h2>
      </div>

      <select
        value={selectedResume}
        onChange={(e) =>
          setSelectedResume(e.target.value)
        }
        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 outline-none focus:border-cyan-500"
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