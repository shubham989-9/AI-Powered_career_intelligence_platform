function BestCareerCard({ result }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4">
        Best Career Recommendation
      </h2>

      <p className="text-3xl font-bold text-green-400">
        {result.best_career}
      </p>

      <p className="mt-4 text-lg">
        Match Percentage:
        <span className="text-blue-400 font-bold">
          {" "}
          {result.match_percentage}%
        </span>
      </p>
    </div>
  );
}

export default BestCareerCard;