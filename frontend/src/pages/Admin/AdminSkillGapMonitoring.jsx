import { useEffect, useState } from "react";

import api from "../../api";

import {
  RefreshCw,
  Search,
  Activity,
  Target,
  Trophy,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  UserRound,
  FileText,
  BriefcaseBusiness,
  CalendarDays,
  Brain,
} from "lucide-react";


function AdminSkillGapMonitoring() {

  const [data, setData] = useState({
    statistics: {
      total_analyses: 0,
      average_match: 0,
      highest_match: 0,
      high_match: 0,
      medium_match: 0,
      low_match: 0,
    },

    top_matching_skills: [],

    top_missing_skills: [],

    recent_analyses: [],
  });


  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);


  // =====================================================
  // FETCH DATA
  // =====================================================

  const fetchData = async () => {

    try {

      setLoading(true);

      const token =
        localStorage.getItem("token");


      const response = await api.get(
        "/admin/skill-gap/overview",
        {
          params: {
            search: search,
          },

          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );


      setData(response.data);

    } catch (error) {

      console.error(
        "Admin Skill Gap Error:",
        error
      );

    } finally {

      setLoading(false);

    }
  };


  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {

    fetchData();

  }, []);


  // =====================================================
  // SEARCH
  // =====================================================

  useEffect(() => {

    const timer = setTimeout(() => {

      fetchData();

    }, 350);


    return () => {

      clearTimeout(timer);

    };

  }, [search]);


  // =====================================================
  // DATE FORMAT
  // =====================================================

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


  // =====================================================
  // SCORE STYLE
  // =====================================================

  const getScoreStyle = (score) => {

    if (score >= 80) {

      return {
        text: "text-emerald-400",
        bg: "bg-emerald-400/10",
        border: "border-emerald-400/20",
        label: "High",
      };

    }


    if (score >= 50) {

      return {
        text: "text-amber-400",
        bg: "bg-amber-400/10",
        border: "border-amber-400/20",
        label: "Medium",
      };

    }


    return {
      text: "text-red-400",
      bg: "bg-red-400/10",
      border: "border-red-400/20",
      label: "Low",
    };

  };


  const stats =
    data.statistics || {};


  return (

    <div
      className="
        min-h-screen
        bg-[#050816]
        px-5
        py-7
        text-white
        sm:px-7
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
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >

          <div>

            <div
              className="
                mb-3
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-cyan-400/20
                bg-cyan-400/[0.06]
                px-3
                py-1.5
              "
            >

              <Brain
                size={13}
                className="text-cyan-300"
              />

              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-cyan-300
                "
              >
                Skill Intelligence
              </span>

            </div>


            <h1
              className="
                text-3xl
                font-black
                tracking-tight
                sm:text-4xl
              "
            >
              Skill Gap Analytics
            </h1>


            <p
              className="
                mt-2
                max-w-2xl
                text-sm
                leading-6
                text-slate-400
              "
            >
              Monitor skill gap analyses,
              identify common skill deficiencies
              and understand platform-wide career readiness.
            </p>

          </div>


          {/* REFRESH */}

          <button
            type="button"
            onClick={fetchData}
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
              hover:border-cyan-400/30
              hover:bg-cyan-400/10
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
            title="Total Analyses"
            value={
              stats.total_analyses || 0
            }
            subtitle="Skill gap analyses"
            icon={Activity}
          />


          <StatCard
            title="Average Match"
            value={`${stats.average_match || 0}%`}
            subtitle="Platform average"
            icon={Target}
            positive
          />


          <StatCard
            title="Highest Match"
            value={`${stats.highest_match || 0}%`}
            subtitle="Best skill match"
            icon={Trophy}
            positive
          />


          <StatCard
            title="Low Match"
            value={
              stats.low_match || 0
            }
            subtitle="Needs improvement"
            icon={AlertTriangle}
            danger
          />

        </div>


        {/* =================================================
            MATCH DISTRIBUTION
        ================================================= */}

        <div
          className="
            mb-7
            rounded-2xl
            border
            border-white/[0.08]
            bg-[#0b1023]
            p-5
            sm:p-6
          "
        >

          <div
            className="
              mb-5
              flex
              items-center
              justify-between
            "
          >

            <div>

              <h2
                className="
                  text-lg
                  font-bold
                "
              >
                Match Distribution
              </h2>

              <p
                className="
                  mt-1
                  text-xs
                  text-slate-500
                "
              >
                Skill match performance across analyses
              </p>

            </div>


            <TrendingUp
              size={20}
              className="text-cyan-400"
            />

          </div>


          <div
            className="
              grid
              grid-cols-1
              gap-4
              md:grid-cols-3
            "
          >

            <DistributionCard
              label="High Match"
              description="80% and above"
              value={
                stats.high_match || 0
              }
              icon={CheckCircle2}
              type="high"
            />


            <DistributionCard
              label="Medium Match"
              description="50% - 79%"
              value={
                stats.medium_match || 0
              }
              icon={Activity}
              type="medium"
            />


            <DistributionCard
              label="Low Match"
              description="Below 50%"
              value={
                stats.low_match || 0
              }
              icon={XCircle}
              type="low"
            />

          </div>

        </div>


        {/* =================================================
            SKILL INSIGHTS
        ================================================= */}

        <div
          className="
            mb-7
            grid
            grid-cols-1
            gap-5
            xl:grid-cols-2
          "
        >

          {/* MATCHING */}

          <SkillListCard
            title="Most Matching Skills"
            subtitle="Skills frequently found in candidate resumes"
            icon={CheckCircle2}
            skills={
              data.top_matching_skills || []
            }
            positive
          />


          {/* MISSING */}

          <SkillListCard
            title="Most Missing Skills"
            subtitle="Skills candidates commonly need to improve"
            icon={AlertTriangle}
            skills={
              data.top_missing_skills || []
            }
            danger
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

                setSearch(
                  e.target.value
                );

              }}
              placeholder="
                Search user, email or skill...
              "
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
                focus:border-cyan-400/40
              "
            />

          </div>

        </div>


        {/* =================================================
            RECENT ANALYSES
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
              Recent Skill Gap Analyses
            </h2>


            <p
              className="
                mt-1
                text-xs
                text-slate-500
              "
            >
              Latest platform skill gap activity
            </p>

          </div>


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

              Loading analytics...

            </div>

          ) : (
            data.recent_analyses &&
            data.recent_analyses.length === 0
          ) ? (

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

              <Brain
                size={36}
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
                No skill gap analyses found
              </p>


              <p
                className="
                  mt-1
                  text-xs
                  text-slate-600
                "
              >
                Analyses will appear here when students
                use Skill Gap Analysis.
              </p>

            </div>

          ) : (

            <div
              className="
                overflow-x-auto
              "
            >

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
                      User
                    </th>

                    <th className="px-5 py-4">
                      Resume
                    </th>

                    <th className="px-5 py-4">
                      Job
                    </th>

                    <th className="px-5 py-4">
                      Match
                    </th>

                    <th className="px-5 py-4">
                      Matching Skills
                    </th>

                    <th className="px-5 py-4">
                      Missing Skills
                    </th>

                    <th className="px-5 py-4">
                      Date
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {data.recent_analyses.map(
                    (analysis) => {

                      const scoreStyle =
                        getScoreStyle(
                          analysis.skill_match_percentage
                        );


                      return (

                        <tr
                          key={analysis.id}
                          className="
                            border-b
                            border-white/[0.06]
                            transition
                            hover:bg-white/[0.025]
                          "
                        >

                          {/* USER */}

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
                                  h-9
                                  w-9
                                  shrink-0
                                  items-center
                                  justify-center
                                  rounded-lg
                                  bg-cyan-400/10
                                  text-cyan-300
                                "
                              >

                                <UserRound
                                  size={16}
                                />

                              </div>


                              <div>

                                <p
                                  className="
                                    text-sm
                                    font-semibold
                                    text-slate-200
                                  "
                                >
                                  {analysis.user_name ||
                                    "Unknown User"}
                                </p>


                                <p
                                  className="
                                    mt-1
                                    text-xs
                                    text-slate-600
                                  "
                                >
                                  {analysis.user_email ||
                                    "No email"}
                                </p>

                              </div>

                            </div>

                          </td>


                          {/* RESUME */}

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
                                text-sm
                                text-slate-300
                              "
                            >

                              <FileText
                                size={15}
                                className="text-pink-400"
                              />

                              Resume #
                              {analysis.resume_id}

                            </div>

                          </td>


                          {/* JOB */}

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
                                text-sm
                                text-slate-300
                              "
                            >

                              <BriefcaseBusiness
                                size={15}
                                className="text-fuchsia-400"
                              />

                              Job #
                              {analysis.job_description_id}

                            </div>

                          </td>


                          {/* MATCH */}

                          <td
                            className="
                              px-5
                              py-5
                            "
                          >

                            <div className="flex items-center gap-2">

                              <span
                                className={`
                                  inline-flex
                                  items-center
                                  rounded-lg
                                  border
                                  px-3
                                  py-1.5
                                  text-xs
                                  font-bold
                                  ${scoreStyle.bg}
                                  ${scoreStyle.border}
                                  ${scoreStyle.text}
                                `}
                              >
                                {
                                  analysis.skill_match_percentage
                                }%
                              </span>


                              <span
                                className={`
                                  text-[10px]
                                  font-semibold
                                  ${scoreStyle.text}
                                `}
                              >
                                {scoreStyle.label}
                              </span>

                            </div>

                          </td>


                          {/* MATCHING SKILLS */}

                          <td
                            className="
                              max-w-[240px]
                              px-5
                              py-5
                            "
                          >

                            <SkillTags
                              skills={
                                analysis.matching_skills
                              }
                              positive
                            />

                          </td>


                          {/* MISSING SKILLS */}

                          <td
                            className="
                              max-w-[240px]
                              px-5
                              py-5
                            "
                          >

                            <SkillTags
                              skills={
                                analysis.missing_skills
                              }
                              danger
                            />

                          </td>


                          {/* DATE */}

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

                              <CalendarDays
                                size={14}
                              />

                              {formatDate(
                                analysis.created_at
                              )}

                            </div>

                          </td>

                        </tr>

                      );

                    }
                  )}

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

  let iconClass =
    "bg-cyan-400/10 text-cyan-300";


  if (positive) {

    iconClass =
      "bg-emerald-400/10 text-emerald-400";

  }


  if (danger) {

    iconClass =
      "bg-red-400/10 text-red-400";

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
            ${iconClass}
          `}
        >

          <Icon size={20} />

        </div>

      </div>

    </div>

  );
}


// =========================================================
// DISTRIBUTION CARD
// =========================================================

function DistributionCard({
  label,
  description,
  value,
  icon: Icon,
  type,
}) {

  let classes = {
    wrapper:
      "border-white/[0.08] bg-white/[0.02]",
    icon:
      "bg-slate-400/10 text-slate-400",
    number:
      "text-white",
  };


  if (type === "high") {

    classes = {
      wrapper:
        "border-emerald-400/15 bg-emerald-400/[0.04]",
      icon:
        "bg-emerald-400/10 text-emerald-400",
      number:
        "text-emerald-400",
    };

  }


  if (type === "medium") {

    classes = {
      wrapper:
        "border-amber-400/15 bg-amber-400/[0.04]",
      icon:
        "bg-amber-400/10 text-amber-400",
      number:
        "text-amber-400",
    };

  }


  if (type === "low") {

    classes = {
      wrapper:
        "border-red-400/15 bg-red-400/[0.04]",
      icon:
        "bg-red-400/10 text-red-400",
      number:
        "text-red-400",
    };

  }


  return (

    <div
      className={`
        rounded-xl
        border
        p-4
        ${classes.wrapper}
      `}
    >

      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        <div>

          <p
            className="
              text-sm
              font-semibold
              text-slate-200
            "
          >
            {label}
          </p>


          <p
            className="
              mt-1
              text-xs
              text-slate-600
            "
          >
            {description}
          </p>

        </div>


        <div
          className={`
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            ${classes.icon}
          `}
        >

          <Icon size={17} />

        </div>

      </div>


      <p
        className={`
          mt-5
          text-3xl
          font-black
          ${classes.number}
        `}
      >
        {value}
      </p>

    </div>

  );
}


// =========================================================
// SKILL LIST CARD
// =========================================================

function SkillListCard({
  title,
  subtitle,
  icon: Icon,
  skills,
  positive = false,
  danger = false,
}) {

  let iconClass =
    "bg-cyan-400/10 text-cyan-300";

  if (positive) {

    iconClass =
      "bg-emerald-400/10 text-emerald-400";

  }

  if (danger) {

    iconClass =
      "bg-red-400/10 text-red-400";

  }


  return (

    <div
      className="
        rounded-2xl
        border
        border-white/[0.08]
        bg-[#0b1023]
        p-5
        sm:p-6
      "
    >

      <div
        className="
          mb-5
          flex
          items-start
          gap-3
        "
      >

        <div
          className={`
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            ${iconClass}
          `}
        >

          <Icon size={18} />

        </div>


        <div>

          <h2
            className="
              text-base
              font-bold
            "
          >
            {title}
          </h2>


          <p
            className="
              mt-1
              text-xs
              text-slate-500
            "
          >
            {subtitle}
          </p>

        </div>

      </div>


      {skills.length === 0 ? (

        <div
          className="
            rounded-xl
            border
            border-dashed
            border-white/[0.08]
            px-4
            py-8
            text-center
            text-xs
            text-slate-600
          "
        >
          No skill data available yet.
        </div>

      ) : (

        <div className="space-y-3">

          {skills.map(
            (item, index) => (

              <div
                key={`${item.skill}-${index}`}
                className="
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  border
                  border-white/[0.06]
                  bg-white/[0.02]
                  px-4
                  py-3
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <span
                    className="
                      flex
                      h-7
                      w-7
                      items-center
                      justify-center
                      rounded-lg
                      bg-white/[0.04]
                      text-[10px]
                      font-bold
                      text-slate-500
                    "
                  >
                    {index + 1}
                  </span>


                  <span
                    className="
                      text-sm
                      font-semibold
                      text-slate-300
                    "
                  >
                    {item.skill}
                  </span>

                </div>


                <span
                  className="
                    rounded-full
                    bg-white/[0.04]
                    px-2.5
                    py-1
                    text-[10px]
                    font-bold
                    text-slate-400
                  "
                >
                  {item.count} analyses
                </span>

              </div>

            )
          )}

        </div>

      )}

    </div>

  );
}


// =========================================================
// SKILL TAGS
// =========================================================

function SkillTags({
  skills,
  positive = false,
  danger = false,
}) {

  const list =
    Array.isArray(skills)
      ? skills
      : [];


  if (list.length === 0) {

    return (
      <span
        className="
          text-xs
          text-slate-600
        "
      >
        None
      </span>
    );

  }


  let tagClass =
    "border-white/[0.08] bg-white/[0.03] text-slate-400";


  if (positive) {

    tagClass =
      "border-emerald-400/10 bg-emerald-400/[0.05] text-emerald-300";

  }


  if (danger) {

    tagClass =
      "border-red-400/10 bg-red-400/[0.05] text-red-300";

  }


  return (

    <div
      className="
        flex
        max-w-[230px]
        flex-wrap
        gap-1.5
      "
    >

      {list.slice(0, 4).map(
        (skill, index) => (

          <span
            key={`${skill}-${index}`}
            className={`
              rounded-md
              border
              px-2
              py-1
              text-[10px]
              font-medium
              ${tagClass}
            `}
          >
            {skill}
          </span>

        )
      )}


      {list.length > 4 && (

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
          +{list.length - 4}
        </span>

      )}

    </div>

  );
}


export default AdminSkillGapMonitoring;