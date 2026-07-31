import { GraduationCap } from "lucide-react";
import CourseCard from "./CourseCard";

function CourseList({ result }) {
  const courses = result?.recommended_courses || [];

  return (
    <div>

      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <div className="flex items-center gap-3">

          <GraduationCap
            size={28}
            className="text-cyan-400"
          />

          <div>
            <h2 className="text-2xl font-bold text-white">
              Recommended Courses
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              Courses recommended based on your missing skills.
            </p>
          </div>

        </div>

        <div className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
          {courses.length} Courses
        </div>

      </div>

      {/* Course Cards */}

      {courses.length === 0 ? (

        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-10 text-center">

          <GraduationCap
            size={42}
            className="mx-auto text-slate-500 mb-4"
          />

          <h3 className="text-xl font-semibold text-white">
            No Courses Required
          </h3>

          <p className="text-slate-400 mt-2">
            Your resume already contains the required skills
            for the selected Job Description.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {courses.map((course, index) => (

            <CourseCard
              key={`${course.skill}-${index}`}
              course={course}
              index={index}
            />

          ))}

        </div>

      )}

    </div>
  );
}

export default CourseList;