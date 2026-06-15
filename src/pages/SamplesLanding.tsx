import { ArrowRight, GraduationCap, LayoutGrid } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useConsultancyName } from "@/lib/consultancy-name";

const sampleCards = [
  {
    title: "Sample 1",
    subtitle: "Sample consultancy",
    description: "Dark premium consultancy landing page with destination grid, test prep, and animated hero carousel.",
    href: "/sample-1",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_03c99d230f_0dad01d329a9030b.png",
    accent: "#d9a441",
  },
  {
    title: "Sample 2",
    subtitle: "Sample consultancy",
    description: "Light editorial education layout with serif headings, destination bento cards, and guided consultation flow.",
    href: "/sample-2",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_820bf824e9_07126f9c4ed32dea.png",
    accent: "#D4AF37",
    recommended: true,
  },
  {
    title: "Sample 3",
    subtitle: "Sample consultancy",
    description: "Interactive dark/light landing page with country carousel, animated counters, and full service sections.",
    href: "/sample-3",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_2c1fdddd68_12f5f4a6d863070b.png",
    accent: "#F5A623",
  },
];

export default function SamplesLanding() {
  const { clientSlug } = useParams();
  const location = useLocation();
  const { consultancyName } = useConsultancyName();
  const routePrefix = clientSlug ? `/${clientSlug}` : "";
  const querySuffix = clientSlug ? "" : location.search;
  const samples = sampleCards.map((sample) => ({
    ...sample,
    href: `${routePrefix}${sample.href}${querySuffix}`,
    subtitle: consultancyName,
  }));

  return (
    <main className="min-h-screen font-sans" style={{ backgroundColor: "var(--brand-bg)", color: "var(--brand-text)", fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}>
      <section className="relative overflow-hidden px-4 py-10 md:px-8 lg:px-16 lg:py-14">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 75% 20%, rgba(217,164,65,0.13) 0%, transparent 58%)" }} />
        <div className="relative max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#4a6c8f" }}>
                <LayoutGrid size={20} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest font-bold" style={{ color: "#d9a441" }}>Demo Gallery</p>
                <h1 className="font-sans text-xl md:text-2xl font-extrabold leading-tight tracking-normal">Choose a Sample</h1>
                <p className="mt-2 max-w-xl text-sm leading-relaxed" style={{ color: "var(--brand-muted)" }}>
                  Choose any of these samples for your consultancy website. Each demo shows a different layout style you can use for your brand.
                </p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-sm" style={{ color: "var(--brand-muted)" }}>
              <GraduationCap size={16} />
              Study abroad landing screens
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {samples.map((sample) => (
              <Link
                key={sample.href}
                to={sample.href}
                className="group block overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1"
                style={{ backgroundColor: "var(--brand-surface)", borderColor: "var(--brand-border)" }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={sample.image}
                    alt={sample.subtitle}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(4,10,18,0.94) 0%, rgba(4,10,18,0.68) 44%, rgba(4,10,18,0.14) 100%)" }} />
                  <div className="absolute left-5 right-5 bottom-5">
                    <p className="text-xs uppercase tracking-widest font-bold mb-1" style={{ color: sample.accent }}>{sample.title}</p>
                    <h2 className="font-sans text-base md:text-lg font-extrabold leading-snug tracking-normal text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
                      {sample.subtitle}
                    </h2>
                  </div>
                  {sample.recommended && (
                    <div className="absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-[#0f1b3d]" style={{ backgroundColor: "#D4AF37" }}>
                      Recommended
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-sm leading-relaxed min-h-[64px]" style={{ color: "var(--brand-soft)" }}>{sample.description}</p>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold" style={{ color: sample.accent }}>
                    Open demo <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
