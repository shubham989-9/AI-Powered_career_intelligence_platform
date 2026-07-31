import {
  Tags,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

function MissingKeywords({ result }) {
  const keywords = result?.missing_keywords || [];

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">

      {/* Header */}

      <div className="flex items-center gap-3 mb-6">

        <div className="w-11 h-11 rounded-xl bg-orange-500/10 flex items-center justify-center">
          <Tags
            size={23}
            className="text-orange-400"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            Missing Keywords
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Add relevant keywords to improve your resume's ATS compatibility.
          </p>
        </div>

      </div>


      {/* Keywords */}

      {keywords.length === 0 ? (

        <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-xl p-5">

          <CheckCircle2
            size={22}
            className="text-green-400"
          />

          <div>
            <p className="font-semibold text-green-300">
              No important keywords are missing.
            </p>

            <p className="text-sm text-slate-400 mt-1">
              Your resume already contains the required job keywords.
            </p>
          </div>

        </div>

      ) : (

        <div>

          <div className="flex items-center gap-2 mb-4">

            <AlertCircle
              size={18}
              className="text-orange-400"
            />

            <p className="text-sm text-slate-400">
              Consider adding these keywords where they accurately describe your skills or experience.
            </p>

          </div>

          <div className="flex flex-wrap gap-3">

            {keywords.map((keyword, index) => (

              <span
                key={index}
                className="px-4 py-2 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-300 capitalize"
              >
                {keyword}
              </span>

            ))}

          </div>

        </div>

      )}

    </div>
  );
}

export default MissingKeywords;