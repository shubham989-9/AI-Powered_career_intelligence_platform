import { useState } from "react";
import { Menu, X } from "lucide-react";
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
      });
    }

    setMenuOpen(false);

  };

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");

  };

  return (

    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        <Link
          to="/"
          className="text-2xl font-bold text-cyan-400"
        >
          Career<span className="text-white">AI</span>
        </Link>

        <ul className="hidden md:flex items-center gap-8 text-gray-300">

          <li>
            <button
              onClick={() => scrollToSection("home")}
              className="hover:text-cyan-400"
            >
              Home
            </button>
          </li>

          <li>
            <button
              onClick={() => scrollToSection("features")}
              className="hover:text-cyan-400"
            >
              Features
            </button>
          </li>

          <li>
            <button
              onClick={() => scrollToSection("about")}
              className="hover:text-cyan-400"
            >
              About
            </button>
          </li>

          <li>
            <button
              onClick={() => scrollToSection("contact")}
              className="hover:text-cyan-400"
            >
              Contact
            </button>
          </li>

        </ul>

        <div className="hidden md:flex items-center gap-3">

          {!token ? (

            <>

              <button
                onClick={() => navigate("/login")}
                className="text-white hover:text-cyan-400"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-5 py-2 rounded-xl font-semibold"
              >
                Get Started
              </button>

            </>

          ) : (

            <>

              <button
                onClick={() => navigate("/dashboard")}
                className="text-white hover:text-cyan-400"
              >
                Dashboard
              </button>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl"
              >
                Logout
              </button>

            </>

          )}

        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {menuOpen && (

        <div className="md:hidden bg-slate-900 border-t border-slate-800">

          <button
            onClick={() => scrollToSection("home")}
            className="block w-full text-left px-6 py-4"
          >
            Home
          </button>

          <button
            onClick={() => scrollToSection("features")}
            className="block w-full text-left px-6 py-4"
          >
            Features
          </button>

          <button
            onClick={() => scrollToSection("about")}
            className="block w-full text-left px-6 py-4"
          >
            About
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className="block w-full text-left px-6 py-4"
          >
            Contact
          </button>

          {!token ? (

            <>

              <button
                onClick={() => navigate("/login")}
                className="block w-full text-left px-6 py-4"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                className="block w-full text-left px-6 py-4 bg-cyan-500 text-slate-950"
              >
                Get Started
              </button>

            </>

          ) : (

            <>

              <button
                onClick={() => navigate("/dashboard")}
                className="block w-full text-left px-6 py-4"
              >
                Dashboard
              </button>

              <button
                onClick={handleLogout}
                className="block w-full text-left px-6 py-4 bg-red-500"
              >
                Logout
              </button>

            </>

          )}

        </div>

      )}

    </nav>

  );
}

export default Navbar;