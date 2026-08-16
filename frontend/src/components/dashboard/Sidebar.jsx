import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  FileText,
  BarChart3,
  BriefcaseBusiness,
  FilePlus2,
  Target,
  Search,
  GraduationCap,
  Sparkles,
  Brain,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";

function Sidebar({ activePage, setActivePage }) {
  const navigate = useNavigate();

  const handleNavigation = (id) => {
    setActivePage(id);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "profile", label: "Profile", icon: User },
    {
      id: "resume-management",
      label: "Resume Management",
      icon: FileText,
    },
    {
      id: "resume-analysis",
      label: "ATS Resume Analysis",
      icon: BarChart3,
    },
    {
      id: "job-description",
      label: "Job Description",
      icon: BriefcaseBusiness,
    },
    {
      id: "resume-builder",
      label: "Resume Builder",
      icon: FilePlus2,
    },
    {
      id: "career",
      label: "Career Recommendation",
      icon: Target,
    },
    {
      id: "job-recommendation",
      label: "Job Recommendation",
      icon: Search,
    },
    {
      id: "course-recommendation",
      label: "Course Recommendation",
      icon: GraduationCap,
    },
    {
      id: "resume-improvement",
      label: "Resume Improvement",
      icon: Sparkles,
    },
    {
      id: "skill-gap",
      label: "Skill Gap",
      icon: Brain,
    },
    {
      id: "feedback",
      label: "Feedback",
      icon: MessageSquare,
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  return (
    <aside
      className="
        w-72
        h-screen
        shrink-0
        bg-slate-900
        border-r
        border-slate-800
        text-white
        font-sans
        flex
        flex-col
      "
    >
      {/* =====================================================
          STUDENT BRAND
      ===================================================== */}

      <div className="shrink-0 px-6 pt-6 pb-5">
        <div className="flex items-center gap-3 px-1">
          
          {/* Student / Career Icon */}
          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              border
              border-pink-500/30
              bg-pink-500/10
              shadow-[0_0_25px_rgba(236,72,153,0.12)]
            "
          >
            <GraduationCap
              size={26}
              strokeWidth={2.2}
              className="text-pink-400"
            />
          </div>

          {/* Brand */}
          <div>
            <h1 className="text-[27px] leading-none font-black tracking-tight">
              <span className="text-pink-400">Hire</span>
              <span className="text-white">Pulse</span>
            </h1>

            <p className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.24em] text-slate-500">
              Career Intelligence
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          SCROLLABLE NAVIGATION
      ===================================================== */}

      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-4 pb-4 sidebar-scroll">
        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigation(item.id)}
                className={`
                  group
                  w-full
                  flex
                  items-center
                  gap-3.5
                  px-4
                  py-3
                  rounded-xl
                  font-medium
                  text-sm
                  transition-all
                  duration-200
                  text-left

                  ${
                    isActive
                      ? `
                        bg-pink-500
                        text-white
                        font-semibold
                        shadow-lg
                        shadow-pink-500/25
                      `
                      : `
                        text-slate-400
                        hover:text-white
                        hover:bg-slate-800/70
                      `
                  }
                `}
              >
                <Icon
                  size={20}
                  strokeWidth={2}
                  className={`
                    shrink-0
                    transition-transform
                    duration-200
                    ${
                      isActive
                        ? "scale-110"
                        : "group-hover:scale-110"
                    }
                  `}
                />

                <span className="truncate">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* =====================================================
          LOGOUT
      ===================================================== */}

      <div className="shrink-0 px-4 pt-4 pb-5 border-t border-slate-800/80">
        <button
          type="button"
          onClick={handleLogout}
          className="
            w-full
            flex
            items-center
            gap-3.5
            px-4
            py-3
            rounded-xl
            bg-red-500/90
            hover:bg-red-500
            text-white
            font-semibold
            text-sm
            transition-all
            duration-200
            shadow-md
            shadow-red-500/20
            hover:shadow-red-500/30
          "
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;