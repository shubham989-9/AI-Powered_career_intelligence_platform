import { useEffect, useState } from "react";
import api from "../../api";

import {
  FileText,
  Briefcase,
  Target,
  UserCheck,
  Loader2,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowUpRight,
  BookOpen,
  Award,
  DollarSign,
} from "lucide-react";

function DashboardHome() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardAnalytics();
  }, []);

const fetchDashboardAnalytics = async () => {
  try {
    setLoading(true);
    setError("");

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login again.");
      return;
    }

    const response = await api.get(
      "/dashboard/analytics",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setAnalytics(response.data);

  } catch (error) {

    console.error(
      "Failed to fetch dashboard analytics:",
      error
    );

    setError(
      error.response?.data?.detail ||
      "Failed to load dashboard analytics."
    );

  } finally {
    setLoading(false);
  }
};

  const cards = [
    {
      title: "ATS Score",
      value: `${analytics?.ats_score ?? 0}%`,
      icon: Target,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20",
    },
    {
      title: "Resume Status",
      value: analytics?.resume_status ?? "Not Uploaded",
      icon: FileText,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
    {
      title: "JD Status",
      value: analytics?.job_description_status ?? "Not Added",
      icon: Briefcase,
      color: "text-violet-400",
      bg: "bg-violet-500/10",
      border: "border-violet-500/20",
    },
    {
      title: "Profile Completion",
      value: `${analytics?.profile_completion ?? 0}%`,
      icon: UserCheck,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
  ];

  return (
    <main className="p-6 sm:p-8 text-white max-w-7xl mx-auto space-y-8 font-sans">

      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2">
          Dashboard Overview
          <Sparkles className="text-cyan-400" size={20} />
        </h1>

        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          Track your resume performance, skill readiness, and career growth.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <div
              key={index}
              className="bg-slate-900/60 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-5 transition-all shadow-lg backdrop-blur-xl group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {card.title}
                </span>

                <div
                  className={`w-10 h-10 rounded-xl ${card.bg} border ${card.border} flex items-center justify-center transition-transform group-hover:scale-105`}
                >
                  <Icon size={20} className={card.color} />
                </div>
              </div>

              <div className="mt-4">
                <p className="text-2xl font-black text-slate-100 tracking-tight">
                  {card.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Salary Prediction */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-xl shadow-xl">

        <div className="absolute -top-20 -right-20 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative">

          <div className="flex items-center justify-between">

            <div>
              <div className="flex items-center gap-2">

                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                  <DollarSign
                    size={20}
                    className="text-cyan-400"
                  />
                </div>

                <div>
                  <h2 className="text-base font-bold text-slate-100">
                    AI Salary Prediction
                  </h2>

                  <p className="text-xs text-slate-400 mt-0.5">
                    Estimated from your uploaded resume
                  </p>
                </div>
              </div>
            </div>

            <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
              {analytics?.salary_prediction?.market_position ||
                "Developing"}
            </span>

          </div>

          <div className="mt-7">

            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Estimated Annual Salary
            </p>

            <div className="flex flex-wrap items-baseline gap-2 mt-2">

              <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                ₹
                {(
                  (analytics?.salary_prediction?.estimated_min || 0) /
                  100000
                ).toFixed(1)}
                L
              </span>

              <span className="text-slate-500 text-xl font-medium">
                —
              </span>

              <span className="text-3xl sm:text-4xl font-black text-cyan-400 tracking-tight">
                ₹
                {(
                  (analytics?.salary_prediction?.estimated_max || 0) /
                  100000
                ).toFixed(1)}
                L
              </span>

              <span className="text-sm text-slate-400 font-medium">
                / year
              </span>

            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Confidence */}
            <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-4">

              <div className="flex items-center justify-between mb-2">

                <span className="text-xs text-slate-400">
                  Prediction Confidence
                </span>

                <span className="text-xs font-bold text-cyan-400">
                  {analytics?.salary_prediction?.confidence || 0}%
                </span>

              </div>

              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-700"
                  style={{
                    width: `${Math.min(
                      analytics?.salary_prediction?.confidence || 0,
                      100
                    )}%`,
                  }}
                />

              </div>
            </div>

            {/* Insight */}
            <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-4">

              <div className="flex items-start gap-2">

                <Sparkles
                  size={16}
                  className="text-cyan-400 mt-0.5 flex-shrink-0"
                />

                <p className="text-xs text-slate-400 leading-relaxed">
                  {analytics?.salary_prediction?.insight ||
                    "Upload your resume to get a salary prediction."}
                </p>

              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Skills Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Matching Skills */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl shadow-xl">

          <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-800/80">

            <div>
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <CheckCircle2
                  size={18}
                  className="text-emerald-400"
                />
                Matching Skills
              </h2>

              <p className="text-xs text-slate-400 mt-0.5">
                Skills in your resume matching target requirements
              </p>
            </div>

            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
              {analytics?.matching_skills?.length || 0}
            </span>

          </div>

          {analytics?.matching_skills?.length > 0 ? (
            <div className="flex flex-wrap gap-2.5">
              {analytics.matching_skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium capitalize flex items-center gap-1.5"
                >
                  <span className="text-emerald-400 font-bold">
                    ✓
                  </span>
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-4 text-center">
              <p className="text-xs text-slate-400">
                No matching skills detected yet.
              </p>
            </div>
          )}

        </div>

        {/* Missing Skills */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl shadow-xl">

          <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-800/80">

            <div>
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <XCircle
                  size={18}
                  className="text-amber-400"
                />
                Missing Skills
              </h2>

              <p className="text-xs text-slate-400 mt-0.5">
                Recommended skills to bridge your career gap
              </p>
            </div>

            <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
              {analytics?.missing_skills?.length || 0}
            </span>

          </div>

          {analytics?.missing_skills?.length > 0 ? (
            <div className="flex flex-wrap gap-2.5">
              {analytics.missing_skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium capitalize flex items-center gap-1.5"
                >
                  <span className="text-amber-400 font-bold">
                    !
                  </span>
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
              <p className="text-xs text-emerald-300 font-medium">
                Great job! No missing skills detected.
              </p>
            </div>
          )}

        </div>

      </div>

      {/* Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recommended Careers */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl shadow-xl">

          <div className="mb-5 pb-4 border-b border-slate-800/80">

            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Award
                size={18}
                className="text-cyan-400"
              />
              Recommended Careers
            </h2>

            <p className="text-xs text-slate-400 mt-0.5">
              Career paths aligned with your current profile
            </p>

          </div>

          {analytics?.recommended_careers?.length > 0 ? (
            <div className="space-y-3">

              {analytics.recommended_careers.map(
                (career, index) => (
                  <div
                    key={index}
                    className="bg-slate-800/50 border border-slate-800 hover:border-slate-700/80 rounded-xl p-4 transition-all"
                  >

                    <div className="flex items-center justify-between gap-3">

                      <div>

                        <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                          Path #{index + 1}
                        </span>

                        <h3 className="text-sm font-bold text-slate-100 mt-0.5">
                          {career.career}
                        </h3>

                      </div>

                      <div className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                        <span className="text-cyan-300 font-bold text-xs">
                          {career.match_percentage}% Match
                        </span>
                      </div>

                    </div>

                    <div className="mt-3">

                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">

                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.min(
                              career.match_percentage,
                              100
                            )}%`,
                          }}
                        />

                      </div>

                    </div>

                  </div>
                )
              )}

            </div>
          ) : (
            <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-4 text-center">
              <p className="text-xs text-slate-400">
                No career recommendations available yet.
              </p>
            </div>
          )}

        </div>

        {/* Recommended Courses */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl shadow-xl">

          <div className="mb-5 pb-4 border-b border-slate-800/80">

            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <BookOpen
                size={18}
                className="text-violet-400"
              />
              Recommended Courses
            </h2>

            <p className="text-xs text-slate-400 mt-0.5">
              Handpicked learning modules to upskill
            </p>

          </div>

          {analytics?.recommended_courses?.length > 0 ? (
            <div className="space-y-3">

              {analytics.recommended_courses.map(
                (course, index) => (
                  <div
                    key={index}
                    className="bg-slate-800/50 border border-slate-800 hover:border-slate-700/80 rounded-xl p-4 transition-all"
                  >

                    <div className="flex items-start justify-between gap-3">

                      <div>

                        <span className="text-[10px] font-bold text-violet-400 uppercase tracking-wider">
                          {course.skill}
                        </span>

                        <h3 className="text-sm font-bold text-slate-100 mt-0.5">
                          {course.course_name}
                        </h3>

                        <p className="text-xs text-slate-400 mt-1">
                          Platform:{" "}
                          <span className="text-slate-200 font-medium">
                            {course.platform}
                          </span>
                        </p>

                      </div>

                      <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                        <BookOpen
                          size={16}
                          className="text-violet-400"
                        />
                      </div>

                    </div>

                  </div>
                )
              )}

            </div>
          ) : (
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
              <p className="text-xs text-emerald-300 font-medium">
                No additional courses required at this moment.
              </p>
            </div>
          )}

        </div>

      </div>

      {/* Quick Career Action */}
      <div className="bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-900/90 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

        <div className="space-y-1">

          <div className="flex items-center gap-2">

            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              Career Readiness
            </span>

          </div>

          <h3 className="text-base font-bold text-slate-100">
            Optimize Your Resume for Upcoming Opportunities
          </h3>

          <p className="text-xs text-slate-400 max-w-xl">
            Continuously analyze your skills against job descriptions
            to keep your profile competitive.
          </p>

        </div>

        <div className="flex items-center gap-3 flex-shrink-0">

          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <ArrowUpRight size={20} />
          </div>

        </div>

      </div>

    </main>
  );
}

export default DashboardHome;