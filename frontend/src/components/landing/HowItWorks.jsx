import { Upload, Brain, Target, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Resume",
    description: "Upload your resume securely in PDF or DOCX format.",
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description: "Our AI analyzes skills, ATS score and identifies skill gaps.",
  },
  {
    icon: Target,
    title: "Career Recommendation",
    description: "Receive personalized job roles and learning recommendations.",
  },
  {
    icon: TrendingUp,
    title: "Grow Your Career",
    description: "Improve your resume, skills and increase your career opportunities.",
  },
];

function HowItWorks() {
  return (
    <section
  id="about"
  className="py-24 bg-slate-900"
>
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-4">
          How It Works
        </h2>

        <p className="text-center text-gray-400 mb-16">
          Four simple steps to accelerate your career using AI.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="bg-slate-950 rounded-2xl border border-slate-800 p-8 text-center hover:border-cyan-400 transition"
              >
                <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center mx-auto mb-6">
                  <Icon size={30} className="text-cyan-400" />
                </div>

                <div className="text-cyan-400 font-bold text-lg mb-3">
                  Step {index + 1}
                </div>

                <h3 className="text-xl font-semibold mb-3">
                  {step.title}
                </h3>

                <p className="text-gray-400 text-sm leading-7">
                  {step.description}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;