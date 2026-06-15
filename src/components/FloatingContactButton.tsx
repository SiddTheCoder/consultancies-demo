import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { useConsultancyName } from "@/lib/consultancy-name";

type FloatingContactButtonProps = {
  animation?: "stack" | "fan" | "sweep";
};

export default function FloatingContactButton({ animation = "stack" }: FloatingContactButtonProps) {
  const { consultancyName } = useConsultancyName();
  const [open, setOpen] = useState(false);
  const socialSlug = consultancyName.toLowerCase().replace(/[^a-z0-9]+/g, "");

  const socials = [
    {
      label: "Telegram",
      href: `https://t.me/${socialSlug || "consultancy"}`,
      color: "#229ED9",
      bg: "rgba(34,158,217,0.15)",
      border: "rgba(34,158,217,0.35)",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width={20} height={20}>
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.4 13.93l-2.95-.924c-.642-.204-.657-.642.136-.953l11.57-4.461c.534-.194 1.002.13.738.629z" />
        </svg>
      ),
    },
    {
      label: "Facebook",
      href: `https://facebook.com/${socialSlug || "consultancy"}`,
      color: "#1877F2",
      bg: "rgba(24,119,242,0.15)",
      border: "rgba(24,119,242,0.35)",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width={20} height={20}>
          <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.025 1.791-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.874v2.277h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
        </svg>
      ),
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/18885550148",
      color: "#25D366",
      bg: "rgba(37,211,102,0.15)",
      border: "rgba(37,211,102,0.35)",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width={20} height={20}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
    },
  ];

  const getTransform = (index: number) => {
    if (!open) {
      return animation === "stack" ? "translateY(16px) scale(0.8)" : "translate(0, 16px) scale(0.78) rotate(-8deg)";
    }
    if (animation === "fan") {
      const positions = [
        "translate(-84px, -22px) scale(1) rotate(-8deg)",
        "translate(-58px, -82px) scale(1) rotate(4deg)",
        "translate(0, -112px) scale(1) rotate(10deg)",
      ];
      return positions[index];
    }
    if (animation === "sweep") {
      return `translate(${-index * 18}px, ${-(index + 1) * 58}px) scale(1) rotate(${(index - 1) * 9}deg)`;
    }
    return "translateY(0) scale(1) rotate(0deg)";
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      <div className={animation === "stack" ? "flex flex-col items-center gap-3" : "absolute bottom-[76px] right-1 w-0 h-0"}>
        {socials.map((s, i) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            title={s.label}
            style={{
              backgroundColor: s.bg,
              border: `1px solid ${s.border}`,
              color: s.color,
              backdropFilter: "blur(12px)",
              opacity: open ? 1 : 0,
              transform: getTransform(i),
              pointerEvents: open ? "auto" : "none",
              transition: `opacity 0.28s ease ${open ? i * 65 : (2 - i) * 35}ms, transform 0.42s cubic-bezier(.2,.8,.2,1) ${open ? i * 65 : 0}ms`,
            }}
            className={`${animation === "stack" ? "" : "absolute right-0 bottom-0"} w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110`}
          >
            {s.icon}
          </a>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        title="Contact Us"
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
        style={{
          backgroundColor: "var(--brand-accent)",
          border: "2px solid var(--brand-border-strong)",
          boxShadow: "0 4px 24px rgba(217,164,65,0.45)",
        }}
      >
        <div
          style={{
            transition: "transform 0.3s ease",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          {open ? (
            <X size={22} className="text-[#10151c]" />
          ) : (
            <MessageCircle size={22} className="text-[#10151c]" />
          )}
        </div>
      </button>

      <span
        className="text-[10px] font-semibold tracking-wide uppercase"
        style={{ color: "var(--brand-accent)" }}
      >
        Contact
      </span>
    </div>
  );
}
