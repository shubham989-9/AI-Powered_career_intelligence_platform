import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import {
  FileText,
  Briefcase,
  Target,
  Brain,
  TrendingUp,
  Award,
  Loader2,
} from "lucide-react";

const API_URL = "http://127.0.0.1:8000";

export default function DashboardAnalytics() {

  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);

  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {

    fetchAnalytics();

  }, []);
  const fetchAnalytics = async () => {

  try {

    const response = await axios.get(

      `${API_URL}/dashboard/analytics`,

      {

        headers: {

          Authorization: `Bearer ${token}`

        }

      }

    );

    setAnalytics(response.data);

  }

  catch (error) {

    console.log(error);

  }

  finally {

    setLoading(false);

  }

};
if (loading) {

  return (

    <div className="flex justify-center items-center h-screen">

      <Loader2
        className="animate-spin text-cyan-400"
        size={40}
      />

    </div>

  );

}

return (

  <div
    className="min-h-screen p-6 text-white"
    style={{
      background:
        "radial-gradient(circle at top left,#7c3aed22,transparent 40%), radial-gradient(circle at bottom right,#06b6d422,transparent 35%), #050816",
    }}
  >

    <div className="max-w-7xl mx-auto">

      <h1 className="text-4xl font-black mb-8">Dashboard Analytics</h1>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        <StatCard
          icon={<FileText />}
          title="Total Resumes"
          value={analytics?.total_resumes ?? 0}
          color="cyan"
        />

        <StatCard
          icon={<Briefcase />}
          title="Job Descriptions"
          value={analytics?.total_jobs ?? 0}
          color="violet"
        />

        <StatCard
          icon={<Target />}
          title="Average ATS"
          value={`${analytics?.ats_average ?? 0}%`}
          color="green"
        />

        <StatCard
          icon={<Brain />}
          title="Career Match"
          value={`${analytics?.career_match ?? 0}%`}
          color="yellow"
        />

        <StatCard
          icon={<TrendingUp />}
          title="Skill Gap"
          value={`${analytics?.skill_gap ?? 0}%`}
          color="red"
        />

        <StatCard
          icon={<Award />}
          title="Recommended Jobs"
          value={analytics?.recommended_jobs ?? 0}
          color="blue"
        />

      </div>

    </div>

  </div>

);
}

function StatCard({ icon, title, value }) {

  return (

    <motion.div
      whileHover={{ scale: 1.03 }}
      className="rounded-3xl bg-slate-900 border border-slate-700 p-6"
    >

      <div className="flex justify-between items-center">

        <div>

          <p className="text-slate-400">{title}</p>

          <h2 className="text-4xl font-black mt-2">{value}</h2>

        </div>

        <div className="p-4 rounded-2xl bg-cyan-500/20">{icon}</div>

      </div>

    </motion.div>

  );
}
