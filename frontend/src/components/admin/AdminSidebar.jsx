import { useNavigate, useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  FileText,
  Briefcase,
  ScanSearch,
  BarChart3,
  Target,
  Compass,
  Search,
  GraduationCap,
  Activity,
  ServerCog,
  MessageSquare,
  ShieldCheck,
  LogOut,
  ChevronRight,
} from "lucide-react";


function AdminSidebar() {

  const navigate = useNavigate();

  const location = useLocation();


  // =====================================================
  // NAVIGATION GROUPS
  // =====================================================

  const navigationGroups = [

    {
      title: "GENERAL",

      items: [
        {
          number: "01",
          label: "Dashboard",
          path: "/admin",
          icon: LayoutDashboard,
        },
      ],
    },


    {
      title: "MANAGEMENT",

      items: [
        {
          number: "02",
          label: "User Management",
          path: "/admin/users",
          icon: Users,
        },

        {
          number: "03",
          label: "Resume Management",
          path: "/admin/resumes",
          icon: FileText,
        },

        {
          number: "04",
          label: "Job Descriptions",
          path: "/admin/jobs",
          icon: Briefcase,
        },
      ],
    },


    {
      title: "AI & ANALYTICS",

      items: [
        {
          number: "05",
          label: "Resume Parsing",
          path: "/admin/resume-parsing",
          icon: ScanSearch,
        },

        {
          number: "06",
          label: "ATS Analysis",
          path: "/admin/ats",
          icon: BarChart3,
        },

        {
          number: "07",
          label: "Skill Gap Analytics",
          path: "/admin/skill-gap",
          icon: Target,
        },

        {
          number: "08",
          label: "Career Recommendations",
          path: "/admin/career-recommendation",
          icon: Compass,
        },

        {
          number: "09",
          label: "Job Recommendations",
          path: "/admin/job-recommendation",
          icon: Search,
        },

        {
          number: "10",
          label: "Course Recommendations",
          path: "/admin/course-recommendation",
          icon: GraduationCap,
        },
      ],
    },


    {
      title: "MONITORING",

      items: [
        {
          number: "11",
          label: "Platform Activity",
          path: "/admin/platform-activity",
          icon: Activity,
        },

{
  number: "12",
  label: "System / API Monitoring",
  path: "/admin/system-api-monitoring",
  icon: ServerCog,
},

        {
          number: "13",
          label: "User Feedback",
          path: "/admin/feedback",
          icon: MessageSquare,
        },
      ],
    },


    {
      title: "SECURITY",

      items: [
        {
          number: "14",
          label: "Data & Security",
          path: "/admin/data-security",
          icon: ShieldCheck,
        },
      ],
    },

  ];


  // =====================================================
  // ACTIVE ROUTE
  // =====================================================

  const isActive = (path) => {

    if (path === "/admin") {

      return location.pathname === "/admin";

    }

    return location.pathname === path;

  };


  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/");

  };


  return (

    <aside className="
      fixed
      left-0
      top-0
      z-50
      flex
      h-screen
      w-[290px]
      flex-col
      border-r
      border-slate-800
      bg-[#070b17]
      text-white
    ">


      {/* ================================================= */}
      {/* BRAND */}
      {/* ================================================= */}

      <div className="
        border-b
        border-slate-800
        px-6
        py-5
      ">

        <div className="flex items-center gap-3">

          <div className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-cyan-500/10
            ring-1
            ring-cyan-500/20
          ">

            <ShieldCheck
              size={22}
              className="text-cyan-400"
            />

          </div>


          <div>

            <h1 className="
              text-xl
              font-black
              tracking-tight
            ">

              <span className="text-cyan-400">
                Hire
              </span>

              <span className="text-white">
                Pulse
              </span>

            </h1>


            <p className="
              mt-0.5
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-slate-500
            ">

              Admin Console

            </p>

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* NAVIGATION */}
      {/* ================================================= */}

      <nav className="
        flex-1
        overflow-y-auto
        px-4
        py-5
        scrollbar-thin
        scrollbar-thumb-slate-700
      ">

        {navigationGroups.map(
          (group) => (

            <div
              key={group.title}
              className="mb-6"
            >

              {/* Group Title */}

              <div className="
                mb-2
                px-3
                text-[10px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-slate-600
              ">

                {group.title}

              </div>


              {/* Group Items */}

              <div className="space-y-1">

                {group.items.map(
                  (item) => {

                    const Icon = item.icon;

                    const active =
                      isActive(item.path);


                    return (

                      <button
                        key={item.path}
                        onClick={() =>
                          navigate(item.path)
                        }
                        className={`
                          group
                          relative
                          flex
                          w-full
                          items-center
                          gap-3
                          rounded-xl
                          px-3
                          py-2.5
                          text-left
                          transition-all
                          duration-200

                          ${
                            active
                              ? "bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-500/20"
                              : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
                          }
                        `}
                      >

                        {/* Active Indicator */}

                        {active && (

                          <span className="
                            absolute
                            left-0
                            top-1/2
                            h-7
                            w-0.5
                            -translate-y-1/2
                            rounded-full
                            bg-cyan-400
                          " />

                        )}


                        {/* Number */}

                        <span className={`
                          w-6
                          text-[10px]
                          font-bold
                          ${
                            active
                              ? "text-cyan-500"
                              : "text-slate-700 group-hover:text-slate-500"
                          }
                        `}>

                          {item.number}

                        </span>


                        {/* Icon */}

                        <span className={`
                          flex
                          h-8
                          w-8
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          transition-all
                          ${
                            active
                              ? "bg-cyan-500/15"
                              : "bg-slate-800/50 group-hover:bg-slate-700"
                          }
                        `}>

                          <Icon
                            size={16}
                            strokeWidth={2}
                          />

                        </span>


                        {/* Label */}

                        <span className="
                          flex-1
                          truncate
                          text-[13px]
                          font-medium
                        ">

                          {item.label}

                        </span>


                        {/* Arrow */}

                        <ChevronRight
                          size={14}
                          className={`
                            transition-all
                            ${
                              active
                                ? "translate-x-0 text-cyan-400 opacity-100"
                                : "-translate-x-1 text-slate-700 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                            }
                          `}
                        />

                      </button>

                    );

                  }
                )}

              </div>

            </div>

          )
        )}

      </nav>


      {/* ================================================= */}
      {/* ADMIN PROFILE */}
      {/* ================================================= */}

      <div className="
        border-t
        border-slate-800
        p-4
      ">

        <div className="
          mb-3
          flex
          items-center
          gap-3
          rounded-xl
          bg-slate-900/70
          p-3
        ">

          <div className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-cyan-500/10
            ring-1
            ring-cyan-500/20
          ">

            <ShieldCheck
              size={17}
              className="text-cyan-400"
            />

          </div>


          <div className="min-w-0">

            <p className="
              truncate
              text-xs
              font-semibold
              text-slate-200
            ">

              Administrator

            </p>

            <p className="
              truncate
              text-[10px]
              text-slate-500
            ">

              Full Admin Access

            </p>

          </div>

        </div>


        {/* Logout */}

        <button
          onClick={handleLogout}
          className="
            group
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            border
            border-red-500/10
            bg-red-500/5
            px-3
            py-2.5
            text-sm
            font-semibold
            text-red-400
            transition-all
            duration-200
            hover:border-red-500/20
            hover:bg-red-500/10
            hover:text-red-300
          "
        >

          <LogOut
            size={17}
            className="
              transition-transform
              group-hover:translate-x-0.5
            "
          />

          <span>
            Logout
          </span>

        </button>

      </div>

    </aside>

  );

}


export default AdminSidebar;