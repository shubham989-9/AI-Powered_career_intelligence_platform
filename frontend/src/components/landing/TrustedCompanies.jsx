import { motion } from "framer-motion";

const companies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Infosys",
  "TCS",
  "IBM",
];

function TrustedCompanies() {
  return (
    <section className="py-20 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6">

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-gray-400 text-lg mb-12"
        >
          Trusted by Students & Inspired by Top Companies
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

          {companies.map((company) => (
            <motion.div
              key={company}
              whileHover={{ scale: 1.05 }}
              className="rounded-2xl border border-slate-800 bg-slate-900/50 py-6 text-center text-gray-300 font-semibold hover:border-cyan-400 transition"
            >
              {company}
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default TrustedCompanies;