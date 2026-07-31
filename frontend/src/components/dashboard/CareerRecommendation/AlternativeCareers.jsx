function AlternativeCareers({ result }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4">
        Alternative Careers
      </h2>

      <div className="flex flex-wrap gap-3">
        {result.alternative_careers.map((career, index) => (
          <span
            key={index}
            className="bg-blue-600 px-4 py-2 rounded-lg"
          >
            {career}
          </span>
        ))}
      </div>
    </div>
  );
}

export default AlternativeCareers;