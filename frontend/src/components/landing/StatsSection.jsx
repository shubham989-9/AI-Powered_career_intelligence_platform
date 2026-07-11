import { Users, FileCheck, Briefcase, Star } from "lucide-react";

const stats = [
  {
    icon: Users,
    number: "10K+",
    title: "Students Guided",
  },
  {
    icon: FileCheck,
    number: "50K+",
    title: "Resumes Analyzed",
  },
  {
    icon: Briefcase,
    number: "500+",
    title: "Career Paths",
  },
  {
    icon: Star,
    number: "95%",
    title: "Success Rate",
  },
];

function StatsSection() {
  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-4">
          Platform Impact
        </h2>

        <p className="text-center text-gray-400 mb-16">
          Helping students and professionals make smarter career decisions.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center hover:border-cyan-400 transition duration-300"
              >
                <Icon className="mx-auto text-cyan-400 mb-5" size={40} />

                <h3 className="text-4xl font-bold mb-3">
                  {item.number}
                </h3>

                <p className="text-gray-400">
                  {item.title}
                </p>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default StatsSection;