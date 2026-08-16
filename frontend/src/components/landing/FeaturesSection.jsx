import { motion } from "framer-motion";
import {
  FileSearch,
  Target,
  FilePlus2,
  Sparkles,
  BrainCircuit,
  BriefcaseBusiness,
  GraduationCap,
  LayoutDashboard,
  ArrowUpRight,
} from "lucide-react";

const FEATURES = [
  {
    icon: FileSearch,
    title: "ATS Resume Analysis",
    description:
      "Compare your resume with a job description and understand your ATS compatibility with a clear match score.",
    tag: "Resume Intelligence",
  },
  {
    icon: Target,
    title: "Skill Gap Analysis",
    description:
      "Identify matching and missing skills, then understand what you should learn next for your target role.",
    tag: "Skill Intelligence",
  },
  {
    icon: FilePlus2,
    title: "AI Resume Builder",
    description:
      "Create a professional, ATS-friendly resume with structured sections for your profile, skills, education, projects, experience, and certifications.",
    tag: "Build Your Resume",
    featured: true,
  },
  {
    icon: Sparkles,
    title: "Resume Improvement",
    description:
      "Improve your summary, keywords, project descriptions, and certifications with actionable AI-powered suggestions.",
    tag: "Resume Growth",
  },
  {
    icon: BrainCircuit,
    title: "Career Recommendation",
    description:
      "Analyze education, skills, and experience to discover career roles aligned with your profile.",
    tag: "AI Guidance",
  },
  {
    icon: BriefcaseBusiness,
    title: "Job Recommendation",
    description:
      "Find relevant opportunities by matching your skills, qualifications, experience, and preferred location.",
    tag: "Opportunity Matching",
  },
  {
    icon: GraduationCap,
    title: "Course Recommendation",
    description:
      "Turn your skill gaps into a practical learning path with courses relevant to your career goals.",
    tag: "Learning Path",
  },
  {
    icon: LayoutDashboard,
    title: "Career Intelligence Dashboard",
    description:
      "Bring ATS score, profile completion, matching skills, missing skills, careers, and courses into one intelligent view.",
    tag: "One Dashboard",
  },
];

function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-[#0d0920] px-6 py-24 text-white lg:px-8"
    >
      {/* Ambient background */}
      <motion.div
        animate={{ x: [0, 25, 0], y: [0, -15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-[120px]"
      />

      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 18, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[130px]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.05] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300">
            <Sparkles size={12} />
            Everything you need to grow
          </span>

          <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            Your complete
            <span className="block bg-gradient-to-r from-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
              career toolkit.
            </span>
          </h2>

          <p className="mt-5 text-sm leading-6 text-slate-400 sm:text-base">
            Build your resume, analyze your profile, discover career paths,
            find relevant jobs, close skill gaps, and track your progress from
            one intelligent platform.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.05,
                }}
                whileHover={{ y: -5 }}
                className={`group relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 ${
                  feature.featured
                    ? "border-fuchsia-400/35 bg-gradient-to-br from-fuchsia-500/[0.12] via-white/[0.04] to-cyan-400/[0.06] shadow-[0_20px_70px_rgba(217,70,239,.10)]"
                    : "border-white/10 bg-white/[0.025] hover:border-cyan-400/20 hover:bg-white/[0.045] hover:shadow-[0_18px_50px_rgba(8,15,35,.35)]"
                }`}
              >
                {/* Card glow */}
                <div
                  className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl transition-all duration-500 ${
                    feature.featured
                      ? "bg-fuchsia-500/15 group-hover:bg-fuchsia-400/25"
                      : "bg-cyan-500/5 group-hover:bg-cyan-400/15"
                  }`}
                />

                {/* Shine */}
                <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.035] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                <div className="relative">
                  {/* Icon + number */}
                  <div className="flex items-center justify-between">
                    <motion.div
                      whileHover={{ rotate: -5, scale: 1.08 }}
                      className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-colors ${
                        feature.featured
                          ? "border-fuchsia-400/25 bg-fuchsia-400/10"
                          : "border-cyan-400/15 bg-cyan-400/10 group-hover:border-cyan-400/30 group-hover:bg-cyan-400/15"
                      }`}
                    >
                      <Icon
                        size={20}
                        className={
                          feature.featured
                            ? "text-fuchsia-300"
                            : "text-cyan-300"
                        }
                      />
                    </motion.div>

                    <span
                      className={`text-[9px] font-black tracking-[0.18em] ${
                        feature.featured
                          ? "text-fuchsia-300/60"
                          : "text-slate-700"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Tag */}
                  <p className="mt-6 text-[9px] font-bold uppercase tracking-[0.17em] text-fuchsia-300">
                    {feature.tag}
                  </p>

                  {/* Title */}
                  <h3 className="mt-2 flex items-center gap-1.5 text-lg font-black tracking-tight">
                    {feature.title}
                    {feature.featured && (
                      <Sparkles
                        size={13}
                        className="text-fuchsia-300"
                      />
                    )}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {feature.description}
                  </p>

                  {/* Bottom indicator */}
                  <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4">
                    {feature.featured ? (
                      <span className="rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-2.5 py-1 text-[9px] font-bold text-fuchsia-300">
                        Core Feature
                      </span>
                    ) : (
                      <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-600">
                        HirePulse AI
                      </span>
                    )}

                    <ArrowUpRight
                      size={15}
                      className="text-slate-700 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-300"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;