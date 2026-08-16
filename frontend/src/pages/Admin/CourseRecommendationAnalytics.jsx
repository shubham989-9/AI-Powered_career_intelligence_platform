import { useEffect, useState } from "react";

import api from "../../api";

import {
  RefreshCw,
  Search,
  Activity,
  BookOpen,
  Target,
  TrendingUp,
  UserRound,
  FileText,
  BriefcaseBusiness,
  CalendarDays,
  Brain,
} from "lucide-react";


function CourseRecommendationAnalytics() {

  const [data, setData] = useState({
    statistics: {
      total_analyses: 0,
      total_courses: 0,
      average_missing_skills: 0,
    },

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
        "/admin/course-recommendation/overview",
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
        "Admin Course Recommendation Error:",
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


  const stats =
    data.statistics || {};


  return (

    <div className="
      min-h-screen
      bg-[#050816]
      px-5
      py-7
      text-white
      sm:px-7
      lg:px-10
    ">

      <div className="
        mx-auto
        max-w-[1500px]
      ">


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="
          mb-8
          flex
          flex-col
          gap-5
          lg:flex-row
          lg:items-end
          lg:justify-between
        ">

          <div>

            <div className="
              mb-3
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-violet-400/20
              bg-violet-400/[0.06]
              px-3
              py-1.5
            ">

              <Brain
                size={13}
                className="text-violet-300"
              />

              <span className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-violet-300
              ">

                Learning Intelligence

              </span>

            </div>


            <h1 className="
              text-3xl
              font-black
              tracking-tight
              sm:text-4xl
            ">

              Course Recommendation Analytics

            </h1>


            <p className="
              mt-2
              max-w-2xl
              text-sm
              leading-6
              text-slate-400
            ">

              Monitor course recommendation activity,
              identify common skill gaps and understand
              platform-wide learning requirements.

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
              hover:border-violet-400/30
              hover:bg-violet-400/10
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

        <div className="
          mb-7
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          xl:grid-cols-3
        ">


          <StatCard
            title="Total Analyses"
            value={
              stats.total_analyses || 0
            }
            subtitle="Course recommendation sessions"
            icon={Activity}
          />


          <StatCard
            title="Courses Recommended"
            value={
              stats.total_courses || 0
            }
            subtitle="Across all analyses"
            icon={BookOpen}
            positive
          />


          <StatCard
            title="Average Missing Skills"
            value={
              stats.average_missing_skills || 0
            }
            subtitle="Skills per recommendation"
            icon={Target}
            danger
          />

        </div>


        {/* =================================================
            TOP MISSING SKILLS
        ================================================= */}

        <div className="
          mb-7
          rounded-2xl
          border
          border-white/[0.08]
          bg-[#0b1023]
          p-5
          sm:p-6
        ">

          <div className="
            mb-5
            flex
            items-center
            justify-between
          ">

            <div>

              <h2 className="
                text-lg
                font-bold
              ">

                Most Recommended Learning Areas

              </h2>


              <p className="
                mt-1
                text-xs
                text-slate-500
              ">

                Skills most frequently identified as missing

              </p>

            </div>


            <TrendingUp
              size={20}
              className="text-violet-400"
            />

          </div>


          {data.top_missing_skills &&
          data.top_missing_skills.length > 0 ? (

            <div className="
              grid
              grid-cols-1
              gap-3
              md:grid-cols-2
              xl:grid-cols-5
            ">

              {data.top_missing_skills.map(
                (item, index) => (

                  <div
                    key={`${item.skill}-${index}`}
                    className="
                      rounded-xl
                      border
                      border-violet-400/10
                      bg-violet-400/[0.04]
                      p-4
                    "
                  >

                    <div className="
                      flex
                      items-center
                      justify-between
                      gap-3
                    ">

                      <span className="
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
                      ">

                        {index + 1}

                      </span>


                      <span className="
                        rounded-full
                        bg-violet-400/10
                        px-2.5
                        py-1
                        text-[10px]
                        font-bold
                        text-violet-300
                      ">

                        {item.count}

                      </span>

                    </div>


                    <p className="
                      mt-4
                      truncate
                      text-sm
                      font-semibold
                      text-slate-200
                    ">

                      {item.skill}

                    </p>


                    <p className="
                      mt-1
                      text-[10px]
                      text-slate-600
                    ">

                      recommendation sessions

                    </p>

                  </div>

                )
              )}

            </div>

          ) : (

            <div className="
              rounded-xl
              border
              border-dashed
              border-white/[0.08]
              px-4
              py-8
              text-center
              text-xs
              text-slate-600
            ">

              No skill recommendation data available yet.

            </div>

          )}

        </div>


        {/* =================================================
            SEARCH
        ================================================= */}

        <div className="
          mb-7
          rounded-2xl
          border
          border-white/[0.08]
          bg-[#15112d]
          p-4
        ">

          <div className="
            relative
          ">

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
              onChange={(e) =>
                setSearch(e.target.value)
              }
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
                focus:border-violet-400/40
              "
            />

          </div>

        </div>


        {/* =================================================
            RECENT ANALYSES
        ================================================= */}

        <div className="
          overflow-hidden
          rounded-2xl
          border
          border-white/[0.08]
          bg-[#15112d]
        ">


          <div className="
            border-b
            border-white/[0.08]
            px-5
            py-5
          ">

            <h2 className="
              text-lg
              font-bold
            ">

              Recent Course Recommendations

            </h2>


            <p className="
              mt-1
              text-xs
              text-slate-500
            ">

              Latest platform learning recommendation activity

            </p>

          </div>


          {loading ? (

            <div className="
              flex
              min-h-[250px]
              items-center
              justify-center
              gap-3
              text-sm
              text-slate-500
            ">

              <RefreshCw
                size={18}
                className="animate-spin"
              />

              Loading analytics...

            </div>

          ) : data.recent_analyses &&
            data.recent_analyses.length === 0 ? (

            <div className="
              flex
              min-h-[250px]
              flex-col
              items-center
              justify-center
              text-center
            ">

              <Brain
                size={36}
                className="text-slate-700"
              />


              <p className="
                mt-3
                text-sm
                font-semibold
                text-slate-400
              ">

                No course recommendations found

              </p>


              <p className="
                mt-1
                text-xs
                text-slate-600
              ">

                Records will appear here when students
                use Course Recommendation.

              </p>

            </div>

          ) : (

            <div className="
              overflow-x-auto
            ">

              <table className="
                w-full
                min-w-[1150px]
                text-left
              ">

                <thead>

                  <tr className="
                    border-b
                    border-white/[0.08]
                    text-xs
                    uppercase
                    tracking-wider
                    text-slate-500
                  ">

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
                      Missing Skills
                    </th>

                    <th className="px-5 py-4">
                      Courses
                    </th>

                    <th className="px-5 py-4">
                      Date
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {data.recent_analyses.map(
                    (analysis) => (

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

                        <td className="
                          px-5
                          py-5
                        ">

                          <div className="
                            flex
                            items-center
                            gap-3
                          ">

                            <div className="
                              flex
                              h-9
                              w-9
                              shrink-0
                              items-center
                              justify-center
                              rounded-lg
                              bg-violet-400/10
                              text-violet-300
                            ">

                              <UserRound
                                size={16}
                              />

                            </div>


                            <div>

                              <p className="
                                text-sm
                                font-semibold
                                text-slate-200
                              ">

                                {analysis.user_name ||
                                  "Unknown User"}

                              </p>


                              <p className="
                                mt-1
                                text-xs
                                text-slate-600
                              ">

                                {analysis.user_email ||
                                  "No email"}

                              </p>

                            </div>

                          </div>

                        </td>


                        {/* RESUME */}

                        <td className="
                          px-5
                          py-5
                        ">

                          <div className="
                            flex
                            items-center
                            gap-2
                            text-sm
                            text-slate-300
                          ">

                            <FileText
                              size={15}
                              className="text-pink-400"
                            />

                            Resume #
                            {analysis.resume_id}

                          </div>

                        </td>


                        {/* JOB */}

                        <td className="
                          px-5
                          py-5
                        ">

                          <div className="
                            flex
                            items-center
                            gap-2
                            text-sm
                            text-slate-300
                          ">

                            <BriefcaseBusiness
                              size={15}
                              className="text-fuchsia-400"
                            />

                            Job #
                            {analysis.job_description_id}

                          </div>

                        </td>


                        {/* MISSING SKILLS */}

                        <td className="
                          max-w-[300px]
                          px-5
                          py-5
                        ">

                          <SkillTags
                            skills={
                              analysis.missing_skills
                            }
                          />

                        </td>


                        {/* COURSES */}

                        <td className="
                          px-5
                          py-5
                        ">

                          <div className="
                            flex
                            items-center
                            gap-2
                          ">

                            <span className="
                              inline-flex
                              items-center
                              gap-2
                              rounded-lg
                              border
                              border-emerald-400/15
                              bg-emerald-400/[0.05]
                              px-3
                              py-1.5
                              text-xs
                              font-bold
                              text-emerald-400
                            ">

                              <BookOpen
                                size={13}
                              />

                              {analysis.total_courses || 0}

                            </span>

                          </div>

                        </td>


                        {/* DATE */}

                        <td className="
                          px-5
                          py-5
                        ">

                          <div className="
                            flex
                            items-center
                            gap-2
                            whitespace-nowrap
                            text-xs
                            text-slate-500
                          ">

                            <CalendarDays
                              size={14}
                            />

                            {formatDate(
                              analysis.created_at
                            )}

                          </div>

                        </td>

                      </tr>

                    )
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
    "bg-violet-400/10 text-violet-300";


  if (positive) {

    iconClass =
      "bg-emerald-400/10 text-emerald-400";

  }


  if (danger) {

    iconClass =
      "bg-red-400/10 text-red-400";

  }


  return (

    <div className="
      rounded-2xl
      border
      border-white/[0.08]
      bg-[#15112d]
      p-5
    ">

      <div className="
        flex
        items-start
        justify-between
      ">

        <div>

          <p className="
            text-sm
            text-slate-400
          ">

            {title}

          </p>


          <p className="
            mt-3
            text-3xl
            font-black
          ">

            {value}

          </p>


          <p className="
            mt-1
            text-xs
            text-slate-600
          ">

            {subtitle}

          </p>

        </div>


        <div className={`
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          ${iconClass}
        `}>

          <Icon size={20} />

        </div>

      </div>

    </div>

  );
}


// =========================================================
// SKILL TAGS
// =========================================================

function SkillTags({
  skills,
}) {

  const list =
    Array.isArray(skills)
      ? skills
      : [];


  if (list.length === 0) {

    return (
      <span className="
        text-xs
        text-slate-600
      ">

        None

      </span>
    );

  }


  return (

    <div className="
      flex
      max-w-[280px]
      flex-wrap
      gap-1.5
    ">

      {list
        .slice(0, 4)
        .map((skill, index) => (

          <span
            key={`${skill}-${index}`}
            className="
              rounded-md
              border
              border-violet-400/10
              bg-violet-400/[0.05]
              px-2
              py-1
              text-[10px]
              font-medium
              text-violet-300
            "
          >

            {skill}

          </span>

        ))}


      {list.length > 4 && (

        <span className="
          rounded-md
          bg-white/[0.04]
          px-2
          py-1
          text-[10px]
          text-slate-500
        ">

          +{list.length - 4}

        </span>

      )}

    </div>

  );

}


export default CourseRecommendationAnalytics;