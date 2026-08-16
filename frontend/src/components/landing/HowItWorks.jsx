import { motion } from "framer-motion";
import {
  UploadCloud,
  ScanSearch,
  Target,
  FilePlus2,
  Rocket,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UploadCloud,
    title: "Upload your resume",
    text: "Start with your existing resume and target role.",
  },
  {
    number: "02",
    icon: ScanSearch,
    title: "Analyze your profile",
    text: "Get ATS insights, skill matching, and profile intelligence.",
  },
  {
    number: "03",
    icon: Target,
    title: "Find your gaps",
    text: "Discover missing skills and the career paths that fit you.",
  },
  {
    number: "04",
    icon: FilePlus2,
    title: "Build & improve",
    text: "Create an ATS-ready resume and improve it with AI guidance.",
  },
  {
    number: "05",
    icon: Rocket,
    title: "Move forward",
    text: "Explore relevant jobs, courses, and your next career move.",
  },
];

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-[#100a24] px-6 py-24 text-white lg:px-8"
    >
      {/* Ambient glow */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-[35%] top-0 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-[130px]"
      />

      <motion.div
        animate={{ x: [0, -25, 0], y: [0, 20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute bottom-[-15%] right-[-5%] h-80 w-80 rounded-full bg-cyan-500/10 blur-[130px]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.05] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-300">
            <CheckCircle2 size={12} />
            How HirePulse works
          </span>

          <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            From resume to
            <span className="block bg-gradient-to-r from-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
              career direction.
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            One simple flow connects your resume, skills, career goals,
            opportunities, and learning path.
          </p>
        </motion.div>

        {/* Desktop timeline */}
        <div className="relative mt-14 hidden lg:block">
          <div className="absolute left-[10%] right-[10%] top-[46px] h-px bg-gradient-to-r from-cyan-400/10 via-fuchsia-400/40 to-cyan-400/10" />

          <div className="grid grid-cols-5 gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.07,
                  }}
                  className="group relative"
                >
                  {/* Timeline node */}
                  <div className="relative z-10 mx-auto flex h-[92px] w-[92px] items-center justify-center rounded-full border border-white/10 bg-[#100a24] shadow-xl">
                    <motion.div
                      whileHover={{ scale: 1.08, rotate: -5 }}
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${
                        index === 4
                          ? "border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-300"
                          : "border-cyan-400/20 bg-cyan-400/10 text-cyan-300"
                      }`}
                    >
                      <Icon size={23} />
                    </motion.div>
                  </div>

                  {/* Number */}
                  <p className="mt-5 text-center text-[9px] font-black uppercase tracking-[0.2em] text-slate-600">
                    Step {step.number}
                  </p>

                  {/* Card */}
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="mt-3 rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition-all duration-300 group-hover:border-cyan-400/20 group-hover:bg-white/[0.04]"
                  >
                    <h3 className="text-base font-black">{step.title}</h3>

                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      {step.text}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-slate-600">
                        HirePulse AI
                      </span>
                      <ArrowRight
                        size={14}
                        className="text-slate-700 transition group-hover:translate-x-1 group-hover:text-cyan-300"
                      />
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Tablet/mobile */}
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:hidden">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                }}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition hover:-translate-y-1 hover:border-cyan-400/20"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/10 text-cyan-300">
                    <Icon size={20} />
                  </div>

                  <span className="text-[9px] font-black tracking-[0.18em] text-slate-600">
                    STEP {step.number}
                  </span>
                </div>

                <h3 className="mt-6 text-base font-black">{step.title}</h3>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  {step.text}
                </p>

                <div className="mt-5 flex items-center gap-2 text-[9px] font-bold uppercase tracking-wider text-cyan-300/70">
                  <span className="h-px w-5 bg-cyan-400/30" />
                  HirePulse AI
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;