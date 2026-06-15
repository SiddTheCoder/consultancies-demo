import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

const services = [
  {
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 3C8 3 3 8 3 14s5 11 11 11 11-5 11-11S20 3 14 3" strokeLinecap="round" />
        <path d="M9 14h10M14 9v10" strokeLinecap="round" />
        <circle cx="14" cy="14" r="3" />
      </svg>
    ),
    title: "University Selection",
    desc: "Curated shortlists based on your profile, aspirations, and career goals — matched to programs that offer the best academic and professional fit.",
    cta: "View University Rankings",
    width: "lg:col-span-2",
  },
  {
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="6" width="20" height="16" rx="2" />
        <path d="M4 11h20" strokeLinecap="round" />
        <path d="M9 16h4M9 19h6" strokeLinecap="round" />
      </svg>
    ),
    title: "Application Management",
    desc: "Full-service application coordination: essays, references, transcripts, and deadline tracking.",
    cta: "Start My Application",
    width: "lg:col-span-1",
  },
  {
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 4h16a2 2 0 0 1 2 2v2H4V6a2 2 0 0 1 2-2z" />
        <path d="M4 8v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8" />
        <path d="M10 13h8M10 17h5" strokeLinecap="round" />
      </svg>
    ),
    title: "Visa & Documentation",
    desc: "98% visa approval rate backed by meticulous documentation support, interview preparation, and country-specific visa strategy.",
    cta: "Check Visa Requirements",
    width: "lg:col-span-1",
  },
  {
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 3l3 6h6l-5 4 2 6-6-4-6 4 2-6-5-4h6z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Scholarship Guidance",
    desc: "Identify and apply for merit and need-based scholarships at partner universities worldwide.",
    cta: "Find Scholarships",
    width: "lg:col-span-1",
  },
  {
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M5 19V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v11" strokeLinecap="round" />
        <path d="M3 19h22M10 19v-5h8v5" strokeLinecap="round" />
      </svg>
    ),
    title: "Pre-Departure & Accommodation",
    desc: "Orientation, housing support, airport pick-up coordination, and settling-in guidance for every destination.",
    cta: "Plan My Arrival",
    width: "lg:col-span-2",
  },
];

export default function ServicesSection() {
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-20 lg:py-28 bg-[#e8edf3]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <div className="scroll-reveal inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-[#D4AF37]" />
            <span className="font-sans-brand text-xs font-semibold text-[#D4AF37] tracking-widest uppercase">
              Our Services
            </span>
          </div>
          <h2 className="scroll-reveal scroll-reveal-delay-1 font-serif-brand text-4xl lg:text-5xl font-bold text-[#0f1b3d] leading-tight mb-4">
            Every Step, Expertly Guided
          </h2>
          <p className="scroll-reveal scroll-reveal-delay-2 font-sans-brand text-[#3b6fa0] text-lg font-light leading-relaxed">
            From your first consultation to your first day on campus, our advisors provide hands-on support at every stage of the journey.
          </p>
        </div>

        {/* Service Grid — editorial varied widths */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`scroll-reveal scroll-reveal-delay-${i + 1} ${service.width} group bg-white rounded-3xl p-7 lg:p-8 border border-[#e8edf3] hover:border-[#D4AF37]/40 hover:shadow-xl hover:shadow-[#0f1b3d]/5 transition-all duration-300`}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-[#e8edf3] flex items-center justify-center mb-5 text-[#1e3a5f] group-hover:bg-[#D4AF37]/10 group-hover:text-[#D4AF37] transition-all duration-300">
                {service.icon}
              </div>

              <h3 className="font-serif-brand text-xl font-bold text-[#0f1b3d] mb-3">
                {service.title}
              </h3>
              <p className="font-sans-brand text-[#3b6fa0] text-sm leading-relaxed mb-5 font-light">
                {service.desc}
              </p>

              {/* Text-link CTA with gold arrow */}
              <a
                href="#consultation"
                className="inline-flex items-center gap-2 font-sans-brand text-sm font-semibold text-[#0f1b3d] group-hover:text-[#D4AF37] transition-colors"
              >
                {service.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#D4AF37]" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}