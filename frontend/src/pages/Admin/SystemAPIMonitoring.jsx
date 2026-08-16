import { useEffect, useState } from "react";
import {
  Activity,
  Server,
  Database,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  Search,
  Zap,
  AlertTriangle,
} from "lucide-react";

import api from "../../api";


function SystemAPIMonitoring() {

  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("all");

  const [method, setMethod] = useState("all");


  // =====================================================
  // LOAD API MONITORING DATA
  // =====================================================

  const loadMonitoring = async () => {

    try {

      setLoading(true);

      setError("");

      const response = await api.get(
        "/admin/api-monitoring/overview",
        {
          params: {
            search,
            status,
            method,
            limit: 100,
          },
        }
      );

      setData(response.data);

    } catch (err) {

      console.error(
        "System/API monitoring error:",
        err
      );

      setError(
        err.response?.data?.detail ||
        "Unable to load System/API Monitoring."
      );

    } finally {

      setLoading(false);

    }
  };


  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {

    loadMonitoring();

  }, [search, status, method]);


  // =====================================================
  // LOADING
  // =====================================================

  if (loading && !data) {

    return (

      <div className="min-h-screen bg-[#050816] text-white p-8">

        <div className="flex items-center gap-3">

          <RefreshCw
            className="animate-spin text-cyan-400"
            size={22}
          />

          <span className="text-slate-300">
            Loading System/API Monitoring...
          </span>

        </div>

      </div>

    );

  }


  // =====================================================
  // ERROR
  // =====================================================

  if (error && !data) {

    return (

      <div className="min-h-screen bg-[#050816] text-white p-8">

        <div className="max-w-xl rounded-2xl border border-red-500/20 bg-red-500/10 p-6">

          <div className="flex items-center gap-3 mb-3">

            <AlertTriangle
              className="text-red-400"
              size={24}
            />

            <h2 className="text-lg font-semibold">
              Monitoring Unavailable
            </h2>

          </div>

          <p className="text-sm text-slate-400 mb-5">
            {error}
          </p>

          <button
            onClick={loadMonitoring}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-cyan-500
              px-4
              py-2.5
              text-sm
              font-semibold
              text-white
              hover:bg-cyan-400
              transition
            "
          >

            <RefreshCw size={16} />

            Retry

          </button>

        </div>

      </div>

    );

  }


  const statistics =
    data?.statistics || {};

  const system =
    data?.system || {};

  const recentRequests =
    data?.recent_requests || [];

  const endpointStatistics =
    data?.endpoint_statistics || [];

  const methodStatistics =
    data?.method_statistics || [];

  const statusStatistics =
    data?.status_statistics || [];


  return (

    <div className="min-h-screen bg-[#050816] text-white p-6 md:p-8">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

        <div>

          <div className="flex items-center gap-3 mb-2">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20">

              <Activity
                size={23}
                className="text-cyan-400"
              />

            </div>

            <h1 className="text-2xl md:text-3xl font-bold">

              System / API Monitoring

            </h1>

          </div>

          <p className="text-sm text-slate-400">

            Monitor backend health, database connectivity and API performance.

          </p>

        </div>


        <button
          onClick={loadMonitoring}
          className="
            flex
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
            text-slate-200
            hover:border-cyan-500/40
            hover:text-cyan-400
            transition
          "
        >

          <RefreshCw
            size={17}
            className={
              loading
                ? "animate-spin"
                : ""
            }
          />

          Refresh

        </button>

      </div>


      {/* ================================================= */}
      {/* SYSTEM HEALTH */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">

        {/* Backend */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">

                <Server
                  size={22}
                  className="text-emerald-400"
                />

              </div>

              <div>

                <p className="text-sm text-slate-400">
                  Backend API
                </p>

                <h3 className="text-lg font-semibold">
                  {system.backend_status || "Unknown"}
                </h3>

              </div>

            </div>


            <CheckCircle
              size={22}
              className="text-emerald-400"
            />

          </div>

        </div>


        {/* Database */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10">

                <Database
                  size={22}
                  className="text-cyan-400"
                />

              </div>

              <div>

                <p className="text-sm text-slate-400">
                  Database
                </p>

                <h3 className="text-lg font-semibold">
                  {system.database_status || "Unknown"}
                </h3>

              </div>

            </div>


            <CheckCircle
              size={22}
              className="text-cyan-400"
            />

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* STATISTICS */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        <StatCard
          title="Total Requests"
          value={statistics.total_requests ?? 0}
          icon={<Activity size={20} />}
        />

        <StatCard
          title="Requests Today"
          value={statistics.requests_today ?? 0}
          icon={<Zap size={20} />}
        />

        <StatCard
          title="Successful Requests"
          value={statistics.successful_requests ?? 0}
          icon={<CheckCircle size={20} />}
        />

        <StatCard
          title="Failed Requests"
          value={statistics.failed_requests ?? 0}
          icon={<XCircle size={20} />}
        />

        <StatCard
          title="Success Rate"
          value={`${statistics.success_rate ?? 0}%`}
          icon={<CheckCircle size={20} />}
        />

        <StatCard
          title="Avg Response Time"
          value={`${statistics.average_response_time ?? 0} ms`}
          icon={<Clock size={20} />}
        />

        <StatCard
          title="Last 7 Days"
          value={statistics.requests_last_7_days ?? 0}
          icon={<Activity size={20} />}
        />

        <StatCard
          title="System Health"
          value={
            statistics.failed_requests > 0
              ? "Attention"
              : "Healthy"
          }
          icon={
            statistics.failed_requests > 0
              ? <AlertTriangle size={20} />
              : <CheckCircle size={20} />
          }
        />

      </div>


      {/* ================================================= */}
      {/* FILTERS */}
      {/* ================================================= */}

      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 mb-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Search */}

          <div className="relative">

            <Search
              size={18}
              className="
                absolute
                left-3
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
              placeholder="Search endpoint..."
              className="
                w-full
                rounded-xl
                border
                border-slate-700
                bg-slate-950
                py-2.5
                pl-10
                pr-4
                text-sm
                text-white
                outline-none
                focus:border-cyan-500/50
              "
            />

          </div>


          {/* Status */}

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="
              rounded-xl
              border
              border-slate-700
              bg-slate-950
              px-4
              py-2.5
              text-sm
              text-slate-200
              outline-none
              focus:border-cyan-500/50
            "
          >

            <option value="all">
              All Status
            </option>

            <option value="Success">
              Success
            </option>

            <option value="Failed">
              Failed
            </option>

          </select>


          {/* Method */}

          <select
            value={method}
            onChange={(e) =>
              setMethod(e.target.value)
            }
            className="
              rounded-xl
              border
              border-slate-700
              bg-slate-950
              px-4
              py-2.5
              text-sm
              text-slate-200
              outline-none
              focus:border-cyan-500/50
            "
          >

            <option value="all">
              All Methods
            </option>

            <option value="GET">
              GET
            </option>

            <option value="POST">
              POST
            </option>

            <option value="PUT">
              PUT
            </option>

            <option value="PATCH">
              PATCH
            </option>

            <option value="DELETE">
              DELETE
            </option>

          </select>

        </div>

      </div>


      {/* ================================================= */}
      {/* STATISTICS TABLES */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">

        {/* Endpoint */}

        <MonitoringList
          title="Top Endpoints"
          icon={<Activity size={18} />}
          items={endpointStatistics}
          labelKey="endpoint"
        />


        {/* Methods */}

        <MonitoringList
          title="HTTP Methods"
          icon={<Zap size={18} />}
          items={methodStatistics}
          labelKey="method"
        />


        {/* Status Codes */}

        <MonitoringList
          title="Status Codes"
          icon={<Server size={18} />}
          items={statusStatistics}
          labelKey="status_code"
        />

      </div>


      {/* ================================================= */}
      {/* RECENT API REQUESTS */}
      {/* ================================================= */}

      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 overflow-hidden">

        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">

          <div>

            <h2 className="font-semibold text-lg">
              Recent API Requests
            </h2>

            <p className="text-xs text-slate-500 mt-1">
              Latest monitored backend requests
            </p>

          </div>

          <span className="text-xs text-slate-500">
            {recentRequests.length} records
          </span>

        </div>


        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead>

              <tr className="border-b border-slate-800 text-left">

                <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase">
                  Method
                </th>

                <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase">
                  Endpoint
                </th>

                <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase">
                  Status
                </th>

                <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase">
                  Response
                </th>

                <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase">
                  Time
                </th>

              </tr>

            </thead>


            <tbody>

              {recentRequests.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="px-5 py-12 text-center text-slate-500"
                  >

                    No API requests found.

                  </td>

                </tr>

              ) : (

                recentRequests.map(
                  (request) => (

                    <tr
                      key={request.id}
                      className="
                        border-b
                        border-slate-800/70
                        hover:bg-slate-800/30
                        transition
                      "
                    >

                      {/* Method */}

                      <td className="px-5 py-4">

                        <span className="
                          inline-flex
                          rounded-lg
                          bg-cyan-500/10
                          px-2.5
                          py-1
                          text-xs
                          font-bold
                          text-cyan-400
                        ">

                          {request.method}

                        </span>

                      </td>


                      {/* Endpoint */}

                      <td className="px-5 py-4">

                        <code className="text-sm text-slate-300">
                          {request.endpoint}
                        </code>

                      </td>


                      {/* Status */}

                      <td className="px-5 py-4">

                        <span
                          className={`
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-lg
                            px-2.5
                            py-1
                            text-xs
                            font-semibold
                            ${
                              request.status === "Success"
                                ? "bg-emerald-500/10 text-emerald-400"
                                : "bg-red-500/10 text-red-400"
                            }
                          `}
                        >

                          {request.status === "Success" ? (
                            <CheckCircle size={14} />
                          ) : (
                            <XCircle size={14} />
                          )}

                          {request.status_code}

                        </span>

                      </td>


                      {/* Response */}

                      <td className="px-5 py-4">

                        <span className="text-sm text-slate-300">

                          {request.response_time} ms

                        </span>

                      </td>


                      {/* Time */}

                      <td className="px-5 py-4">

                        <span className="text-xs text-slate-500">

                          {formatDate(
                            request.created_at
                          )}

                        </span>

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

  );

}


// =========================================================
// STAT CARD
// =========================================================

function StatCard({
  title,
  value,
  icon,
}) {

  return (

    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-bold">
            {value}
          </h3>

        </div>

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

          {icon}

        </div>

      </div>

    </div>

  );

}


// =========================================================
// MONITORING LIST
// =========================================================

function MonitoringList({
  title,
  icon,
  items,
  labelKey,
}) {

  return (

    <div className="rounded-2xl border border-slate-800 bg-slate-900/70">

      <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-800">

        <span className="text-cyan-400">
          {icon}
        </span>

        <h2 className="font-semibold">
          {title}
        </h2>

      </div>


      <div className="p-4">

        {items.length === 0 ? (

          <p className="py-6 text-center text-sm text-slate-500">
            No data available.
          </p>

        ) : (

          <div className="space-y-2">

            {items.slice(0, 8).map(
              (item, index) => (

                <div
                  key={`${labelKey}-${index}`}
                  className="
                    flex
                    items-center
                    justify-between
                    gap-3
                    rounded-xl
                    bg-slate-950/60
                    px-3
                    py-2.5
                  "
                >

                  <span className="truncate text-sm text-slate-300">

                    {item[labelKey]}

                  </span>

                  <span className="
                    shrink-0
                    rounded-lg
                    bg-slate-800
                    px-2
                    py-1
                    text-xs
                    font-semibold
                    text-slate-300
                  ">

                    {item.count}

                  </span>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </div>

  );

}


// =========================================================
// DATE FORMAT
// =========================================================

function formatDate(value) {

  if (!value) {
    return "—";
  }

  try {

    return new Date(value).toLocaleString(
      "en-IN",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    );

  } catch {

    return value;

  }

}


export default SystemAPIMonitoring;