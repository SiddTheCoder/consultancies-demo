import { useState, useEffect, useRef, useCallback } from "react";
import { Moon, Sun, Menu, X, Star, ChevronRight, Check, Phone, Mail, MapPin, Globe, Award, Users, MessageCircle, ArrowRight, GraduationCap, FileText, Plane, Building2, ChevronLeft, Pause, Play } from "lucide-react";
import { useConsultancyName } from "@/lib/consultancy-name";
import { useTheme } from "@/lib/theme";
import FloatingContactButton from "@/components/FloatingContactButton";
import ConsultancyProfileSection from "@/components/ConsultancyProfileSection";

// ─── Data ────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Destinations", href: "#destinations" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const COUNTRY_SLIDES = [
  {
    name: "Japan",
    flag: "🇯🇵",
    tagline: "Innovation Meets Tradition",
    detail: "World-class engineering & technology programs",
    img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_2c1fdddd68_12f5f4a6d863070b.png",
    color: "from-red-900/60 to-red-950/80",
    topStat: { value: "MEXT", label: "Scholarship Track" },
    bottomStat: { value: "800+", label: "University Options" },
  },
  {
    name: "Australia",
    flag: "🇦🇺",
    tagline: "Quality Education Down Under",
    detail: "8 of the world's top 100 universities",
    img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_0be41201b0_0cbd13c2909b5e6d.png",
    color: "from-blue-900/60 to-blue-950/80",
    topStat: { value: "8", label: "Group of Eight" },
    bottomStat: { value: "PSW", label: "Work Rights Plan" },
  },
  {
    name: "Canada",
    flag: "🇨🇦",
    tagline: "Multicultural Excellence",
    detail: "Post-graduation work permits & PR pathways",
    img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_e47bf1a3c5_37eb46dd1cdebff3.png",
    color: "from-red-800/60 to-slate-900/80",
    topStat: { value: "PR", label: "Pathway Mapping" },
    bottomStat: { value: "Co-op", label: "Program Strategy" },
  },
  {
    name: "United Kingdom",
    flag: "🇬🇧",
    tagline: "Centuries of Academic Prestige",
    detail: "Oxford, Cambridge, Imperial & more",
    img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_0011c2d996_d55c188369b75410.png",
    color: "from-indigo-900/60 to-slate-900/80",
    topStat: { value: "1 yr", label: "Master's Routes" },
    bottomStat: { value: "Russell", label: "Group Shortlist" },
  },
];

const BENTO_COUNTRIES = [
  {
    name: "Japan",
    flag: "🇯🇵",
    unis: "800+",
    tagline: "Top tech programs",
    img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_2717193255_aac3ccec3f9cb80b.png",
    size: "col-span-2 row-span-2",
  },
  {
    name: "Australia",
    flag: "🇦🇺",
    unis: "43",
    tagline: "Globally ranked",
    img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_1ade2b7da2_0083f41214e369b8.png",
    size: "col-span-1 row-span-1",
  },
  {
    name: "Canada",
    flag: "🇨🇦",
    unis: "96",
    tagline: "PR pathways",
    img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_b6e0a1b0fa_6a67b4d5a2618134.png",
    size: "col-span-1 row-span-1",
  },
  {
    name: "United Kingdom",
    flag: "🇬🇧",
    unis: "160+",
    tagline: "Centuries of excellence",
    img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_e102764dba_37c76389420d80dc.png",
    size: "col-span-1 row-span-1",
  },
  {
    name: "Germany",
    flag: "🇩🇪",
    unis: "400+",
    tagline: "Tuition-free options",
    img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_268808236f_f960e6674bedb7bb.png",
    size: "col-span-1 row-span-1",
  },
  {
    name: "USA",
    flag: "🇺🇸",
    unis: "4,000+",
    tagline: "Innovation hub",
    img_url: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_a807444f23_23b9e738509c32cb.png",
    size: "col-span-2 row-span-1",
  },
];

const SERVICES = [
  {
    icon: GraduationCap,
    title: "University Shortlisting",
    desc: "AI-powered matching with 500+ partner universities based on your profile, budget, and career goals.",
  },
  {
    icon: FileText,
    title: "SOP & Application",
    desc: "Expert writers craft compelling Statements of Purpose and handle complete application submissions.",
  },
  {
    icon: Award,
    title: "Scholarship Guidance",
    desc: "Identify and apply for merit-based, need-based, and country-specific scholarships worth thousands.",
  },
  {
    icon: Plane,
    title: "Visa Processing",
    desc: "97% visa success rate. End-to-end visa documentation, interview prep, and biometrics support.",
  },
  {
    icon: Building2,
    title: "Pre-Departure Prep",
    desc: "Accommodation, travel insurance, banking setup, and cultural orientation for a smooth transition.",
  },
  {
    icon: Globe,
    title: "Post-Arrival Support",
    desc: "On-ground assistance network in 30+ cities for the first 90 days after arrival.",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Free Consultation",
    desc: "Book a 30-minute session with our certified counselors to assess your academic profile and goals.",
    icon: MessageCircle,
    duration: "Day 1",
  },
  {
    step: "02",
    title: "Profile Evaluation",
    desc: "We analyze your academics, budget, preferred destinations and shortlist the best-fit universities.",
    icon: FileText,
    duration: "Week 1",
  },
  {
    step: "03",
    title: "Application Filing",
    desc: "Our team prepares all documents — SOP, LORs, transcripts — and submits applications on your behalf.",
    icon: GraduationCap,
    duration: "Week 2–4",
  },
  {
    step: "04",
    title: "Visa Clearance",
    desc: "We handle the entire visa filing process with mock interviews and embassy-ready documentation.",
    icon: Award,
    duration: "Month 2",
  },
  {
    step: "05",
    title: "Departure Ready",
    desc: "Pre-departure briefing, accommodation assistance, and travel checklist to start your journey with confidence.",
    icon: Plane,
    duration: "Month 3",
  },
];

const TESTIMONIALS = [
  {
    name: "Aanya Sharma",
    country: "Tokyo University, Japan",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg",
    rating: 5,
    text: "{consultancyName} turned my dream of studying in Japan into reality. Their visa support was flawless — approved in just 3 weeks!",
  },
  {
    name: "Marcus Chen",
    country: "University of Melbourne, Australia",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
    rating: 5,
    text: "From SOP writing to scholarship applications, every step was handled with incredible professionalism. Got a $15,000 scholarship!",
  },
  {
    name: "Priya Nair",
    country: "University of Toronto, Canada",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
    rating: 5,
    text: "I was confused about PR pathways. Their counselors explained everything clearly and helped me choose the perfect program.",
  },
  {
    name: "Omar Al-Rashid",
    country: "Imperial College, UK",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg",
    rating: 5,
    text: "The attention to detail in my application was outstanding. Accepted into my first-choice university with a partial scholarship.",
  },
  {
    name: "Sofia Müller",
    country: "TU Berlin, Germany",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg",
    rating: 5,
    text: "Germany was my dream and {consultancyName} made it happen tuition-free! Their knowledge of German universities is unmatched.",
  },
  {
    name: "James Okonkwo",
    country: "NYU, United States",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
    rating: 5,
    text: "Professional, transparent, and genuinely caring. They treated my goals as their own. Highly recommend for US admissions.",
  },
  {
    name: "Yuki Tanaka",
    country: "Waseda University, Japan",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg",
    rating: 5,
    text: "The team's expertise in Japanese university admissions is exceptional. They guided me through JLPT requirements seamlessly.",
  },
  {
    name: "Arjun Mehta",
    country: "UBC, Canada",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg",
    rating: 5,
    text: "Applied to 6 universities, got offers from 5! {consultancyName}'s strategic approach to university selection is truly remarkable.",
  },
];

const FAQS = [
  {
    q: "How early should I start the application process?",
    a: "We recommend starting 12–18 months before your intended intake. This allows ample time for document preparation, English tests, and visa processing.",
  },
  {
    q: "What countries do you specialize in?",
    a: "We have certified counselors for Japan, Australia, Canada, UK, Germany, and the USA. Our ICEF certification ensures globally recognized expertise.",
  },
  {
    q: "How is the free assessment conducted?",
    a: "It's a 30-minute virtual or in-person session with a certified counselor who reviews your academics, goals, and budget to recommend a clear roadmap.",
  },
  {
    q: "What is your visa success rate?",
    a: "We maintain a 97% visa approval rate, achieved through meticulous documentation, mock interviews, and up-to-date knowledge of embassy requirements.",
  },
  {
    q: "Do you help with scholarships?",
    a: "Absolutely. We identify university-specific, government, and merit-based scholarships and assist with applications. Our students have collectively won over $2M in scholarships.",
  },
  {
    q: "What are your service fees?",
    a: "Fees vary by service package. Our consultation is free. Contact us for a transparent breakdown — no hidden charges, ever.",
  },
];

const STATS = [
  { label: "Students Helped", value: 5000, suffix: "+", icon: Users },
  { label: "Visa Success Rate", value: 97, suffix: "%", icon: Check },
  { label: "Partner Universities", value: 500, suffix: "+", icon: Building2 },
  { label: "Years of Experience", value: 12, suffix: "+", icon: Award },
];

// ─── Components ──────────────────────────────────────────────────────────────

// Animated Counter
function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// Hero Carousel
function HeroCarousel({ isDark }: { isDark: boolean }) {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % COUNTRY_SLIDES.length);
    }, 3000);
  }, []);

  useEffect(() => {
    if (isPlaying) startInterval();
    else if (intervalRef.current) clearInterval(intervalRef.current);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying, startInterval]);

  const goTo = (idx: number) => {
    setCurrent(idx);
    if (isPlaying) startInterval();
  };

  const slide = COUNTRY_SLIDES[current];

  return (
    <div
      className="relative w-full h-full rounded-2xl overflow-hidden group"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Slides */}
      <div className="absolute inset-0">
        <img
          key={slide.img_url}
          src={slide.img_url}
          alt={slide.name}
          className="w-full h-full object-cover animate-hero-image-slide"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${slide.color}`} />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
        <div key={`copy-${slide.name}`} className="animate-fade-in-up">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xl">{slide.flag}</span>
            <span className="text-white font-bold text-xl">{slide.name}</span>
          </div>
          <p className="text-[#F5A623] font-semibold text-sm mb-1">{slide.tagline}</p>
          <p className="text-white/80 text-xs">{slide.detail}</p>
        </div>
      </div>

      <div className="absolute -left-3 bottom-16 z-20 transition-transform duration-300 ease-out group-hover:translate-x-5 group-hover:-translate-y-4">
        <div key={`bottom-${slide.name}`} className="rounded-xl px-4 py-3 shadow-2xl animate-hero-card-slide" style={{ backgroundColor: isDark ? "rgba(17,21,32,0.92)" : "rgba(255,255,255,0.94)", border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`, backdropFilter: "blur(12px)" }}>
          <div className="text-lg font-black text-[#F5A623] leading-tight">{slide.bottomStat.value}</div>
          <div className={`text-xs ${isDark ? "text-gray-300" : "text-gray-600"}`}>{slide.bottomStat.label}</div>
        </div>
      </div>

      <div className="absolute -right-3 top-16 z-20 transition-transform duration-300 ease-out group-hover:-translate-x-5 group-hover:translate-y-4">
        <div key={`top-${slide.name}`} className="rounded-xl px-4 py-3 shadow-2xl animate-hero-card-slide" style={{ backgroundColor: isDark ? "rgba(17,21,32,0.92)" : "rgba(255,255,255,0.94)", border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`, backdropFilter: "blur(12px)" }}>
          <div className="text-lg font-black text-[#F5A623] leading-tight">{slide.topStat.value}</div>
          <div className={`text-xs ${isDark ? "text-gray-300" : "text-gray-600"}`}>{slide.topStat.label}</div>
        </div>
      </div>

      {/* Nav Controls */}
      <button
        onClick={() => goTo((current - 1 + COUNTRY_SLIDES.length) % COUNTRY_SLIDES.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#F5A623] hover:border-[#F5A623]"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={() => goTo((current + 1) % COUNTRY_SLIDES.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#F5A623] hover:border-[#F5A623]"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Play/Pause */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
        {COUNTRY_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current ? "bg-[#F5A623] w-6 h-2" : "bg-white/40 w-2 h-2 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Country count badge */}
      <div className="absolute top-3 left-3 z-20 bg-black/40 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1 text-white/80 text-xs font-medium">
        {current + 1} / {COUNTRY_SLIDES.length} Countries
      </div>
    </div>
  );
}

// FAQ Item
function FAQItem({ q, a, isDark }: { q: string; a: string; isDark: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`rounded-xl border transition-all duration-300 overflow-hidden ${
        isDark
          ? "border-white/10 bg-white/3 hover:border-[#F5A623]/30"
          : "border-gray-200 bg-white hover:border-[#F5A623]/40"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between px-6 py-4 text-left font-semibold transition-colors ${
          isDark ? "text-white hover:text-[#F5A623]" : "text-gray-900 hover:text-[#D4891A]"
        }`}
      >
        <span className="text-sm md:text-base pr-4">{q}</span>
        <ChevronRight
          className={`w-5 h-5 flex-shrink-0 text-[#F5A623] transition-transform duration-300 ${open ? "rotate-90" : ""}`}
        />
      </button>
      <div className={`transition-all duration-300 ${open ? "max-h-48 pb-4" : "max-h-0"} overflow-hidden`}>
        <p className={`px-6 text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>{a}</p>
      </div>
    </div>
  );
}

// Main Page
export default function Index() {
  const { consultancyName, emailAddress } = useConsultancyName();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={isDark ? "dark" : ""}>
      <div className={`min-h-screen ${isDark ? "bg-[#0D0F14] text-white" : "bg-[#f8f9fc] text-gray-900"} font-['Inter',sans-serif] transition-colors duration-500`}>

        {/* ── Navbar ── */}
        <nav
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled
              ? isDark
                ? "bg-[#0D0F14]/95 backdrop-blur-md border-b border-white/8 shadow-xl"
                : "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-md"
              : "bg-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-18">
              {/* Logo */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#F5A623] flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-[#0D0F14]" />
                </div>
                <span className={`font-sans font-bold text-sm md:text-[15px] tracking-normal max-w-[220px] truncate ${isDark ? "text-white" : "text-gray-900"}`}>{consultancyName}</span>
              </div>

              {/* Desktop Nav */}
              <div className="hidden lg:flex items-center gap-6">
                {NAV_LINKS.map((l) => (
                  <button
                    key={l.href}
                    onClick={() => scrollTo(l.href)}
                    className={`text-sm font-medium transition-colors duration-200 ${
                      isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-2 lg:gap-3">
                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 border ${
                    isDark
                      ? "border-white/10 bg-white/5 text-yellow-400 hover:bg-white/10"
                      : "border-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  aria-label="Toggle theme"
                >
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>

                {/* CTA */}
                <button
                  onClick={() => scrollTo("#contact")}
                  className="hidden sm:flex items-center gap-1.5 bg-[#F5A623] hover:bg-[#F7B84B] text-[#0D0F14] font-bold text-sm px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-[#F5A623]/25"
                >
                  Book Free Assessment
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {/* Hamburger */}
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className={`lg:hidden w-9 h-9 rounded-full flex items-center justify-center border ${
                    isDark ? "border-white/10 bg-white/5 text-white" : "border-gray-200 bg-gray-100 text-gray-700"
                  }`}
                >
                  {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden transition-all duration-300 overflow-hidden ${
              menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            } ${isDark ? "bg-[#111520] border-t border-white/8" : "bg-white border-t border-gray-100"}`}
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {NAV_LINKS.map((l) => (
                <button
                  key={l.href}
                  onClick={() => scrollTo(l.href)}
                  className={`text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                    isDark ? "text-gray-300 hover:bg-white/5 hover:text-white" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("#contact")}
                className="mt-2 bg-[#F5A623] text-[#0D0F14] font-bold px-4 py-3 rounded-lg text-sm"
              >
                Book Free Assessment →
              </button>
            </div>
          </div>
        </nav>

        {/* ── Hero Section ── */}
        <section
          className={`relative min-h-screen pt-16 flex items-center overflow-hidden ${
            isDark ? "hero-gradient-dark" : "hero-gradient-light"
          }`}
        >
          {/* Background subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(${isDark ? "#ffffff" : "#000000"} 1px, transparent 1px), linear-gradient(to right, ${isDark ? "#ffffff" : "#000000"} 1px, transparent 1px)`,
              backgroundSize: "64px 64px",
            }}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left */}
              <div className="animate-slide-in-left">
                {/* Badge */}
                <div className={`inline-flex items-center gap-2 border rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest mb-8 ${
                  isDark ? "border-[#F5A623]/30 bg-[#F5A623]/8 text-[#F5A623]" : "border-[#F5A623]/40 bg-[#F5A623]/10 text-[#D4891A]"
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] animate-pulse" />
                  5,000+ Students Placed in Top Global Universities
                </div>

                {/* Headline */}
                <h1 className={`text-5xl md:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
                  Your Academic<br />
                  Future,{" "}
                  <span className="text-[#F5A623]">Engineered</span>
                  <br />
                  With Precision.
                </h1>

                <p className={`text-base md:text-lg leading-relaxed mb-8 max-w-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  Expert-guided admissions consulting for Japan, Australia, Germany, Canada, UK, and the USA. From shortlisting to visa clearance — every step, handled with authority.
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3 mb-10">
                  <button
                    onClick={() => scrollTo("#contact")}
                    className="flex items-center gap-2 bg-[#F5A623] hover:bg-[#F7B84B] text-[#0D0F14] font-bold px-6 py-3.5 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-[#F5A623]/30 hover:-translate-y-0.5"
                  >
                    Start Free Assessment
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => scrollTo("#destinations")}
                    className={`flex items-center gap-2 font-semibold px-6 py-3.5 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 ${
                      isDark
                        ? "border-white/15 text-white hover:border-white/30 hover:bg-white/5"
                        : "border-gray-300 text-gray-900 hover:border-gray-400 hover:bg-white"
                    }`}
                  >
                    View University List
                    <Globe className="w-4 h-4" />
                  </button>
                </div>

                {/* WhatsApp CTA */}
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-all duration-200 hover:shadow-lg hover:shadow-green-500/25 mb-10"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp — Free Advice
                </a>

                {/* Trust Badges */}
                <div className={`flex flex-wrap items-center gap-6 pt-6 border-t ${isDark ? "border-white/8" : "border-gray-200"}`}>
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-[#F5A623] fill-[#F5A623]" />
                    <span className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>4.9/5 Google Rating</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#F5A623]" />
                    <span className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>Certified ICEF Partner</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>97% Visa Success Rate</span>
                  </div>
                </div>
              </div>

              {/* Right — Carousel */}
              <div className="relative animate-fade-in-up h-[420px] md:h-[500px] lg:h-[560px]">
                <HeroCarousel isDark={isDark} />
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats / Counters ── */}
        <section className={`py-16 ${isDark ? "bg-[#0A0C12]" : "bg-white"} border-y ${isDark ? "border-white/6" : "border-gray-100"}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {STATS.map(({ label, value, suffix, icon: Icon }) => (
                <div key={label} className="text-center">
                  <div className={`w-12 h-12 rounded-xl bg-[#F5A623]/10 flex items-center justify-center mx-auto mb-3`}>
                    <Icon className="w-5 h-5 text-[#F5A623]" />
                  </div>
                  <div className={`text-3xl md:text-4xl font-black mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                    <AnimatedCounter target={value} suffix={suffix} />
                  </div>
                  <p className={`text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ConsultancyProfileSection variant="modern" />

        {/* ── Destinations Bento Grid ── */}
        <section id="destinations" className={`py-20 lg:py-28 ${isDark ? "bg-[#0D0F14]" : "bg-[#f8f9fc]"}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className={`inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 ${
                isDark ? "bg-[#F5A623]/10 text-[#F5A623]" : "bg-[#F5A623]/10 text-[#D4891A]"
              }`}>Our Destinations</span>
              <h2 className={`text-4xl md:text-5xl font-black leading-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                Study Anywhere,{" "}
                <span className="text-[#F5A623]">Excel Everywhere</span>
              </h2>
              <p className={`mt-4 text-base max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                We specialize in 6 of the world's most sought-after study destinations, with deep expertise in each country's admission process.
              </p>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4">
              {BENTO_COUNTRIES.map((country, i) => (
                <div
                  key={country.name}
                  className={`relative rounded-2xl overflow-hidden group cursor-pointer ${
                    i === 0 ? "col-span-2 row-span-2" : i === 5 ? "col-span-2 row-span-1" : "col-span-1 row-span-1"
                  }`}
                >
                  <img
                    src={country.img_url}
                    alt={country.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/90" />
                  <div className="absolute inset-0 p-4 md:p-5 flex flex-col justify-end">
                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={i === 0 ? "text-3xl" : "text-xl"}>{country.flag}</span>
                        <span className={`font-bold text-white ${i === 0 ? "text-xl md:text-2xl" : "text-sm md:text-base"}`}>{country.name}</span>
                      </div>
                      <p className={`text-[#F5A623] font-medium ${i === 0 ? "text-sm" : "text-xs"}`}>{country.tagline}</p>
                      <div className="overflow-hidden max-h-0 group-hover:max-h-10 transition-all duration-300 mt-1">
                        <p className="text-white/70 text-xs">{country.unis} Universities</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Services ── */}
        <section id="services" className={`py-20 lg:py-28 ${isDark ? "bg-[#0A0C12]" : "bg-white"}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className={`inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 ${
                isDark ? "bg-[#F5A623]/10 text-[#F5A623]" : "bg-[#F5A623]/10 text-[#D4891A]"
              }`}>What We Do</span>
              <h2 className={`text-4xl md:text-5xl font-black leading-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                End-to-End{" "}
                <span className="text-[#F5A623]">Consultancy Services</span>
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className={`group p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    isDark
                      ? "border-white/8 bg-white/3 hover:border-[#F5A623]/30 hover:bg-white/5 hover:shadow-[#F5A623]/5"
                      : "border-gray-100 bg-white hover:border-[#F5A623]/30 hover:shadow-orange-100/50"
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-[#F5A623]/10 flex items-center justify-center mb-4 group-hover:bg-[#F5A623]/20 transition-colors">
                    <Icon className="w-5 h-5 text-[#F5A623]" />
                  </div>
                  <h3 className={`font-bold text-lg mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>{title}</h3>
                  <p className={`text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Process Timeline ── */}
        <section id="process" className={`py-20 lg:py-28 ${isDark ? "bg-[#0D0F14]" : "bg-[#f8f9fc]"}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className={`inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 ${
                isDark ? "bg-[#F5A623]/10 text-[#F5A623]" : "bg-[#F5A623]/10 text-[#D4891A]"
              }`}>Student Journey</span>
              <h2 className={`text-4xl md:text-5xl font-black leading-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                Your Path to{" "}
                <span className="text-[#F5A623]">Global Education</span>
              </h2>
              <p className={`mt-4 text-base max-w-xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                A clear, structured 5-step process designed to maximize your chances of success.
              </p>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className={`absolute left-8 md:left-1/2 top-0 bottom-0 w-px ${isDark ? "timeline-line-dark" : "timeline-line-light"} hidden sm:block`} />

              <div className="flex flex-col gap-8 md:gap-12">
                {PROCESS_STEPS.map((step, i) => {
                  const Icon = step.icon;
                  const isEven = i % 2 === 0;
                  return (
                    <div key={step.step} className={`relative flex items-start gap-6 md:gap-0 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}>
                      {/* Card */}
                      <div className={`flex-1 ${isEven ? "md:pr-16 md:text-right" : "md:pl-16"} sm:ml-16 md:ml-0`}>
                        <div
                          className={`inline-block p-5 md:p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                            isDark
                              ? "border-white/8 bg-white/3 hover:border-[#F5A623]/30"
                              : "border-gray-100 bg-white hover:border-[#F5A623]/30 shadow-sm"
                          }`}
                        >
                          <div className={`flex items-center gap-3 mb-2 ${isEven ? "md:flex-row-reverse" : ""}`}>
                            <span className="text-[#F5A623] text-xs font-bold uppercase tracking-widest">{step.duration}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                              isDark ? "bg-[#F5A623]/10 text-[#F5A623]" : "bg-[#F5A623]/10 text-[#D4891A]"
                            }`}>Step {step.step}</span>
                          </div>
                          <h3 className={`font-bold text-lg mb-1.5 ${isDark ? "text-white" : "text-gray-900"}`}>{step.title}</h3>
                          <p className={`text-sm leading-relaxed max-w-sm ${isDark ? "text-gray-400" : "text-gray-600"} ${isEven ? "md:ml-auto" : ""}`}>{step.desc}</p>
                        </div>
                      </div>

                      {/* Node */}
                      <div className="absolute left-0 sm:left-8 md:left-1/2 md:-translate-x-1/2 top-5 z-10">
                        <div className="w-12 h-12 rounded-full bg-[#F5A623] flex items-center justify-center shadow-lg shadow-[#F5A623]/30">
                          <Icon className="w-5 h-5 text-[#0D0F14]" />
                        </div>
                      </div>

                      {/* Spacer for opposite side */}
                      <div className="hidden md:block flex-1" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section id="testimonials" className={`py-20 lg:py-28 overflow-hidden ${isDark ? "bg-[#0A0C12]" : "bg-white"}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <div className="text-center">
              <span className={`inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 ${
                isDark ? "bg-[#F5A623]/10 text-[#F5A623]" : "bg-[#F5A623]/10 text-[#D4891A]"
              }`}>Student Stories</span>
              <h2 className={`text-4xl md:text-5xl font-black leading-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                Trusted by{" "}
                <span className="text-[#F5A623]">5,000+ Students</span>
              </h2>
              <p className={`mt-4 text-base ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                Real results from real students across the globe.
              </p>
            </div>
          </div>

          {/* Infinite scroll marquee */}
          <div className="relative">
            <div className={`absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none ${
              isDark
                ? "bg-gradient-to-r from-[#0A0C12] to-transparent"
                : "bg-gradient-to-r from-white to-transparent"
            }`} />
            <div className={`absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none ${
              isDark
                ? "bg-gradient-to-l from-[#0A0C12] to-transparent"
                : "bg-gradient-to-l from-white to-transparent"
            }`} />
            <div className="flex animate-marquee gap-5 w-max">
              {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                <div
                  key={i}
                  className={`w-80 flex-shrink-0 p-6 rounded-2xl border transition-colors ${
                    isDark ? "border-white/8 bg-white/3" : "border-gray-100 bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 text-[#F5A623] fill-[#F5A623]" />
                    ))}
                  </div>
                  <p className={`text-sm leading-relaxed mb-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>"{t.text.replace("{consultancyName}", consultancyName)}"</p>
                  <div className="flex items-center gap-3">
                    <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <p className={`font-semibold text-sm ${isDark ? "text-white" : "text-gray-900"}`}>{t.name}</p>
                      <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}>{t.country}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className={`py-20 lg:py-28 ${isDark ? "bg-[#0D0F14]" : "bg-[#f8f9fc]"}`}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className={`inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 ${
                isDark ? "bg-[#F5A623]/10 text-[#F5A623]" : "bg-[#F5A623]/10 text-[#D4891A]"
              }`}>FAQ</span>
              <h2 className={`text-4xl md:text-5xl font-black leading-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                Common <span className="text-[#F5A623]">Questions</span>
              </h2>
            </div>
            <div className="flex flex-col gap-3">
              {FAQS.map((faq) => (
                <FAQItem key={faq.q} q={faq.q} a={faq.a} isDark={isDark} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className={`py-20 lg:py-28 ${isDark ? "bg-[#0A0C12]" : "bg-white"}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Left */}
              <div>
                <span className={`inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 ${
                  isDark ? "bg-[#F5A623]/10 text-[#F5A623]" : "bg-[#F5A623]/10 text-[#D4891A]"
                }`}>Get in Touch</span>
                <h2 className={`text-4xl md:text-5xl font-black leading-tight mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                  Start Your{" "}
                  <span className="text-[#F5A623]">Journey Today</span>
                </h2>
                <p className={`text-base leading-relaxed mb-8 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  Book a free 30-minute consultation with our expert counselors. No obligation, just clarity on your path.
                </p>

                <div className="flex flex-col gap-4">
                  <a href="tel:+1234567890" className={`flex items-center gap-3 group`}>
                    <div className="w-10 h-10 rounded-xl bg-[#F5A623]/10 flex items-center justify-center group-hover:bg-[#F5A623]/20 transition-colors">
                      <Phone className="w-4 h-4 text-[#F5A623]" />
                    </div>
                    <span className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>+1 (234) 567-890</span>
                  </a>
                  <a href={`mailto:${emailAddress}`} className={`flex items-center gap-3 group`}>
                    <div className="w-10 h-10 rounded-xl bg-[#F5A623]/10 flex items-center justify-center group-hover:bg-[#F5A623]/20 transition-colors">
                      <Mail className="w-4 h-4 text-[#F5A623]" />
                    </div>
                    <span className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>{emailAddress}</span>
                  </a>
                  <div className={`flex items-center gap-3`}>
                    <div className="w-10 h-10 rounded-xl bg-[#F5A623]/10 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-[#F5A623]" />
                    </div>
                    <span className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>123 Education Ave, New York, NY 10001</span>
                  </div>
                </div>

                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold px-5 py-3 rounded-xl text-sm transition-all duration-200 hover:shadow-lg hover:shadow-green-500/25"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Us — Fast Response
                </a>
              </div>

              {/* Right — Form */}
              <div className={`p-6 md:p-8 rounded-2xl border ${
                isDark ? "border-white/8 bg-white/3" : "border-gray-100 bg-gray-50"
              }`}>
                <h3 className={`font-bold text-xl mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>Book Free Assessment</h3>
                <div className="flex flex-col gap-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${isDark ? "text-gray-400" : "text-gray-600"}`}>Full Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className={`w-full px-4 py-3 rounded-xl text-sm border outline-none transition-colors focus:border-[#F5A623] ${
                          isDark ? "bg-white/5 border-white/10 text-white placeholder:text-gray-600" : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400"
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${isDark ? "text-gray-400" : "text-gray-600"}`}>Email</label>
                      <input
                        type="email"
                        placeholder="you@email.com"
                        className={`w-full px-4 py-3 rounded-xl text-sm border outline-none transition-colors focus:border-[#F5A623] ${
                          isDark ? "bg-white/5 border-white/10 text-white placeholder:text-gray-600" : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400"
                        }`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={`block text-xs font-semibold mb-1.5 ${isDark ? "text-gray-400" : "text-gray-600"}`}>Phone</label>
                    <input
                      type="tel"
                      placeholder="+1 (234) 567-890"
                      className={`w-full px-4 py-3 rounded-xl text-sm border outline-none transition-colors focus:border-[#F5A623] ${
                        isDark ? "bg-white/5 border-white/10 text-white placeholder:text-gray-600" : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400"
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs font-semibold mb-1.5 ${isDark ? "text-gray-400" : "text-gray-600"}`}>Preferred Destination</label>
                    <select
                      className={`w-full px-4 py-3 rounded-xl text-sm border outline-none transition-colors focus:border-[#F5A623] ${
                        isDark ? "bg-white/5 border-white/10 text-gray-300" : "bg-white border-gray-200 text-gray-900"
                      }`}
                    >
                      <option value="">Select a country...</option>
                      <option>Japan</option>
                      <option>Australia</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                      <option>Germany</option>
                      <option>USA</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-xs font-semibold mb-1.5 ${isDark ? "text-gray-400" : "text-gray-600"}`}>Message</label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about your academic background and goals..."
                      className={`w-full px-4 py-3 rounded-xl text-sm border outline-none transition-colors focus:border-[#F5A623] resize-none ${
                        isDark ? "bg-white/5 border-white/10 text-white placeholder:text-gray-600" : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400"
                      }`}
                    />
                  </div>
                  <button className="w-full bg-[#F5A623] hover:bg-[#F7B84B] text-[#0D0F14] font-bold py-3.5 rounded-xl text-sm transition-all duration-200 hover:shadow-lg hover:shadow-[#F5A623]/30 flex items-center justify-center gap-2">
                    Book Free Consultation
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className={`py-12 border-t ${isDark ? "bg-[#080A0F] border-white/8" : "bg-gray-50 border-gray-200"}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
              {/* Brand */}
              <div className="sm:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F5A623] flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-[#0D0F14]" />
                  </div>
                  <span className={`font-bold text-lg ${isDark ? "text-white" : "text-gray-900"}`}>{consultancyName}</span>
                </div>
                <p className={`text-sm leading-relaxed mb-4 ${isDark ? "text-gray-500" : "text-gray-600"}`}>
                  Certified ICEF partner helping students achieve their global education dreams since 2012.
                </p>
                <div className="flex items-center gap-1 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-[#F5A623] fill-[#F5A623]" />
                  ))}
                  <span className={`text-xs ml-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>4.9/5 Google Rating</span>
                </div>
              </div>

              {/* Destinations */}
              <div>
                <h4 className={`font-bold text-sm mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>Destinations</h4>
                <ul className="flex flex-col gap-2">
                  {["Japan", "Australia", "Canada", "United Kingdom", "Germany", "USA"].map((c) => (
                    <li key={c}>
                      <button
                        onClick={() => scrollTo("#destinations")}
                        className={`text-sm transition-colors ${isDark ? "text-gray-500 hover:text-[#F5A623]" : "text-gray-600 hover:text-[#D4891A]"}`}
                      >
                        {c}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div>
                <h4 className={`font-bold text-sm mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>Services</h4>
                <ul className="flex flex-col gap-2">
                  {["University Shortlisting", "Application Support", "Visa Processing", "Scholarship Guidance", "Pre-Departure Prep"].map((s) => (
                    <li key={s}>
                      <button
                        onClick={() => scrollTo("#services")}
                        className={`text-sm transition-colors ${isDark ? "text-gray-500 hover:text-[#F5A623]" : "text-gray-600 hover:text-[#D4891A]"}`}
                      >
                        {s}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className={`font-bold text-sm mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>Company</h4>
                <ul className="flex flex-col gap-2">
                  {["About Us", "Careers", "Partner Universities", "Blog", "Privacy Policy", "Terms of Service"].map((s) => (
                    <li key={s}>
                      <a href="#" className={`text-sm transition-colors ${isDark ? "text-gray-500 hover:text-[#F5A623]" : "text-gray-600 hover:text-[#D4891A]"}`}>{s}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={`pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${isDark ? "border-white/6" : "border-gray-200"}`}>
              <p className={`text-xs ${isDark ? "text-gray-600" : "text-gray-500"}`}>
                © 2024 {consultancyName}. All rights reserved. Certified ICEF Education Agent.
              </p>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}>Currently accepting new students</span>
              </div>
            </div>
          </div>
        </footer>

        {/* ── Sticky Mobile CTA ── */}
        <div className={`fixed bottom-4 left-4 right-4 z-40 sm:hidden transition-all duration-300`}>
          <div className={`rounded-2xl flex items-center gap-2 overflow-hidden shadow-2xl ${
            isDark ? "bg-[#111520] border border-white/10" : "bg-white border border-gray-200 shadow-gray-200"
          }`}>
            <button
              onClick={() => scrollTo("#contact")}
              className="flex-1 bg-[#F5A623] text-[#0D0F14] font-bold py-4 text-sm flex items-center justify-center gap-1.5"
            >
              Book Free Assessment
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white py-4 px-5 flex items-center justify-center"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>

        <FloatingContactButton animation="sweep" />

      </div>
    </div>
  );
}
