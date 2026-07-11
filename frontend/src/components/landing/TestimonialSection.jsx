import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Software Engineer",
    text: "The AI career recommendations helped me identify the right learning path and improve my resume.",
  },
  {
    name: "Priya Patel",
    role: "Data Analyst",
    text: "The ATS analysis and skill gap insights were incredibly accurate and useful.",
  },
  {
    name: "Amit Verma",
    role: "AI Student",
    text: "This platform made career planning much easier with personalized recommendations.",
  },
];

function TestimonialSection() {
  return (
    <section className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-4">
          What Our Users Say
        </h2>

        <p className="text-center text-gray-400 mb-16">
          Trusted by students and professionals.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map((item) => (
            <div
              key={item.name}
              className="bg-slate-950 border border-slate-800 rounded-2xl p-8 hover:border-cyan-400 transition"
            >

              <div className="flex mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              <p className="text-gray-400 leading-8">
                "{item.text}"
              </p>

              <div className="mt-8">

                <h3 className="font-semibold">
                  {item.name}
                </h3>

                <p className="text-gray-500 text-sm">
                  {item.role}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default TestimonialSection;