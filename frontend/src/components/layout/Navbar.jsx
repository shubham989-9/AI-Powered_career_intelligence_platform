import { Menu } from "lucide-react";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-cyan-400">
          Career<span className="text-white">AI</span>
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-gray-300">
          <li className="hover:text-cyan-400 cursor-pointer transition">Home</li>
          <li className="hover:text-cyan-400 cursor-pointer transition">Features</li>
          <li className="hover:text-cyan-400 cursor-pointer transition">About</li>
          <li className="hover:text-cyan-400 cursor-pointer transition">Contact</li>
        </ul>

        {/* Right Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button className="text-white hover:text-cyan-400 transition">
            Login
          </button>

          <button className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-5 py-2 rounded-xl font-semibold transition">
            Get Started
          </button>
        </div>

        {/* Mobile Icon */}
        <button className="md:hidden text-white">
          <Menu size={28} />
        </button>

      </div>
    </nav>
  );
}

export default Navbar;