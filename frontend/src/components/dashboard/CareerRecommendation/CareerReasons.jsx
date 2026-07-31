function CareerReasons({ result }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4">
        Why This Career?
      </h2>

      <ul className="list-disc ml-6 space-y-2">
        {result.reasons.map((reason, index) => (
          <li key={index}>{reason}</li>
        ))}
      </ul>
    </div>
  );
}

export default CareerReasons;