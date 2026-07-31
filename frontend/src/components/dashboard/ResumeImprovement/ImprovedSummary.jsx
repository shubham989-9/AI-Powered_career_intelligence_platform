import {
  Sparkles,
  FileText,
  Copy,
} from "lucide-react";

function ImprovedSummary({ result }) {
  const summary = result?.improved_summary || "";

  const copySummary = async () => {
    if (!summary) return;

    try {
      await navigator.clipboard.writeText(summary);
      alert("Improved summary copied!");
    } catch (error) {
      console.error("Failed to copy summary:", error);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">

      {/* Header */}

      <div className="flex items-center justify-between gap-4 mb-6">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-cyan-500/10 flex items-center justify-center">
            <Sparkles
              size={23}
              className="text-cyan-400"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">
              Improved Resume Summary
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              A stronger summary tailored to the selected job.
            </p>
          </div>

        </div>

        {summary && (
          <button
            onClick={copySummary}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 transition"
          >
            <Copy size={17} />
            Copy
          </button>
        )}

      </div>

      {/* Summary */}

      {summary ? (

        <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-5">

          <div className="flex items-start gap-3">

            <FileText
              size={20}
              className="text-violet-400 mt-1 shrink-0"
            />

            <p className="text-slate-200 leading-7">
              {summary}
            </p>

          </div>

        </div>

      ) : (

        <p className="text-slate-400">
          No improved summary available.
        </p>

      )}

    </div>
  );
}

export default ImprovedSummary;