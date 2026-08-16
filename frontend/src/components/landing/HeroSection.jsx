import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Target,
  BrainCircuit,
  TrendingUp,
  CheckCircle2,
  BriefcaseBusiness,
  GraduationCap,
  FileText,
} from "lucide-react";

function HeroSection() {
  const goToDashboard = () => {
    window.location.href = "/dashboard";
  };

  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="relative overflow-hidden bg-[#100b24] text-white">
      {/* Premium ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ x: [0, 25, 0], y: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[-12%] top-[-25%] h-[560px] w-[560px] rounded-full bg-fuchsia-500/10 blur-[130px]"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[-10%] top-[5%] h-[520px] w-[520px] rounded-full bg-cyan-500/10 blur-[140px]"
        />
        <div className="absolute bottom-[-35%] left-[35%] h-[500px] w-[500px] rounded-full bg-violet-500/10 blur-[130px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 pb-24 pt-20 lg:grid-cols-[1.02fr_.98fr] lg:px-8 lg:pb-28 lg:pt-24">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/25 bg-fuchsia-400/[0.06] px-4 py-2 text-xs font-bold text-fuchsia-300 backdrop-blur-xl"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fuchsia-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-fuchsia-400" />
            </span>
            <Sparkles size={14} />
            AI-powered career intelligence
          </motion.div>

          <h1 className="max-w-3xl text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            Your career.
            <span className="block bg-gradient-to-r from-fuchsia-400 via-pink-400 to-cyan-300 bg-clip-text text-transparent">
              Intelligently built.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            Analyze your resume, measure ATS compatibility, discover skill
            gaps, build a stronger resume, and find career, job, and learning
            opportunities — all from one intelligent platform.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={goToDashboard}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-fuchsia-500 px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_35px_rgba(236,72,153,.25)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(236,72,153,.35)]"
            >
              Start Building
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>

            <button
              onClick={scrollToFeatures}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-bold text-slate-200 backdrop-blur-xl transition hover:border-cyan-400/30 hover:bg-white/[0.06]"
            >
              Explore Platform
            </button>
          </div>

          <div className="mt-9 grid max-w-xl grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
            {[
              "ATS Analysis",
              "Resume Builder",
              "Skill Intelligence",
              "Career Guidance",
            ].map((item) => (
              <span
                key={item}
                className="flex items-center gap-2 text-[10px] font-semibold text-slate-500"
              >
                <CheckCircle2 size={13} className="shrink-0 text-emerald-400" />
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        {/* RIGHT — PRODUCT PREVIEW */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative"
        >
          <div className="absolute -inset-10 rounded-[45px] bg-gradient-to-r from-fuchsia-500/10 via-cyan-400/10 to-violet-500/10 blur-3xl" />

          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#15112d]/95 shadow-2xl shadow-black/40 backdrop-blur-xl">
            {/* App chrome */}
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.025] px-5 py-4">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  HirePulse
                </span>
                <span className="rounded-md border border-cyan-400/15 bg-cyan-400/10 px-2 py-1 text-[8px] font-bold text-cyan-300">
                  AI
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.8)]" />
                <span className="text-[8px] font-semibold text-slate-500">
                  Online
                </span>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                    Career intelligence
                  </p>
                  <h3 className="mt-1 text-xl font-black">
                    Your career overview
                  </h3>
                </div>

                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-right"
                >
                  <p className="text-[8px] font-semibold uppercase tracking-wider text-slate-500">
                    Profile
                  </p>
                  <p className="text-sm font-black text-cyan-300">92%</p>
                </motion.div>
              </div>

              {/* Main metrics */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                <PreviewCard
                  icon={Target}
                  label="ATS Score"
                  value="87%"
                  accent="text-fuchsia-300"
                  bg="bg-fuchsia-400/10"
                />

                <PreviewCard
                  icon={BrainCircuit}
                  label="Skill Match"
                  value="91%"
                  accent="text-cyan-300"
                  bg="bg-cyan-400/10"
                />
              </div>

              {/* Readiness */}
              <div className="mt-3 rounded-2xl border border-white/10 bg-black/10 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-300">
                      Career Readiness
                    </p>
                    <p className="mt-1 text-[10px] text-slate-500">
                      Based on your resume and skills
                    </p>
                  </div>
                  <TrendingUp size={18} className="text-emerald-400" />
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "82%" }}
                    transition={{ duration: 1.3, delay: 0.8 }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-400"
                  />
                </div>

                <div className="mt-2 flex justify-between text-[10px] text-slate-500">
                  <span>Career readiness</span>
                  <span className="font-bold text-emerald-400">82 / 100</span>
                </div>
              </div>

              {/* Career recommendation */}
              <div className="mt-3 rounded-2xl border border-fuchsia-400/15 bg-fuchsia-400/[0.04] p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-fuchsia-400/10">
                      <BriefcaseBusiness
                        size={17}
                        className="text-fuchsia-300"
                      />
                    </div>

                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                        Top career match
                      </p>
                      <p className="mt-0.5 text-sm font-black text-slate-200">
                        AI / ML Engineer
                      </p>
                    </div>
                  </div>

                  <span className="text-sm font-black text-fuchsia-300">
                    94%
                  </span>
                </div>
              </div>

              {/* Quick insights */}
              <div className="mt-3 grid grid-cols-3 gap-3">
                <MiniInsight
                  icon={FileText}
                  value="3"
                  label="Resume versions"
                />
                <MiniInsight
                  icon={BriefcaseBusiness}
                  value="8"
                  label="Job matches"
                />
                <MiniInsight
                  icon={GraduationCap}
                  value="5"
                  label="Courses"
                />
              </div>
            </div>
          </div>

          {/* Floating AI status */}
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -bottom-5 -left-4 hidden rounded-2xl border border-emerald-400/20 bg-[#111027]/95 px-4 py-3 shadow-xl backdrop-blur-xl sm:block"
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
              </span>

              <span className="text-xs font-semibold text-slate-200">
                AI analysis complete
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function PreviewCard({ icon: Icon, label, value, accent, bg }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="rounded-2xl border border-white/10 bg-white/[0.025] p-4 transition"
    >
      <div className="flex items-center justify-between">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${bg}`}
        >
          <Icon size={17} className={accent} />
        </div>

        <span className={`text-xl font-black ${accent}`}>{value}</span>
      </div>

      <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </p>
    </motion.div>
  );
}

function MiniInsight({ icon: Icon, value, label }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="rounded-2xl border border-white/10 bg-white/[0.025] p-3 transition"
    >
      <Icon size={14} className="text-cyan-300" />
      <p className="mt-2 text-lg font-black text-white">{value}</p>
      <p className="text-[8px] leading-3 text-slate-500">{label}</p>
    </motion.div>
  );
}

export default HeroSection;