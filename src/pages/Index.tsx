import { useEffect, useRef, useState } from "react";
import {
  Phone,
  MessageCircle,
  ChevronDown,
  Star,
  ArrowRight,
  MapPin,
  GraduationCap,
  Globe,
  Award,
  Users,
  CheckCircle,
  BookOpenCheck,
  Headphones,
  PenLine,
  Menu,
  X,
} from "lucide-react";
import { useConsultancyName } from "@/lib/consultancy-name";
import FloatingContactButton from "@/components/FloatingContactButton";
import ConsultancyProfileSection from "@/components/ConsultancyProfileSection";

// ─────────────────────────────────────────────
// Utility: useInView hook
// ─────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─────────────────────────────────────────────
// Counter Hook
// ─────────────────────────────────────────────
function useCounter(target: number, duration: number, active: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setValue(target); clearInterval(timer); }
      else setValue(start);
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return value;
}

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────
const countries = [
  {
    name: "Japan",
    tag: "Asia's Tech Hub",
    facts: ["Top 30 QS Universities", "MEXT Scholarships Available", "Work Visa Support"],
    img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_cc24a4791d_81dba8adabe876c6.png",
    span: "col-span-1 row-span-2",
  },
  {
    name: "Australia",
    tag: "World-Class Research",
    facts: ["8 Group of Eight Universities", "Post-Study Work Rights", "High Graduate Demand"],
    img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_8289d3d549_0d786d24f2db6c39.png",
    span: "col-span-1 row-span-1",
  },
  {
    name: "Canada",
    tag: "Immigration Pathway",
    facts: ["PR Pathway Post-Study", "Top 3 QS Universities", "Co-op Programs"],
    img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_3befe0a6d0_73503e4ccd5c9a01.png",
    span: "col-span-1 row-span-1",
  },
  {
    name: "United Kingdom",
    tag: "Century-Old Excellence",
    facts: ["Oxford & Cambridge Access", "1-Year Master's Degrees", "Tier-4 Visa Support"],
    img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_452eca6a57_946a7e6c915824ea.png",
    span: "col-span-2 row-span-1",
  },
  {
    name: "South Korea",
    tag: "Innovation & Culture",
    facts: ["Government Scholarships", "STEM Excellence", "Low Living Costs"],
    img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_2a2c504781_b7787a84a497293c.png",
    span: "col-span-1 row-span-1",
  },
  {
    name: "Germany",
    tag: "Free Tuition Hub",
    facts: ["Tuition-Free Public Unis", "Engineering Powerhouse", "Blue Card Visa Path"],
    img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_ae4ac1a962_4116a40d8bf795cf.png",
    span: "col-span-1 row-span-1",
  },
  {
    name: "United States",
    tag: "Research Powerhouse",
    facts: ["Ivy League Pathways", "STEM OPT Options", "4,000+ Institutions"],
    img_url: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
    span: "sm:col-span-2 lg:col-span-1",
  },
  {
    name: "New Zealand",
    tag: "Safe Study Living",
    facts: ["Post-Study Work Visa", "High Student Satisfaction", "PR-Friendly Skills List"],
    img_url: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1200&q=80",
    span: "col-span-1 row-span-1",
  },
  {
    name: "Ireland",
    tag: "Europe Tech Gateway",
    facts: ["2-Year Stay Back Visa", "English-Taught Degrees", "Tech Employer Access"],
    img_url: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?auto=format&fit=crop&w=1200&q=80",
    span: "col-span-1 row-span-1",
  },
  {
    name: "France",
    tag: "Culture & Business",
    facts: ["Low Public Tuition", "Top Business Schools", "Schengen Career Access"],
    img_url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    span: "sm:col-span-2 lg:col-span-2",
  },
  {
    name: "Netherlands",
    tag: "English-Taught Europe",
    facts: ["2,000+ English Programs", "Orientation Year Visa", "Innovation Hubs"],
    img_url: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=1200&q=80",
    span: "col-span-1 row-span-1",
  },
  {
    name: "Dubai",
    tag: "Global Campus Hub",
    facts: ["Branch Campuses", "Fast Visa Processing", "Business Career Access"],
    img_url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    span: "col-span-1 row-span-1",
  },
];

const studyTests = [
  {
    name: "IELTS",
    score: "Band 7+ target",
    format: "Academic and General Training",
    desc: "Structured reading, writing, listening, and speaking prep with weekly mock tests and band-wise feedback.",
    highlights: ["Speaking interview practice", "Writing Task 1 and 2 reviews", "British Council format drills"],
    icon: BookOpenCheck,
  },
  {
    name: "TOEFL",
    score: "95+ score target",
    format: "TOEFL iBT",
    desc: "Integrated-skills coaching for students applying to US, Canadian, and global universities.",
    highlights: ["Listening note strategy", "Integrated writing practice", "Timed computer-based mocks"],
    icon: Headphones,
  },
  {
    name: "PTE",
    score: "65+ score target",
    format: "PTE Academic",
    desc: "Fast-track AI-scored test preparation focused on fluency, pronunciation, and repeatable scoring patterns.",
    highlights: ["Speaking fluency drills", "Template-based writing prep", "Score improvement tracker"],
    icon: PenLine,
  },
];

const heroSlides = [
  {
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_03c99d230f_0dad01d329a9030b.png",
    alt: "Modern university campus with students walking through glass buildings",
    topStat: { value: "150+", label: "Partner Universities" },
    bottomStat: { value: "98%", label: "Visa Success Rate" },
  },
  {
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_8289d3d549_0d786d24f2db6c39.png",
    alt: "Australia study destination campus and city view",
    topStat: { value: "12", label: "Study Destinations" },
    bottomStat: { value: "5,000+", label: "Students Guided" },
  },
  {
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_452eca6a57_946a7e6c915824ea.png",
    alt: "United Kingdom university architecture study destination",
    topStat: { value: "IELTS", label: "TOEFL and PTE Prep" },
    bottomStat: { value: "7+", label: "Band Target Support" },
  },
  {
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_cc24a4791d_81dba8adabe876c6.png",
    alt: "Japan city and university study destination",
    topStat: { value: "MEXT", label: "Scholarship Guidance" },
    bottomStat: { value: "30+", label: "Top QS Options" },
  },
  {
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_3befe0a6d0_73503e4ccd5c9a01.png",
    alt: "Canada campus and city study destination",
    topStat: { value: "PR", label: "Pathway Planning" },
    bottomStat: { value: "Co-op", label: "Program Support" },
  },
];

const processSteps = [
  { id: 1, title: "Initial Consultation", desc: "Free 30-minute session to understand your academic profile, goals, and target destinations.", icon: Users },
  { id: 2, title: "Profile Assessment", desc: "In-depth evaluation of your academics, test scores, extracurriculars, and visa eligibility.", icon: Award },
  { id: 3, title: "University Shortlisting", desc: "Curated list of 5–8 universities matching your goals, budget, and admission probability.", icon: GraduationCap },
  { id: 4, title: "Documentation", desc: "Expert guidance on SOP, LOR, CV, financial docs, and all visa application materials.", icon: CheckCircle },
  { id: 5, title: "Application Submission", desc: "Timely submission with quality control across all chosen institutions.", icon: Globe },
  { id: 6, title: "Visa & Pre-Departure", desc: "End-to-end visa assistance, mock interviews, and pre-departure orientation.", icon: MapPin },
];

const testimonials = [
  { name: "Priya Sharma", dest: "University of Melbourne", rating: 5, text: "{consultancyName} made the entire process seamless. Visa approved first attempt!", avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg", crest: "🎓" },
  { name: "Daniel Kim", dest: "Waseda University, Japan", rating: 5, text: "The documentation support was exceptional. Got a full scholarship thanks to their guidance.", avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg", crest: "🎓" },
  { name: "Sofia Mendes", dest: "University of Toronto", rating: 5, text: "Professional, responsive, and truly cared about my success. Highly recommend.", avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg", crest: "🎓" },
  { name: "Amir Hassan", dest: "TU Munich, Germany", rating: 5, text: "Free tuition in Germany — I didn't know it was possible. {consultancyName} opened that door.", avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg", crest: "🎓" },
  { name: "Chen Wei", dest: "Imperial College London", rating: 5, text: "My SOP was transformed into something truly compelling. Admission offer within 3 weeks.", avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg", crest: "🎓" },
  { name: "Fatima Al-Rashid", dest: "Yonsei University, Korea", rating: 5, text: "Got the government scholarship I was eyeing. The team's connections are unparalleled.", avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg", crest: "🎓" },
  { name: "Raj Patel", dest: "University of Sydney", rating: 5, text: "Stress-free journey from application to visa grant. Couldn't have done it without them.", avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg", crest: "🎓" },
  { name: "Lena Schmidt", dest: "McGill University, Canada", rating: 5, text: "The PR pathway advice was gold. Now I'm on track for Canadian permanent residency.", avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg", crest: "🎓" },
];

const faqs = [
  { q: "What countries do you provide consultation for?", a: "We support 12 major study destinations across Asia-Pacific, Europe, North America, and the Middle East, with dedicated guidance for each country pathway." },
  { q: "How long does the application process take?", a: "Typically 3–6 months from initial consultation to visa grant, depending on the country and intake. We recommend starting at least 8 months before your intended start date." },
  { q: "Do you guarantee university admission?", a: "While no consultant can guarantee admission, our 98% visa success rate and strategic shortlisting methodology ensures optimal placement probability based on your profile." },
  { q: "What is included in the consultation fee?", a: "Our comprehensive package includes university shortlisting, SOP/LOR editing (up to 3 rounds), document checklist, visa application support, mock interview prep, and pre-departure orientation." },
  { q: "Can you help with scholarships and funding?", a: "Absolutely. We have a dedicated scholarship database covering government-funded programs (MEXT, DAAD, Korean Government), institutional scholarships, and need-based aid across all 6 destination countries." },
  { q: "What is your success rate for visa approvals?", a: "We maintain a 98% visa approval rate over 8 years and 5,000+ students placed. We achieve this through meticulous document review, country-specific visa expertise, and proactive RFE management." },
];

const navLinks = [
  { label: "Countries", href: "#countries" },
  { label: "Study", href: "#study" },
  { label: "Process", href: "#process" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────
export default function Index() {
  const { consultancyName, emailAddress } = useConsultancyName();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);

  const metricsRef = useInView(0.4);
  const countriesRef = useInView(0.1);
  const studyRef = useInView(0.2);
  const processRef = useInView(0.2);
  const faqRef = useInView(0.1);
  const contactRef = useInView(0.2);

  const visa = useCounter(98, 1200, metricsRef.inView);
  const alumni = useCounter(5000, 1400, metricsRef.inView);
  const universities = useCounter(150, 1000, metricsRef.inView);
  const heroSlide = heroSlides[heroSlideIndex];

  useEffect(() => {
    const id = setInterval(() => {
      setHeroSlideIndex((current) => (current + 1) % heroSlides.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  // Sticky nav active section detection
  useEffect(() => {
    const sections = ["hero", "countries", "study", "process", "testimonials", "faq", "contact"];
    const handleScroll = () => {
      const scrollY = window.scrollY + 100;
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) { setActiveSection(id); break; }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Process step scroll
  useEffect(() => {
    if (!processRef.inView) return;
    const id = setInterval(() => {
      setActiveStep((prev) => (prev < processSteps.length - 1 ? prev + 1 : prev));
    }, 600);
    return () => clearInterval(id);
  }, [processRef.inView]);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen font-jakarta" style={{ backgroundColor: "var(--brand-bg)", color: "var(--brand-text)" }}>

      {/* ── NAVBAR ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 lg:px-16 py-4"
        style={{ backgroundColor: "var(--brand-nav)", backdropFilter: "blur(16px)", borderBottom: "1px solid var(--brand-border-soft)" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "var(--brand-primary)" }}>
            <GraduationCap size={18} className="text-white" />
          </div>
          <span className="font-sans font-bold text-sm md:text-[15px] text-white tracking-normal max-w-[220px] truncate">{consultancyName}</span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`nav-link text-sm font-medium transition-colors duration-200 ${activeSection === link.href.slice(1) ? "active text-white" : "text-[#8fa3b8] hover:text-white"}`}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => scrollTo("#contact")}
            className="text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:text-white"
            style={{ color: "var(--brand-accent)", border: "1px solid rgba(217,164,65,0.3)" }}
          >
            Free Consultation
          </button>
          <button
            onClick={() => scrollTo("#contact")}
            className="text-sm font-semibold px-5 py-2 rounded-lg text-white transition-all duration-200 hover:opacity-90"
            style={{ backgroundColor: "var(--brand-primary)" }}
          >
            Apply Now
          </button>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-white p-1" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col pt-20 px-6 pb-8 gap-4 md:hidden"
          style={{ backgroundColor: "var(--brand-mobile-menu)", backdropFilter: "blur(20px)" }}
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-left text-lg font-syne font-semibold text-white py-3 border-b"
              style={{ borderColor: "var(--brand-border)" }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("#contact")}
            className="mt-4 text-base font-semibold px-6 py-3 rounded-xl text-white"
            style={{ backgroundColor: "var(--brand-primary)" }}
          >
            Book Free Consultation
          </button>
        </div>
      )}

      {/* ── HERO ── */}
      <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(74,108,143,0.18) 0%, transparent 65%)" }} />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(217,164,65,0.07) 0%, transparent 70%)" }} />

        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: copy */}
          <div className="space-y-6 lg:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase" style={{ backgroundColor: "rgba(74,108,143,0.2)", border: "1px solid rgba(74,108,143,0.4)", color: "var(--brand-accent)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#d9a441] animate-pulse" />
              Trusted by 5,000+ Students Worldwide
            </div>

            <h1 className="font-jakarta font-extrabold leading-[1.08] text-white" style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)", letterSpacing: 0 }}>
              Your Dream<br />
              University.<br />
              <span style={{ color: "var(--brand-accent)" }}>Our Expertise.</span>
            </h1>

            <p className="text-base md:text-lg leading-relaxed max-w-lg" style={{ color: "var(--brand-muted)" }}>
              {consultancyName} connects ambitious students to top universities across 12 leading destinations, with end-to-end support from profile assessment to visa approval.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollTo("#contact")}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-base font-bold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
                style={{ backgroundColor: "var(--brand-primary)" }}
              >
                Book Free Consultation <ArrowRight size={18} />
              </button>
              <button
                onClick={() => scrollTo("#countries")}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-base font-semibold transition-all duration-200 hover:text-white"
                style={{ color: "var(--brand-text)", border: "1px solid var(--brand-border-strong)", backgroundColor: "var(--brand-button-subtle)" }}
              >
                Explore Destinations
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 pt-2">
              {["ICEF Certified", "British Council Partner", "ISO 9001:2015"].map((b) => (
                <div key={b} className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "var(--brand-muted)" }}>
                  <CheckCircle size={13} style={{ color: "var(--brand-accent)" }} />
                  {b}
                </div>
              ))}
            </div>
          </div>

          {/* Right: hero image in geometric container */}
          <div className="group relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg" style={{ clipPath: "polygon(0 0, 92% 0, 100% 8%, 100% 100%, 8% 100%, 0 92%)" }}>
              <div className="aspect-[4/5] overflow-hidden rounded-2xl">
                <img
                  key={heroSlide.image}
                  className="w-full h-full object-cover animate-hero-image-slide"
                  src={heroSlide.image}
                  alt={heroSlide.alt}
                />
              </div>
              {/* Overlay gradient */}
              <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(16,21,28,0.3) 0%, transparent 60%)" }} />
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
                {heroSlides.map((slide, i) => (
                  <button
                    key={slide.alt}
                    onClick={() => setHeroSlideIndex(i)}
                    aria-label={`Show hero slide ${i + 1}`}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: heroSlideIndex === i ? "28px" : "8px",
                      backgroundColor: heroSlideIndex === i ? "var(--brand-accent)" : "rgba(255,255,255,0.45)",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Floating stat card */}
            <div className="absolute -left-4 md:-left-8 bottom-12 hidden sm:block transition-transform duration-300 ease-out group-hover:translate-x-5 group-hover:-translate-y-4">
              <div key={`bottom-${heroSlideIndex}`} className="px-4 py-3 rounded-xl shadow-2xl animate-hero-card-slide" style={{ backgroundColor: "var(--brand-surface)", border: "1px solid var(--brand-border)" }}>
                <div className="text-xl font-jakarta font-extrabold" style={{ color: "var(--brand-accent)", letterSpacing: 0 }}>{heroSlide.bottomStat.value}</div>
                <div className="text-xs" style={{ color: "var(--brand-muted)" }}>{heroSlide.bottomStat.label}</div>
              </div>
            </div>

            <div className="absolute -right-2 top-12 hidden sm:block transition-transform duration-300 ease-out group-hover:-translate-x-5 group-hover:translate-y-4">
              <div key={`top-${heroSlideIndex}`} className="px-4 py-3 rounded-xl shadow-2xl animate-hero-card-slide" style={{ backgroundColor: "var(--brand-surface)", border: "1px solid var(--brand-border)" }}>
                <div className="text-xl font-jakarta font-extrabold" style={{ color: "var(--brand-accent)", letterSpacing: 0 }}>{heroSlide.topStat.value}</div>
                <div className="text-xs" style={{ color: "var(--brand-muted)" }}>{heroSlide.topStat.label}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
          <ChevronDown size={20} style={{ color: "var(--brand-primary)" }} />
        </div>
      </section>

      {/* ── METRIC RIBBON ── */}
      <div ref={metricsRef.ref} className="w-full py-8" style={{ backgroundColor: "var(--brand-primary)" }}>
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0 text-center">
          {[
            { label: "Visa Success Rate", value: visa, suffix: "%", icon: Award },
            { label: "Alumni Worldwide", value: alumni, suffix: "+", icon: Users },
            { label: "Partner Universities", value: universities, suffix: "+", icon: GraduationCap },
          ].map((m, i) => (
            <div key={i} className="flex flex-col items-center gap-1 sm:border-r last:border-r-0" style={{ borderColor: "rgba(255,255,255,0.2)" }}>
              <div className="text-4xl md:text-5xl font-jakarta font-extrabold text-white" style={{ letterSpacing: 0 }}>
                {m.value.toLocaleString()}{m.suffix}
              </div>
              <div className="text-sm font-medium text-white/75 tracking-wide">{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      <ConsultancyProfileSection />

      {/* ── BENTO COUNTRY GRID ── */}
      <section id="countries" className="py-20 md:py-28">
        <div ref={countriesRef.ref} className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="mb-12 md:mb-16">
            <div className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--brand-accent)" }}>Study Destinations</div>
            <h2 className="font-syne font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-4">{countries.length} World-Class<br />Destinations</h2>
            <p className="max-w-xl text-base md:text-lg" style={{ color: "var(--brand-muted)" }}>Each country carefully curated for academic excellence, immigration pathways, and career outcomes.</p>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[220px] lg:auto-rows-[260px]">
            {countries.map((country, i) => (
              <div
                key={country.name}
                className={`bento-card relative overflow-hidden rounded-2xl cursor-pointer group ${country.span}`}
                style={{
                  opacity: countriesRef.inView ? 1 : 0,
                  transform: countriesRef.inView ? "translateY(0)" : "translateY(32px)",
                  transition: `opacity 0.6s ease ${i * 120}ms, transform 0.6s ease ${i * 120}ms`,
                }}
              >
                {/* Background image */}
                <div className="bg-img absolute inset-0 w-full h-full">
                  <img className="w-full h-full object-cover" src={country.img_url} />
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(16,21,28,0.92) 0%, rgba(16,21,28,0.4) 50%, rgba(16,21,28,0.1) 100%)" }} />

                {/* Content */}
                <div className="absolute inset-0 p-5 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: "rgba(74,108,143,0.6)", color: "var(--brand-text)", backdropFilter: "blur(8px)" }}>
                      {country.tag}
                    </span>
                    <MapPin size={12} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color: "var(--brand-accent)" }} />
                  </div>

                  <div>
                    <h3 className="font-syne font-bold text-xl md:text-2xl text-white mb-1">{country.name}</h3>

                    {/* Glassmorphism facts pill */}
                    <div className="facts-pill rounded-xl p-3 mt-2" style={{ backgroundColor: "var(--brand-surface-glass)", backdropFilter: "blur(12px)", border: "1px solid var(--brand-border-strong)" }}>
                      <div className="text-xs font-semibold mb-2" style={{ color: "var(--brand-accent)" }}>Key Facts</div>
                      <ul className="space-y-1">
                        {country.facts.map((f) => (
                          <li key={f} className="flex items-center gap-1.5 text-xs text-white/80">
                            <span style={{ color: "var(--brand-accent)" }}>✓</span> {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STUDY TEST PREP ── */}
      <section id="study" className="py-20 md:py-28" style={{ backgroundColor: "var(--brand-bg-alt)" }}>
        <div ref={studyRef.ref} className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-start">
            <div
              style={{
                opacity: studyRef.inView ? 1 : 0,
                transform: studyRef.inView ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              <div className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--brand-accent)" }}>Study Test Prep</div>
              <h2 className="font-syne font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-5">IELTS, TOEFL<br />and PTE Support</h2>
              <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: "var(--brand-muted)" }}>
                Build the language score your target university needs with guided classes, mock exams, and detailed feedback before application season.
              </p>
              <button
                onClick={() => scrollTo("#contact")}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-base font-bold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
                style={{ backgroundColor: "var(--brand-primary)" }}
              >
                Start Test Prep <ArrowRight size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {studyTests.map((test, i) => {
                const Icon = test.icon;
                return (
                  <div
                    key={test.name}
                    className="rounded-2xl p-5 flex flex-col min-h-[340px]"
                    style={{
                      backgroundColor: "var(--brand-surface)",
                      border: "1px solid var(--brand-border)",
                      opacity: studyRef.inView ? 1 : 0,
                      transform: studyRef.inView ? "translateY(0)" : "translateY(28px)",
                      transition: `opacity 0.6s ease ${i * 120}ms, transform 0.6s ease ${i * 120}ms`,
                    }}
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: "rgba(217,164,65,0.12)", color: "var(--brand-accent)" }}>
                      <Icon size={22} />
                    </div>
                    <div className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "var(--brand-muted)" }}>{test.format}</div>
                    <h3 className="font-syne font-bold text-2xl text-white mb-2">{test.name}</h3>
                    <div className="text-sm font-semibold mb-4" style={{ color: "var(--brand-accent)" }}>{test.score}</div>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--brand-soft)" }}>{test.desc}</p>
                    <ul className="mt-auto space-y-2">
                      {test.highlights.map((item) => (
                        <li key={item} className="flex gap-2 text-xs leading-relaxed" style={{ color: "var(--brand-text)" }}>
                          <CheckCircle size={14} className="mt-0.5 flex-shrink-0" style={{ color: "var(--brand-accent)" }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS TIMELINE ── */}
      <section id="process" className="py-20 md:py-28" style={{ backgroundColor: "var(--brand-bg-alt)" }}>
        <div ref={processRef.ref} className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="mb-12 md:mb-16 text-center">
            <div className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--brand-accent)" }}>How It Works</div>
            <h2 className="font-syne font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-4">Your Journey,<br />Step by Step</h2>
            <p className="max-w-xl mx-auto text-base" style={{ color: "var(--brand-muted)" }}>From first conversation to boarding your flight — we guide you through every milestone.</p>
          </div>

          {/* Stepper */}
          <div className="relative">
            {/* Central rail (desktop) */}
            <div className="hidden lg:block absolute left-1/2 top-8 bottom-8 w-0.5 -translate-x-1/2" style={{ backgroundColor: "var(--brand-border)" }} />

            <div className="space-y-8 lg:space-y-0">
              {processSteps.map((step, i) => {
                const Icon = step.icon;
                const isActive = processRef.inView && i <= activeStep;
                const isLeft = i % 2 === 0;
                return (
                  <div
                    key={step.id}
                    className={`relative flex items-center gap-6 lg:gap-0 ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"} lg:mb-12`}
                    style={{ opacity: isActive ? 1 : 0.3, transition: `opacity 0.5s ease ${i * 100}ms` }}
                  >
                    {/* Content */}
                    <div className={`flex-1 ${isLeft ? "lg:pr-16 lg:text-right" : "lg:pl-16 lg:text-left"}`}>
                      <div
                        className="inline-block rounded-2xl p-5 max-w-sm w-full"
                        style={{
                          backgroundColor: isActive ? "var(--brand-surface)" : "var(--brand-surface-faint)",
                          border: `1px solid ${isActive ? "rgba(74,108,143,0.4)" : "var(--brand-border-soft)"}`,
                          transition: "all 0.4s ease",
                        }}
                      >
                        <div className="font-syne font-bold text-base mb-1" style={{ color: isActive ? "var(--brand-accent)" : "var(--brand-muted)" }}>
                          {step.title}
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--brand-muted)" }}>{step.desc}</p>
                      </div>
                    </div>

                    {/* Center node */}
                    <div className="flex-shrink-0 lg:absolute lg:left-1/2 lg:-translate-x-1/2 z-10">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500"
                        style={{
                          backgroundColor: isActive ? "var(--brand-accent)" : "var(--brand-surface)",
                          border: `2px solid ${isActive ? "var(--brand-accent)" : "var(--brand-border-strong)"}`,
                          boxShadow: isActive ? "0 0 20px rgba(217,164,65,0.4)" : "none",
                        }}
                      >
                        <Icon size={20} style={{ color: isActive ? "var(--brand-bg)" : "var(--brand-primary)" }} />
                      </div>
                    </div>

                    {/* Empty spacer for alternating */}
                    <div className="hidden lg:block flex-1" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS MARQUEE ── */}
      <section id="testimonials" className="py-20 md:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 mb-12">
          <div className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--brand-accent)" }}>Student Success Stories</div>
          <h2 className="font-syne font-bold text-3xl md:text-4xl lg:text-5xl text-white">What Our Alumni Say</h2>
        </div>

        {/* Marquee track */}
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee gap-5" style={{ width: "max-content" }}>
            {[...testimonials, ...testimonials].map((t, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-72 md:w-80 rounded-2xl p-5 flex flex-col gap-4"
                style={{ backgroundColor: "var(--brand-surface)", border: "1px solid var(--brand-border)" }}
              >
                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array(t.rating).fill(0).map((_, s) => (
                    <Star key={s} size={13} fill="var(--brand-accent)" stroke="none" />
                  ))}
                </div>
                {/* Quote */}
                  <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--brand-soft)" }}>"{t.text.replace("{consultancyName}", consultancyName)}"</p>
                {/* Profile */}
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border-2" style={{ borderColor: "var(--brand-accent)" }} />
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs" style={{ color: "var(--brand-primary)" }}>{t.dest}</div>
                  </div>
                  <div className="ml-auto text-xl">{t.crest}</div>
                </div>
              </div>
            ))}
          </div>
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 pointer-events-none" style={{ background: "linear-gradient(to right, var(--brand-bg), transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 pointer-events-none" style={{ background: "linear-gradient(to left, var(--brand-bg), transparent)" }} />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 md:py-28" style={{ backgroundColor: "var(--brand-bg-alt)" }}>
        <div ref={faqRef.ref} className="max-w-3xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="mb-12">
            <div className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--brand-accent)" }}>FAQ</div>
            <h2 className="font-syne font-bold text-3xl md:text-4xl text-white">Frequently Asked<br />Questions</h2>
          </div>

          <div className="space-y-2">
            {faqs.map((item, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden transition-all duration-300"
                style={{
                  backgroundColor: openFaq === i ? "var(--brand-surface)" : "transparent",
                  border: `1px solid ${openFaq === i ? "rgba(74,108,143,0.4)" : "var(--brand-border)"}`,
                  opacity: faqRef.inView ? 1 : 0,
                  transform: faqRef.inView ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms, background-color 0.3s, border-color 0.3s`,
                }}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-syne font-semibold text-sm md:text-base text-white">{item.q}</span>
                  <ChevronDown
                    size={18}
                    style={{ color: "var(--brand-accent)", transition: "transform 0.3s", transform: openFaq === i ? "rotate(180deg)" : "rotate(0)" }}
                    className="flex-shrink-0"
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "var(--brand-muted)" }}>
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT / CTA ── */}
      <section id="contact" className="py-20 md:py-28">
        <div ref={contactRef.ref} className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left */}
            <div
              style={{
                opacity: contactRef.inView ? 1 : 0,
                transform: contactRef.inView ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              <div className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--brand-accent)" }}>Get Started Today</div>
              <h2 className="font-syne font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-6">Book Your Free<br />Consultation</h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: "var(--brand-muted)" }}>
                Schedule a no-obligation 30-minute session with one of our senior advisors. Get a personalized roadmap for your academic journey.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Phone, label: "+1 (888) 555-0147", sub: "Mon–Sat, 9AM–7PM" },
                  { icon: MessageCircle, label: "WhatsApp: +1 (888) 555-0148", sub: "Instant reply within 30 mins" },
                  { icon: Globe, label: emailAddress, sub: "Response within 24 hours" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(74,108,143,0.2)" }}>
                        <Icon size={18} style={{ color: "var(--brand-primary)" }} />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{item.label}</div>
                        <div className="text-xs" style={{ color: "var(--brand-muted)" }}>{item.sub}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Form */}
            <div
              className="rounded-2xl p-6 md:p-8"
              style={{
                backgroundColor: "var(--brand-surface)",
                border: "1px solid var(--brand-border)",
                opacity: contactRef.inView ? 1 : 0,
                transform: contactRef.inView ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
              }}
            >
              <h3 className="font-syne font-bold text-xl text-white mb-6">Start Your Application</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--brand-muted)" }}>Full Name</label>
                    <input
                      type="text"
                      placeholder="John Smith"
                      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-[#4a6c8f] outline-none focus:ring-2 transition-all"
                      style={{ backgroundColor: "var(--brand-bg)", border: "1px solid var(--brand-border-strong)" }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--brand-muted)" }}>Email Address</label>
                    <input
                      type="email"
                      placeholder="john@email.com"
                      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-[#4a6c8f] outline-none focus:ring-2 transition-all"
                      style={{ backgroundColor: "var(--brand-bg)", border: "1px solid var(--brand-border-strong)" }}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--brand-muted)" }}>Phone / WhatsApp</label>
                  <input
                    type="tel"
                    placeholder="+1 234 567 8901"
                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-[#4a6c8f] outline-none focus:ring-2 transition-all"
                    style={{ backgroundColor: "var(--brand-bg)", border: "1px solid var(--brand-border-strong)" }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--brand-muted)" }}>Preferred Destination</label>
                  <select
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 transition-all appearance-none"
                    style={{ backgroundColor: "var(--brand-bg)", border: "1px solid var(--brand-border-strong)", color: "var(--brand-muted)" }}
                  >
                    <option value="">Select a country...</option>
                    {countries.map((country) => (
                      <option key={country.name} value={country.name}>{country.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--brand-muted)" }}>Message (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your academic background and goals..."
                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-[#4a6c8f] outline-none focus:ring-2 transition-all resize-none"
                    style={{ backgroundColor: "var(--brand-bg)", border: "1px solid var(--brand-border-strong)" }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.01]"
                  style={{ backgroundColor: "var(--brand-primary)" }}
                >
                  Book Free Consultation →
                </button>
                <p className="text-center text-xs" style={{ color: "var(--brand-primary)" }}>No spam. 100% confidential. Cancel anytime.</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 border-t" style={{ borderColor: "var(--brand-border)", backgroundColor: "var(--brand-bg-alt)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: "var(--brand-primary)" }}>
              <GraduationCap size={15} className="text-white" />
            </div>
            <span className="font-syne font-bold text-base text-white">{consultancyName}</span>
          </div>
          <div className="flex flex-wrap justify-center gap-5 text-xs" style={{ color: "var(--brand-muted)" }}>
            {["Privacy Policy", "Terms of Service", "Refund Policy", "Sitemap"].map((l) => (
              <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
            ))}
          </div>
          <p className="text-xs text-center md:text-right" style={{ color: "var(--brand-primary)" }}>© 2024 {consultancyName}. All rights reserved.</p>
        </div>
      </footer>

      {/* ── FLOATING CONTACT BUTTON (Desktop + Mobile) ── */}
      <FloatingContactButton />

      {/* ── MOBILE FIXED BAR (WhatsApp + Call) ── */}
      <div
        className="fixed bottom-4 left-4 right-4 z-50 flex gap-3 md:hidden"
        style={{ maxWidth: "380px", margin: "0 auto" }}
      >
        <a
          href="https://wa.me/18885550148"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm text-white transition-all duration-200 active:scale-95"
          style={{
            backgroundColor: "rgba(30,42,56,0.85)",
            backdropFilter: "blur(16px)",
            border: "1px solid var(--brand-border-strong)",
          }}
        >
          <MessageCircle size={18} style={{ color: "#25D366" }} />
          WhatsApp
        </a>
        <a
          href="tel:+18885550147"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm text-white transition-all duration-200 active:scale-95"
          style={{
            backgroundColor: "var(--brand-primary)",
            backdropFilter: "blur(16px)",
          }}
        >
          <Phone size={18} className="text-white" />
          Call Now
        </a>
      </div>

    </div>
  );
}


