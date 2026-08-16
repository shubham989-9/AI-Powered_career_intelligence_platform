import { motion } from "framer-motion";
import { Star, Quote, ArrowUpRight } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Software Engineer",
    text: "The AI career recommendations helped me identify the right learning path and improve my resume.",
  },
  {
    name: "Priya Patel",
    role: "Data Analyst",
    text: "The ATS analysis and skill gap insights were incredibly accurate and useful.",
  },
  {
    name: "Amit Verma",
    role: "AI Student",
    text: "This platform made career planning much easier with personalized recommendations.",
  },
];

function TestimonialSection() {
  return (
    <section className="relative overflow-hidden bg-[#100a24] px-6 py-24 text-white lg:px-8">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-fuchsia-500/7 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-[-8%] h-80 w-80 rounded-full bg-cyan-500/7 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-300">
            User experiences
          </span>

          <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            Built to make career decisions
            <span className="block bg-gradient-to-r from-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
              feel clearer.
            </span>
          </h2>

          <p className="mt-4 text-sm leading-6 text-slate-400 sm:text-base">
            Trusted by students and professionals using AI to plan their next
            career move.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition-all duration-300 hover:border-fuchsia-400/20 hover:bg-white/[0.045]"
            >
              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-fuchsia-500/5 blur-3xl transition group-hover:bg-fuchsia-500/10" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="fill-fuchsia-400 text-fuchsia-400"
                      />
                    ))}
                  </div>

                  <Quote size={20} className="text-white/10" />
                </div>

                <p className="mt-7 text-sm leading-7 text-slate-300">
                  “{item.text}”
                </p>

                <div className="mt-7 flex items-center justify-between border-t border-white/[0.07] pt-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/20 bg-gradient-to-br from-cyan-400/15 to-fuchsia-400/15 text-sm font-black text-cyan-200">
                      {item.name.charAt(0)}
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-white">
                        {item.name}
                      </h3>
                      <p className="mt-0.5 text-[10px] text-slate-500">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  <ArrowUpRight
                    size={16}
                    className="text-slate-700 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-300"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialSection;