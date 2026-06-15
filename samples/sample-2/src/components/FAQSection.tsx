import { useEffect, useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How early should I start the application process?",
    answer:
      "We recommend starting at least 12–18 months before your intended intake. This gives ample time for test preparation (IELTS/TOEFL/GRE), university research, essay drafting, and visa processing. However, we've also successfully supported students who started just 4–6 months out.",
  },
  {
    question: "What are your consultation fees?",
    answer:
      "Your first consultation is completely free and carries no obligation. Our service packages vary based on the number of universities, destination countries, and level of support required. A full breakdown is provided after your initial consultation with a personalized quote.",
  },
  {
    question: "Do you guarantee university admissions?",
    answer:
      "No ethical consultancy can guarantee admissions, and we won't. What we guarantee is a strategic, expert approach that maximizes your chances — backed by a 94% offer rate for students who follow our full application program.",
  },
  {
    question: "How is your 98% visa approval rate calculated?",
    answer:
      "This figure is calculated from all visa applications submitted by our clients over the past three academic years across all destination countries. We maintain detailed records and are happy to share country-specific breakdowns during your consultation.",
  },
  {
    question: "Can you help with scholarship applications?",
    answer:
      "Absolutely. Scholarship support is a core part of our service. We maintain a regularly updated database of scholarships at our partner institutions, including merit-based, need-based, government-funded (MEXT, Chevening, DAAD), and university-specific awards.",
  },
  {
    question: "Do you support applications for undergraduate and postgraduate programs?",
    answer:
      "Yes — we support applications from A-Level/IB/Grade 12 students applying for undergraduate programs all the way through to PhD applicants. We also have specialist advisors for professional programs like MBA, LLM, and Medical degrees.",
  },
  {
    question: "Which countries do you specialize in?",
    answer:
      "We have dedicated specialist teams for the UK, USA, Canada, Australia, Germany, and Japan. These are the destinations where we have the deepest university partnerships, visa expertise, and on-ground support networks.",
  },
];

function FAQItem({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={`scroll-reveal scroll-reveal-delay-${Math.min(index + 1, 6)} border border-[#e8edf3] rounded-2xl overflow-hidden transition-all duration-200 ${
        open ? "border-[#D4AF37]/40 shadow-md" : "hover:border-[#3b6fa0]/30"
      }`}
    >
      <button
        className="w-full flex items-center justify-between gap-4 p-5 lg:p-6 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-serif-brand text-base lg:text-lg font-bold text-[#0f1b3d] leading-snug">
          {faq.question}
        </span>
        <span
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            open ? "bg-[#D4AF37] text-[#0f1b3d]" : "bg-[#e8edf3] text-[#3b6fa0]"
          }`}
        >
          {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
      </button>

      <div
        ref={contentRef}
        style={{
          maxHeight: open ? `${contentRef.current?.scrollHeight}px` : "0px",
          transition: "max-height 0.4s ease, opacity 0.3s ease",
          opacity: open ? 1 : 0,
          overflow: "hidden",
        }}
      >
        <div className="px-5 lg:px-6 pb-5 lg:pb-6">
          <p className="font-sans-brand text-[#3b6fa0] text-sm leading-relaxed font-light border-t border-[#e8edf3] pt-4">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
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
    <section id="faq" ref={sectionRef} className="py-20 lg:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="scroll-reveal inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-[#D4AF37]" />
            <span className="font-sans-brand text-xs font-semibold text-[#D4AF37] tracking-widest uppercase">
              FAQ
            </span>
            <span className="w-8 h-px bg-[#D4AF37]" />
          </div>
          <h2 className="scroll-reveal scroll-reveal-delay-1 font-serif-brand text-4xl lg:text-5xl font-bold text-[#0f1b3d] leading-tight mb-4">
            Questions Parents & Students Ask
          </h2>
          <p className="scroll-reveal scroll-reveal-delay-2 font-sans-brand text-[#3b6fa0] text-lg font-light leading-relaxed">
            Transparent answers to the most common concerns about studying abroad.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={faq.question} faq={faq} index={i} />
          ))}
        </div>

        {/* Still have questions CTA */}
        <div className="scroll-reveal text-center mt-12 bg-[#e8edf3] rounded-3xl p-8">
          <p className="font-serif-brand text-xl font-bold text-[#0f1b3d] mb-2">
            Still have questions?
          </p>
          <p className="font-sans-brand text-[#3b6fa0] text-sm mb-5 font-light">
            Our advisors are available Monday – Saturday, 9am – 7pm.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#consultation"
              className="inline-flex items-center justify-center gap-2 bg-[#0f1b3d] text-white font-sans-brand text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#1e3a5f] transition-colors"
            >
              Book a Free Call
            </a>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white border border-[#e8edf3] text-[#0f1b3d] font-sans-brand text-sm font-semibold px-6 py-3 rounded-full hover:border-[#D4AF37] transition-colors"
            >
              <svg className="w-4 h-4 fill-[#25D366]" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}