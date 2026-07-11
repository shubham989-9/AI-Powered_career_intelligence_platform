function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <div className="grid lg:grid-cols-2 min-h-screen">

        {/* LEFT SIDE */}

        <div className="hidden lg:flex flex-col justify-center px-20 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950">

          <h1 className="text-5xl font-bold leading-tight">
            Build Your
            <br />
            <span className="text-cyan-400">
              Dream Career
            </span>
          </h1>

          <p className="text-gray-400 mt-6 text-lg leading-8">
            AI Powered Career Intelligence Platform helping students
            analyze resumes, identify skill gaps and discover the best
            career opportunities.
          </p>

          <div className="mt-12 space-y-5">

            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
              <span>Resume ATS Score</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
              <span>Skill Gap Analysis</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
              <span>Career Recommendation</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
              <span>Salary Prediction</span>
            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="flex items-center justify-center p-8">

          <div className="w-full max-w-md bg-slate-900 rounded-2xl border border-slate-800 p-8 shadow-2xl">

            <h2 className="text-4xl font-bold">
              {title}
            </h2>

            <p className="text-gray-400 mt-2">
              {subtitle}
            </p>

            <div className="mt-8">

              {children}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AuthLayout;