import {
  Award,
  CheckCircle2,
  BadgeCheck,
} from "lucide-react";

function RecommendedCertifications({ result }) {
  const certifications =
    result?.recommended_certifications || [];

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">

      {/* Header */}

      <div className="flex items-center gap-3 mb-7">

        <div className="w-11 h-11 rounded-xl bg-green-500/10 flex items-center justify-center">
          <Award
            size={23}
            className="text-green-400"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            Recommended Certifications
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Certifications that can strengthen your profile
            for the selected job role.
          </p>
        </div>

      </div>

      {/* Certifications */}

      {certifications.length === 0 ? (

        <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-xl p-5">

          <CheckCircle2
            size={22}
            className="text-green-400"
          />

          <div>

            <p className="font-semibold text-green-300">
              No additional certifications recommended.
            </p>

            <p className="text-sm text-slate-400 mt-1">
              Focus on strengthening your existing skills
              and practical experience.
            </p>

          </div>

        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {certifications.map((certification, index) => (

            <div
              key={index}
              className="flex items-start gap-4 bg-slate-800/70 border border-slate-700 rounded-xl p-5"
            >

              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">

                <BadgeCheck
                  size={21}
                  className="text-green-400"
                />

              </div>

              <div>

                <p className="text-xs text-slate-500 mb-1">
                  RECOMMENDATION #{index + 1}
                </p>

                <h3 className="font-semibold text-white leading-6">
                  {certification}
                </h3>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default RecommendedCertifications;