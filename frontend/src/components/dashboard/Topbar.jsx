import {
  LayoutDashboard,
  User,
  FileText,
  Brain,
  Briefcase,
  TrendingUp,
  MessageSquare,
  Settings,
  LogOut,
  Bell,
  Search,
  UserCircle2,
} from "lucide-react";

function Topbar() {

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="flex items-center justify-between bg-slate-900 border-b border-slate-800 px-8 py-5">

      <div>

        <h2 className="text-3xl font-bold text-white">
          Dashboard
        </h2>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition">
  <User size={20} />
  Profile
</button>

        <p className="text-gray-400 mt-1">
          Welcome back, {user?.name || "User"} 👋
        </p>

      </div>

      <div className="flex items-center gap-5">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="bg-slate-800 rounded-lg pl-10 pr-4 py-2 outline-none border border-slate-700 focus:border-cyan-400"
          />

        </div>

        <button className="relative">

          <Bell
            size={24}
            className="text-gray-300 hover:text-cyan-400 transition"
          />

          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500"></span>

        </button>

        <UserCircle2
          size={38}
          className="text-cyan-400 cursor-pointer"
        />

      </div>

    </header>
  );
}

export default Topbar;