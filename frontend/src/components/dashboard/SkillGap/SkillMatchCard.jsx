import { Award } from "lucide-react";

function SkillMatchCard({ result }) {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">

      <div className="flex items-center gap-3 mb-5">
        <Award className="text-green-400" size={28} />

        <h2 className="text-2xl font-bold text-white">
          Skill Match
        </h2>
      </div>

      <div className="text-center">

        <h1 className="text-6xl font-bold text-cyan-400">
          {result.skill_match_percentage}%
        </h1>

        <p className="text-slate-400 mt-3">
          Your resume matches this percentage of the required skills.
        </p>

      </div>

    </div>
  );
}

export default SkillMatchCard;