import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          <div>
            <h2 className="text-3xl font-bold text-cyan-400">
              CareerAI
            </h2>

            <p className="text-gray-400 mt-2">
              AI Powered Career Intelligence Platform
            </p>
          </div>

          <div className="flex gap-6 text-2xl">

            <FaGithub className="cursor-pointer hover:text-cyan-400 transition" />

            <FaLinkedin className="cursor-pointer hover:text-cyan-400 transition" />

            <FaEnvelope className="cursor-pointer hover:text-cyan-400 transition" />

          </div>

        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 text-center text-gray-500">
          © 2026 CareerAI. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;