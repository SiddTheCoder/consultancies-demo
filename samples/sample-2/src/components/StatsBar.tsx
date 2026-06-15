import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 5000, suffix: "+", label: "Students Placed", desc: "Across 50+ countries" },
  { value: 98, suffix: "%", label: "Visa Approval Rate", desc: "Industry-leading success" },
  { value: 120, suffix: "+", label: "Partner Universities", desc: "Globally accredited" },
  { value: 14, suffix: " yrs", label: "Of Experience", desc: "Trusted expertise" },
];

function useCounter(target: number, started: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);
  return count;
}

function StatItem({ stat, started }: { stat: (typeof stats)[0]; started: boolean }) {
  const count = useCounter(stat.value, started);
  return (
    <div className="flex flex-col items-center text-center px-6 py-8">
      <p className="font-serif-brand text-4xl lg:text-5xl font-bold text-white mb-1">
        {count.toLocaleString()}
        <span className="text-[#D4AF37]">{stat.suffix}</span>
      </p>
      <p className="font-sans-brand text-sm font-semibold text-white/90 mb-1">{stat.label}</p>
      <p className="font-sans-brand text-xs text-white/50">{stat.desc}</p>
    </div>
  );
}

export default function StatsBar() {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#0f1b3d]">
      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #D4AF37 0px, #D4AF37 1px, transparent 0px, transparent 50%)`,
          backgroundSize: "30px 30px",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10 divide-y lg:divide-y-0">
          {stats.map((stat) => (
            <StatItem key={stat.label} stat={stat} started={started} />
          ))}
        </div>
      </div>
    </section>
  );
}