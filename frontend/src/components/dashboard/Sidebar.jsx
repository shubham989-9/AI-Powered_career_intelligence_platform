import { useNavigate } from "react-router-dom";

function Sidebar({ activePage, setActivePage }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "🏠" },
    { id: "profile", label: "Profile", icon: "👤" },
    {
    id: "resume-management",
    label: "Resume Management",
    icon: "📄"
},
{
    id: "resume-analysis",
    label: "ATS Resume Analysis",
    icon: "📊"
},
    { id: "job-description", label: "Job Description", icon: "💼" },
    { id: "skill-gap", label: "Skill Gap", icon: "🧠" },
    { id: "career", label: "Career Recommendation", icon: "🎯" },
    {
  id: "job-recommendation",
  label: "Job Recommendation",
  icon: "🔎"
},
{
  id: "course-recommendation",
  label: "Course Recommendation",
  icon: "🎓"
},
{
  id: "resume-improvement",
  label: "Resume Improvement",
  icon: "✨"
},
    { id: "salary", label: "Salary Prediction", icon: "💰" },
    { id: "ai-chat", label: "AI Chat", icon: "🤖" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <aside className="w-72 min-h-screen bg-slate-900 border-r border-slate-800 p-6 flex flex-col justify-between text-white font-sans">
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-3 mb-10 px-2">
          <h1 className="text-3xl font-black text-cyan-400 tracking-tight">
            CareerAI
          </h1>
        </div>

        {/* Navigation List */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = activePage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-cyan-500 text-white font-semibold shadow-lg shadow-cyan-500/25"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout Section */}
      <div className="pt-6 border-t border-slate-800/80">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl bg-red-500/90 hover:bg-red-500 text-white font-semibold text-sm transition shadow-md shadow-red-500/20"
        >
          <span className="text-lg">🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;