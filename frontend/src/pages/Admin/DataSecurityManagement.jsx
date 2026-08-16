import { useEffect, useState } from "react";
import {
  ShieldCheck,
  Users,
  UserCheck,
  UserX,
  UserCog,
  FileText,
  Activity,
  RefreshCw,
  AlertTriangle,
  LockKeyhole,
} from "lucide-react";

import api from "../../api";


function DataSecurityManagement() {

  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // =====================================================
  // LOAD DATA & SECURITY INFORMATION
  // =====================================================

  const loadDataSecurity = async () => {

    try {

      setLoading(true);

      setError("");

      const response = await api.get(
        "/admin/data-security"
      );

      setData(response.data);

    } catch (err) {

      console.error(
        "Data & Security error:",
        err
      );

      setError(
        err.response?.data?.detail ||
        "Unable to load Data & Security Management."
      );

    } finally {

      setLoading(false);

    }

  };


  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {

    loadDataSecurity();

  }, []);


  // =====================================================
  // LOADING
  // =====================================================

  if (loading && !data) {

    return (

      <div className="min-h-screen bg-[#050816] text-white p-8">

        <div className="flex items-center gap-3">

          <RefreshCw
            size={21}
            className="animate-spin text-cyan-400"
          />

          <span className="text-slate-300">

            Loading Data & Security Management...

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

        <div className="
          max-w-xl
          rounded-2xl
          border
          border-red-500/20
          bg-red-500/10
          p-6
        ">

          <div className="flex items-center gap-3 mb-3">

            <AlertTriangle
              size={24}
              className="text-red-400"
            />

            <h2 className="text-lg font-semibold">

              Security Data Unavailable

            </h2>

          </div>


          <p className="text-sm text-slate-400 mb-5">

            {error}

          </p>


          <button
            onClick={loadDataSecurity}
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


  const users =
    data?.users || {};

  const platformData =
    data?.data || {};

  const accessControl =
    data?.access_control || {};


  const isHealthy =
    data?.security_status === "Healthy";


  return (

    <div className="
      min-h-screen
      bg-[#050816]
      text-white
      p-6
      md:p-8
    ">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="
        flex
        flex-col
        lg:flex-row
        lg:items-center
        lg:justify-between
        gap-5
        mb-8
      ">

        <div>

          <div className="flex items-center gap-3 mb-2">

            <div className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              bg-cyan-500/10
              border
              border-cyan-500/20
            ">

              <ShieldCheck
                size={23}
                className="text-cyan-400"
              />

            </div>


            <h1 className="
              text-2xl
              md:text-3xl
              font-bold
            ">

              Data & Security Management

            </h1>

          </div>


          <p className="text-sm text-slate-400">

            Monitor platform data, account status and access-control security.

          </p>

        </div>


        <button
          onClick={loadDataSecurity}
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
      {/* SECURITY STATUS */}
      {/* ================================================= */}

      <div className="
        rounded-2xl
        border
        border-slate-800
        bg-slate-900/70
        p-5
        mb-6
      ">

        <div className="
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-4
        ">

          <div className="flex items-center gap-4">

            <div className={`
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              ${
                isHealthy
                  ? "bg-emerald-500/10"
                  : "bg-amber-500/10"
              }
            `}>

              {isHealthy ? (

                <ShieldCheck
                  size={25}
                  className="text-emerald-400"
                />

              ) : (

                <AlertTriangle
                  size={25}
                  className="text-amber-400"
                />

              )}

            </div>


            <div>

              <p className="text-sm text-slate-500">

                Security Status

              </p>

              <h2 className="text-xl font-bold">

                {data?.security_status || "Unknown"}

              </h2>

            </div>

          </div>


          <div className={`
            inline-flex
            items-center
            gap-2
            rounded-xl
            px-4
            py-2
            text-sm
            font-semibold
            ${
              isHealthy
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-amber-500/10 text-amber-400"
            }
          `}>

            <span className="
              h-2
              w-2
              rounded-full
              bg-current
            " />

            {isHealthy
              ? "System Healthy"
              : "Attention Required"}

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* USER STATISTICS */}
      {/* ================================================= */}

      <h2 className="text-lg font-semibold mb-4">

        Account Overview

      </h2>


      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-5
        gap-5
        mb-8
      ">

        <SecurityCard
          title="Total Users"
          value={users.total ?? 0}
          icon={<Users size={20} />}
        />


        <SecurityCard
          title="Active Users"
          value={users.active ?? 0}
          icon={<UserCheck size={20} />}
        />


        <SecurityCard
          title="Inactive Users"
          value={users.inactive ?? 0}
          icon={<UserX size={20} />}
        />


        <SecurityCard
          title="Admin Accounts"
          value={users.admins ?? 0}
          icon={<UserCog size={20} />}
        />


        <SecurityCard
          title="Student Accounts"
          value={users.students ?? 0}
          icon={<Users size={20} />}
        />

      </div>


      {/* ================================================= */}
      {/* DATA OVERVIEW */}
      {/* ================================================= */}

      <h2 className="text-lg font-semibold mb-4">

        Platform Data

      </h2>


      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-5
        mb-8
      ">

        <DataCard
          title="Total Resumes"
          value={platformData.total_resumes ?? 0}
          icon={<FileText size={22} />}
        />


        <DataCard
          title="Platform Activities"
          value={
            platformData.total_platform_activities ?? 0
          }
          icon={<Activity size={22} />}
        />

      </div>


      {/* ================================================= */}
      {/* ACCESS CONTROL */}
      {/* ================================================= */}

      <div className="
        rounded-2xl
        border
        border-slate-800
        bg-slate-900/70
        overflow-hidden
      ">

        <div className="
          flex
          items-center
          gap-3
          px-5
          py-4
          border-b
          border-slate-800
        ">

          <LockKeyhole
            size={20}
            className="text-cyan-400"
          />

          <div>

            <h2 className="font-semibold text-lg">

              Access Control

            </h2>

            <p className="text-xs text-slate-500 mt-1">

              Current role-based access configuration

            </p>

          </div>

        </div>


        <div className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-4
          p-5
        ">

          <AccessItem
            label="Admin Accounts"
            value={
              accessControl.admin_accounts ?? 0
            }
          />


          <AccessItem
            label="Student Accounts"
            value={
              accessControl.student_accounts ?? 0
            }
          />


          <AccessItem
            label="Admin APIs Protected"
            value={
              accessControl.admin_protected
                ? "Yes"
                : "No"
            }
            positive={
              accessControl.admin_protected
            }
          />

        </div>

      </div>


      {/* ================================================= */}
      {/* SECURITY NOTE */}
      {/* ================================================= */}

      <div className="
        mt-6
        rounded-2xl
        border
        border-cyan-500/10
        bg-cyan-500/5
        p-5
      ">

        <div className="flex gap-3">

          <ShieldCheck
            size={20}
            className="mt-0.5 shrink-0 text-cyan-400"
          />

          <div>

            <h3 className="font-semibold text-sm">

              Security Monitoring

            </h3>

            <p className="
              mt-1
              text-sm
              leading-6
              text-slate-400
            ">

              Administrative APIs are protected through
              role-based authorization. Account status and
              platform data are monitored from this dashboard.

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}


// =========================================================
// SECURITY CARD
// =========================================================

function SecurityCard({
  title,
  value,
  icon,
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
        items-start
        justify-between
      ">

        <div>

          <p className="text-sm text-slate-500">

            {title}

          </p>

          <h3 className="
            mt-2
            text-2xl
            font-bold
          ">

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
// DATA CARD
// =========================================================

function DataCard({
  title,
  value,
  icon,
}) {

  return (

    <div className="
      rounded-2xl
      border
      border-slate-800
      bg-slate-900/70
      p-6
    ">

      <div className="flex items-center gap-4">

        <div className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-xl
          bg-cyan-500/10
          text-cyan-400
        ">

          {icon}

        </div>


        <div>

          <p className="text-sm text-slate-500">

            {title}

          </p>

          <h3 className="
            mt-1
            text-2xl
            font-bold
          ">

            {value}

          </h3>

        </div>

      </div>

    </div>

  );

}


// =========================================================
// ACCESS ITEM
// =========================================================

function AccessItem({
  label,
  value,
  positive = false,
}) {

  return (

    <div className="
      rounded-xl
      border
      border-slate-800
      bg-slate-950/60
      p-4
    ">

      <p className="text-xs text-slate-500">

        {label}

      </p>

      <div className="flex items-center gap-2 mt-2">

        {positive && (

          <ShieldCheck
            size={17}
            className="text-emerald-400"
          />

        )}

        <span className="
          text-lg
          font-semibold
          text-slate-200
        ">

          {value}

        </span>

      </div>

    </div>

  );

}


export default DataSecurityManagement;