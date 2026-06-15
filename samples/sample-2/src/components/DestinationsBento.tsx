import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

const destinations = [
  {
    name: "United Kingdom",
    flag: "🇬🇧",
    summary: "Home to Oxford, Cambridge & 20 Russell Group universities",
    highlight: "Top-Ranked Research",
    img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_2253a9cc25_89cf4a06e9315eaa.png",
    span: "col-span-1 row-span-2",
    textSize: "text-2xl",
  },
  {
    name: "United States",
    flag: "🇺🇸",
    summary: "Ivy League access & world-leading STEM programs",
    highlight: "Career-Focused",
    img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_8b577873ef_0930ff1b04980e05.png",
    span: "col-span-1 row-span-1",
    textSize: "text-xl",
  },
  {
    name: "Australia",
    flag: "🇦🇺",
    summary: "Vibrant student life with post-study work rights",
    highlight: "2-4 Yr Work Visa",
    img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_8860d35e82_44e717d9718662df.png",
    span: "col-span-1 row-span-1",
    textSize: "text-xl",
  },
  {
    name: "Canada",
    flag: "🇨🇦",
    summary: "Pathways to permanent residency after graduation",
    highlight: "PR Pathways",
    img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_b29d1697e3_4e8cec21e840e22d.png",
    span: "col-span-1 row-span-1",
    textSize: "text-xl",
  },
  {
    name: "Germany",
    flag: "🇩🇪",
    summary: "Tuition-free public universities with engineering excellence",
    highlight: "Low-Cost Option",
    img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_fde07c0818_394ef486442e8c32.png",
    span: "col-span-1 row-span-1",
    textSize: "text-xl",
  },
  {
    name: "Japan",
    flag: "🇯🇵",
    summary: "Blend cutting-edge tech with rich cultural immersion",
    highlight: "Cultural & Tech Hub",
    img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_072bd1a64d_42493f3ea34fa411.png",
    span: "col-span-2 row-span-1",
    textSize: "text-xl",
  },
];

export default function DestinationsBento() {
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
    <section
      id="destinations"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="scroll-reveal inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-[#D4AF37]" />
            <span className="font-sans-brand text-xs font-semibold text-[#D4AF37] tracking-widest uppercase">
              Study Destinations
            </span>
          </div>
          <h2 className="scroll-reveal scroll-reveal-delay-1 font-serif-brand text-4xl lg:text-5xl font-bold text-[#0f1b3d] leading-tight mb-4">
            The World's Best{" "}
            <em className="not-italic text-[#3b6fa0]">Universities</em>{" "}
            Are Within Reach
          </h2>
          <p className="scroll-reveal scroll-reveal-delay-2 font-sans-brand text-[#3b6fa0] text-lg font-light leading-relaxed">
            We offer end-to-end support for six premier study destinations, each with deep university partnerships and local expertise.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 grid-rows-auto lg:grid-rows-2 gap-4 lg:gap-5">
          {/* Card 0: UK — tall */}
          <BentoCard dest={destinations[0]} className="row-span-2" delay={1} />
          {/* Card 1: USA */}
          <BentoCard dest={destinations[1]} delay={2} />
          {/* Card 2: Australia */}
          <BentoCard dest={destinations[2]} delay={3} />
          {/* Card 3: Canada */}
          <BentoCard dest={destinations[3]} delay={4} />
          {/* Card 4: Germany */}
          <BentoCard dest={destinations[4]} delay={5} />
          {/* Card 5: Japan — wide */}
          <BentoCard dest={destinations[5]} className="col-span-2 lg:col-span-1" delay={6} />
        </div>
      </div>
    </section>
  );
}

function BentoCard({
  dest,
  className = "",
  delay = 1,
}: {
  dest: (typeof destinations)[0];
  className?: string;
  delay?: number;
}) {
  return (
    <div
      className={`scroll-reveal scroll-reveal-delay-${delay} bento-card-hover relative overflow-hidden rounded-3xl cursor-pointer group ${className}`}
      style={{ minHeight: "220px" }}
    >
      <img
        src={dest.img_url}
        alt={dest.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f1b3d]/90 via-[#0f1b3d]/20 to-transparent" />

      {/* Top badge */}
      <div className="absolute top-4 left-4">
        <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white border border-white/30 font-sans-brand text-xs font-semibold px-3 py-1 rounded-full">
          <span className="text-[#D4AF37]">★</span> {dest.highlight}
        </span>
      </div>

      {/* Flag */}
      <div className="absolute top-4 right-4 text-2xl">{dest.flag}</div>

      {/* Glass bottom overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#0f1b3d] to-transparent">
        <h3 className={`font-serif-brand font-bold text-white ${dest.textSize} leading-tight mb-1`}>
          {dest.name}
        </h3>
        <p className="font-sans-brand text-white/75 text-xs leading-relaxed mb-3 line-clamp-2">
          {dest.summary}
        </p>
        <div className="flex items-center gap-1 text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <span className="font-sans-brand text-xs font-semibold">Explore Programs</span>
          <ArrowRight className="w-3 h-3" />
        </div>
      </div>
    </div>
  );
}