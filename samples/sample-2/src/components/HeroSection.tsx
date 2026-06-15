import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const heroSlides = [
  {
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_820bf824e9_07126f9c4ed32dea.png",
    alt: "Sun-drenched university campus",
    top: { title: "98%", text: "Visa Success" },
    bottom: { title: "Oxford Admitted", text: "Class of 2024 - Priya S." },
  },
  {
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_1ade2b7da2_0083f41214e369b8.png",
    alt: "Australian university study destination",
    top: { title: "43", text: "Australian Universities" },
    bottom: { title: "Scholarship Won", text: "$15,000 award secured" },
  },
  {
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_b6e0a1b0fa_6a67b4d5a2618134.png",
    alt: "Canadian city campus study destination",
    top: { title: "PR", text: "Pathway Guidance" },
    bottom: { title: "Co-op Ready", text: "Work-study roadmap" },
  },
  {
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_e102764dba_37c76389420d80dc.png",
    alt: "United Kingdom university campus",
    top: { title: "160+", text: "UK Institutions" },
    bottom: { title: "Russell Group", text: "Shortlist support" },
  },
  {
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_2717193255_aac3ccec3f9cb80b.png",
    alt: "Japanese study destination campus",
    top: { title: "MEXT", text: "Scholarship Prep" },
    bottom: { title: "Japan Ready", text: "Language and visa plan" },
  },
];

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const heroSlide = heroSlides[heroSlideIndex];

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const timer = setTimeout(() => {
      el.querySelectorAll(".hero-reveal").forEach((node) => {
        (node as HTMLElement).style.opacity = "1";
        (node as HTMLElement).style.transform = "translateY(0)";
        (node as HTMLElement).style.filter = "blur(0px)";
      });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setHeroSlideIndex((current) => (current + 1) % heroSlides.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center bg-white overflow-hidden pt-20"
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 20% 80%, #0f1b3d 0%, transparent 50%), radial-gradient(circle at 80% 20%, #3b6fa0 0%, transparent 50%)`
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[85vh] py-12">

          {/* Left: Content */}
          <div className="space-y-8 order-2 lg:order-1">
            {/* Eyebrow */}
            <div
              className="hero-reveal inline-flex items-center gap-2 bg-[#e8edf3] px-4 py-2 rounded-full"
              style={{ opacity: 0, transform: "translateY(20px)", filter: "blur(4px)", transition: "all 0.7s ease 0.1s" }}
            >
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              <span className="font-sans-brand text-xs font-semibold text-[#1e3a5f] tracking-wider uppercase">
                Trusted by 5,000+ Students Worldwide
              </span>
            </div>

            {/* Main Headline */}
            <div
              className="hero-reveal"
              style={{ opacity: 0, transform: "translateY(20px)", filter: "blur(4px)", transition: "all 0.7s ease 0.25s" }}
            >
              <h1 className="font-serif-brand text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#0f1b3d] leading-[1.1] tracking-tight">
                Your Bridge to{" "}
                <span className="relative inline-block">
                  Global
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full"
                    style={{ backgroundColor: "var(--gold)" }}
                  />
                </span>{" "}
                Education
              </h1>
            </div>

            {/* Sub-headline */}
            <div
              className="hero-reveal"
              style={{ opacity: 0, transform: "translateY(20px)", filter: "blur(4px)", transition: "all 0.7s ease 0.4s" }}
            >
              <p className="font-sans-brand text-lg text-[#3b6fa0] leading-relaxed max-w-lg font-light">
                Expert guidance for every step of your international education journey — from selecting the right university to securing your visa. We've helped thousands of students shape their futures abroad.
              </p>
            </div>

            {/* CTA Group */}
            <div
              className="hero-reveal flex flex-col sm:flex-row gap-4"
              style={{ opacity: 0, transform: "translateY(20px)", filter: "blur(4px)", transition: "all 0.7s ease 0.55s" }}
            >
              <a
                href="#consultation"
                className="inline-flex items-center justify-center gap-2 bg-[#0f1b3d] hover:bg-[#1e3a5f] text-white font-sans-brand text-sm font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-[#0f1b3d]/20 group"
              >
                Speak with an Advisor
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#destinations"
                className="inline-flex items-center justify-center gap-2 border border-[#D4AF37] text-[#0f1b3d] hover:bg-[#D4AF37] font-sans-brand text-sm font-semibold px-8 py-4 rounded-full transition-all duration-300 group"
              >
                View University Rankings
                <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:text-[#0f1b3d] group-hover:translate-x-1 transition-all" />
              </a>
            </div>

            {/* Trust indicators */}
            <div
              className="hero-reveal flex flex-wrap items-center gap-6 pt-4"
              style={{ opacity: 0, transform: "translateY(20px)", filter: "blur(4px)", transition: "all 0.7s ease 0.7s" }}
            >
              {[
                { value: "5,000+", label: "Students Placed" },
                { value: "98%", label: "Visa Success Rate" },
                { value: "120+", label: "Partner Universities" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div>
                    <p className="font-serif-brand text-2xl font-bold text-[#0f1b3d]">{stat.value}</p>
                    <p className="font-sans-brand text-xs text-[#3b6fa0] font-medium">{stat.label}</p>
                  </div>
                  <div className="w-px h-10 bg-[#e8edf3] last:hidden" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Campus Image */}
          <div
            className="hero-reveal relative order-1 lg:order-2"
            style={{ opacity: 0, transform: "translateY(20px)", filter: "blur(4px)", transition: "all 0.9s ease 0.3s" }}
          >
            {/* Gold border frame */}
            <div className="relative group">
              <div
                className="absolute -inset-3 rounded-3xl opacity-60"
                style={{ border: "2px solid var(--gold)", borderRadius: "28px" }}
              />
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] lg:aspect-[5/6] shadow-2xl">
                <img
                  key={heroSlide.image}
                  className="w-full h-full object-cover animate-hero-image-slide"
                  src={heroSlide.image}
                  alt={heroSlide.alt}
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1b3d]/30 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
                  {heroSlides.map((slide, i) => (
                    <button
                      key={slide.alt}
                      onClick={() => setHeroSlideIndex(i)}
                      aria-label={`Show sample 2 hero slide ${i + 1}`}
                      className="h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: heroSlideIndex === i ? "28px" : "8px",
                        backgroundColor: heroSlideIndex === i ? "#D4AF37" : "rgba(255,255,255,0.55)",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 lg:-left-8 transition-transform duration-300 ease-out hover:translate-x-3 hover:-translate-y-3 lg:group-hover:translate-x-5 lg:group-hover:-translate-y-4">
                <div key={`sample-2-bottom-${heroSlideIndex}`} className="bg-white rounded-2xl shadow-xl p-4 border border-[#e8edf3] animate-hero-card-slide">
                  <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#e8edf3] flex items-center justify-center">
                    <span className="text-lg">🎓</span>
                  </div>
                  <div>
                    <p className="font-serif-brand text-sm font-bold text-[#0f1b3d]">{heroSlide.bottom.title}</p>
                    <p className="font-sans-brand text-xs text-[#3b6fa0]">{heroSlide.bottom.text}</p>
                  </div>
                  </div>
                </div>
              </div>

              {/* Floating stat */}
              <div className="absolute -top-4 -right-4 lg:-right-8 transition-transform duration-300 ease-out hover:-translate-x-3 hover:translate-y-3 lg:group-hover:-translate-x-5 lg:group-hover:translate-y-4">
                <div key={`sample-2-top-${heroSlideIndex}`} className="bg-[#0f1b3d] rounded-2xl shadow-xl p-4 animate-hero-card-slide">
                  <p className="font-serif-brand text-2xl font-bold text-[#D4AF37]">{heroSlide.top.title}</p>
                  <p className="font-sans-brand text-xs text-white/80 mt-0.5">{heroSlide.top.text}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="font-sans-brand text-xs text-[#3b6fa0] tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#3b6fa0] to-transparent animate-pulse" />
      </div>
    </section>
  );
}
