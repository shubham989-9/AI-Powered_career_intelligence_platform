import { motion } from "framer-motion";
import {
  FileSearch,
  Sparkles,
  Target,
  BriefcaseBusiness,
} from "lucide-react";

const items = [
  {
    icon: FileSearch,
    value: "ATS",
    label: "Resume Analysis",
    detail: "Compatibility",
  },
  {
    icon: Target,
    value: "AI",
    label: "Skill Intelligence",
    detail: "Skill Gaps",
  },
  {
    icon: Sparkles,
    value: "Smart",
    label: "Career Guidance",
    detail: "Career Paths",
  },
  {
    icon: BriefcaseBusiness,
    value: "Job",
    label: "Opportunity Matching",
    detail: "Relevant Roles",
  },
];

function TrustStats() {
  return (
    <section className="relative overflow-hidden border-y border-white/[0.08] bg-[#0d0920] px-6 py-5 lg:px-8">
      {/* subtle center glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.04] blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: index * 0.06,
              }}
              className={`group flex items-center justify-center gap-3 px-4 py-4 transition ${
                index > 0 ? "border-l border-white/[0.08]" : ""
              } ${index === 2 ? "border-t border-white/[0.08] md:border-t-0" : ""} ${
                index === 3 ? "border-t border-white/[0.08] md:border-t-0" : ""
              }`}
            >
              <motion.div
                whileHover={{ scale: 1.08, rotate: -4 }}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/[0.06] text-cyan-300 transition group-hover:border-cyan-400/30 group-hover:bg-cyan-400/10"
              >
                <Icon size={17} />
              </motion.div>

              <div className="min-w-0">
                <div className="flex items-baseline gap-2">
                  <p className="text-sm font-black text-white">{item.value}</p>
                  <span className="hidden text-[8px] font-bold uppercase tracking-wider text-emerald-400/80 sm:inline">
                    AI
                  </span>
                </div>

                <p className="truncate text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">
                  {item.label}
                </p>

                <p className="mt-0.5 text-[8px] text-slate-600">
                  {item.detail}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default TrustStats;