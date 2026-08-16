import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  BrainCircuit,
  FilePlus2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function CTASection() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#0d0920] px-6 py-24 text-white lg:px-8">
      {/* Ambient glow */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.7, 0.45] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/10 blur-[130px]"
      />

      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-fuchsia-500/[0.12] via-[#15102e] to-cyan-500/[0.10] p-8 text-center shadow-2xl shadow-black/30 sm:p-12 lg:p-16"
        >
          {/* Decorative glows */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-fuchsia-500/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-cyan-500/15 blur-3xl" />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300">
              <Sparkles size={12} />
              Your next career move starts here
            </span>

            <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Ready to build your
              <span className="block bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                dream career?
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              Analyze your resume, discover your strengths, close skill gaps,
              build a stronger resume, and find the opportunities that fit you.
            </p>

            {/* Feature reassurance */}
            <div className="mx-auto mt-7 flex max-w-2xl flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] font-semibold text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-cyan-300" />
                AI-powered insights
              </span>
              <span className="inline-flex items-center gap-1.5">
                <FilePlus2 size={13} className="text-fuchsia-300" />
                Resume Builder
              </span>
              <span className="inline-flex items-center gap-1.5">
                <BrainCircuit size={13} className="text-cyan-300" />
                Career intelligence
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGetStarted}
              className="mt-9 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-black text-slate-950 shadow-xl shadow-black/20 transition hover:bg-cyan-50"
            >
              Get Started
              <ArrowRight size={18} />
            </motion.button>

            <p className="mt-4 text-[9px] font-medium uppercase tracking-[0.15em] text-slate-600">
              Start building your career intelligence
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CTASection;