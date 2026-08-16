import { useState } from "react";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");

  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/[0.08] bg-[#0d0920]/80 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 lg:px-8">
        {/* Brand */}
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="group flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/15 to-fuchsia-400/15 transition group-hover:border-cyan-400/40">
            <Sparkles size={17} className="text-cyan-300" />
          </div>

          <div className="text-xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-cyan-300 to-fuchsia-400 bg-clip-text text-transparent">
              Hire
            </span>
            <span className="text-white">Pulse</span>
          </div>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {[
            ["Home", "home"],
            ["Features", "features"],
            ["How It Works", "how-it-works"],
            ["Resume Builder", "resume-builder"],
          ].map(([label, id]) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="rounded-lg px-3.5 py-2 text-xs font-semibold text-slate-400 transition hover:bg-white/[0.04] hover:text-white"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          {!token ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-3 py-2 text-xs font-bold text-slate-300 transition hover:text-cyan-300"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-black text-slate-950 shadow-lg shadow-black/10 transition hover:scale-[1.03] hover:bg-cyan-50"
              >
                Get Started
                <ArrowRight
                  size={14}
                  className="transition group-hover:translate-x-0.5"
                />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/dashboard")}
                className="rounded-lg px-3 py-2 text-xs font-bold text-slate-300 transition hover:text-cyan-300"
              >
                Dashboard
              </button>

              <button
                onClick={handleLogout}
                className="rounded-xl border border-red-400/15 bg-red-400/5 px-4 py-2.5 text-xs font-bold text-red-300 transition hover:border-red-400/25 hover:bg-red-400/10"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 transition hover:text-white md:hidden"
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-white/[0.08] bg-[#100a24]/95 px-5 pb-5 pt-3 backdrop-blur-2xl md:hidden">
          {[
            ["Home", "home"],
            ["Features", "features"],
            ["How It Works", "how-it-works"],
            ["Resume Builder", "resume-builder"],
          ].map(([label, id]) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="block w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-300 transition hover:bg-white/[0.04] hover:text-white"
            >
              {label}
            </button>
          ))}

          <div className="mt-3 border-t border-white/[0.08] pt-3">
            {!token ? (
              <>
                <button
                  onClick={() => {
                    navigate("/login");
                    setMenuOpen(false);
                  }}
                  className="block w-full rounded-xl px-4 py-3 text-left text-sm font-bold text-slate-300"
                >
                  Login
                </button>

                <button
                  onClick={() => {
                    navigate("/register");
                    setMenuOpen(false);
                  }}
                  className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-black text-slate-950"
                >
                  Get Started
                  <ArrowRight size={15} />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate("/dashboard");
                    setMenuOpen(false);
                  }}
                  className="block w-full rounded-xl px-4 py-3 text-left text-sm font-bold text-slate-300"
                >
                  Dashboard
                </button>

                <button
                  onClick={handleLogout}
                  className="mt-1 block w-full rounded-xl bg-red-400/10 px-4 py-3 text-left text-sm font-bold text-red-300"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;