import { ArrowRight, BadgeCheck, Building2, ExternalLink, GraduationCap, Languages, MapPin, Phone, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useConsultancyName } from "@/lib/consultancy-name";

const focusLabels = {
  "japanese-language": "Japanese language",
  "korean-language": "Korean language",
  "europe-student-visa": "Europe student visa",
  "test-prep-study-abroad": "IELTS / PTE plus study abroad",
  "career-education": "Career and education",
  "general-education": "Education counseling",
  "multipurpose-consultancy": "Multi-destination consultancy",
};

function compactList(items: string[], fallback: string[]) {
  return items.length ? items : fallback;
}

export default function ConsultancyProfileSection({ variant = "default" }: { variant?: "default" | "editorial" | "modern" }) {
  const { consultancyName, consultancyProfile } = useConsultancyName();

  const profile = consultancyProfile;
  const isLanguageFocused = profile?.focus === "japanese-language" || profile?.focus === "korean-language";
  const programs = compactList(
    profile?.trainingPrograms || [],
    ["Profile assessment", "Document checklist", "Application guidance", "Visa interview preparation"]
  );
  const specialties = compactList(
    profile?.specialties || [],
    ["Study-abroad counseling", "University shortlisting", "Visa documentation", "Student follow-up"]
  );
  const proofPoints = compactList(
    profile?.proofPoints || [],
    ["Custom branded demo route", "Reusable lead sections", "Contact-ready landing page"]
  );
  const destinations = compactList(profile?.destinations || [], ["Australia", "Canada", "United Kingdom", "Japan"]);

  const sectionClass =
    variant === "editorial"
      ? "bg-white"
      : variant === "modern"
        ? "bg-[#f8f9fc] dark:bg-[#0D0F14]"
        : "";

  return (
    <section className={`py-16 md:py-24 ${sectionClass}`} style={variant === "default" ? { backgroundColor: "var(--brand-bg-alt)" } : undefined}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid lg:grid-cols-[0.92fr_1.08fr] gap-8 lg:gap-12 items-start">
          <div
            className="rounded-2xl border p-6 md:p-8"
            style={{
              backgroundColor: "var(--brand-surface)",
              borderColor: "var(--brand-border)",
              color: "var(--brand-text)",
            }}
          >
            <div className="flex items-center gap-2 mb-5">
              <span className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(217,164,65,0.14)", color: "var(--brand-accent)" }}>
                {isLanguageFocused ? <Languages size={20} /> : <GraduationCap size={20} />}
              </span>
              <Badge className="border-0" style={{ backgroundColor: "rgba(217,164,65,0.14)", color: "var(--brand-accent)" }}>
                {profile ? focusLabels[profile.focus] : "Personalized demo"}
              </Badge>
            </div>

            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--brand-accent)" }}>
              Personalized consultancy profile
            </p>
            <h2
              className="text-2xl md:text-3xl font-extrabold leading-snug mb-3"
              style={{
                color: "var(--brand-heading, var(--brand-text))",
                fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
                letterSpacing: 0,
              }}
            >
              {profile?.name || consultancyName}
            </h2>
            <p className="text-sm font-bold mb-3" style={{ color: "var(--brand-accent)" }}>
              {profile?.heroTagline || "A ready-to-share consultancy website demo"}
            </p>
            <p className="text-base leading-relaxed mb-6" style={{ color: "var(--brand-muted)" }}>
              {profile?.summary ||
                "This demo adapts to the consultancy name in the link, so clients can open a branded version without filling the setup modal."}
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              <div className="rounded-xl border p-4" style={{ borderColor: "var(--brand-border)", backgroundColor: "var(--brand-bg)" }}>
                <div className="flex items-center gap-2 text-sm font-bold mb-1" style={{ color: "var(--brand-text)" }}>
                  <Building2 size={16} style={{ color: "var(--brand-accent)" }} />
                  Best for
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--brand-muted)" }}>
                  {profile?.primaryAudience || "Students comparing study-abroad options and seeking clear next steps."}
                </p>
              </div>
              <div className="rounded-xl border p-4" style={{ borderColor: "var(--brand-border)", backgroundColor: "var(--brand-bg)" }}>
                <div className="flex items-center gap-2 text-sm font-bold mb-1" style={{ color: "var(--brand-text)" }}>
                  <MapPin size={16} style={{ color: "var(--brand-accent)" }} />
                  Office / area
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--brand-muted)" }}>
                  {profile ? profile.address || profile.city : "Lead-ready study consultancy website."}
                </p>
              </div>
            </div>

            <div className="rounded-xl border p-4" style={{ borderColor: "var(--brand-border)", backgroundColor: "var(--brand-bg)" }}>
              <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--brand-accent)" }}>
                Main destinations
              </p>
              <div className="flex flex-wrap gap-2">
                {destinations.slice(0, 6).map((destination) => (
                  <span
                    key={destination}
                    className="rounded-full border px-3 py-1 text-xs font-bold"
                    style={{ borderColor: "var(--brand-border)", color: "var(--brand-soft)" }}
                  >
                    {destination}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-xl border p-4" style={{ borderColor: "var(--brand-border)", backgroundColor: "var(--brand-bg)" }}>
              <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--brand-accent)" }}>
                {isLanguageFocused ? "Featured classes" : "Featured programs"}
              </p>
              <div className="flex flex-wrap gap-2">
                {programs.slice(0, 4).map((program) => (
                  <span
                    key={program}
                    className="rounded-full px-3 py-1.5 text-xs font-bold"
                    style={{ backgroundColor: "rgba(217,164,65,0.12)", color: "var(--brand-text)" }}
                  >
                    {program}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border p-4 md:p-5" style={{ backgroundColor: "var(--brand-surface)", borderColor: "var(--brand-border)" }}>
            <Tabs defaultValue="services" className="w-full">
              <TabsList className="h-auto w-full flex-wrap justify-start rounded-xl p-1" style={{ backgroundColor: "var(--brand-bg)" }}>
                <TabsTrigger value="services" className="data-[state=active]:shadow-sm">Services</TabsTrigger>
                <TabsTrigger value="programs" className="data-[state=active]:shadow-sm">
                  {isLanguageFocused ? "Classes" : "Programs"}
                </TabsTrigger>
                <TabsTrigger value="proof" className="data-[state=active]:shadow-sm">Proof</TabsTrigger>
              </TabsList>

              <TabsContent value="services" className="mt-5">
                <div className="grid sm:grid-cols-2 gap-3">
                  {specialties.map((item) => (
                    <div key={item} className="rounded-xl border p-4" style={{ borderColor: "var(--brand-border)", backgroundColor: "var(--brand-bg)" }}>
                      <Sparkles size={17} className="mb-3" style={{ color: "var(--brand-accent)" }} />
                      <p className="text-sm font-bold leading-snug" style={{ color: "var(--brand-text)" }}>{item}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="programs" className="mt-5">
                <div className="space-y-3">
                  {programs.map((item, index) => (
                    <div key={item} className="flex items-center gap-3 rounded-xl border p-4" style={{ borderColor: "var(--brand-border)", backgroundColor: "var(--brand-bg)" }}>
                      <span className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black" style={{ backgroundColor: "rgba(217,164,65,0.14)", color: "var(--brand-accent)" }}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-sm font-bold" style={{ color: "var(--brand-text)" }}>{item}</p>
                        <p className="text-xs" style={{ color: "var(--brand-muted)" }}>
                          {isLanguageFocused ? "Class-led preparation with clear level targets." : "Counselor-guided step with a practical student checklist."}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="proof" className="mt-5">
                <div className="space-y-3">
                  {proofPoints.map((point) => (
                    <div key={point} className="flex gap-3 rounded-xl border p-4" style={{ borderColor: "var(--brand-border)", backgroundColor: "var(--brand-bg)" }}>
                      <BadgeCheck size={18} className="mt-0.5 flex-shrink-0" style={{ color: "var(--brand-accent)" }} />
                      <p className="text-sm leading-relaxed" style={{ color: "var(--brand-muted)" }}>{point}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-black transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: "var(--brand-accent)", color: "var(--brand-bg)" }}
              >
                {profile?.ctaLabel || "Plan This Demo"} <ArrowRight size={16} />
              </a>
              {profile?.phone && (
                <a
                  href={`tel:${profile.phone}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-bold"
                  style={{ borderColor: "var(--brand-border)", color: "var(--brand-text)" }}
                >
                  <Phone size={16} /> {profile.phone}
                </a>
              )}
              {profile?.website && (
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-bold"
                  style={{ borderColor: "var(--brand-border)", color: "var(--brand-text)" }}
                >
                  Website <ExternalLink size={15} />
                </a>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
