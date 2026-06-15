import { useEffect, useRef } from "react";

const partners = [
  { name: "University of Oxford", abbr: "Oxford" },
  { name: "MIT", abbr: "MIT" },
  { name: "University of Toronto", abbr: "U of T" },
  { name: "TU Munich", abbr: "TUM" },
  { name: "University of Melbourne", abbr: "UoM" },
  { name: "Waseda University", abbr: "Waseda" },
  { name: "McGill University", abbr: "McGill" },
  { name: "Imperial College London", abbr: "Imperial" },
  { name: "NUS Singapore", abbr: "NUS" },
  { name: "ETH Zurich", abbr: "ETH" },
];

export default function PartnersBar() {
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
    <section ref={sectionRef} className="py-16 bg-[#e8edf3]/40 border-y border-[#e8edf3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="scroll-reveal text-center mb-10">
          <p className="font-sans-brand text-xs font-semibold text-[#3b6fa0] uppercase tracking-widest">
            Our University Partners
          </p>
        </div>

        <div className="scroll-reveal scroll-reveal-delay-1 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-4 items-center">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="group flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              {/* University logo placeholder with grayscale → color on hover */}
              <div className="w-12 h-12 rounded-xl bg-[#0f1b3d]/10 group-hover:bg-[#0f1b3d] transition-all duration-300 flex items-center justify-center">
                <span className="font-serif-brand text-xs font-bold text-[#0f1b3d]/40 group-hover:text-white transition-colors duration-300 text-center leading-none">
                  {partner.abbr.slice(0, 3)}
                </span>
              </div>
              <span className="font-sans-brand text-[10px] text-[#3b6fa0]/60 group-hover:text-[#3b6fa0] text-center leading-tight transition-colors duration-300 hidden lg:block">
                {partner.name.split(" ").slice(0, 2).join(" ")}
              </span>
            </div>
          ))}
        </div>

        <div className="scroll-reveal scroll-reveal-delay-2 text-center mt-8">
          <a
            href="#consultation"
            className="inline-flex items-center gap-2 font-sans-brand text-sm font-semibold text-[#3b6fa0] hover:text-[#D4AF37] transition-colors"
          >
            View all 120+ partner universities
            <svg className="w-4 h-4 text-[#D4AF37]" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}