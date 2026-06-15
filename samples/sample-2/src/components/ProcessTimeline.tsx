import { useEffect, useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Free Consultation",
    desc: "A 30-minute session with a senior advisor to understand your academic background, goals, and budget. No commitment required.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Profile Evaluation",
    desc: "We assess your academic history, test scores, extracurriculars, and career goals to create a personalized strategic plan.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 11l3 3L22 4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "University Shortlisting",
    desc: "Receive a curated list of 6–10 universities matched to your profile, spanning reach, target, and safety schools.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Application Support",
    desc: "Expert review of every document: personal statements, recommendation letters, transcripts, and portfolios.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="14,2 14,8 20,8" />
        <line x1="16" y1="13" x2="8" y2="13" strokeLinecap="round" />
        <line x1="16" y1="17" x2="8" y2="17" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Visa Processing",
    desc: "We handle the entire visa application — documentation, financial proof, interview prep — with our 98% approval record.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 9h20" strokeLinecap="round" />
        <path d="M6 14h4M6 17h2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "06",
    title: "Arrival & Beyond",
    desc: "Pre-departure briefing, accommodation assistance, airport coordination, and ongoing support once you land.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="9,22 9,12 15,12 15,22" />
      </svg>
    ),
  },
];

export default function ProcessTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);

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
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="scroll-reveal inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-[#D4AF37]" />
            <span className="font-sans-brand text-xs font-semibold text-[#D4AF37] tracking-widest uppercase">
              How It Works
            </span>
            <span className="w-8 h-px bg-[#D4AF37]" />
          </div>
          <h2 className="scroll-reveal scroll-reveal-delay-1 font-serif-brand text-4xl lg:text-5xl font-bold text-[#0f1b3d] leading-tight mb-4">
            Six Steps to Your{" "}
            <em className="not-italic text-[#3b6fa0]">Dream University</em>
          </h2>
          <p className="scroll-reveal scroll-reveal-delay-2 font-sans-brand text-[#3b6fa0] text-lg font-light leading-relaxed">
            A structured, transparent process designed so you always know what comes next.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-10 left-0 right-0 h-px bg-[#e8edf3]" style={{ top: "40px" }} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className={`scroll-reveal scroll-reveal-delay-${i + 1} relative flex flex-col`}
              >
                {/* Number + icon */}
                <div className="relative flex items-center gap-4 mb-5">
                  <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-3xl bg-white border-2 border-[#e8edf3] shadow-md group-hover:border-[#D4AF37] transition-colors">
                    <div className="flex flex-col items-center">
                      <span className="font-serif-brand text-xs font-bold text-[#D4AF37]">{step.number}</span>
                      <div className="text-[#1e3a5f] mt-1">{step.icon}</div>
                    </div>
                  </div>
                </div>

                <h3 className="font-serif-brand text-xl font-bold text-[#0f1b3d] mb-3">{step.title}</h3>
                <p className="font-sans-brand text-[#3b6fa0] text-sm leading-relaxed font-light">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="scroll-reveal text-center mt-14">
          <a
            href="#consultation"
            className="inline-flex items-center gap-3 bg-[#0f1b3d] hover:bg-[#1e3a5f] text-white font-sans-brand text-sm font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-[#0f1b3d]/20"
          >
            Begin Your Journey Today
            <svg className="w-4 h-4 text-[#D4AF37]" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}