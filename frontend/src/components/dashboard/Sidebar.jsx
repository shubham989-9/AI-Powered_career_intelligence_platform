import {
  LayoutDashboard,
  FileText,
  Brain,
  Briefcase,
  TrendingUp,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");

  };

  return (
    <aside className="w-72 min-h-screen bg-slate-900 border-r border-slate-800 p-6">

      <h1 className="text-3xl font-bold text-cyan-400 mb-10">
        CareerAI
      </h1>

      <nav className="space-y-3">

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-cyan-500 text-white">
          <LayoutDashboard size={20} />
          Dashboard
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition">
          <FileText size={20} />
          Resume Analysis
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition">
          <Brain size={20} />
          Skill Gap
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition">
          <Briefcase size={20} />
          Career Recommendation
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition">
          <TrendingUp size={20} />
          Salary Prediction
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition">
          <MessageSquare size={20} />
          AI Chat
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition">
          <Settings size={20} />
          Settings
        </button>

      </nav>

      <div className="mt-16">

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500 hover:bg-red-600 transition"
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;