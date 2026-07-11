import {
  FileText,
  Brain,
  Briefcase,
  TrendingUp,
} from "lucide-react";

function DashboardHome() {
  const cards = [
    {
      title: "Resume Score",
      value: "85%",
      icon: <FileText size={30} />,
    },
    {
      title: "Skill Gap",
      value: "12 Skills",
      icon: <Brain size={30} />,
    },
    {
      title: "Recommended Jobs",
      value: "24 Jobs",
      icon: <Briefcase size={30} />,
    },
    {
      title: "Expected Salary",
      value: "₹8.5 LPA",
      icon: <TrendingUp size={30} />,
    },
  ];

  return (
    <main className="p-8">

      <h2 className="text-2xl font-bold mb-8">
        Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-cyan-400 transition"
          >

            <div className="text-cyan-400">
              {card.icon}
            </div>

            <h3 className="text-lg mt-5 text-gray-400">
              {card.title}
            </h3>

            <p className="text-3xl font-bold mt-2">
              {card.value}
            </p>

          </div>
        ))}

      </div>

      <div className="mt-10 bg-slate-900 border border-slate-800 rounded-xl p-8">

        <h3 className="text-xl font-bold mb-4">
          Welcome to CareerAI 🚀
        </h3>

        <p className="text-gray-400 leading-8">
          Upload your resume to receive an ATS score, identify skill gaps,
          explore personalized career recommendations, estimate salary
          potential, and generate an AI-powered learning roadmap.
        </p>

      </div>

    </main>
  );
}

export default DashboardHome;