import { useEffect, useState } from "react";

import api from "../../api";

import {
  RefreshCw,
  Search,
  BriefcaseBusiness,
  Target,
  Trophy,
  Activity,
  UserRound,
  FileText,
  CalendarDays,
  TrendingUp,
  BarChart3,
  Sparkles,
} from "lucide-react";


function AdminJobRecommendationAnalytics() {

  const [data, setData] = useState({
    statistics: {
      total_analyses: 0,
      total_recommendations: 0,
      average_match: 0,
      highest_match: 0,
    },

    top_jobs: [],

    recent_recommendations: [],
  });


  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);


  // =====================================================
  // FETCH DATA
  // =====================================================

  const fetchData = async () => {

    try {

      setLoading(true);

      const response = await api.get(
        "/admin/job-recommendation/overview",
        {
          params: {
            search,
          },
        }
      );

      setData(response.data);

    } catch (error) {

      console.error(
        "Job Recommendation Analytics Error:",
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

    return () => clearTimeout(timer);

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
  // MATCH STYLE
  // =====================================================

  const getMatchStyle = (score) => {

    if (score >= 80) {

      return {
        text: "text-emerald-400",
        bg: "bg-emerald-400/10",
        border: "border-emerald-400/20",
        label: "Excellent",
      };

    }


    if (score >= 60) {

      return {
        text: "text-cyan-400",
        bg: "bg-cyan-400/10",
        border: "border-cyan-400/20",
        label: "Strong",
      };

    }


    if (score >= 40) {

      return {
        text: "text-amber-400",
        bg: "bg-amber-400/10",
        border: "border-amber-400/20",
        label: "Moderate",
      };

    }


    return {

      text: "text-red-400",
      bg: "bg-red-400/10",
      border: "border-red-400/20",
      label: "Developing",

    };

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
              border-cyan-400/20
              bg-cyan-400/[0.06]
              px-3
              py-1.5
            ">

              <BriefcaseBusiness
                size={13}
                className="text-cyan-300"
              />

              <span className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-cyan-300
              ">

                Job Intelligence

              </span>

            </div>


            <h1 className="
              text-3xl
              font-black
              tracking-tight
              sm:text-4xl
            ">

              Job Recommendation Analytics

            </h1>


            <p className="
              mt-2
              max-w-2xl
              text-sm
              leading-6
              text-slate-400
            ">

              Monitor recommended job roles,
              candidate-job alignment and
              platform-wide recommendation activity.

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

        <div className="
          mb-7
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          xl:grid-cols-4
        ">


          <StatCard
            title="Recommendation Sessions"
            value={
              stats.total_analyses || 0
            }
            subtitle="Student recommendation requests"
            icon={Activity}
          />


          <StatCard
            title="Total Jobs Recommended"
            value={
              stats.total_recommendations || 0
            }
            subtitle="Generated job recommendations"
            icon={BriefcaseBusiness}
          />


          <StatCard
            title="Average Match"
            value={`${stats.average_match || 0}%`}
            subtitle="Average candidate-job alignment"
            icon={Target}
            positive
          />


          <StatCard
            title="Highest Match"
            value={`${stats.highest_match || 0}%`}
            subtitle="Best recommendation match"
            icon={Trophy}
            positive
          />

        </div>


        {/* =================================================
            ANALYTICS GRID
        ================================================= */}

        <div className="
          mb-7
          grid
          grid-cols-1
          gap-5
          xl:grid-cols-2
        ">


          {/* =================================================
              TOP JOBS
          ================================================= */}

          <div className="
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
              items-start
              justify-between
            ">

              <div className="
                flex
                items-start
                gap-3
              ">

                <div className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-cyan-400/10
                  text-cyan-300
                ">

                  <BarChart3 size={18} />

                </div>


                <div>

                  <h2 className="
                    text-base
                    font-bold
                  ">

                    Most Recommended Jobs

                  </h2>


                  <p className="
                    mt-1
                    text-xs
                    text-slate-500
                  ">

                    Job roles most frequently recommended
                    to students

                  </p>

                </div>

              </div>


              <TrendingUp
                size={19}
                className="text-cyan-400"
              />

            </div>


            {data.top_jobs.length === 0 ? (

              <EmptyState />

            ) : (

              <div className="
                space-y-3
              ">

                {data.top_jobs.map(
                  (job, index) => (

                  <div
                    key={`${job.job_title}-${index}`}
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

                    <div className="
                      flex
                      items-center
                      gap-3
                    ">

                      <span className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-lg
                        bg-cyan-400/10
                        text-xs
                        font-bold
                        text-cyan-300
                      ">

                        {index + 1}

                      </span>


                      <div>

                        <p className="
                          text-sm
                          font-semibold
                          text-slate-200
                        ">

                          {job.job_title}

                        </p>

                      </div>

                    </div>


                    <span className="
                      rounded-full
                      bg-white/[0.04]
                      px-3
                      py-1.5
                      text-[10px]
                      font-bold
                      text-slate-400
                    ">

                      {job.count} recommendations

                    </span>

                  </div>

                ))}

              </div>

            )}

          </div>


          {/* =================================================
              PLATFORM INSIGHT
          ================================================= */}

          <div className="
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
              items-start
              gap-3
            ">

              <div className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-violet-400/10
                text-violet-300
              ">

                <Sparkles size={18} />

              </div>


              <div>

                <h2 className="
                  text-base
                  font-bold
                ">

                  Recommendation Insights

                </h2>


                <p className="
                  mt-1
                  text-xs
                  text-slate-500
                ">

                  Platform-wide recommendation performance

                </p>

              </div>

            </div>


            <div className="
              grid
              grid-cols-2
              gap-3
            ">

              <InsightCard
                title="Sessions"
                value={stats.total_analyses || 0}
                icon={Activity}
              />


              <InsightCard
                title="Jobs Generated"
                value={
                  stats.total_recommendations || 0
                }
                icon={BriefcaseBusiness}
              />


              <InsightCard
                title="Average Match"
                value={`${stats.average_match || 0}%`}
                icon={Target}
              />


              <InsightCard
                title="Best Match"
                value={`${stats.highest_match || 0}%`}
                icon={Trophy}
              />

            </div>

          </div>

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
                Search user, email or job title...
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
            RECENT RECOMMENDATIONS
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

              Recent Job Recommendations

            </h2>


            <p className="
              mt-1
              text-xs
              text-slate-500
            ">

              Latest student job recommendation activity

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

          ) : data.recent_recommendations.length === 0 ? (

            <div className="
              flex
              min-h-[250px]
              flex-col
              items-center
              justify-center
              text-center
            ">

              <BriefcaseBusiness
                size={36}
                className="text-slate-700"
              />


              <p className="
                mt-3
                text-sm
                font-semibold
                text-slate-400
              ">

                No recommendations found

              </p>


              <p className="
                mt-1
                text-xs
                text-slate-600
              ">

                Job recommendations will appear
                here when students use the feature.

              </p>

            </div>

          ) : (

            <div className="
              overflow-x-auto
            ">

              <table className="
                w-full
                min-w-[1250px]
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
                      Top Job
                    </th>

                    <th className="px-5 py-4">
                      Match
                    </th>

                    <th className="px-5 py-4">
                      Jobs
                    </th>

                    <th className="px-5 py-4">
                      Resume
                    </th>

                    <th className="px-5 py-4">
                      Date
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {data.recent_recommendations.map(
                    (analysis) => {

                    const style =
                      getMatchStyle(
                        analysis.top_match_percentage
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
                              bg-cyan-400/10
                              text-cyan-300
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


                        {/* JOB */}

                        <td className="
                          px-5
                          py-5
                        ">

                          <div className="
                            flex
                            items-center
                            gap-2
                          ">

                            <BriefcaseBusiness
                              size={16}
                              className="
                                text-cyan-400
                              "
                            />


                            <span className="
                              whitespace-nowrap
                              text-sm
                              font-bold
                              text-slate-200
                            ">

                              {analysis.top_job_title ||
                                "Unknown Job"}

                            </span>

                          </div>

                        </td>


                        {/* MATCH */}

                        <td className="
                          px-5
                          py-5
                        ">

                          <div className="
                            flex
                            items-center
                            gap-2
                          ">

                            <span className={`
                              rounded-lg
                              border
                              px-3
                              py-1.5
                              text-xs
                              font-bold
                              ${style.bg}
                              ${style.border}
                              ${style.text}
                            `}>

                              {analysis.top_match_percentage}%

                            </span>


                            <span className={`
                              text-[10px]
                              font-semibold
                              ${style.text}
                            `}>

                              {style.label}

                            </span>

                          </div>

                        </td>


                        {/* TOTAL JOBS */}

                        <td className="
                          px-5
                          py-5
                        ">

                          <span className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            bg-violet-400/10
                            px-3
                            py-1.5
                            text-xs
                            font-semibold
                            text-violet-300
                          ">

                            <BriefcaseBusiness
                              size={13}
                            />

                            {analysis.total_recommendations}

                          </span>

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
                            text-slate-400
                          ">

                            <FileText
                              size={15}
                              className="
                                text-pink-400
                              "
                            />

                            #{analysis.resume_id}

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

                    );

                  })}

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
}) {

  const iconClass = positive
    ? "bg-emerald-400/10 text-emerald-400"
    : "bg-cyan-400/10 text-cyan-300";


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
// INSIGHT CARD
// =========================================================

function InsightCard({
  title,
  value,
  icon: Icon,
}) {

  return (

    <div className="
      rounded-xl
      border
      border-white/[0.07]
      bg-white/[0.02]
      p-4
    ">

      <div className="
        flex
        items-center
        justify-between
      ">

        <div>

          <p className="
            text-sm
            font-semibold
            text-slate-200
          ">

            {title}

          </p>


          <p className="
            mt-1
            text-xs
            text-slate-600
          ">

            Platform metric

          </p>

        </div>


        <div className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-lg
          bg-cyan-400/10
          text-cyan-300
        ">

          <Icon size={16} />

        </div>

      </div>


      <p className="
        mt-5
        text-2xl
        font-black
        text-cyan-400
      ">

        {value}

      </p>

    </div>

  );

}


// =========================================================
// EMPTY STATE
// =========================================================

function EmptyState() {

  return (

    <div className="
      flex
      min-h-[170px]
      items-center
      justify-center
      rounded-xl
      border
      border-dashed
      border-white/[0.08]
      text-xs
      text-slate-600
    ">

      No analytics data available yet.

    </div>

  );

}


export default AdminJobRecommendationAnalytics;