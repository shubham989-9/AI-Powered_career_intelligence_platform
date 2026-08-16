import { useEffect, useState } from "react";

import {
  Briefcase,
  CalendarDays,
  CheckCircle2,
  MapPin,
  RefreshCw,
  Search,
  Trash2,
  Building2,
  User,
  X,
} from "lucide-react";

import api from "../../api";


function JobDescriptionManagement() {

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({
    statistics: {
      total_jobs: 0,
      jobs_today: 0,
      jobs_last_7_days: 0,
    },
    jobs: [],
  });

  const [search, setSearch] = useState("");

  const [selectedJob, setSelectedJob] =
    useState(null);

  const [deleting, setDeleting] =
    useState(false);


  // =====================================================
  // FETCH JOB DESCRIPTIONS
  // =====================================================

  const fetchJobs = async () => {

    try {

      setLoading(true);

      const token =
        localStorage.getItem("token");

      const response = await api.get(
        "/admin/jobs/management",
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
        "Job Description Management Error:",
        error
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    fetchJobs();

  }, []);


  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (jobId) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this Job Description?"
      );

    if (!confirmed) return;

    try {

      setDeleting(true);

      const token =
        localStorage.getItem("token");

      await api.delete(
        `/admin/jobs/${jobId}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setSelectedJob(null);

      await fetchJobs();

    } catch (error) {

      console.error(
        "Delete Job Error:",
        error
      );

      alert(
        error.response?.data?.detail ||
        "Failed to delete Job Description."
      );

    } finally {

      setDeleting(false);

    }
  };


  // =====================================================
  // SEARCH
  // =====================================================

  const filteredJobs =
    data.jobs.filter((job) => {

      const query =
        search.toLowerCase().trim();

      if (!query) return true;

      return (

        job.job_title
          ?.toLowerCase()
          .includes(query) ||

        job.company
          ?.toLowerCase()
          .includes(query) ||

        job.location
          ?.toLowerCase()
          .includes(query) ||

        job.user?.name
          ?.toLowerCase()
          .includes(query) ||

        job.user?.email
          ?.toLowerCase()
          .includes(query)
      );
    });


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

          Loading Job Management...

        </div>

      </div>
    );
  }


  const stats = data.statistics;


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


        {/* =================================================
            HEADER
        ================================================= */}

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
              Admin Management
            </p>

            <h1 className="
              text-3xl
              md:text-4xl
              font-black
              mt-1
            ">
              Job Description Management
            </h1>

            <p className="
              text-slate-400
              mt-2
            ">
              Monitor and manage job descriptions
              created by platform users.
            </p>

          </div>


          <button
            onClick={fetchJobs}
            className="
              inline-flex
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
              hover:border-cyan-500/50
              hover:text-cyan-300
              transition
            "
          >

            <RefreshCw size={17} />

            Refresh

          </button>

        </div>


        {/* =================================================
            STATISTICS
        ================================================= */}

        <div className="
          grid
          grid-cols-1
          sm:grid-cols-3
          gap-5
        ">

          <StatCard
            icon={<Briefcase />}
            title="Total Job Descriptions"
            value={stats.total_jobs}
          />

          <StatCard
            icon={<CalendarDays />}
            title="Created Today"
            value={stats.jobs_today}
          />

          <StatCard
            icon={<CheckCircle2 />}
            title="Last 7 Days"
            value={stats.jobs_last_7_days}
          />

        </div>


        {/* =================================================
            SEARCH
        ================================================= */}

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
                Search job title, company, location or user...
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


        {/* =================================================
            JOB TABLE
        ================================================= */}

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
                    Job
                  </th>

                  <th className="px-5 py-4">
                    Company
                  </th>

                  <th className="px-5 py-4">
                    Location
                  </th>

                  <th className="px-5 py-4">
                    Skills
                  </th>

                  <th className="px-5 py-4">
                    Created By
                  </th>

                  <th className="px-5 py-4">
                    Created
                  </th>

                  <th className="px-5 py-4">
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                {filteredJobs.length === 0 ? (

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

                      No Job Descriptions found.

                    </td>

                  </tr>

                ) : (

                  filteredJobs.map((job) => (

                    <tr
                      key={job.id}
                      className="
                        border-t
                        border-slate-800
                        hover:bg-slate-800/40
                        transition
                      "
                    >

                      {/* JOB */}

                      <td className="
                        px-5
                        py-4
                      ">

                        <div className="
                          flex
                          items-center
                          gap-3
                        ">

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

                            <Briefcase size={19} />

                          </div>

                          <div>

                            <p className="
                              font-semibold
                              text-white
                            ">
                              {job.job_title}
                            </p>

                            <p className="
                              text-xs
                              text-slate-500
                            ">
                              Job #{job.id}
                            </p>

                          </div>

                        </div>

                      </td>


                      {/* COMPANY */}

                      <td className="
                        px-5
                        py-4
                        text-slate-300
                      ">

                        <div className="
                          flex
                          items-center
                          gap-2
                        ">

                          <Building2 size={15} />

                          {job.company ||
                            "Not specified"}

                        </div>

                      </td>


                      {/* LOCATION */}

                      <td className="
                        px-5
                        py-4
                        text-slate-300
                      ">

                        <div className="
                          flex
                          items-center
                          gap-2
                        ">

                          <MapPin size={15} />

                          {job.location ||
                            "Not specified"}

                        </div>

                      </td>


                      {/* SKILLS */}

                      <td className="
                        px-5
                        py-4
                      ">

                        <div className="
                          flex
                          flex-wrap
                          gap-1.5
                          max-w-xs
                        ">

                          {job.required_skills
                            ?.slice(0, 4)
                            .map(
                              (skill, index) => (

                                <span
                                  key={index}
                                  className="
                                    rounded-lg
                                    bg-violet-500/10
                                    px-2
                                    py-1
                                    text-xs
                                    text-violet-300
                                  "
                                >
                                  {skill}
                                </span>

                              )
                            )}

                          {!job.required_skills
                            ?.length && (

                            <span className="
                              text-slate-500
                            ">
                              No skills
                            </span>

                          )}

                        </div>

                      </td>


                      {/* USER */}

                      <td className="
                        px-5
                        py-4
                      ">

                        <div>

                          <div className="
                            flex
                            items-center
                            gap-2
                            text-slate-200
                          ">

                            <User size={15} />

                            {job.user?.name ||
                              "Unknown"}

                          </div>

                          <p className="
                            text-xs
                            text-slate-500
                            mt-1
                          ">
                            {job.user?.email || ""}
                          </p>

                        </div>

                      </td>


                      {/* DATE */}

                      <td className="
                        px-5
                        py-4
                        whitespace-nowrap
                        text-slate-400
                      ">

                        {job.created_at
                          ? new Date(
                              job.created_at
                            ).toLocaleString()
                          : "-"
                        }

                      </td>


                      {/* ACTIONS */}

                      <td className="px-5 py-4">

                        <div className="
                          flex
                          items-center
                          gap-2
                        ">

                          <button
                            onClick={() =>
                              setSelectedJob(job)
                            }
                            className="
                              rounded-lg
                              border
                              border-slate-700
                              bg-slate-950
                              px-3
                              py-2
                              text-xs
                              font-semibold
                              text-slate-300
                              hover:border-cyan-500/50
                              hover:text-cyan-300
                              transition
                            "
                          >
                            View
                          </button>


                          <button
                            onClick={() =>
                              handleDelete(job.id)
                            }
                            disabled={deleting}
                            className="
                              rounded-lg
                              border
                              border-red-500/20
                              bg-red-500/10
                              p-2
                              text-red-400
                              hover:bg-red-500/20
                              transition
                              disabled:opacity-50
                            "
                            title="Delete"
                          >

                            <Trash2 size={16} />

                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>


      {/* =================================================
          VIEW MODAL
      ================================================= */}

      {selectedJob && (

        <div className="
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          bg-black/70
          p-4
        ">

          <div className="
            w-full
            max-w-3xl
            max-h-[85vh]
            overflow-y-auto
            rounded-3xl
            border
            border-slate-700
            bg-[#0b1120]
            p-6
            shadow-2xl
          ">

            <div className="
              flex
              items-start
              justify-between
              gap-4
            ">

              <div>

                <p className="
                  text-cyan-400
                  text-sm
                  font-semibold
                ">
                  Job Description #{selectedJob.id}
                </p>

                <h2 className="
                  mt-1
                  text-2xl
                  font-black
                  text-white
                ">
                  {selectedJob.job_title}
                </h2>

              </div>


              <button
                onClick={() =>
                  setSelectedJob(null)
                }
                className="
                  rounded-xl
                  border
                  border-slate-700
                  p-2
                  text-slate-400
                  hover:text-white
                "
              >

                <X size={20} />

              </button>

            </div>


            <div className="
              mt-6
              grid
              sm:grid-cols-2
              gap-4
            ">

              <InfoItem
                label="Company"
                value={
                  selectedJob.company ||
                  "Not specified"
                }
              />

              <InfoItem
                label="Location"
                value={
                  selectedJob.location ||
                  "Not specified"
                }
              />

              <InfoItem
                label="Created By"
                value={
                  selectedJob.user?.name ||
                  "Unknown"
                }
              />

              <InfoItem
                label="Email"
                value={
                  selectedJob.user?.email ||
                  "Unknown"
                }
              />

            </div>


            <div className="mt-6">

              <p className="
                text-sm
                font-semibold
                text-slate-400
                mb-2
              ">
                Required Skills
              </p>

              <div className="
                flex
                flex-wrap
                gap-2
              ">

                {selectedJob.required_skills
                  ?.map(
                    (skill, index) => (

                      <span
                        key={index}
                        className="
                          rounded-lg
                          bg-violet-500/10
                          px-3
                          py-1.5
                          text-sm
                          text-violet-300
                        "
                      >
                        {skill}
                      </span>

                    )
                  )}

              </div>

            </div>


            <div className="mt-6">

              <p className="
                text-sm
                font-semibold
                text-slate-400
                mb-2
              ">
                Job Description
              </p>

              <div className="
                rounded-2xl
                border
                border-slate-800
                bg-slate-950
                p-5
                text-sm
                leading-7
                text-slate-300
                whitespace-pre-wrap
              ">

                {selectedJob.description}

              </div>

            </div>


            <div className="
              mt-6
              flex
              justify-end
              gap-3
            ">

              <button
                onClick={() =>
                  setSelectedJob(null)
                }
                className="
                  rounded-xl
                  border
                  border-slate-700
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-slate-300
                  hover:text-white
                "
              >
                Close
              </button>


              <button
                onClick={() =>
                  handleDelete(selectedJob.id)
                }
                disabled={deleting}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-red-500/10
                  border
                  border-red-500/20
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-red-400
                  hover:bg-red-500/20
                  disabled:opacity-50
                "
              >

                <Trash2 size={16} />

                Delete Job

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}


// =====================================================
// STAT CARD
// =====================================================

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
            text-white
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


// =====================================================
// INFO ITEM
// =====================================================

function InfoItem({
  label,
  value,
}) {

  return (

    <div className="
      rounded-xl
      border
      border-slate-800
      bg-slate-950
      p-4
    ">

      <p className="
        text-xs
        text-slate-500
        mb-1
      ">
        {label}
      </p>

      <p className="
        text-sm
        font-semibold
        text-slate-200
      ">
        {value}
      </p>

    </div>

  );
}


export default JobDescriptionManagement;