import {
  FileText,
  Brain,
  Briefcase,
  IndianRupee,
  Bot,
  BookOpen,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Resume Analysis",
    desc: "Analyze resumes and improve ATS score.",
  },
  {
    icon: Brain,
    title: "Skill Gap Analysis",
    desc: "Find missing skills for your dream career.",
  },
  {
    icon: Briefcase,
    title: "Career Recommendation",
    desc: "Discover the best career path using AI.",
  },
  {
    icon: IndianRupee,
    title: "Salary Prediction",
    desc: "Predict salary based on your profile.",
  },
  {
    icon: Bot,
    title: "AI Career Assistant",
    desc: "Chat with AI for career guidance.",
  },
  {
    icon: BookOpen,
    title: "Course Recommendation",
    desc: "Get personalized learning resources.",
  },
];

function FeaturesSection() {
  return (
    <section
  id="features"
  className="py-24 bg-slate-950"
>
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-4">
          Powerful AI Features
        </h2>

        <p className="text-center text-gray-400 mb-16">
          Everything you need to build your career with Artificial Intelligence.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-cyan-400 transition duration-300"
              >
                <Icon className="text-cyan-400 mb-6" size={36} />

                <h3 className="text-2xl font-semibold mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-400">
                  {feature.desc}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default FeaturesSection;