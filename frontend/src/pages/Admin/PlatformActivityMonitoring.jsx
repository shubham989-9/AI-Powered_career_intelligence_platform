import { useEffect, useMemo, useState } from "react";
import api from "../../api";

import {
  Activity,
  Users,
  CalendarDays,
  TrendingUp,
  Search,
  RefreshCw,
  Filter,
  Clock3,
  BarChart3,
  Zap,
  AlertCircle,
} from "lucide-react";


function PlatformActivityMonitoring() {

  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [module, setModule] = useState("all");

  const [activityType, setActivityType] = useState("all");


  // =====================================================
  // FETCH ACTIVITY DATA
  // =====================================================

  const fetchActivities = async (
    isRefresh = false
  ) => {

    try {

      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");


      const response = await api.get(
        "/admin/platform-activity",
        {
          params: {
            search,
            module,
            activity_type: activityType,
            limit: 100,
          },
        }
      );


      setData(response.data);

    } catch (err) {

      console.error(
        "Failed to fetch platform activity:",
        err
      );

      setError(
        err.response?.data?.detail ||
        "Failed to load platform activity."
      );

    } finally {

      setLoading(false);

      setRefreshing(false);
    }
  };


  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {

    fetchActivities();

  }, [module, activityType]);


  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearch = (e) => {

    e.preventDefault();

    fetchActivities(true);
  };


  // =====================================================
  // RESET FILTERS
  // =====================================================

  const resetFilters = () => {

    setSearch("");

    setModule("all");

    setActivityType("all");
  };


  // =====================================================
  // MODULE OPTIONS
  // =====================================================

  const moduleOptions = useMemo(() => {

    if (!data?.module_statistics) {
      return [];
    }

    return data.module_statistics
      .map((item) => item.module)
      .filter(Boolean);

  }, [data]);


  // =====================================================
  // ACTIVITY TYPE OPTIONS
  // =====================================================

  const activityOptions = useMemo(() => {

    if (!data?.activity_statistics) {
      return [];
    }

    return data.activity_statistics
      .map((item) => item.activity_type)
      .filter(Boolean);

  }, [data]);


  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {

    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleString(
      "en-IN",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    );
  };


  // =====================================================
  // LOADING STATE
  // =====================================================

  if (loading) {

    return (
      <div className="min-h-screen bg-slate-950 p-8 text-white">

        <div className="flex items-center justify-center min-h-[70vh]">

          <div className="text-center">

            <RefreshCw
              size={36}
              className="mx-auto mb-4 animate-spin text-cyan-400"
            />

            <p className="text-slate-400">
              Loading platform activity...
            </p>

          </div>

        </div>

      </div>
    );
  }


  // =====================================================
  // ERROR STATE
  // =====================================================

  if (error && !data) {

    return (
      <div className="min-h-screen bg-slate-950 p-8 text-white">

        <div className="max-w-2xl mx-auto mt-20">

          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 text-center">

            <AlertCircle
              size={42}
              className="mx-auto mb-4 text-red-400"
            />

            <h2 className="text-xl font-bold mb-2">
              Unable to Load Activity
            </h2>

            <p className="text-slate-400 mb-6">
              {error}
            </p>

            <button
              onClick={() => fetchActivities()}
              className="
                inline-flex
                items-center
                gap-2
                px-5
                py-3
                rounded-xl
                bg-cyan-500
                hover:bg-cyan-400
                text-white
                font-semibold
                transition
              "
            >

              <RefreshCw size={18} />

              Try Again

            </button>

          </div>

        </div>

      </div>
    );
  }


  const statistics =
    data?.statistics || {};

  const recentActivities =
    data?.recent_activities || [];

  const moduleStatistics =
    data?.module_statistics || [];

  const activityStatistics =
    data?.activity_statistics || [];


  return (

    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-8">


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

        <div>

          <div className="flex items-center gap-3 mb-2">

            <div className="
              w-11
              h-11
              rounded-xl
              bg-cyan-500/10
              border
              border-cyan-500/20
              flex
              items-center
              justify-center
            ">

              <Activity
                size={23}
                className="text-cyan-400"
              />

            </div>

            <h1 className="text-2xl md:text-3xl font-bold">
              Platform Activity Monitoring
            </h1>

          </div>

          <p className="text-slate-400">

            Monitor platform usage and user activity
            across all modules.

          </p>

        </div>


        <button
          onClick={() => fetchActivities(true)}
          disabled={refreshing}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            px-5
            py-3
            rounded-xl
            bg-slate-800
            border
            border-slate-700
            hover:bg-slate-700
            transition
            disabled:opacity-50
          "
        >

          <RefreshCw
            size={18}
            className={
              refreshing
                ? "animate-spin"
                : ""
            }
          />

          {refreshing
            ? "Refreshing..."
            : "Refresh"}

        </button>

      </div>


      {/* =================================================
          ERROR BANNER
      ================================================= */}

      {error && (

        <div className="
          mb-6
          p-4
          rounded-xl
          bg-red-500/10
          border
          border-red-500/30
          text-red-300
          flex
          items-center
          gap-3
        ">

          <AlertCircle size={20} />

          <span>{error}</span>

        </div>

      )}


      {/* =================================================
          STATISTICS
      ================================================= */}

      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-5
        mb-8
      ">


        {/* TOTAL */}

        <div className="
          bg-slate-900
          border
          border-slate-800
          rounded-2xl
          p-6
        ">

          <div className="flex items-center justify-between mb-5">

            <div className="
              w-11
              h-11
              rounded-xl
              bg-cyan-500/10
              flex
              items-center
              justify-center
            ">

              <Activity
                size={22}
                className="text-cyan-400"
              />

            </div>

            <span className="text-xs text-slate-500">
              ALL TIME
            </span>

          </div>

          <p className="text-3xl font-bold">

            {statistics.total_activities ?? 0}

          </p>

          <p className="text-slate-400 mt-1">
            Total Activities
          </p>

        </div>


        {/* TODAY */}

        <div className="
          bg-slate-900
          border
          border-slate-800
          rounded-2xl
          p-6
        ">

          <div className="flex items-center justify-between mb-5">

            <div className="
              w-11
              h-11
              rounded-xl
              bg-violet-500/10
              flex
              items-center
              justify-center
            ">

              <CalendarDays
                size={22}
                className="text-violet-400"
              />

            </div>

            <span className="text-xs text-slate-500">
              TODAY
            </span>

          </div>

          <p className="text-3xl font-bold">

            {statistics.activities_today ?? 0}

          </p>

          <p className="text-slate-400 mt-1">
            Today's Activities
          </p>

        </div>


        {/* ACTIVE USERS */}

        <div className="
          bg-slate-900
          border
          border-slate-800
          rounded-2xl
          p-6
        ">

          <div className="flex items-center justify-between mb-5">

            <div className="
              w-11
              h-11
              rounded-xl
              bg-emerald-500/10
              flex
              items-center
              justify-center
            ">

              <Users
                size={22}
                className="text-emerald-400"
              />

            </div>

            <span className="text-xs text-slate-500">
              TODAY
            </span>

          </div>

          <p className="text-3xl font-bold">

            {statistics.active_users_today ?? 0}

          </p>

          <p className="text-slate-400 mt-1">
            Active Users Today
          </p>

        </div>


        {/* 7 DAYS */}

        <div className="
          bg-slate-900
          border
          border-slate-800
          rounded-2xl
          p-6
        ">

          <div className="flex items-center justify-between mb-5">

            <div className="
              w-11
              h-11
              rounded-xl
              bg-orange-500/10
              flex
              items-center
              justify-center
            ">

              <TrendingUp
                size={22}
                className="text-orange-400"
              />

            </div>

            <span className="text-xs text-slate-500">
              7 DAYS
            </span>

          </div>

          <p className="text-3xl font-bold">

            {statistics.activities_last_7_days ?? 0}

          </p>

          <p className="text-slate-400 mt-1">
            Last 7 Days Activities
          </p>

        </div>

      </div>


      {/* =================================================
          FILTERS
      ================================================= */}

      <div className="
        bg-slate-900
        border
        border-slate-800
        rounded-2xl
        p-5
        mb-8
      ">

        <div className="flex items-center gap-2 mb-5">

          <Filter
            size={19}
            className="text-cyan-400"
          />

          <h2 className="font-semibold">
            Activity Filters
          </h2>

        </div>


        <form
          onSubmit={handleSearch}
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-4
          "
        >

          {/* SEARCH */}

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
              placeholder="Search user or activity..."
              className="
                w-full
                bg-slate-800
                border
                border-slate-700
                rounded-xl
                pl-11
                pr-4
                py-3
                text-white
                placeholder:text-slate-500
                outline-none
                focus:border-cyan-500
              "
            />

          </div>


          {/* MODULE */}

          <select
            value={module}
            onChange={(e) =>
              setModule(e.target.value)
            }
            className="
              bg-slate-800
              border
              border-slate-700
              rounded-xl
              px-4
              py-3
              text-white
              outline-none
              focus:border-cyan-500
            "
          >

            <option value="all">
              All Modules
            </option>

            {moduleOptions.map(
              (item) => (

                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>

              )
            )}

          </select>


          {/* ACTIVITY TYPE */}

          <select
            value={activityType}
            onChange={(e) =>
              setActivityType(
                e.target.value
              )
            }
            className="
              bg-slate-800
              border
              border-slate-700
              rounded-xl
              px-4
              py-3
              text-white
              outline-none
              focus:border-cyan-500
            "
          >

            <option value="all">
              All Activity Types
            </option>

            {activityOptions.map(
              (item) => (

                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>

              )
            )}

          </select>


          {/* ACTIONS */}

          <div className="flex gap-3">

            <button
              type="submit"
              className="
                flex-1
                bg-cyan-500
                hover:bg-cyan-400
                rounded-xl
                px-4
                py-3
                font-semibold
                transition
              "
            >
              Search
            </button>

            <button
              type="button"
              onClick={resetFilters}
              className="
                px-4
                py-3
                rounded-xl
                bg-slate-800
                border
                border-slate-700
                hover:bg-slate-700
                transition
              "
            >
              Reset
            </button>

          </div>

        </form>

      </div>


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div className="
        grid
        grid-cols-1
        xl:grid-cols-3
        gap-6
        mb-8
      ">


        {/* =================================================
            MODULE STATISTICS
        ================================================= */}

        <div className="
          xl:col-span-1
          bg-slate-900
          border
          border-slate-800
          rounded-2xl
          p-6
        ">

          <div className="flex items-center gap-3 mb-6">

            <div className="
              w-10
              h-10
              rounded-xl
              bg-cyan-500/10
              flex
              items-center
              justify-center
            ">

              <BarChart3
                size={20}
                className="text-cyan-400"
              />

            </div>

            <div>

              <h2 className="font-bold">
                Module Statistics
              </h2>

              <p className="text-xs text-slate-500">
                Activity by platform module
              </p>

            </div>

          </div>


          {moduleStatistics.length === 0 ? (

            <p className="text-slate-500 text-sm">
              No module activity available.
            </p>

          ) : (

            <div className="space-y-4">

              {moduleStatistics.map(
                (item, index) => (

                  <div
                    key={`${item.module}-${index}`}
                  >

                    <div className="
                      flex
                      justify-between
                      items-center
                      mb-2
                    ">

                      <span className="text-sm text-slate-300">
                        {item.module}
                      </span>

                      <span className="text-sm font-semibold text-white">
                        {item.count}
                      </span>

                    </div>

                    <div className="
                      h-2
                      bg-slate-800
                      rounded-full
                      overflow-hidden
                    ">

                      <div
                        className="
                          h-full
                          bg-cyan-500
                          rounded-full
                        "
                        style={{
                          width: `${
                            Math.min(
                              100,
                              (
                                item.count /
                                Math.max(
                                  moduleStatistics[0]?.count || 1,
                                  1
                                )
                              ) * 100
                            )
                          }%`,
                        }}
                      />

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>


        {/* =================================================
            ACTIVITY TYPE STATISTICS
        ================================================= */}

        <div className="
          xl:col-span-2
          bg-slate-900
          border
          border-slate-800
          rounded-2xl
          p-6
        ">

          <div className="flex items-center gap-3 mb-6">

            <div className="
              w-10
              h-10
              rounded-xl
              bg-violet-500/10
              flex
              items-center
              justify-center
            ">

              <Zap
                size={20}
                className="text-violet-400"
              />

            </div>

            <div>

              <h2 className="font-bold">
                Activity Type Statistics
              </h2>

              <p className="text-xs text-slate-500">
                Breakdown of user actions
              </p>

            </div>

          </div>


          {activityStatistics.length === 0 ? (

            <p className="text-slate-500 text-sm">
              No activity statistics available.
            </p>

          ) : (

            <div className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-4
            ">

              {activityStatistics.map(
                (item, index) => (

                  <div
                    key={`${item.activity_type}-${index}`}
                    className="
                      bg-slate-800/60
                      border
                      border-slate-700
                      rounded-xl
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
                        text-sm
                        text-slate-300
                      ">
                        {item.activity_type}
                      </span>

                      <span className="
                        text-lg
                        font-bold
                        text-white
                      ">
                        {item.count}
                      </span>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </div>


      {/* =================================================
          RECENT ACTIVITIES
      ================================================= */}

      <div className="
        bg-slate-900
        border
        border-slate-800
        rounded-2xl
        overflow-hidden
      ">


        <div className="
          p-6
          border-b
          border-slate-800
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-3
        ">

          <div className="flex items-center gap-3">

            <div className="
              w-10
              h-10
              rounded-xl
              bg-emerald-500/10
              flex
              items-center
              justify-center
            ">

              <Clock3
                size={20}
                className="text-emerald-400"
              />

            </div>

            <div>

              <h2 className="font-bold">
                Recent Platform Activity
              </h2>

              <p className="text-xs text-slate-500">
                Latest user actions
              </p>

            </div>

          </div>

          <span className="
            text-xs
            text-slate-500
          ">
            {recentActivities.length} records
          </span>

        </div>


        {recentActivities.length === 0 ? (

          <div className="
            p-10
            text-center
            text-slate-500
          ">

            No activity records found.

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="
                  text-left
                  text-xs
                  uppercase
                  tracking-wider
                  text-slate-500
                  bg-slate-950/40
                ">

                  <th className="px-6 py-4">
                    User
                  </th>

                  <th className="px-6 py-4">
                    Module
                  </th>

                  <th className="px-6 py-4">
                    Activity
                  </th>

                  <th className="px-6 py-4">
                    Description
                  </th>

                  <th className="px-6 py-4">
                    Time
                  </th>

                </tr>

              </thead>


              <tbody>

                {recentActivities.map(
                  (activity) => (

                    <tr
                      key={activity.id}
                      className="
                        border-t
                        border-slate-800
                        hover:bg-slate-800/40
                        transition
                      "
                    >

                      {/* USER */}

                      <td className="px-6 py-4">

                        <div>

                          <p className="
                            font-medium
                            text-white
                          ">
                            {activity.user?.name ||
                              "Unknown User"}
                          </p>

                          <p className="
                            text-xs
                            text-slate-500
                            mt-1
                          ">
                            {activity.user?.email ||
                              "-"}
                          </p>

                        </div>

                      </td>


                      {/* MODULE */}

                      <td className="px-6 py-4">

                        <span className="
                          inline-flex
                          px-3
                          py-1
                          rounded-full
                          bg-cyan-500/10
                          border
                          border-cyan-500/20
                          text-cyan-300
                          text-xs
                          font-medium
                        ">
                          {activity.module ||
                            "Other"}
                        </span>

                      </td>


                      {/* ACTIVITY */}

                      <td className="
                        px-6
                        py-4
                        whitespace-nowrap
                      ">

                        <span className="
                          text-sm
                          text-violet-300
                        ">
                          {activity.activity_type}
                        </span>

                      </td>


                      {/* DESCRIPTION */}

                      <td className="
                        px-6
                        py-4
                        min-w-[280px]
                      ">

                        <p className="
                          text-sm
                          text-slate-400
                          line-clamp-2
                        ">
                          {activity.description ||
                            "-"}
                        </p>

                        {activity.endpoint && (

                          <p className="
                            text-xs
                            text-slate-600
                            mt-1
                            font-mono
                          ">
                            {activity.endpoint}
                          </p>

                        )}

                      </td>


                      {/* TIME */}

                      <td className="
                        px-6
                        py-4
                        whitespace-nowrap
                      ">

                        <div className="
                          flex
                          items-center
                          gap-2
                          text-sm
                          text-slate-400
                        ">

                          <Clock3 size={15} />

                          {formatDate(
                            activity.created_at
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
  );
}


export default PlatformActivityMonitoring;