import { useEffect, useState } from "react";

import {
  Target,
  TrendingUp,
  Activity,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Search,
} from "lucide-react";

import api from "../../api";


function ATSMonitoring() {

  const [loading, setLoading] =
    useState(true);

  const [data, setData] = useState({

    statistics: {

      total_analyses: 0,

      average_score: 0,

      high_scores: 0,

      medium_scores: 0,

      low_scores: 0,
    },

    analyses: [],
  });


  const [search, setSearch] =
    useState("");


  const fetchATSMonitoring = async () => {

    try {

      setLoading(true);

      const token =
        localStorage.getItem("token");

      const response =
        await api.get(
          "/admin/ats/monitoring",
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
        "ATS Monitoring Error:",
        error
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    fetchATSMonitoring();

  }, []);


  const filteredAnalyses =
    data.analyses.filter(
      (item) => {

        const query =
          search
            .toLowerCase()
            .trim();

        if (!query) return true;

        return (

          item.resume?.file_name
            ?.toLowerCase()
            .includes(query) ||

          item.job?.job_title
            ?.toLowerCase()
            .includes(query) ||

          item.job?.company
            ?.toLowerCase()
            .includes(query) ||

          item.user?.name
            ?.toLowerCase()
            .includes(query) ||

          item.user?.email
            ?.toLowerCase()
            .includes(query)
        );
      }
    );


  if (loading) {

    return (

      <div className="
        min-h-screen
        bg-[#050816]
        flex
        items-center
        justify-center
        text-white
      ">

        <div className="
          flex
          items-center
          gap-3
          text-cyan-400
        ">

          <RefreshCw
            size={24}
            className="animate-spin"
          />

          Loading ATS Monitoring...

        </div>

      </div>
    );
  }


  const stats =
    data.statistics;


  return (

    <div className="
      min-h-screen
      bg-[#050816]
      text-white
      p-6
    ">

      <div className="
        max-w-7xl
        mx-auto
        space-y-8
      ">


        {/* HEADER */}

        <div className="
          flex
          flex-col
          md:flex-row
          md:items-center
          md:justify-between
          gap-4
        ">

          <div>

            <p className="
              text-cyan-400
              text-sm
              font-semibold
              uppercase
              tracking-wider
            ">
              Admin Monitoring
            </p>

            <h1 className="
              text-3xl
              md:text-4xl
              font-black
              mt-1
            ">
              ATS Score & Analysis
            </h1>

            <p className="
              text-slate-400
              mt-2
            ">
              Monitor ATS performance and
              resume-job compatibility.
            </p>

          </div>


          <button
            onClick={fetchATSMonitoring}
            className="
              inline-flex
              items-center
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

        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-5
          gap-5
        ">

          <StatCard
            icon={<Target />}
            title="Total Analyses"
            value={
              stats.total_analyses
            }
          />

          <StatCard
            icon={<TrendingUp />}
            title="Average ATS"
            value={
              `${stats.average_score}%`
            }
          />

          <StatCard
            icon={<CheckCircle2 />}
            title="High Scores"
            value={
              stats.high_scores
            }
          />

          <StatCard
            icon={<Activity />}
            title="Medium Scores"
            value={
              stats.medium_scores
            }
          />

          <StatCard
            icon={<AlertTriangle />}
            title="Low Scores"
            value={
              stats.low_scores
            }
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
              placeholder="
                Search resume, job, company or user...
              "
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


        {/* TABLE */}

        <div className="
          overflow-hidden
          rounded-2xl
          border
          border-slate-800
          bg-slate-900/70
        ">

          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead className="
                bg-slate-950
              ">

                <tr className="
                  text-left
                  text-slate-400
                ">

                  <th className="px-5 py-4">
                    Resume
                  </th>

                  <th className="px-5 py-4">
                    Job
                  </th>

                  <th className="px-5 py-4">
                    User
                  </th>

                  <th className="px-5 py-4">
                    ATS Score
                  </th>

                  <th className="px-5 py-4">
                    Match
                  </th>

                  <th className="px-5 py-4">
                    Status
                  </th>

                  <th className="px-5 py-4">
                    Date
                  </th>

                </tr>

              </thead>


              <tbody>

                {filteredAnalyses.length === 0 ? (

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

                      No ATS analyses found.

                    </td>

                  </tr>

                ) : (

                  filteredAnalyses.map(
                    (item) => (

                      <tr
                        key={item.id}
                        className="
                          border-t
                          border-slate-800
                          hover:bg-slate-800/40
                          transition
                        "
                      >

                        {/* RESUME */}

                        <td className="
                          px-5
                          py-4
                        ">

                          <p className="
                            font-semibold
                            text-white
                          ">
                            {item.resume?.file_name}
                          </p>

                          <p className="
                            text-xs
                            text-slate-500
                          ">
                            #{item.resume?.id}
                          </p>

                        </td>


                        {/* JOB */}

                        <td className="
                          px-5
                          py-4
                        ">

                          <p className="
                            font-semibold
                            text-slate-200
                          ">
                            {item.job?.job_title}
                          </p>

                          <p className="
                            text-xs
                            text-slate-500
                          ">
                            {item.job?.company ||
                              "No company"}
                          </p>

                        </td>


                        {/* USER */}

                        <td className="
                          px-5
                          py-4
                        ">

                          <p className="
                            text-slate-200
                          ">
                            {item.user?.name}
                          </p>

                          <p className="
                            text-xs
                            text-slate-500
                          ">
                            {item.user?.email}
                          </p>

                        </td>


                        {/* ATS */}

                        <td className="
                          px-5
                          py-4
                        ">

                          <span className="
                            text-xl
                            font-black
                            text-cyan-400
                          ">

                            {item.ats_score}%

                          </span>

                        </td>


                        {/* MATCH */}

                        <td className="
                          px-5
                          py-4
                          text-slate-300
                        ">

                          {item.match_percentage}%

                        </td>


                        {/* STATUS */}

                        <td className="
                          px-5
                          py-4
                        ">

                          <StatusBadge
                            status={item.status}
                          />

                        </td>


                        {/* DATE */}

                        <td className="
                          px-5
                          py-4
                          whitespace-nowrap
                          text-slate-400
                        ">

                          {item.created_at
                            ? new Date(
                                item.created_at
                              ).toLocaleString()
                            : "-"
                          }

                        </td>

                      </tr>

                    )
                  )

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

          <p className="
            text-sm
            text-slate-400
          ">
            {title}
          </p>

          <h2 className="
            mt-2
            text-3xl
            font-black
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


function StatusBadge({
  status
}) {

  if (status === "High") {

    return (

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

        High

      </span>
    );
  }


  if (status === "Medium") {

    return (

      <span className="
        inline-flex
        items-center
        gap-1.5
        rounded-full
        bg-yellow-500/10
        px-3
        py-1.5
        text-xs
        font-semibold
        text-yellow-400
      ">

        <Activity size={14} />

        Medium

      </span>
    );
  }


  return (

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

      Low

    </span>
  );
}


export default ATSMonitoring;