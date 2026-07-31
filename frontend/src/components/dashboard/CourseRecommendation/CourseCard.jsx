import {
  GraduationCap,
  ExternalLink,
  BookOpen,
} from "lucide-react";

function CourseCard({ course, index }) {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 hover:border-cyan-500/50 transition">

      {/* Header */}

      <div className="flex items-start justify-between gap-4">

        <div className="flex items-start gap-4">

          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0">
            <GraduationCap
              size={25}
              className="text-cyan-400"
            />
          </div>

          <div>

            <p className="text-sm text-cyan-400 mb-1">
              Recommendation #{index + 1}
            </p>

            <h3 className="text-xl font-bold text-white">
              {course.course_name}
            </h3>

            <p className="text-slate-400 mt-2">
              Recommended for{" "}
              <span className="text-white font-medium">
                {course.skill}
              </span>
            </p>

          </div>

        </div>

      </div>

      {/* Details */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">

        <div className="bg-slate-800 rounded-xl p-4">

          <p className="text-xs text-slate-500 uppercase mb-1">
            Platform
          </p>

          <p className="font-semibold text-white">
            {course.platform}
          </p>

        </div>

        <div className="bg-slate-800 rounded-xl p-4">

          <p className="text-xs text-slate-500 uppercase mb-1">
            Level
          </p>

          <div className="flex items-center gap-2">

            <BookOpen
              size={17}
              className="text-violet-400"
            />

            <p className="font-semibold text-white">
              {course.level}
            </p>

          </div>

        </div>

      </div>

      {/* View Course */}

      <a
        href={course.course_url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition"
      >
        View Course
        <ExternalLink size={18} />
      </a>

    </div>
  );
}

export default CourseCard;