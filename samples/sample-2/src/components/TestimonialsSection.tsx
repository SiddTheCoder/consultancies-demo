import { useEffect, useRef, useState } from "react";
import { useConsultancyName } from "@/lib/consultancy-name";

const testimonials = [
  {
    name: "Priya Sharma",
    program: "MSc Computer Science, University of Edinburgh",
    destination: "🇬🇧 United Kingdom",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg",
    quote:
      "{consultancyName} made what seemed impossible feel completely achievable. My advisor, Sarah, guided me through every essay draft and mock visa interview. I got my offer from Edinburgh in under 8 weeks.",
    rating: 5,
  },
  {
    name: "Marcus Chen",
    program: "MBA, University of Melbourne",
    destination: "🇦🇺 Australia",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
    quote:
      "The scholarship guidance alone saved me $18,000. Their database of scholarships and tailored matching process is unlike anything I've seen from other consultancies. Worth every penny.",
    rating: 5,
  },
  {
    name: "Fatima Al-Rashid",
    program: "LLM International Law, McGill University",
    destination: "🇨🇦 Canada",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
    quote:
      "I was worried about the visa process for Canada as a single applicant. My consultant walked me through every document required and I got a 10-year multiple entry visa on my first application.",
    rating: 5,
  },
  {
    name: "Sven Müller",
    program: "MEng Mechanical Engineering, TU Munich",
    destination: "🇩🇪 Germany",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
    quote:
      "Tuition-free study in Germany sounded too good to be true. {consultancyName} helped me navigate the blocked account, language certificates, and APS evaluation seamlessly. Now I'm thriving at TU Munich.",
    rating: 5,
  },
  {
    name: "Aiko Tanaka",
    program: "International Business, Waseda University",
    destination: "🇯🇵 Japan",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg",
    quote:
      "Learning Japanese and studying at Waseda was my dream. The team helped me secure a MEXT scholarship and prepared me for the rigorous application process. I recommend them to every student I meet.",
    rating: 5,
  },
  {
    name: "James Okafor",
    program: "BSc Data Science, University of Toronto",
    destination: "🇨🇦 Canada",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg",
    quote:
      "As a first-generation international student, I had no idea where to start. {consultancyName} became my family through this process. They even helped me find a part-time job on campus during my first term.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const { consultancyName } = useConsultancyName();
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".scroll-reveal").forEach((el) => {
              el.classList.add("revealed");
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % testimonials.length);
      }, 4500);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused]);

  const visibleCount = 3;
  const visible = Array.from({ length: visibleCount }, (_, i) =>
    testimonials[(current + i) % testimonials.length]
  );

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-[#0f1b3d] relative overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#1e3a5f] opacity-40 blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#D4AF37] opacity-5 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="scroll-reveal inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-[#D4AF37]" />
            <span className="font-sans-brand text-xs font-semibold text-[#D4AF37] tracking-widest uppercase">
              Success Stories
            </span>
            <span className="w-8 h-px bg-[#D4AF37]" />
          </div>
          <h2 className="scroll-reveal scroll-reveal-delay-1 font-serif-brand text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Students Who Changed Their Lives
          </h2>
          <p className="scroll-reveal scroll-reveal-delay-2 font-sans-brand text-white/60 text-lg font-light leading-relaxed">
            Real stories from real students who trusted us with their most important decision.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {visible.map((t, i) => (
            <div
              key={t.name + current}
              className={`scroll-reveal scroll-reveal-delay-${i + 1} bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-7 flex flex-col gap-5 transition-all duration-500 hover:bg-white/10 hover:border-white/20`}
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} className="text-[#D4AF37] text-sm">★</span>
                ))}
              </div>

              {/* Quote */}
              <p className="font-sans-brand text-white/80 text-sm leading-relaxed font-light flex-1">
                &quot;{t.quote.replace("{consultancyName}", consultancyName)}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#D4AF37]/40"
                />
                <div>
                  <p className="font-serif-brand text-sm font-bold text-white">{t.name}</p>
                  <p className="font-sans-brand text-xs text-white/50 leading-tight">{t.program}</p>
                  <p className="font-sans-brand text-xs text-[#D4AF37] mt-0.5">{t.destination}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current ? "w-6 h-2 bg-[#D4AF37]" : "w-2 h-2 bg-white/30"
              }`}
            />
          ))}
        </div>

        {/* Google Reviews trust badge */}
        <div className="scroll-reveal flex items-center justify-center gap-3 mt-10 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 max-w-xs mx-auto">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <div>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-[#D4AF37] text-sm">★</span>
              ))}
            </div>
            <p className="font-sans-brand text-xs text-white/60">4.9 · 312 Google Reviews</p>
          </div>
        </div>
      </div>
    </section>
  );
}
