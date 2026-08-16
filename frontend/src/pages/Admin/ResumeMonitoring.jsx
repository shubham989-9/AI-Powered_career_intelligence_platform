import { useEffect, useState } from "react";
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Upload,
  CalendarDays,
  RefreshCw,
  Search,
} from "lucide-react";

import api from "../../api";

function ResumeMonitoring() {

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({
    statistics: {
      total_resumes: 0,
      parsed_resumes: 0,
      parsing_issues: 0,
      resumes_today: 0,
      resumes_last_7_days: 0,
    },
    resumes: [],
  });

  const [search, setSearch] = useState("");

  const fetchResumeMonitoring = async () => {

    try {

      setLoading(true);

      const token =
        localStorage.getItem("token");

      const response = await api.get(
        "/admin/resumes/monitoring",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setData(response.data);

    } catch (error) {

      console.error(
        "Resume Monitoring Error:",
        error
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    fetchResumeMonitoring();

  }, []);

  const filteredResumes =
    data.resumes.filter((resume) => {

      const value =
        search.toLowerCase();

      return (
        resume.file_name
          ?.toLowerCase()
          .includes(value) ||

        resume.extracted_email
          ?.toLowerCase()
          .includes(value) ||

        resume.extracted_phone
          ?.toLowerCase()
          .includes(value)
      );
    });

  if (loading) {

    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center text-white">

        <div className="flex items-center gap-3 text-cyan-400">

          <RefreshCw
            size={24}
            className="animate-spin"
          />

          Loading Resume Monitoring...

        </div>

      </div>
    );
  }

  const stats = data.statistics;

  return (

    <div className="min-h-screen bg-[#050816] text-white p-6">

      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>

            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">
              Admin Monitoring
            </p>

            <h1 className="text-3xl md:text-4xl font-black mt-1">
              Resume Parsing Monitoring
            </h1>

            <p className="text-slate-400 mt-2">
              Monitor resume uploads, parsing status,
              extracted information and ATS processing.
            </p>

          </div>

          <button
            onClick={fetchResumeMonitoring}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-slate-700
              bg-slate-900
              px-4
              py-2.5
              text-sm
              font-semibold
              hover:border-cyan-500/50
              hover:text-cyan-300
              transition
            "
          >

            <RefreshCw size={17} />

            Refresh

          </button>

        </div>


        {/* STATISTICS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5">

          <StatCard
            icon={<FileText />}
            title="Total Resumes"
            value={stats.total_resumes}
          />

          <StatCard
            icon={<CheckCircle2 />}
            title="Parsed Successfully"
            value={stats.parsed_resumes}
          />

          <StatCard
            icon={<AlertTriangle />}
            title="Parsing Issues"
            value={stats.parsing_issues}
          />

          <StatCard
            icon={<Upload />}
            title="Uploaded Today"
            value={stats.resumes_today}
          />

          <StatCard
            icon={<CalendarDays />}
            title="Last 7 Days"
            value={stats.resumes_last_7_days}
          />

        </div>


        {/* SEARCH */}

        <div className="
          rounded-2xl
          border
          border-slate-800
          bg-slate-900/70
          p-4
        ">

          <div className="relative">

            <Search
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-500
              "
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search resume, email or phone..."
              className="
                w-full
                rounded-xl
                border
                border-slate-700
                bg-slate-950
                py-3
                pl-11
                pr-4
                text-sm
                text-white
                outline-none
                focus:border-cyan-500
              "
            />

          </div>

        </div>


        {/* RESUME TABLE */}

        <div className="
          overflow-hidden
          rounded-2xl
          border
          border-slate-800
          bg-slate-900/70
        ">

          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead className="bg-slate-950">

                <tr className="text-left text-slate-400">

                  <th className="px-5 py-4">
                    Resume
                  </th>

                  <th className="px-5 py-4">
                    Email
                  </th>

                  <th className="px-5 py-4">
                    Phone
                  </th>

                  <th className="px-5 py-4">
                    Skills
                  </th>

                  <th className="px-5 py-4">
                    ATS
                  </th>

                  <th className="px-5 py-4">
                    Status
                  </th>

                  <th className="px-5 py-4">
                    Uploaded
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredResumes.length === 0 ? (

                  <tr>

                    <td
                      colSpan="7"
                      className="
                        px-5
                        py-12
                        text-center
                        text-slate-500
                      "
                    >

                      No resumes found.

                    </td>

                  </tr>

                ) : (

                  filteredResumes.map((resume) => (

                    <tr
                      key={resume.id}
                      className="
                        border-t
                        border-slate-800
                        hover:bg-slate-800/40
                        transition
                      "
                    >

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">

                          <div className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            bg-cyan-500/10
                            text-cyan-400
                          ">

                            <FileText size={19} />

                          </div>

                          <div>

                            <p className="font-semibold text-white">
                              {resume.file_name}
                            </p>

                            <p className="text-xs text-slate-500">
                              Resume #{resume.id}
                            </p>

                          </div>

                        </div>

                      </td>


                      <td className="px-5 py-4 text-slate-300">

                        {resume.extracted_email || "Not found"}

                      </td>


                      <td className="px-5 py-4 text-slate-300">

                        {resume.extracted_phone || "Not found"}

                      </td>


                      <td className="px-5 py-4">

                        <div className="flex flex-wrap gap-1.5 max-w-xs">

                          {resume.skills?.length ? (

                            resume.skills
                              .slice(0, 4)
                              .map((skill, index) => (

                                <span
                                  key={index}
                                  className="
                                    rounded-lg
                                    bg-violet-500/10
                                    px-2
                                    py-1
                                    text-xs
                                    text-violet-300
                                  "
                                >
                                  {skill}
                                </span>

                              ))

                          ) : (

                            <span className="text-slate-500">
                              No skills
                            </span>

                          )}

                        </div>

                      </td>


                      <td className="px-5 py-4">

                        <span className="font-bold text-cyan-400">

                          {resume.ats_score}%

                        </span>

                      </td>


                      <td className="px-5 py-4">

                        {resume.status === "Parsed" ? (

                          <span className="
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-full
                            bg-emerald-500/10
                            px-3
                            py-1.5
                            text-xs
                            font-semibold
                            text-emerald-400
                          ">

                            <CheckCircle2 size={14} />

                            Parsed

                          </span>

                        ) : (

                          <span className="
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-full
                            bg-red-500/10
                            px-3
                            py-1.5
                            text-xs
                            font-semibold
                            text-red-400
                          ">

                            <AlertTriangle size={14} />

                            Parsing Issue

                          </span>

                        )}

                      </td>


                      <td className="
                        px-5
                        py-4
                        whitespace-nowrap
                        text-slate-400
                      ">

                        {resume.uploaded_at
                          ? new Date(
                              resume.uploaded_at
                            ).toLocaleString()
                          : "-"
                        }

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>

  );
}


function StatCard({
  icon,
  title,
  value,
}) {

  return (

    <div className="
      rounded-2xl
      border
      border-slate-800
      bg-slate-900/70
      p-5
    ">

      <div className="
        flex
        items-center
        justify-between
      ">

        <div>

          <p className="text-sm text-slate-400">
            {title}
          </p>

          <h2 className="
            mt-2
            text-3xl
            font-black
            text-white
          ">
            {value}
          </h2>

        </div>

        <div className="
          rounded-xl
          bg-cyan-500/10
          p-3
          text-cyan-400
        ">

          {icon}

        </div>

      </div>

    </div>

  );
}

export default ResumeMonitoring;