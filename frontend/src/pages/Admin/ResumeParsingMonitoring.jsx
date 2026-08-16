import { useEffect, useState } from "react";

import api from "../../api";

import {
  RefreshCw,
  Search,
  FileText,
  CheckCircle2,
  XCircle,
  Activity,
  UserRound,
  Mail,
  Clock3,
} from "lucide-react";


// =========================================================
// RESUME PARSING MONITORING
// =========================================================

function ResumeParsingMonitoring() {
  const [data, setData] = useState({
    statistics: {
      total_resumes: 0,
      successful_parsing: 0,
      failed_parsing: 0,
      success_rate: 0,
    },
    resumes: [],
  });

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);


  // =======================================================
  // FETCH DATA
  // =======================================================

  const fetchData = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await api.get(
        "/admin/resume-parsing/overview",
        {
          params: {
            search: search,
          },

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(response.data);
    } catch (error) {
      console.error(
        "Resume Parsing Monitoring Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };


  // =======================================================
  // INITIAL LOAD
  // =======================================================

  useEffect(() => {
    fetchData();
  }, []);


  // =======================================================
  // SEARCH
  // =======================================================

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 350);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);


  // =======================================================
  // STATISTICS
  // =======================================================

  const stats = data.statistics || {
    total_resumes: 0,
    successful_parsing: 0,
    failed_parsing: 0,
    success_rate: 0,
  };


  // =======================================================
  // FORMAT DATE
  // =======================================================

  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    try {
      return new Date(date).toLocaleString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      );
    } catch {
      return "—";
    }
  };


  // =======================================================
  // PAGE
  // =======================================================

  return (
    <div
      className="
        min-h-screen
        bg-[#050816]
        px-6
        py-8
        text-white
        lg:px-10
      "
    >

      <div
        className="
          mx-auto
          max-w-[1500px]
        "
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            mb-8
            flex
            flex-col
            gap-5
            md:flex-row
            md:items-end
            md:justify-between
          "
        >

          <div>

            <div
              className="
                mb-3
                flex
                items-center
                gap-2
                text-sm
                font-bold
                uppercase
                tracking-wider
                text-pink-400
              "
            >
              <Activity size={17} />

              Resume Monitoring
            </div>


            <h1
              className="
                text-3xl
                font-black
                tracking-tight
                md:text-4xl
              "
            >
              Resume Parsing Monitoring
            </h1>


            <p
              className="
                mt-2
                text-sm
                text-slate-400
              "
            >
              Monitor resume parsing activity,
              extraction status and platform performance.
            </p>

          </div>


          {/* REFRESH */}

          <button
            onClick={fetchData}
            type="button"
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-white/10
              bg-[#15112d]
              px-5
              py-3
              text-sm
              font-semibold
              text-slate-200
              transition
              hover:border-pink-400/30
              hover:bg-pink-500/10
            "
          >

            <RefreshCw
              size={16}
              className={
                loading
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh

          </button>

        </div>


        {/* =================================================
            STATISTICS
        ================================================= */}

        <div
          className="
            mb-7
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            xl:grid-cols-4
          "
        >

          <StatCard
            title="Total Resumes"
            value={stats.total_resumes}
            subtitle="Uploaded resumes"
            icon={FileText}
          />


          <StatCard
            title="Successfully Parsed"
            value={stats.successful_parsing}
            subtitle="Parsing completed"
            icon={CheckCircle2}
            positive={true}
          />


          <StatCard
            title="Failed Parsing"
            value={stats.failed_parsing}
            subtitle="Requires attention"
            icon={XCircle}
            danger={true}
          />


          <StatCard
            title="Parsing Success Rate"
            value={`${stats.success_rate}%`}
            subtitle="Overall platform rate"
            icon={Activity}
            positive={true}
          />

        </div>


        {/* =================================================
            SEARCH
        ================================================= */}

        <div
          className="
            mb-7
            rounded-2xl
            border
            border-white/[0.08]
            bg-[#15112d]
            p-4
          "
        >

          <div className="relative">

            <Search
              size={19}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-500
              "
            />


            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="Search resume, user or email..."
              className="
                w-full
                rounded-xl
                border
                border-white/[0.1]
                bg-[#0d0920]
                py-3
                pl-12
                pr-4
                text-sm
                text-white
                outline-none
                placeholder:text-slate-600
                focus:border-pink-400/40
              "
            />

          </div>

        </div>


        {/* =================================================
            TABLE CONTAINER
        ================================================= */}

        <div
          className="
            overflow-hidden
            rounded-2xl
            border
            border-white/[0.08]
            bg-[#15112d]
          "
        >

          {/* TABLE HEADER */}

          <div
            className="
              border-b
              border-white/[0.08]
              px-5
              py-5
            "
          >

            <h2
              className="
                text-lg
                font-bold
              "
            >
              Recent Parsed Resumes
            </h2>


            <p
              className="
                mt-1
                text-xs
                text-slate-500
              "
            >
              Latest resume parsing activity
            </p>

          </div>


          {/* =================================================
              LOADING
          ================================================= */}

          {loading ? (

            <div
              className="
                flex
                min-h-[250px]
                items-center
                justify-center
                gap-3
                text-sm
                text-slate-500
              "
            >

              <RefreshCw
                size={18}
                className="animate-spin"
              />

              Loading parsing data...

            </div>

          ) : data.resumes.length === 0 ? (

            /* =================================================
               EMPTY
            ================================================= */

            <div
              className="
                flex
                min-h-[250px]
                flex-col
                items-center
                justify-center
                text-center
              "
            >

              <FileText
                size={35}
                className="text-slate-700"
              />


              <p
                className="
                  mt-3
                  text-sm
                  font-semibold
                  text-slate-400
                "
              >
                No resumes found
              </p>


              <p
                className="
                  mt-1
                  text-xs
                  text-slate-600
                "
              >
                Try another search.
              </p>

            </div>

          ) : (

            /* =================================================
               TABLE
            ================================================= */

            <div className="overflow-x-auto">

              <table
                className="
                  w-full
                  min-w-[1100px]
                  text-left
                "
              >

                <thead>

                  <tr
                    className="
                      border-b
                      border-white/[0.08]
                      text-xs
                      uppercase
                      tracking-wider
                      text-slate-500
                    "
                  >

                    <th className="px-5 py-4">
                      Resume
                    </th>

                    <th className="px-5 py-4">
                      User
                    </th>

                    <th className="px-5 py-4">
                      Extracted Contact
                    </th>

                    <th className="px-5 py-4">
                      Skills
                    </th>

                    <th className="px-5 py-4">
                      Status
                    </th>

                    <th className="px-5 py-4">
                      Parsed Date
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {data.resumes.map((resume) => (

                    <tr
                      key={resume.id}
                      className="
                        border-b
                        border-white/[0.06]
                        transition
                        hover:bg-white/[0.025]
                      "
                    >

                      {/* =====================================
                          RESUME
                      ====================================== */}

                      <td
                        className="
                          px-5
                          py-5
                        "
                      >

                        <div
                          className="
                            flex
                            items-center
                            gap-3
                          "
                        >

                          <div
                            className="
                              flex
                              h-10
                              w-10
                              shrink-0
                              items-center
                              justify-center
                              rounded-xl
                              bg-pink-500/10
                              text-pink-400
                            "
                          >

                            <FileText size={18} />

                          </div>


                          <div>

                            <p
                              className="
                                max-w-[260px]
                                truncate
                                text-sm
                                font-semibold
                                text-white
                              "
                            >
                              {resume.file_name}
                            </p>


                            <p
                              className="
                                mt-1
                                text-xs
                                text-slate-600
                              "
                            >
                              Resume ID #{resume.id}
                            </p>

                          </div>

                        </div>

                      </td>


                      {/* =====================================
                          USER
                      ====================================== */}

                      <td
                        className="
                          px-5
                          py-5
                        "
                      >

                        <div
                          className="
                            flex
                            items-center
                            gap-2
                          "
                        >

                          <UserRound
                            size={15}
                            className="text-slate-500"
                          />


                          <div>

                            <p
                              className="
                                text-sm
                                font-semibold
                                text-slate-200
                              "
                            >
                              {resume.user_name || "Unknown User"}
                            </p>


                            <p
                              className="
                                text-xs
                                text-slate-600
                              "
                            >
                              ID #{resume.user_id}
                            </p>

                          </div>

                        </div>

                      </td>


                      {/* =====================================
                          CONTACT
                      ====================================== */}

                      <td
                        className="
                          px-5
                          py-5
                        "
                      >

                        <div
                          className="
                            space-y-1
                            text-xs
                          "
                        >

                          <div
                            className="
                              flex
                              items-center
                              gap-2
                              text-slate-400
                            "
                          >

                            <Mail size={13} />

                            {resume.extracted_email || "Not found"}

                          </div>


                          <div className="text-slate-600">

                            {resume.extracted_phone ||
                              "Phone not found"}

                          </div>

                        </div>

                      </td>


                      {/* =====================================
                          SKILLS
                      ====================================== */}

                      <td
                        className="
                          max-w-[260px]
                          px-5
                          py-5
                        "
                      >

                        <div
                          className="
                            flex
                            flex-wrap
                            gap-1.5
                          "
                        >

                          {Array.isArray(resume.skills) &&
                            resume.skills
                              .slice(0, 5)
                              .map((skill, index) => (

                                <span
                                  key={`${resume.id}-${index}`}
                                  className="
                                    rounded-md
                                    border
                                    border-cyan-400/10
                                    bg-cyan-400/[0.05]
                                    px-2
                                    py-1
                                    text-[10px]
                                    font-medium
                                    text-cyan-300
                                  "
                                >
                                  {skill}
                                </span>

                              ))}


                          {resume.skill_count > 5 && (

                            <span
                              className="
                                rounded-md
                                bg-white/[0.04]
                                px-2
                                py-1
                                text-[10px]
                                text-slate-500
                              "
                            >
                              +{resume.skill_count - 5}
                            </span>

                          )}

                        </div>

                      </td>


                      {/* =====================================
                          STATUS
                      ====================================== */}

                      <td
                        className="
                          px-5
                          py-5
                        "
                      >

                        {resume.status === "Parsed" ? (

                          <ParsedStatus />

                        ) : (

                          <FailedStatus />

                        )}

                      </td>


                      {/* =====================================
                          DATE
                      ====================================== */}

                      <td
                        className="
                          px-5
                          py-5
                        "
                      >

                        <div
                          className="
                            flex
                            items-center
                            gap-2
                            whitespace-nowrap
                            text-xs
                            text-slate-500
                          "
                        >

                          <Clock3 size={14} />

                          {formatDate(
                            resume.uploaded_at
                          )}

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}


// =========================================================
// PARSED STATUS
// =========================================================

function ParsedStatus() {
  return (
    <span
      className="
        inline-flex
        items-center
        gap-2
        rounded-full
        bg-emerald-400/10
        px-3
        py-1.5
        text-xs
        font-semibold
        text-emerald-400
      "
    >

      <span
        className="
          h-1.5
          w-1.5
          rounded-full
          bg-emerald-400
        "
      />

      Parsed

    </span>
  );
}


// =========================================================
// FAILED STATUS
// =========================================================

function FailedStatus() {
  return (
    <span
      className="
        inline-flex
        items-center
        gap-2
        rounded-full
        bg-red-400/10
        px-3
        py-1.5
        text-xs
        font-semibold
        text-red-400
      "
    >

      <span
        className="
          h-1.5
          w-1.5
          rounded-full
          bg-red-400
        "
      />

      Failed

    </span>
  );
}


// =========================================================
// STAT CARD
// =========================================================

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  positive = false,
  danger = false,
}) {

  let iconClassName =
    "bg-pink-500/10 text-pink-400";

  if (positive) {
    iconClassName =
      "bg-emerald-500/10 text-emerald-400";
  }

  if (danger) {
    iconClassName =
      "bg-red-500/10 text-red-400";
  }


  return (
    <div
      className="
        rounded-2xl
        border
        border-white/[0.08]
        bg-[#15112d]
        p-5
      "
    >

      <div
        className="
          flex
          items-start
          justify-between
        "
      >

        <div>

          <p
            className="
              text-sm
              text-slate-400
            "
          >
            {title}
          </p>


          <p
            className="
              mt-3
              text-3xl
              font-black
            "
          >
            {value}
          </p>


          <p
            className="
              mt-1
              text-xs
              text-slate-600
            "
          >
            {subtitle}
          </p>

        </div>


        <div
          className={`
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            ${iconClassName}
          `}
        >

          <Icon size={20} />

        </div>

      </div>

    </div>
  );
}


export default ResumeParsingMonitoring;