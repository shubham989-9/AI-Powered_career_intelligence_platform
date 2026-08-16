import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  FileText,
  Briefcase,
  Target,
  Brain,
  TrendingUp,
  Award,
  Loader2,
  AlertCircle,
} from "lucide-react";

import api from "../../api";

export default function DashboardAnalytics() {
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError("");

      if (!token) {
        setError("Authentication token not found. Please login again.");
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
        "Dashboard Analytics Error:",
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

  // ============================
  // LOADING
  // ============================

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        <div className="flex flex-col items-center gap-3">
          <Loader2
            className="animate-spin text-cyan-400"
            size={40}
          />

          <p className="text-slate-400 text-sm">
            Loading dashboard analytics...
          </p>
        </div>
      </div>
    );
  }

  // ============================
  // ERROR
  // ============================

  if (error) {
    return (
      <div className="min-h-screen p-6 text-white">
        <div className="max-w-4xl mx-auto">

          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">

            <div className="flex items-center gap-3">

              <AlertCircle
                className="text-red-400"
                size={24}
              />

              <div>
                <h2 className="font-bold text-red-300">
                  Unable to Load Analytics
                </h2>

                <p className="text-slate-400 text-sm mt-1">
                  {error}
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    );
  }

  // ============================
  // DASHBOARD
  // ============================

  return (
    <div
      className="min-h-screen p-6 text-white"
      style={{
        background:
          "radial-gradient(circle at top left,#7c3aed22,transparent 40%), radial-gradient(circle at bottom right,#06b6d422,transparent 35%), #050816",
      }}
    >
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="mb-8">

          <h1 className="text-4xl font-black">
            Dashboard Analytics
          </h1>

          <p className="text-slate-400 mt-2">
            Track your career progress and AI-powered insights.
          </p>

        </div>

        {/* STAT CARDS */}

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          <StatCard
            icon={<FileText />}
            title="Total Resumes"
            value={analytics?.total_resumes ?? 0}
          />

          <StatCard
            icon={<Briefcase />}
            title="Job Descriptions"
            value={analytics?.total_jobs ?? 0}
          />

          <StatCard
            icon={<Target />}
            title="Average ATS"
            value={`${analytics?.ats_average ?? 0}%`}
          />

          <StatCard
            icon={<Brain />}
            title="Career Match"
            value={`${analytics?.career_match ?? 0}%`}
          />

          <StatCard
            icon={<TrendingUp />}
            title="Skill Gap"
            value={`${analytics?.skill_gap ?? 0}%`}
          />

          <StatCard
            icon={<Award />}
            title="Recommended Jobs"
            value={analytics?.recommended_jobs ?? 0}
          />

        </div>

      </div>
    </div>
  );
}


// ======================================
// STAT CARD
// ======================================

function StatCard({
  icon,
  title,
  value,
}) {
  return (
    <motion.div
      whileHover={{
        scale: 1.03,
      }}
      transition={{
        duration: 0.2,
      }}
      className="rounded-3xl bg-slate-900 border border-slate-700 p-6 shadow-xl"
    >

      <div className="flex justify-between items-center">

        <div>

          <p className="text-slate-400">
            {title}
          </p>

          <h2 className="text-4xl font-black mt-2">
            {value}
          </h2>

        </div>

        <div className="p-4 rounded-2xl bg-cyan-500/20 text-cyan-400">
          {icon}
        </div>

      </div>

    </motion.div>
  );
}