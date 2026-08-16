import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Users,
  FileText,
  Briefcase,
  UserCheck,
  UserX,
  Upload,
  Activity,
  ShieldCheck,
  RefreshCw,
  Clock,
} from "lucide-react";

import api from "../../api";


function AdminDashboard() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [data, setData] = useState(null);


  // =====================================================
  // FETCH ADMIN DATA
  // =====================================================

  const fetchDashboard = async () => {

    try {

      setLoading(true);
      setError("");

      const token =
        localStorage.getItem("token");


      const response = await api.get(
        "/admin/overview",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );


      setData(response.data);

    } catch (err) {

      console.error(
        "Admin Dashboard Error:",
        err
      );

      setError(
        err.response?.data?.detail ||
        "Unable to load admin dashboard."
      );

    } finally {

      setLoading(false);

    }

  };


  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {

    fetchDashboard();

  }, []);


  // =====================================================
  // LOADING
  // =====================================================

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

          <span>
            Loading Admin Dashboard...
          </span>

        </div>

      </div>

    );

  }


  // =====================================================
  // ERROR
  // =====================================================

  if (error) {

    return (

      <div className="
        min-h-screen
        bg-[#050816]
        flex
        items-center
        justify-center
        p-6
        text-white
      ">

        <div className="
          max-w-md
          w-full
          rounded-2xl
          border
          border-red-500/30
          bg-red-500/10
          p-6
          text-center
        ">

          <ShieldCheck
            size={40}
            className="
              mx-auto
              mb-4
              text-red-400
            "
          />

          <h2 className="
            text-xl
            font-bold
            mb-2
          ">
            Admin Access Error
          </h2>

          <p className="
            text-sm
            text-slate-400
            mb-5
          ">
            {error}
          </p>

          <button
            onClick={fetchDashboard}
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-cyan-500
              px-5
              py-3
              font-semibold
              text-slate-950
              hover:bg-cyan-400
            "
          >

            <RefreshCw size={17} />

            Try Again

          </button>

        </div>

      </div>

    );

  }


  const stats =
    data?.statistics || {};


  return (

    <div className="
      min-h-screen
      bg-[#050816]
      text-white
      p-4
      sm:p-6
      lg:p-8
    ">

      <div className="
        max-w-7xl
        mx-auto
        space-y-6
      ">


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        ">

          {/* =================================================
              ADMIN DASHBOARD TITLE
          ================================================= */}

          <div>

            <h1 className="
              text-2xl
              sm:text-3xl
              font-bold
              tracking-tight
              text-white
            ">
              Admin Dashboard
            </h1>

            <p className="
              mt-1
              text-sm
              text-slate-500
            ">
              Overview of your platform at a glance
            </p>

          </div>


          {/* =================================================
              REFRESH
          ================================================= */}

          <button
            onClick={fetchDashboard}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-slate-700
              bg-slate-900/80
              px-4
              py-2.5
              text-sm
              font-semibold
              text-slate-200
              hover:border-cyan-500/50
              hover:bg-slate-800
              hover:text-cyan-300
              transition
            "
          >

            <RefreshCw size={17} />

            Refresh

          </button>

        </div>

        {/* =================================================
            ADMIN INFO
        ================================================= */}

        <div className="
          rounded-2xl
          border
          border-cyan-500/20
          bg-gradient-to-r
          from-cyan-500/10
          to-violet-500/10
          p-4
          sm:p-5
        ">

          <div className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-3
          ">

            <div>

              <p className="
                text-xs
                uppercase
                tracking-wider
                text-slate-500
              ">
                Signed in as
              </p>

              <h2 className="
                mt-1
                font-bold
              ">
                {data?.admin?.name}
              </h2>

              <p className="
                text-sm
                text-slate-400
              ">
                {data?.admin?.email}
              </p>

            </div>


            <div className="
              inline-flex
              items-center
              gap-2
              self-start
              rounded-full
              border
              border-cyan-400/20
              bg-cyan-400/10
              px-3
              py-1.5
              text-xs
              font-semibold
              text-cyan-300
            ">

              <ShieldCheck size={15} />

              Administrator

            </div>

          </div>

        </div>


        {/* =================================================
            STATISTICS
        ================================================= */}

        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
          gap-4
        ">

          <StatCard
            title="Total Users"
            value={stats.total_users ?? 0}
            icon={Users}
            description={`${stats.active_users ?? 0} active users`}
            iconClass="text-cyan-400"
            bgClass="bg-cyan-500/10"
          />


          <StatCard
            title="Total Resumes"
            value={stats.total_resumes ?? 0}
            icon={FileText}
            description={`${stats.resumes_today ?? 0} uploaded today`}
            iconClass="text-violet-400"
            bgClass="bg-violet-500/10"
          />


          <StatCard
            title="Job Descriptions"
            value={stats.total_job_descriptions ?? 0}
            icon={Briefcase}
            description={`${stats.jobs_today ?? 0} created today`}
            iconClass="text-emerald-400"
            bgClass="bg-emerald-500/10"
          />


          <StatCard
            title="Profiles"
            value={stats.total_profiles ?? 0}
            icon={UserCheck}
            description="Registered profiles"
            iconClass="text-amber-400"
            bgClass="bg-amber-500/10"
          />

        </div>


        {/* =================================================
            SECONDARY STATISTICS
        ================================================= */}

        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-4
        ">

          <MiniCard
            title="Active Users"
            value={stats.active_users ?? 0}
            icon={UserCheck}
          />

          <MiniCard
            title="Inactive Users"
            value={stats.inactive_users ?? 0}
            icon={UserX}
          />

          <MiniCard
            title="Resumes - 7 Days"
            value={stats.resumes_last_7_days ?? 0}
            icon={Upload}
          />

          <MiniCard
            title="JDs - 7 Days"
            value={stats.jobs_last_7_days ?? 0}
            icon={Activity}
          />

        </div>


        {/* =================================================
            RECENT ACTIVITY
        ================================================= */}

        <div className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-6
        ">


          {/* =================================================
              RECENT RESUMES
          ================================================= */}

          <section className="
            rounded-2xl
            border
            border-slate-800
            bg-slate-900/60
            overflow-hidden
          ">

            <div className="
              flex
              items-center
              justify-between
              border-b
              border-slate-800
              px-5
              py-4
            ">

              <div>

                <h2 className="font-bold">
                  Recent Resumes
                </h2>

                <p className="
                  text-xs
                  text-slate-500
                  mt-1
                ">
                  Latest resume uploads
                </p>

              </div>

              <FileText
                size={20}
                className="text-violet-400"
              />

            </div>


            <div className="divide-y divide-slate-800">

              {data?.recent_resumes?.length ? (

                data.recent_resumes.map(
                  (resume) => (

                    <div
                      key={resume.id}
                      className="
                        flex
                        items-center
                        gap-3
                        px-5
                        py-4
                      "
                    >

                      <div className="
                        shrink-0
                        rounded-xl
                        bg-violet-500/10
                        p-2.5
                      ">

                        <FileText
                          size={18}
                          className="text-violet-400"
                        />

                      </div>


                      <div className="
                        min-w-0
                        flex-1
                      ">

                        <p className="
                          truncate
                          text-sm
                          font-medium
                        ">
                          {resume.file_name}
                        </p>

                        <p className="
                          text-xs
                          text-slate-500
                          mt-1
                        ">
                          User ID: {resume.user_id}
                        </p>

                      </div>


                      <div className="
                        hidden
                        sm:flex
                        items-center
                        gap-1
                        text-xs
                        text-slate-500
                      ">

                        <Clock size={13} />

                        {formatDate(
                          resume.uploaded_at
                        )}

                      </div>

                    </div>

                  )
                )

              ) : (

                <EmptyState
                  message="No resumes uploaded yet."
                />

              )}

            </div>

          </section>


          {/* =================================================
              RECENT JOB DESCRIPTIONS
          ================================================= */}

          <section className="
            rounded-2xl
            border
            border-slate-800
            bg-slate-900/60
            overflow-hidden
          ">

            <div className="
              flex
              items-center
              justify-between
              border-b
              border-slate-800
              px-5
              py-4
            ">

              <div>

                <h2 className="font-bold">
                  Recent Job Descriptions
                </h2>

                <p className="
                  text-xs
                  text-slate-500
                  mt-1
                ">
                  Latest jobs added to the platform
                </p>

              </div>

              <Briefcase
                size={20}
                className="text-emerald-400"
              />

            </div>


            <div className="divide-y divide-slate-800">

              {data?.recent_jobs?.length ? (

                data.recent_jobs.map(
                  (job) => (

                    <div
                      key={job.id}
                      className="
                        flex
                        items-center
                        gap-3
                        px-5
                        py-4
                      "
                    >

                      <div className="
                        shrink-0
                        rounded-xl
                        bg-emerald-500/10
                        p-2.5
                      ">

                        <Briefcase
                          size={18}
                          className="text-emerald-400"
                        />

                      </div>


                      <div className="
                        min-w-0
                        flex-1
                      ">

                        <p className="
                          truncate
                          text-sm
                          font-medium
                        ">
                          {job.job_title}
                        </p>

                        <p className="
                          truncate
                          text-xs
                          text-slate-500
                          mt-1
                        ">

                          {job.company ||
                            "Company not specified"}

                          {" • "}

                          {job.location ||
                            "Location not specified"}

                        </p>

                      </div>


                      <div className="
                        hidden
                        sm:flex
                        items-center
                        gap-1
                        text-xs
                        text-slate-500
                      ">

                        <Clock size={13} />

                        {formatDate(
                          job.created_at
                        )}

                      </div>

                    </div>

                  )
                )

              ) : (

                <EmptyState
                  message="No job descriptions yet."
                />

              )}

            </div>

          </section>

        </div>


        {/* =================================================
            ANALYTICS STATUS
        ================================================= */}

        <section className="
          rounded-2xl
          border
          border-slate-800
          bg-slate-900/60
          p-5
        ">

          <div className="
            flex
            items-center
            gap-3
            mb-5
          ">

            <Activity
              size={21}
              className="text-cyan-400"
            />

            <div>

              <h2 className="font-bold">
                Advanced Analytics
              </h2>

              <p className="
                text-xs
                text-slate-500
                mt-1
              ">
                Monitoring integrations for the next admin modules
              </p>

            </div>

          </div>


          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-3
          ">

            <StatusItem
              title="ATS Score & Analysis"
              status={
                data?.analytics_status?.ats
              }
            />

            <StatusItem
              title="Career Recommendation"
              status={
                data?.analytics_status?.career_recommendation
              }
            />

            <StatusItem
              title="Job Recommendation"
              status={
                data?.analytics_status?.job_recommendation
              }
            />

            <StatusItem
              title="User Feedback"
              status={
                data?.analytics_status?.feedback
              }
            />

            <StatusItem
              title="Platform Activity"
              status={
                data?.analytics_status?.platform_activity
              }
            />

            <StatusItem
              title="System / API"
              status={
                data?.analytics_status?.system_api
              }
            />

          </div>

        </section>

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
  icon: Icon,
  description,
  iconClass,
  bgClass,
}) {

  return (

    <div className="
      rounded-2xl
      border
      border-slate-800
      bg-slate-900/70
      p-5
      transition
      hover:-translate-y-0.5
      hover:border-slate-700
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
            mt-2
            text-3xl
            font-black
          ">
            {value}
          </p>

          <p className="
            mt-2
            text-xs
            text-slate-500
          ">
            {description}
          </p>

        </div>


        <div className={`
          rounded-xl
          p-3
          ${bgClass}
        `}>

          <Icon
            size={21}
            className={iconClass}
          />

        </div>

      </div>

    </div>

  );
}


// =========================================================
// MINI CARD
// =========================================================

function MiniCard({
  title,
  value,
  icon: Icon,
}) {

  return (

    <div className="
      flex
      items-center
      gap-4
      rounded-2xl
      border
      border-slate-800
      bg-slate-900/50
      p-4
    ">

      <div className="
        rounded-xl
        bg-slate-800
        p-3
      ">

        <Icon
          size={19}
          className="text-cyan-400"
        />

      </div>


      <div>

        <p className="
          text-xs
          text-slate-500
        ">
          {title}
        </p>

        <p className="
          mt-1
          text-xl
          font-bold
        ">
          {value}
        </p>

      </div>

    </div>

  );
}


// =========================================================
// STATUS ITEM
// =========================================================

function StatusItem({
  title,
  status,
}) {

  return (

    <div className="
      rounded-xl
      border
      border-slate-800
      bg-slate-950/50
      p-4
    ">

      <div className="
        flex
        items-center
        justify-between
        gap-3
      ">

        <p className="
          text-sm
          font-medium
        ">
          {title}
        </p>


        <span className="
          h-2
          w-2
          shrink-0
          rounded-full
          bg-amber-400
        " />

      </div>


      <p className="
        mt-2
        text-xs
        leading-5
        text-slate-500
      ">
        {status}
      </p>

    </div>

  );
}


// =========================================================
// EMPTY STATE
// =========================================================

function EmptyState({
  message,
}) {

  return (

    <div className="
      px-5
      py-10
      text-center
      text-sm
      text-slate-500
    ">

      {message}

    </div>

  );
}


// =========================================================
// DATE FORMATTER
// =========================================================

function formatDate(value) {

  if (!value) {
    return "—";
  }

  try {

    return new Date(value)
      .toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
        }
      );

  } catch {

    return "—";

  }

}


export default AdminDashboard;