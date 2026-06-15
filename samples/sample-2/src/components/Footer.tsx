import { Globe } from "lucide-react";
import { useConsultancyName } from "@/lib/consultancy-name";

const footerLinks = {
  Destinations: ["United Kingdom", "United States", "Australia", "Canada", "Germany", "Japan"],
  Services: ["University Selection", "Application Support", "Visa Processing", "Scholarships", "Pre-Departure"],
  Company: ["About Us", "Our Team", "Success Stories", "Blog", "Careers"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export default function Footer() {
  const { consultancyName, emailAddress } = useConsultancyName();

  return (
    <footer className="bg-[#0a1428] text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-full bg-[#1e3a5f] flex items-center justify-center">
                <Globe className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <span className="font-serif-brand text-lg font-bold text-white tracking-tight">{consultancyName}</span>
            </div>
            <p className="font-sans-brand text-sm text-white/50 leading-relaxed mb-6 max-w-xs font-light">
              Guiding ambitious students to world-class universities since 2010. Trusted by 5,000+ families across 40 countries.
            </p>

            {/* Social links */}
            <div className="flex gap-3">
              {["linkedin", "instagram", "facebook", "twitter"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#D4AF37]/20 flex items-center justify-center transition-colors duration-200 border border-white/10 hover:border-[#D4AF37]/40"
                >
                  <span className="font-sans-brand text-xs text-white/60 capitalize">{s[0].toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-sans-brand text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-sans-brand text-sm text-white/60 hover:text-[#D4AF37] transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Contact bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-6 items-center">
            <a
              href={`mailto:${emailAddress}`}
              className="font-sans-brand text-sm text-white/50 hover:text-white transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              {emailAddress}
            </a>
            <a
              href="tel:+1234567890"
              className="font-sans-brand text-sm text-white/50 hover:text-white transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9 9 9.14c.878.877 1.874 1.638 2.96 2.27l1.06-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 12.92z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              +1 (234) 567-890
            </a>
          </div>

          <p className="font-sans-brand text-xs text-white/30">
            © {new Date().getFullYear()} {consultancyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
