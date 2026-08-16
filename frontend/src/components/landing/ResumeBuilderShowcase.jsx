import { motion } from "framer-motion";
import {
  FileText,
  CheckCircle2,
  Download,
  Sparkles,
  Target,
  Briefcase,
  WandSparkles,
  ArrowRight,
} from "lucide-react";

const BENEFITS = [
  "ATS-friendly structure",
  "Professional templates",
  "Skills & experience",
  "Projects & certifications",
  "Live ATS readiness",
  "PDF & Word export",
];

function ResumeBuilderShowcase() {
  return (
    <section
      id="resume-builder"
      className="relative overflow-hidden bg-[#0d0920] px-6 py-24 text-white lg:px-8"
    >
      {/* Ambient background */}
      <motion.div
        animate={{ x: [0, -25, 0], y: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px]"
      />

      <motion.div
        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-32 bottom-[-10%] h-80 w-80 rounded-full bg-fuchsia-500/10 blur-[130px]"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.86fr_1.14fr]">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/25 bg-fuchsia-400/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-fuchsia-300">
            <WandSparkles size={12} />
            AI Resume Builder
          </span>

          <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            Build a resume that
            <span className="block bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              works for you.
            </span>
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
            Create a structured, recruiter-ready resume and keep improving it
            with the intelligence from your career profile.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {BENEFITS.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-2 text-sm text-slate-300"
              >
                <CheckCircle2 size={16} className="shrink-0 text-cyan-300" />
                {item}
              </motion.div>
            ))}
          </div>

          <div className="mt-8 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs font-semibold text-slate-300">
            <Sparkles size={14} className="text-fuchsia-300" />
            Turn your career profile into a polished resume
          </div>
        </motion.div>

        {/* RIGHT — Resume preview */}
        <motion.div
          initial={{ opacity: 0, x: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="relative"
        >
          <div className="absolute -inset-8 rounded-[40px] bg-gradient-to-r from-fuchsia-500/10 via-cyan-400/10 to-violet-500/10 blur-3xl" />

          <div className="relative rounded-[28px] border border-white/10 bg-white/[0.035] p-3 shadow-2xl shadow-black/40 backdrop-blur-xl">
            {/* Builder toolbar */}
            <div className="flex items-center justify-between rounded-t-2xl border-b border-white/10 bg-[#15112d] px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-fuchsia-400/10 text-fuchsia-300">
                  <FileText size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-white">
                    Resume Builder
                  </p>
                  <p className="text-[8px] text-slate-500">
                    AI-powered workspace
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="hidden rounded-md border border-emerald-400/15 bg-emerald-400/10 px-2 py-1 text-[8px] font-bold text-emerald-300 sm:block">
                  Auto-saved
                </span>
                <div className="flex items-center gap-1.5 rounded-lg bg-white/[0.06] px-2.5 py-2 text-[8px] font-bold text-slate-300">
                  <Download size={11} />
                  Export
                </div>
              </div>
            </div>

            {/* Resume paper */}
            <div className="rounded-b-2xl bg-[#eef2f7] p-3 sm:p-5">
              <div className="mx-auto max-w-2xl rounded-sm bg-white p-5 text-slate-900 shadow-xl sm:p-7">
                {/* Header */}
                <div className="flex items-start justify-between border-b border-slate-200 pb-5">
                  <div>
                    <h3 className="text-2xl font-black tracking-tight">
                      Alex Morgan
                    </h3>

                    <p className="mt-1 text-[10px] font-black uppercase tracking-[0.16em] text-cyan-700">
                      AI / ML ENGINEER
                    </p>

                    <p className="mt-2 text-[9px] text-slate-500">
                      alex@example.com · Mumbai · LinkedIn · GitHub
                    </p>
                  </div>

                  <div className="hidden h-10 w-10 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600 sm:flex">
                    <FileText size={19} />
                  </div>
                </div>

                <div className="mt-5 grid gap-6 sm:grid-cols-[1fr_0.36fr]">
                  <div>
                    <ResumeBlock
                      title="Professional Summary"
                      text="AI/ML engineer focused on machine learning, computer vision, NLP, and production-ready intelligent systems."
                    />

                    <div className="mt-5">
                      <p className="text-[8px] font-black uppercase tracking-[0.18em] text-cyan-700">
                        Skills
                      </p>

                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {[
                          "Python",
                          "Machine Learning",
                          "TensorFlow",
                          "PyTorch",
                          "SQL",
                          "NLP",
                        ].map((skill) => (
                          <span
                            key={skill}
                            className="rounded bg-slate-100 px-2 py-1 text-[8px] font-bold text-slate-600"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5">
                      <p className="text-[8px] font-black uppercase tracking-[0.18em] text-cyan-700">
                        Projects
                      </p>

                      <div className="mt-2 space-y-2">
                        <p className="text-[10px] font-bold">
                          AI Career Intelligence Platform
                        </p>
                        <p className="text-[8px] text-slate-500">
                          Resume analysis · Recommendations · Dashboard
                        </p>

                        <p className="text-[10px] font-bold">
                          Computer Vision Project
                        </p>
                      </div>
                    </div>

                    <div className="mt-5">
                      <p className="text-[8px] font-black uppercase tracking-[0.18em] text-cyan-700">
                        Certifications
                      </p>
                      <p className="mt-2 text-[9px] text-slate-500">
                        AI / ML · Cloud · Professional Development
                      </p>
                    </div>
                  </div>

                  {/* ATS panel */}
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-[8px] font-black uppercase tracking-wider text-slate-400">
                      ATS Readiness
                    </p>

                    <p className="mt-2 text-3xl font-black text-slate-900">
                      87%
                    </p>

                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "87%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, delay: 0.3 }}
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500"
                      />
                    </div>

                    <div className="mt-6 space-y-3 text-[9px]">
                      <p className="flex items-center gap-2">
                        <Target size={12} className="text-cyan-600" />
                        Strong keywords
                      </p>

                      <p className="flex items-center gap-2">
                        <Briefcase size={12} className="text-fuchsia-600" />
                        Role aligned
                      </p>

                      <p className="flex items-center gap-2">
                        <CheckCircle2 size={12} className="text-emerald-600" />
                        Sections complete
                      </p>
                    </div>
                  </div>
                </div>

                {/* Resume footer */}
                <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">
                  <span className="text-[8px] font-bold text-slate-400">
                    ATS-ready resume workspace
                  </span>

                  <span className="inline-flex items-center gap-1 text-[8px] font-bold text-cyan-700">
                    Ready to export
                    <ArrowRight size={10} />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating quality badge */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -bottom-5 -left-4 hidden rounded-2xl border border-cyan-400/20 bg-[#111027]/95 p-4 shadow-xl backdrop-blur-xl sm:block"
          >
            <p className="text-[9px] uppercase tracking-wider text-slate-500">
              Resume quality
            </p>
            <div className="mt-1 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <p className="text-lg font-black text-cyan-300">Excellent</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ResumeBlock({ title, text }) {
  return (
    <div>
      <p className="text-[8px] font-black uppercase tracking-[0.18em] text-cyan-700">
        {title}
      </p>
      <p className="mt-2 text-[9px] leading-5 text-slate-600">{text}</p>
    </div>
  );
}

export default ResumeBuilderShowcase;