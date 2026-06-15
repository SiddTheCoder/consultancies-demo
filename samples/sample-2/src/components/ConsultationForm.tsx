import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  destination: z.string().min(1, "Please select a destination"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const destinations = [
  "United Kingdom",
  "United States",
  "Australia",
  "Canada",
  "Germany",
  "Japan",
  "Other / Not sure yet",
];

export default function ConsultationForm() {
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

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

  const onSubmit = async (_data: FormData) => {
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitted(true);
  };

  return (
    <section
      id="consultation"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-[#e8edf3]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Copy */}
          <div>
            <div className="scroll-reveal inline-flex items-center gap-2 mb-5">
              <span className="w-8 h-px bg-[#D4AF37]" />
              <span className="font-sans-brand text-xs font-semibold text-[#D4AF37] tracking-widest uppercase">
                Free Consultation
              </span>
            </div>

            <h2 className="scroll-reveal scroll-reveal-delay-1 font-serif-brand text-4xl lg:text-5xl font-bold text-[#0f1b3d] leading-tight mb-5">
              Let's Plan Your{" "}
              <em className="not-italic text-[#3b6fa0]">Academic Future</em>{" "}
              Together
            </h2>

            <p className="scroll-reveal scroll-reveal-delay-2 font-sans-brand text-[#3b6fa0] text-lg font-light leading-relaxed mb-8">
              Book a no-obligation 30-minute call with a senior education advisor. Walk away with a personalised roadmap, university shortlist, and clarity on next steps — at zero cost.
            </p>

            {/* What to expect */}
            <div className="scroll-reveal scroll-reveal-delay-3 space-y-4">
              {[
                "Personalised university shortlist based on your profile",
                "Clear visa and documentation requirements",
                "Honest scholarship and funding assessment",
                "No sales pressure — just expert guidance",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-[#D4AF37]" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="font-sans-brand text-sm text-[#1e3a5f] leading-relaxed">{item}</p>
                </div>
              ))}
            </div>

            {/* Team photo */}
            <div className="scroll-reveal scroll-reveal-delay-4 mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 5, 2, 6].map((i) => (
                  <img
                    key={i}
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/default-placeholder.png"
                    alt="advisor"
                    className="w-9 h-9 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <div>
                <p className="font-sans-brand text-sm font-semibold text-[#0f1b3d]">
                  Meet our advisor team
                </p>
                <p className="font-sans-brand text-xs text-[#3b6fa0]">
                  Average 8+ years of industry experience
                </p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="scroll-reveal scroll-reveal-delay-2">
            <div className="bg-white rounded-3xl shadow-xl shadow-[#0f1b3d]/8 p-8 lg:p-10">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mx-auto mb-5">
                    <svg className="w-8 h-8 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <h3 className="font-serif-brand text-2xl font-bold text-[#0f1b3d] mb-2">
                    You're All Set!
                  </h3>
                  <p className="font-sans-brand text-[#3b6fa0] text-sm font-light">
                    A senior advisor will reach out within 24 hours to schedule your free consultation. Check your inbox for a confirmation email.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="font-serif-brand text-2xl font-bold text-[#0f1b3d] mb-2">
                    Book Your Free Consultation
                  </h3>
                  <p className="font-sans-brand text-sm text-[#3b6fa0] mb-7 font-light">
                    No commitment. 30 minutes. Life-changing clarity.
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Name */}
                    <div>
                      <label className="font-sans-brand text-xs font-semibold text-[#1e3a5f] uppercase tracking-wider block mb-2">
                        Full Name
                      </label>
                      <input
                        {...register("name")}
                        placeholder="e.g. Priya Sharma"
                        className="w-full font-sans-brand text-sm text-[#0f1b3d] bg-[#e8edf3]/60 border border-[#e8edf3] rounded-xl px-4 py-3 outline-none focus:border-[#3b6fa0] focus:ring-2 focus:ring-[#3b6fa0]/10 transition-all placeholder:text-[#3b6fa0]/40"
                      />
                      {errors.name && (
                        <p className="font-sans-brand text-xs text-red-500 mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Email + Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-sans-brand text-xs font-semibold text-[#1e3a5f] uppercase tracking-wider block mb-2">
                          Email
                        </label>
                        <input
                          {...register("email")}
                          type="email"
                          placeholder="you@email.com"
                          className="w-full font-sans-brand text-sm text-[#0f1b3d] bg-[#e8edf3]/60 border border-[#e8edf3] rounded-xl px-4 py-3 outline-none focus:border-[#3b6fa0] focus:ring-2 focus:ring-[#3b6fa0]/10 transition-all placeholder:text-[#3b6fa0]/40"
                        />
                        {errors.email && (
                          <p className="font-sans-brand text-xs text-red-500 mt-1">{errors.email.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="font-sans-brand text-xs font-semibold text-[#1e3a5f] uppercase tracking-wider block mb-2">
                          Phone
                        </label>
                        <input
                          {...register("phone")}
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          className="w-full font-sans-brand text-sm text-[#0f1b3d] bg-[#e8edf3]/60 border border-[#e8edf3] rounded-xl px-4 py-3 outline-none focus:border-[#3b6fa0] focus:ring-2 focus:ring-[#3b6fa0]/10 transition-all placeholder:text-[#3b6fa0]/40"
                        />
                        {errors.phone && (
                          <p className="font-sans-brand text-xs text-red-500 mt-1">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Destination */}
                    <div>
                      <label className="font-sans-brand text-xs font-semibold text-[#1e3a5f] uppercase tracking-wider block mb-2">
                        Preferred Destination
                      </label>
                      <select
                        {...register("destination")}
                        className="w-full font-sans-brand text-sm text-[#0f1b3d] bg-[#e8edf3]/60 border border-[#e8edf3] rounded-xl px-4 py-3 outline-none focus:border-[#3b6fa0] focus:ring-2 focus:ring-[#3b6fa0]/10 transition-all appearance-none"
                      >
                        <option value="">Select a destination…</option>
                        {destinations.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                      {errors.destination && (
                        <p className="font-sans-brand text-xs text-red-500 mt-1">{errors.destination.message}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="font-sans-brand text-xs font-semibold text-[#1e3a5f] uppercase tracking-wider block mb-2">
                        Tell Us About Your Goals{" "}
                        <span className="text-[#3b6fa0]/50 normal-case font-normal">(Optional)</span>
                      </label>
                      <textarea
                        {...register("message")}
                        rows={3}
                        placeholder="e.g. I'm looking to apply for a master's in engineering starting September 2025…"
                        className="w-full font-sans-brand text-sm text-[#0f1b3d] bg-[#e8edf3]/60 border border-[#e8edf3] rounded-xl px-4 py-3 outline-none focus:border-[#3b6fa0] focus:ring-2 focus:ring-[#3b6fa0]/10 transition-all resize-none placeholder:text-[#3b6fa0]/40"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-3 bg-[#D4AF37] hover:bg-[#c09d2e] text-[#0f1b3d] font-sans-brand text-sm font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#D4AF37]/30 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
                          </svg>
                          Submitting…
                        </>
                      ) : (
                        <>
                          Book My Free Consultation
                          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </>
                      )}
                    </button>

                    <p className="font-sans-brand text-xs text-center text-[#3b6fa0]/60">
                      🔒 Your information is private and never shared with third parties.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}