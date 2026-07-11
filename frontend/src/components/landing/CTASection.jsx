import { ArrowRight } from "lucide-react";

function CTASection() {
  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-5xl mx-auto px-6">

        <div className="rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 p-16 text-center shadow-2xl">

          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Build Your Dream Career?
          </h2>

          <p className="text-cyan-100 text-lg mb-10">
            Join thousands of students and professionals using AI to
            accelerate their career journey.
          </p>

          <button className="bg-white text-slate-900 px-8 py-4 rounded-xl font-semibold inline-flex items-center gap-2 hover:scale-105 transition">

            Get Started

            <ArrowRight size={18} />

          </button>

        </div>

      </div>
    </section>
  );
}

export default CTASection;