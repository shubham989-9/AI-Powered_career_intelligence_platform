import { useEffect, useState } from "react";

import api from "../../api";

import {
  RefreshCw,
  Search,
  Brain,
  Target,
  Trophy,
  Activity,
  TrendingUp,
  UserRound,
  FileText,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  BarChart3,
} from "lucide-react";


function AdminCareerRecommendationAnalytics() {

  const [data, setData] = useState({
    statistics: {
      total_analyses: 0,
      average_match: 0,
      highest_match: 0,
    },

    top_careers: [],

    growth_outlook: [],

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
        "/admin/career-recommendation/overview",
        {
          params: {
            search,
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
        "Career Recommendation Analytics Error:",
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
                border-violet-400/20
                bg-violet-400/[0.06]
                px-3
                py-1.5
              "
            >

              <Brain
                size={13}
                className="text-violet-300"
              />

              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-violet-300
                "
              >
                Career Intelligence
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
              Career Recommendation Analytics
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
              Monitor recommended career paths,
              candidate career alignment and
              platform-wide recommendation trends.
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

        <div
          className="
            mb-7
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            xl:grid-cols-3
          "
        >

          <StatCard
            title="Total Analyses"
            value={
              stats.total_analyses || 0
            }
            subtitle="Career recommendations"
            icon={Activity}
          />


          <StatCard
            title="Average Match"
            value={`${stats.average_match || 0}%`}
            subtitle="Average career alignment"
            icon={Target}
            positive
          />


          <StatCard
            title="Highest Match"
            value={`${stats.highest_match || 0}%`}
            subtitle="Best career alignment"
            icon={Trophy}
            positive
          />

        </div>


        {/* =================================================
            ANALYTICS GRID
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

          {/* =================================================
              TOP CAREERS
          ================================================= */}

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
                justify-between
              "
            >

              <div
                className="
                  flex
                  items-start
                  gap-3
                "
              >

                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-violet-400/10
                    text-violet-300
                  "
                >

                  <BarChart3
                    size={18}
                  />

                </div>


                <div>

                  <h2
                    className="
                      text-base
                      font-bold
                    "
                  >
                    Most Recommended Careers
                  </h2>


                  <p
                    className="
                      mt-1
                      text-xs
                      text-slate-500
                    "
                  >
                    Career paths selected by the recommendation engine
                  </p>

                </div>

              </div>


              <TrendingUp
                size={19}
                className="text-violet-400"
              />

            </div>


            {data.top_careers.length === 0 ? (

              <EmptyState />

            ) : (

              <div
                className="
                  space-y-3
                "
              >

                {data.top_careers.map(
                  (career, index) => (

                    <div
                      key={`${career.career}-${index}`}
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
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-lg
                            bg-violet-400/10
                            text-xs
                            font-bold
                            text-violet-300
                          "
                        >
                          {index + 1}
                        </span>


                        <span
                          className="
                            text-sm
                            font-semibold
                            text-slate-200
                          "
                        >
                          {career.career}
                        </span>

                      </div>


                      <span
                        className="
                          rounded-full
                          bg-white/[0.04]
                          px-3
                          py-1.5
                          text-[10px]
                          font-bold
                          text-slate-400
                        "
                      >
                        {career.count} recommendations
                      </span>

                    </div>

                  )
                )}

              </div>

            )}

          </div>


          {/* =================================================
              GROWTH OUTLOOK
          ================================================= */}

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
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-emerald-400/10
                  text-emerald-400
                "
              >

                <TrendingUp
                  size={18}
                />

              </div>


              <div>

                <h2
                  className="
                    text-base
                    font-bold
                  "
                >
                  Growth Outlook
                </h2>


                <p
                  className="
                    mt-1
                    text-xs
                    text-slate-500
                  "
                >
                  Career growth assessment distribution
                </p>

              </div>

            </div>


            {data.growth_outlook.length === 0 ? (

              <EmptyState />

            ) : (

              <div
                className="
                  grid
                  grid-cols-2
                  gap-3
                "
              >

                {data.growth_outlook.map(
                  (item, index) => (

                    <GrowthCard
                      key={`${item.label}-${index}`}
                      label={item.label}
                      count={item.count}
                    />

                  )
                )}

              </div>

            )}

          </div>

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
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="
                Search user, email or career...
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
              Recent Career Recommendations
            </h2>


            <p
              className="
                mt-1
                text-xs
                text-slate-500
              "
            >
              Latest recommendation activity
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

          ) : data.recent_analyses.length === 0 ? (

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
                No recommendations found
              </p>


              <p
                className="
                  mt-1
                  text-xs
                  text-slate-600
                "
              >
                Career recommendations will appear here
                when students use the feature.
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
                  min-w-[1200px]
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
                      Recommended Career
                    </th>

                    <th className="px-5 py-4">
                      Match
                    </th>

                    <th className="px-5 py-4">
                      Growth
                    </th>

                    <th className="px-5 py-4">
                      Alternatives
                    </th>

                    <th className="px-5 py-4">
                      Resume
                    </th>

                    <th className="px-5 py-4">
                      Job
                    </th>

                    <th className="px-5 py-4">
                      Date
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {data.recent_analyses.map(
                    (analysis) => {

                      const style =
                        getMatchStyle(
                          analysis.match_percentage
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
                                  bg-violet-400/10
                                  text-violet-300
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


                          {/* CAREER */}

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

                              <Brain
                                size={16}
                                className="
                                  text-violet-400
                                "
                              />


                              <span
                                className="
                                  whitespace-nowrap
                                  text-sm
                                  font-bold
                                  text-slate-200
                                "
                              >
                                {analysis.best_career}
                              </span>

                            </div>

                          </td>


                          {/* MATCH */}

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

                              <span
                                className={`
                                  rounded-lg
                                  border
                                  px-3
                                  py-1.5
                                  text-xs
                                  font-bold
                                  ${style.bg}
                                  ${style.border}
                                  ${style.text}
                                `}
                              >
                                {analysis.match_percentage}%
                              </span>


                              <span
                                className={`
                                  text-[10px]
                                  font-semibold
                                  ${style.text}
                                `}
                              >
                                {style.label}
                              </span>

                            </div>

                          </td>


                          {/* GROWTH */}

                          <td
                            className="
                              px-5
                              py-5
                            "
                          >

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

                              {analysis.growth_outlook}

                            </span>

                          </td>


                          {/* ALTERNATIVES */}

                          <td
                            className="
                              max-w-[250px]
                              px-5
                              py-5
                            "
                          >

                            <div
                              className="
                                flex
                                max-w-[240px]
                                flex-wrap
                                gap-1.5
                              "
                            >

                              {analysis.alternative_careers
                                ?.slice(0, 3)
                                .map(
                                  (career, index) => (

                                    <span
                                      key={`${career}-${index}`}
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
                                      {career}
                                    </span>

                                  )
                                )}

                              {(!analysis.alternative_careers ||
                                analysis.alternative_careers.length === 0) && (

                                <span
                                  className="
                                    text-xs
                                    text-slate-600
                                  "
                                >
                                  None
                                </span>

                              )}

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
                                text-slate-400
                              "
                            >

                              <FileText
                                size={15}
                                className="text-pink-400"
                              />

                              #{analysis.resume_id}

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
                                text-slate-400
                              "
                            >

                              <BriefcaseBusiness
                                size={15}
                                className="text-fuchsia-400"
                              />

                              #{analysis.job_description_id}

                            </div>

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
}) {

  const iconClass = positive
    ? "bg-emerald-400/10 text-emerald-400"
    : "bg-violet-400/10 text-violet-300";


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
// GROWTH CARD
// =========================================================

function GrowthCard({
  label,
  count,
}) {

  return (

    <div
      className="
        rounded-xl
        border
        border-white/[0.07]
        bg-white/[0.02]
        p-4
      "
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
            Recommendations
          </p>

        </div>


        <div
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            bg-emerald-400/10
            text-emerald-400
          "
        >

          <CheckCircle2
            size={16}
          />

        </div>

      </div>


      <p
        className="
          mt-5
          text-2xl
          font-black
          text-emerald-400
        "
      >
        {count}
      </p>

    </div>

  );

}


// =========================================================
// EMPTY STATE
// =========================================================

function EmptyState() {

  return (

    <div
      className="
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
      "
    >
      No analytics data available yet.
    </div>

  );

}


export default AdminCareerRecommendationAnalytics;