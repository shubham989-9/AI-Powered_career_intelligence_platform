import { useEffect, useState } from "react";
import axios from "axios";
import { FileText } from "lucide-react";

function ResumeSelector({
  selectedResume,
  setSelectedResume,
}) {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${API_BASE_URL}/resume/`,
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
      console.error(
        "Failed to fetch resumes:",
        error
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">

      <div className="flex items-center gap-3 mb-5">

        <FileText
          size={24}
          className="text-cyan-400"
        />

        <div>
          <h2 className="text-xl font-bold">
            Select Resume
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Choose the resume you want to analyze.
          </p>
        </div>

      </div>

      {loading ? (

        <p className="text-slate-400">
          Loading resumes...
        </p>

      ) : resumes.length === 0 ? (

        <p className="text-yellow-400">
          No resumes found. Upload a resume first.
        </p>

      ) : (

        <select
          value={selectedResume}
          onChange={(e) =>
            setSelectedResume(e.target.value)
          }
          className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white outline-none focus:border-cyan-500"
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

      )}

    </div>
  );
}

export default ResumeSelector;
