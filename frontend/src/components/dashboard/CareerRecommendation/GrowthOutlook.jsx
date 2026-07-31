function GrowthOutlook({ result }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4">
        Growth Outlook
      </h2>

      <p className="text-green-400 text-xl font-semibold">
        {result.growth_outlook}
      </p>
    </div>
  );
}

export default GrowthOutlook;