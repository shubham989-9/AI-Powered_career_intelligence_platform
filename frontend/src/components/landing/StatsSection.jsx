import { motion } from "framer-motion";
import { Users, FileCheck, Briefcase, Star } from "lucide-react";

const stats = [
  {
    icon: Users,
    number: "10K+",
    title: "Students Guided",
    detail: "Career journeys",
  },
  {
    icon: FileCheck,
    number: "50K+",
    title: "Resumes Analyzed",
    detail: "Resume intelligence",
  },
  {
    icon: Briefcase,
    number: "500+",
    title: "Career Paths",
    detail: "Role discovery",
  },
  {
    icon: Star,
    number: "95%",
    title: "Success Rate",
    detail: "Career confidence",
  },
];

function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-[#0d0920] px-6 py-24 text-white lg:px-8">
      <motion.div
        animate={{ x: [0, 30, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-1/4 top-10 h-72 w-72 rounded-full bg-fuchsia-500/5 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-300">
            Platform impact
          </span>

          <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            Intelligence that turns
            <span className="block bg-gradient-to-r from-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
              into career momentum.
            </span>
          </h2>

          <p className="mt-4 text-sm leading-6 text-slate-400 sm:text-base">
            Helping students and professionals make smarter career decisions.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-6 text-center transition-all duration-300 hover:border-cyan-400/20 hover:bg-white/[0.045]"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-400/5 blur-3xl transition group-hover:bg-cyan-400/10" />

                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: -4 }}
                    className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/10"
                  >
                    <Icon size={21} className="text-cyan-300" />
                  </motion.div>

                  <h3 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
                    {item.number}
                  </h3>

                  <p className="mt-2 text-xs font-bold text-slate-300 sm:text-sm">
                    {item.title}
                  </p>

                  <p className="mt-1 text-[9px] uppercase tracking-[0.14em] text-slate-600">
                    {item.detail}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;