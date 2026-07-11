import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

function HeroSection() {
  return (
    <section className="relative min-h-screen bg-slate-950 flex items-center overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-32 left-20 w-80 h-80 bg-cyan-500/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-600/20 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 text-cyan-400 mb-8">

            <Sparkles size={18} />

            AI Powered Career Platform

          </div>

          <h1 className="text-6xl font-extrabold leading-tight">

            Build Your

            <span className="block text-cyan-400">

              Dream Career

            </span>

            With Artificial Intelligence

          </h1>

          <p className="text-gray-400 text-lg mt-8 leading-8">

            Analyze resumes, identify skill gaps, receive personalized
            career recommendations, predict salary, and accelerate your
            professional growth using AI.

          </p>

          <div className="flex gap-5 mt-10">

            <button className="bg-cyan-500 hover:bg-cyan-400 transition px-8 py-4 rounded-xl font-semibold flex items-center gap-2">

              Get Started

              <ArrowRight size={18} />

            </button>

            <button className="border border-slate-700 hover:border-cyan-400 transition px-8 py-4 rounded-xl">

              Learn More

            </button>

          </div>

        </motion.div>

        {/* Right Side */}

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center"
        >

          <div className="w-[420px] h-[480px] rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 shadow-2xl flex items-center justify-center">

            <div className="text-center">

              <div className="text-7xl mb-6">

                🤖

              </div>

              <h2 className="text-3xl font-bold text-cyan-400">

                AI Dashboard

              </h2>

              <p className="text-gray-400 mt-4">

                Resume Analysis • ATS Score

                <br />

                Skill Gap • Salary Prediction

              </p>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}

export default HeroSection;