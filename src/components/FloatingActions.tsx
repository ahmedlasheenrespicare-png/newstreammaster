import { useState, useEffect } from "react";
import { IconChat, IconZap } from "./Icons";
import { getWhatsAppUrl } from "../data";

interface FloatingActionsProps {
  onOpenTrial: () => void;
}

export default function FloatingActions({ onOpenTrial }: FloatingActionsProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 start-6 z-40 flex flex-col items-start gap-3">
      {/* Scroll To Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 border border-white/20 text-white shadow-xl hover:bg-slate-800 transition-all hover:scale-105"
          aria-label="الرجوع للأعلى"
        >
          ↑
        </button>
      )}

      {/* Free Trial Button */}
      <button
        onClick={onOpenTrial}
        className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-amber-500 text-white font-black px-4 py-3 shadow-2xl shadow-red-600/40 hover:scale-105 transition-all text-[13px] border border-white/20"
      >
        <IconZap className="w-4 h-4 text-yellow-300 animate-bounce" />
        <span className="hidden sm:inline">تجربة مجانية 6 ساعات</span>
      </button>

      {/* WhatsApp Button */}
      <a
        href={getWhatsAppUrl("مرحبًا ستريم ماستر، أريد الاستفسار عن اشتراكات الـ IPTV")}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-black px-4 py-3.5 shadow-2xl shadow-green-600/50 hover:scale-105 transition-all text-[14px] ring-2 ring-white/20 animate-pulse-glow"
        aria-label="محادثة واتساب"
      >
        <IconChat className="w-5 h-5" />
        <span>تواصل عبر واتساب</span>
      </a>
    </div>
  );
}
