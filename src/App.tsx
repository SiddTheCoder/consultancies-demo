import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { BrowserRouter, Link, Route, Routes, useParams } from "react-router-dom";
import { ConsultancyNameProvider, DEFAULT_CONSULTANCY_NAME, useConsultancyName } from "@/lib/consultancy-name";
import { ThemeProvider } from "@/lib/theme";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import Index from "./pages/Index";
import SamplesLanding from "./pages/SamplesLanding";
import NotFound from "./pages/NotFound";
import Sample2 from "../samples/sample-2/src/pages/Index";
import Sample3 from "../samples/sample-3/src/pages/Index";

const queryClient = new QueryClient();

const ConsultancyNameModal = () => {
  const { hasUrlConsultancyName, setConsultancyName } = useConsultancyName();
  const [open, setOpen] = useState(true);
  const [name, setName] = useState(DEFAULT_CONSULTANCY_NAME);

  if (hasUrlConsultancyName) return null;
  if (!open) return null;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setConsultancyName(name);
    setOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4" style={{ backgroundColor: "rgba(8,12,18,0.78)", backdropFilter: "blur(12px)" }}>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border p-6 shadow-2xl"
        style={{ backgroundColor: "#10151c", borderColor: "rgba(255,255,255,0.1)", color: "#e8edf3" }}
      >
        <div className="mb-5 text-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#d9a441" }}>Demo setup</p>
          <h2 className="text-2xl font-extrabold font-jakarta">Enter consultancy name</h2>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: "#8fa3b8" }}>
            This name will be used across every sample demo.
          </p>
        </div>

        <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#8fa3b8" }}>
          Consultancy name
        </label>
        <input
          autoFocus
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full rounded-xl px-4 py-3 text-sm outline-none"
          style={{ backgroundColor: "#1e2a38", border: "1px solid rgba(255,255,255,0.12)", color: "#ffffff" }}
          placeholder="e.g. Everest Global Education"
        />
        <button
          type="submit"
          className="mt-5 w-full rounded-xl px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#4a6c8f" }}
        >
          Continue to demos
        </button>
      </form>
    </div>
  );
};

const DemoFrame = ({ children, className = "", title }: { children: ReactNode; className?: string; title: string }) => {
  const { clientSlug } = useParams();
  const [scrolled, setScrolled] = useState(false);
  const backHref = clientSlug ? `/${clientSlug}` : "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 34);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`demo-frame ${scrolled ? "demo-frame-scrolled" : ""} min-h-screen ${className}`}>
      <div
        className="relative z-[100] h-9 px-4 grid grid-cols-3 items-center text-[10px] font-bold"
        style={{ backgroundColor: "#10151c", color: "#e8edf3", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
      >
        <Link to={backHref} className="justify-self-start transition-colors hover:text-white" style={{ color: "#b0c4d8" }}>
          Back
        </Link>
        <span className="justify-self-center uppercase tracking-widest text-center truncate max-w-[70vw]" style={{ color: "#d9a441" }}>
          Demo mode - {title}
        </span>
        <span />
      </div>
      {children}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <ConsultancyNameProvider>
          <Toaster />
          <Sonner />
          <ConsultancyNameModal />
          <ThemeToggleButton />
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Routes>
              <Route path="/" element={<SamplesLanding />} />
              <Route path="/sample-1" element={<DemoFrame title="Sample 1" className="sample-1-demo"><Index /></DemoFrame>} />
              <Route path="/sample-2" element={<DemoFrame title="Sample 2" className="sample-2-demo"><Sample2 /></DemoFrame>} />
              <Route path="/sample-3" element={<DemoFrame title="Sample 3" className="sample-3-demo"><Sample3 /></DemoFrame>} />
              <Route path="/:clientSlug" element={<SamplesLanding />} />
              <Route path="/:clientSlug/sample-1" element={<DemoFrame title="Sample 1" className="sample-1-demo"><Index /></DemoFrame>} />
              <Route path="/:clientSlug/sample-2" element={<DemoFrame title="Sample 2" className="sample-2-demo"><Sample2 /></DemoFrame>} />
              <Route path="/:clientSlug/sample-3" element={<DemoFrame title="Sample 3" className="sample-3-demo"><Sample3 /></DemoFrame>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ConsultancyNameProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
