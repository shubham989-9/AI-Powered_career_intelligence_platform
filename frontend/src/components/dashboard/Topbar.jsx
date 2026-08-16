import {
  User,
  Bell,
  UserCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Topbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleProfileClick = () => {
    navigate("/dashboard/profile");
  };

  return (
    <header
      className="
        relative
        overflow-hidden
        flex
        items-center
        justify-between
        bg-slate-900
        border-b
        border-slate-800
        px-8
        py-5
        topbar-shock
      "
    >
      {/* Electric colour transition */}
      <div className="shock-wave pointer-events-none">
        <div className="shock-line"></div>
      </div>

      {/* Left */}
      <div className="relative z-10">

        <h2 className="text-3xl font-bold text-white">
          Dashboard
        </h2>

        <button
          type="button"
          onClick={handleProfileClick}
          className="
            flex
            items-center
            gap-3
            mt-2
            text-white
            hover:text-cyan-400
            transition-colors
          "
        >
          <User size={20} />
          <span>Profile</span>
        </button>

        <p className="text-gray-400 mt-1">
          Welcome back, {user?.name || "User"} 👋
        </p>

      </div>

      {/* Right */}
      <div className="relative z-10 flex items-center gap-5">

        {/* Notification */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative group"
        >
          <Bell
            size={24}
            className="
              text-gray-300
              group-hover:text-cyan-400
              transition-colors
            "
          />

          <span
            className="
              absolute
              -top-1
              -right-1
              w-3
              h-3
              rounded-full
              bg-red-500
            "
          />
        </button>

        {/* Profile */}
        <button
          type="button"
          onClick={handleProfileClick}
          aria-label="Open Profile"
          className="
            rounded-full
            cursor-pointer
            hover:scale-105
            transition-transform
          "
        >
          <UserCircle2
            size={38}
            className="
              text-cyan-400
              hover:text-cyan-300
              transition-colors
            "
          />
        </button>

      </div>
    </header>
  );
}

export default Topbar;