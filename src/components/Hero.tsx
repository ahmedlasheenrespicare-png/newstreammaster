import { useCallback, useEffect, useState } from "react";
import {
  IconArrow,
  IconArrowBack,
  IconChat,
  IconClock,
  IconFlame,
  IconPlay,
  IconShieldCheck,
  IconTrophy,
  IconTv,
  IconZap,
} from "./Icons";
import { getWhatsAppUrl, WHATSAPP_DISPLAY } from "../data";

/* =========================================================================
   1. سلايدات الهيرو المتطورة مع الصور عالية الدقة (Stream Master Pro Slides)
========================================================================= */
const STREAM_SLIDES = [
  {
    kicker: "تغطية كأس العالم 2026 والدوريات الكبرى",
    titleLine1: "أفضل سيرفرات IPTV 2026",
    titleLine2: "ثبات مطلق 99.9% بدون تقطيع",
    subtitle: "استمتع بمشاهدة جميع قنوات beIN Sports وSSC بجودة 4K فائقة و50fps وسيرفرات نوفا الأصلية بدون أي لاج أو انقطاع وقت ضغط المباريات.",
    img: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1920&q=80",
    thumb: "https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=800&q=80",
    badge: "بث مباشر 4K @ 50fps",
    channelsTag: "beIN Sports 1-9 • SSC 1-5 • Alkass",
    ctaText: "اختر باقتك واشترك الآن",
    ctaHref: "#pricing",
    cta2Text: "طلب تجربة مجانية",
    isTrialCta: true,
  },
  {
    kicker: "مكتبة سينمائية عملاقة VOD",
    titleLine1: "+16,500 قناة حية مباشرة",
    titleLine2: "و+65,000 فيلم ومسلسل مترجم",
    subtitle: "مكتبة ترفيهية شاملة تضم أحدث أفلام السينما، مسلسلات نتفليكس وشاهد وOSN وDisney+ بجودة BluRay وترجمة فورية وصوت محيطي.",
    img: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1920&q=80",
    thumb: "https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=800&q=80",
    badge: "مكتبة ترفيهية متجددة يومياً",
    channelsTag: "Netflix Originals • Shahid VIP • OSN • HBO",
    ctaText: "استكشف مكتبة القنوات",
    ctaHref: "#channels",
    cta2Text: "تواصل عبر واتساب",
    cta2Href: getWhatsAppUrl("مرحبًا ستريم ماستر، أود معرفة القنوات المتوفرة والمكتبة الترفيهية"),
  },
  {
    kicker: "تفعيل فوري ودعم فني 24/7",
    titleLine1: "سيرفرات نوفا وإيستار وموكا",
    titleLine2: "جاهزة على شاشتك في 5 دقائق",
    subtitle: "يعمل على كافة الشاشات الذكية Samsung وLG وأجهزة Android وApple TV مع دعم فني متواصل وضمان كامل طوال مدة اشتراكك.",
    img: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1920&q=80",
    thumb: "https://images.pexels.com/photos/1444416/pexels-photo-1444416.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=800&q=80",
    badge: "تفعيل آلي خلال دقائق",
    channelsTag: "Samsung TV • LG • Android Box • Apple TV",
    ctaText: "مساعد اختيار السيرفر",
    ctaHref: "#server-finder",
    cta2Text: "دليل تشغيل الشاشات",
    cta2Href: "#setup",
  },
];

interface HeroProps {
  onOpenTrial: () => void;
}

/* =========================================================================
   2. نموذج MediCenter لـ Stream Master Pro مع صور وخلفيات سينمائية
   - Top numbers navigation bar is COMPLETELY TRANSPARENT (bg-transparent)
   - Sits directly on top of the 3 elevated floating cards
   - Maximum elevated overlap into the lower 1/3 of the Hero (-mt-36 to -mt-68)
========================================================================= */
function HeroModelMediCenter({ onOpenTrial }: HeroProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((next: number) => {
    setIndex((next + STREAM_SLIDES.length) % STREAM_SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % STREAM_SLIDES.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, [paused]);

  const current = STREAM_SLIDES[index];

  return (
    <div className="w-full font-sans selection:bg-red-600 selection:text-white bg-[#0b0f19]">
      {/* =========================================================================
         SECTION A: HERO SLIDER STAGE (High Aspect Cinematic View with Images)
      ========================================================================= */}
      <section
        className="relative w-full overflow-hidden bg-[#070a12] min-h-[600px] sm:min-h-[680px] lg:min-h-[760px] flex items-start pt-10 sm:pt-14 lg:pt-16"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-label="سلايدر ستريم ماستر برو"
      >
        {/* Full-bleed background images with high-res photography */}
        {STREAM_SLIDES.map((s, i) => (
          <div
            key={s.img}
            className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out ${
              i === index ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <img
              src={s.img}
              alt=""
              className="h-full w-full object-cover object-center scale-105 transition-transform duration-10000"
              loading={i === 0 ? "eager" : "lazy"}
            />
            {/* Cinematic dark scrim overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#070a12]/95 via-[#070a12]/80 to-[#070a12]/45" />
            <div className="absolute inset-0 bg-[#070a12]/35" />
          </div>
        ))}

        {/* Foreground Slider Content */}
        <div className="relative z-10 mx-auto flex w-full max-w-[1370px] items-center justify-between gap-8 px-6 sm:px-10 lg:px-14 pb-48 sm:pb-60 lg:pb-72">
          
          {/* Main Slide Text */}
          <div className="max-w-[740px]">
            {/* Tag Badge */}
            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-purple-600 px-3.5 py-1 text-[11px] sm:text-[12.5px] font-black tracking-wider text-white shadow-lg rounded-sm uppercase">
              <span className="flex h-2 w-2 rounded-full bg-white animate-pulse" />
              {current.kicker}
            </span>

            {/* Main Title */}
            <h1 className="mt-4 text-[clamp(28px,4.5vw,56px)] font-black leading-[1.25] text-white tracking-tight drop-shadow-lg">
              <span className="block">{current.titleLine1}</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-yellow-300 drop-shadow-md">
                {current.titleLine2}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-4 max-w-[600px] text-[15px] sm:text-[17px] leading-[1.8] text-gray-200 font-medium drop-shadow-md">
              {current.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              <a
                href={current.ctaHref}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 px-7 py-3.5 text-[14.5px] sm:text-[15.5px] font-black text-white shadow-xl shadow-red-600/30 transition-all hover:scale-102 rounded-md"
              >
                {current.ctaText} <IconArrow className="w-4 h-4" />
              </a>

              {current.isTrialCta ? (
                <button
                  onClick={onOpenTrial}
                  className="inline-flex items-center gap-2 border-2 border-amber-400/80 bg-amber-500/15 hover:bg-amber-500/30 backdrop-blur-md px-6 py-3 text-[14px] sm:text-[15px] font-extrabold text-amber-300 shadow-lg transition-all rounded-md"
                >
                  <IconZap className="w-4 h-4 text-amber-400" /> {current.cta2Text}
                </button>
              ) : (
                <a
                  href={current.cta2Href}
                  target={current.cta2Href?.startsWith("http") ? "_blank" : undefined}
                  rel={current.cta2Href?.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-2 border-2 border-white/40 bg-black/40 hover:bg-white hover:text-black backdrop-blur-md px-6 py-3 text-[14px] sm:text-[15px] font-bold text-white shadow-lg transition-all rounded-md"
                >
                  {current.cta2Text}
                </a>
              )}
            </div>
          </div>

          {/* Right Floating Slide Thumbnail Card (Visible on Desktop) */}
          <div className="hidden xl:block w-[360px] shrink-0">
            <div className="relative rounded-2xl overflow-hidden border border-white/20 bg-slate-900/80 backdrop-blur-md shadow-2xl shadow-black/60 p-2.5">
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <img
                  src={current.thumb}
                  alt={current.titleLine1}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-2 start-2 bg-red-600 text-white text-[10.5px] font-black px-2 py-0.5 rounded shadow">
                  {current.badge}
                </div>
              </div>
              <div className="pt-3 px-1 text-right">
                <span className="text-[12px] font-black text-amber-400 block truncate">
                  {current.channelsTag}
                </span>
                <span className="text-[11.5px] text-gray-300 font-medium block mt-0.5">
                  ثبات وسرعة فائقة على جميع الشاشات
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Prev / Next Slider Arrows */}
        <div className="absolute top-8 end-4 sm:end-8 z-10 flex items-center gap-2">
          <button
            onClick={() => go(index - 1)}
            className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center bg-black/60 text-white backdrop-blur-md border border-white/20 transition hover:bg-red-600 rounded-md"
            aria-label="الشريحة السابقة"
          >
            <IconArrowBack className="w-4 h-4" />
          </button>
          <button
            onClick={() => go(index + 1)}
            className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center bg-black/60 text-white backdrop-blur-md border border-white/20 transition hover:bg-red-600 rounded-md"
            aria-label="الشريحة التالية"
          >
            <IconArrow className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* =========================================================================
         SECTION B: UNIFIED FLOATING UNIT (Completely Transparent Numbers Bar + 3 Cards)
         Elevated overlap into the hero (-mt-36 sm:-mt-52 lg:-mt-68)
      ========================================================================= */}
      <section className="relative z-30 -mt-36 sm:-mt-52 lg:-mt-68 px-3 sm:px-6 lg:px-12 pb-12 sm:pb-16 bg-transparent">
        <div className="mx-auto max-w-[1240px]">
          
          {/* Top Interactive Numbers Tabs (COMPLETELY TRANSPARENT) */}
          <div className="grid grid-cols-3 w-full bg-transparent border-b border-white/25">
            {STREAM_SLIDES.map((s, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`الانتقال إلى الشريحة ${i + 1}`}
                className={`group relative flex items-center justify-center sm:justify-start gap-2.5 px-2 sm:px-6 py-3.5 sm:py-4 text-right transition-all border-e border-white/20 last:border-e-0 ${
                  i === index
                    ? "bg-white/15 text-white backdrop-blur-xs font-black shadow-inner"
                    : "bg-transparent text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {/* Active indicator bar */}
                {i === index && (
                  <span className="absolute top-0 inset-x-0 h-[3.5px] bg-red-500 shadow-[0_0_12px_#ef4444]" />
                )}
                <span className={`font-mono text-[13px] sm:text-[16px] font-black tracking-tighter drop-shadow-md ${
                  i === index ? "text-red-400" : "text-white/90 group-hover:text-red-400"
                }`}>
                  0{i + 1}
                </span>
                <span className="hidden sm:inline-block text-[12px] sm:text-[14px] font-extrabold truncate tracking-tight text-white drop-shadow-md">
                  {s.titleLine1}
                </span>
              </button>
            ))}
          </div>

          {/* The 3 Connected Feature Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 shadow-[0_30px_90px_rgba(0,0,0,0.45),0_10px_30px_rgba(0,0,0,0.3)] rounded-b-xl overflow-hidden ring-1 ring-white/15">
            
            {/* BOX 1: Brand Red (#DC2626) — Free Trial & Instant Setup */}
            <div className="flex flex-col justify-between bg-gradient-to-br from-[#dc2626] to-[#991b1b] px-6 sm:px-7 lg:px-8 py-7 sm:py-8 text-white transition-all hover:brightness-105">
              <div>
                <div className="flex items-center justify-between border-b border-white/25 pb-3.5">
                  <h2 className="text-[20px] sm:text-[21px] font-black text-white tracking-wide flex items-center gap-2">
                    <IconZap className="w-5 h-5 text-yellow-300" /> تجربة مجانية سريعة
                  </h2>
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20 text-white">
                    <IconTv className="w-5 h-5" />
                  </span>
                </div>
                <p className="mt-3.5 text-[14px] sm:text-[14.5px] leading-[1.75] text-white/95 font-medium">
                  جرب السيرفر والقنوات الرياضية والترفيهية لمدة 6 ساعات مجاناً على شاشتك أو جوالك للتأكد من الثبات والجودة قبل الشراء.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[12px] text-white/85 font-bold block">التفعيل الفوري خلال 5 دقائق:</span>
                    <span className="text-[16px] sm:text-[17px] font-black text-yellow-300">
                      بدون أي التزام مسبق
                    </span>
                  </div>
                  <button
                    onClick={onOpenTrial}
                    className="inline-flex items-center gap-1.5 border border-white bg-white text-red-700 px-3.5 py-1.5 text-[13px] font-black transition hover:bg-yellow-300 hover:text-black rounded-md shadow-md"
                  >
                    اطلب التجربة <IconArrow className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* BOX 2: Deep Purple (#7C3AED) — Live Football & Servers */}
            <div className="flex flex-col justify-between bg-gradient-to-br from-[#7c3aed] to-[#5b21b6] px-6 sm:px-7 lg:px-8 py-7 sm:py-8 text-white transition-all hover:brightness-105">
              <div>
                <div className="flex items-center justify-between border-b border-white/25 pb-3.5">
                  <h2 className="text-[20px] sm:text-[21px] font-black text-white tracking-wide flex items-center gap-2">
                    <IconTrophy className="w-5 h-5 text-amber-300" /> قنوات المباريات وسيرفر نوفا
                  </h2>
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20 text-white">
                    <IconPlay className="w-5 h-5" />
                  </span>
                </div>
                <p className="mt-3.5 text-[14px] sm:text-[14.5px] leading-[1.75] text-white/95 font-medium">
                  سيرفرات نوفا الأصلية وإيستار وماستر الترا مع بث مباشر لقنوات beIN وSSC بدقة 4K وFHD وسيرفرات احتياطية وقت الذروة.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/20">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-white/95 font-bold">
                    باقات تبدأ من 65 ر.س
                  </span>
                  <a
                    href="#pricing"
                    className="inline-flex items-center gap-1.5 border border-white bg-white/20 px-3.5 py-1.5 text-[13px] font-extrabold text-white transition hover:bg-white hover:text-purple-900 rounded-md"
                  >
                    عرض الأسعار <IconArrow className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* BOX 3: Dark Blue (#0F172A) — 24/7 Support & Warranty */}
            <div className="flex flex-col justify-between bg-gradient-to-br from-[#0f172a] to-[#020617] px-6 sm:px-7 lg:px-8 py-7 sm:py-8 text-white transition-all hover:brightness-105 border-t md:border-t-0 md:border-s border-white/10">
              <div>
                <div className="flex items-center justify-between border-b border-white/25 pb-3.5">
                  <h2 className="text-[20px] sm:text-[21px] font-black text-white tracking-wide flex items-center gap-2">
                    <IconShieldCheck className="w-5 h-5 text-emerald-400" /> ضمان الثبات والدعم 24/7
                  </h2>
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 text-white">
                    <IconClock className="w-5 h-5" />
                  </span>
                </div>

                {/* Features Highlights */}
                <ul className="mt-2.5 divide-y divide-white/10 text-[13px]">
                  <li className="flex items-center justify-between py-2">
                    <span className="text-gray-300 font-medium">خدمة العملاء والواتساب</span>
                    <div className="font-bold text-emerald-400">متاح 24 ساعة يومياً</div>
                  </li>
                  <li className="flex items-center justify-between py-2">
                    <span className="text-gray-300 font-medium">سرعة الرد والتفعيل</span>
                    <div className="font-bold text-white">أقل من 3 دقائق</div>
                  </li>
                  <li className="flex items-center justify-between py-2">
                    <span className="text-gray-300 font-medium">ضمان الاسترجاع</span>
                    <div className="font-bold text-yellow-300">ضمان كامل ومستمر</div>
                  </li>
                </ul>
              </div>

              <div className="mt-4 pt-3.5 border-t border-white/20">
                <a
                  href={getWhatsAppUrl("مرحبًا ستريم ماستر، أريد التحدث مع الدعم الفني للاشتراك")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 py-2.5 text-[13.5px] font-black text-white transition rounded-md shadow-md"
                >
                  <IconChat className="w-4 h-4" /> محادثة مباشرة عبر واتساب
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* =========================================================================
   3. النموذج التفاعلي (Interactive Live Player Demo Model)
========================================================================= */
function HeroModelPlayer({ onOpenTrial }: HeroProps) {
  const [activeChannel, setActiveChannel] = useState<"bein" | "ssc" | "shahid">("bein");

  const channelData = {
    bein: {
      name: "beIN Sports 1 Premium (4K Ultra HD)",
      event: "دوري أبطال أوروبا — ريال مدريد vs مانشستر سيتي",
      quality: "4K @ 50fps HDR",
      bitrate: "18.5 Mbps Ultra",
      server: "سيرفر نوفا VIP الأصلي",
      thumb: "https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&q=80",
    },
    ssc: {
      name: "SSC Sports 1 HD (Saudi Pro League)",
      event: "دوري روشن السعودي — الهلال vs النصر",
      quality: "FHD 1080p @ 60fps",
      bitrate: "12.0 Mbps High",
      server: "سيرفر ماستر الترا 4K",
      thumb: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
    },
    shahid: {
      name: "Shahid VIP & Netflix Cinema 4K",
      event: "أحدث الأفلام والمسلسلات الحصرية 2026",
      quality: "True 4K UHD Dolby Audio",
      bitrate: "22.0 Mbps Master",
      server: "سيرفر إيستار برو الترفيهي",
      thumb: "https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&q=80",
    },
  };

  const curr = channelData[activeChannel];

  return (
    <section className="relative overflow-hidden bg-[#070a12] pt-10 sm:pt-14 pb-16 sm:pb-20">
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
      <div className="max-w-[1370px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Details */}
          <div className="lg:col-span-6 space-y-6 text-right">
            <span className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/40 text-red-400 px-3.5 py-1 rounded-full text-[12.5px] font-black">
              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-ping" />
              بث حي فائق الثبات بدون تأخير
            </span>

            <h1 className="text-[clamp(30px,4.5vw,52px)] font-black text-white leading-[1.25] tracking-tight">
              شاهد جميع المباريات والسينما <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-yellow-300">
                بجودة 4K حقيقية بدون تقطيع
              </span>
            </h1>

            <p className="text-[16px] text-gray-300 leading-[1.8] font-medium">
              استمتع بأقوى اشتراك IPTV يضم أكثر من 16,500 قناة حية و65,000 فيلم ومسلسل، مدعوم بأحدث تقنيات مانع التقطيع وسيرفرات CDN السريعة في الخليج والشرق الأوسط.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-black px-7 py-3.5 rounded-xl shadow-lg shadow-red-600/30 text-[15px] transition-all hover:scale-102"
              >
                اشترك الآن بخصم 40% <IconArrow className="w-4 h-4" />
              </a>
              <button
                onClick={onOpenTrial}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-extrabold px-6 py-3.5 rounded-xl text-[14.5px] transition-all"
              >
                <IconZap className="w-4 h-4 text-amber-400" /> تجربة مجانية 6 ساعات
              </button>
            </div>
          </div>

          {/* Right Live Player Mockup */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-white/20 bg-slate-900/90 shadow-2xl shadow-red-950/40">
              
              {/* Player Screen Mock */}
              <div className="relative aspect-video w-full bg-black overflow-hidden group">
                <img
                  src={curr.thumb}
                  alt={curr.name}
                  className="w-full h-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Live Overlays */}
                <div className="absolute top-3 start-3 flex items-center gap-2">
                  <span className="bg-red-600 text-white text-[11px] font-black px-2.5 py-0.5 rounded flex items-center gap-1 animate-pulse">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" /> مباشر 4K
                  </span>
                  <span className="bg-black/60 backdrop-blur-md text-amber-300 text-[11px] font-bold px-2 py-0.5 rounded border border-white/10">
                    {curr.bitrate}
                  </span>
                </div>

                <div className="absolute top-3 end-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-2 py-0.5 rounded border border-white/10">
                  {curr.server}
                </div>

                {/* Center Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
                  <button
                    onClick={onOpenTrial}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-red-500 text-white shadow-2xl shadow-red-600/50 hover:scale-110 transition-transform ring-4 ring-white/30"
                    aria-label="تشغيل البث التجريبي"
                  >
                    <IconPlay className="h-7 w-7 mr-0.5" />
                  </button>
                </div>

                {/* Bottom Bar Info */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4 text-right">
                  <div className="text-[14px] font-black text-white">{curr.name}</div>
                  <div className="text-[12px] text-gray-300 font-medium truncate">{curr.event}</div>
                </div>
              </div>

              {/* Channel Switcher Tabs */}
              <div className="p-3 bg-slate-950/90 border-t border-white/10 grid grid-cols-3 gap-2">
                <button
                  onClick={() => setActiveChannel("bein")}
                  className={`py-2 px-2 rounded-lg text-[12px] font-black text-center transition-all ${
                    activeChannel === "bein"
                      ? "bg-red-600 text-white shadow-md"
                      : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  ⚽ beIN Sports 4K
                </button>
                <button
                  onClick={() => setActiveChannel("ssc")}
                  className={`py-2 px-2 rounded-lg text-[12px] font-black text-center transition-all ${
                    activeChannel === "ssc"
                      ? "bg-purple-600 text-white shadow-md"
                      : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  🏆 SSC Sports HD
                </button>
                <button
                  onClick={() => setActiveChannel("shahid")}
                  className={`py-2 px-2 rounded-lg text-[12px] font-black text-center transition-all ${
                    activeChannel === "shahid"
                      ? "bg-amber-600 text-white shadow-md"
                      : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  🎬 شاهد ونتفليكس VIP
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   MAIN HERO COMPONENT WITH MODEL SWITCHER
========================================================================= */
export default function Hero({ onOpenTrial }: HeroProps) {
  const [model, setModel] = useState<"medicenter" | "player">("medicenter");

  return (
    <div id="hero">
      {/* Switcher Bar between MediCenter & Player Design */}
      <div className="border-b border-white/10 bg-[#090d16] px-4 py-2.5 text-white">
        <div className="mx-auto flex max-w-[1370px] flex-wrap items-center justify-between gap-3 text-[12.5px] lg:px-4">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="font-bold text-gray-300">اختر تصميم الهيرو المفضل:</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setModel("medicenter")}
              className={`rounded-lg px-3.5 py-1.5 text-[12.5px] font-bold transition-all ${
                model === "medicenter"
                  ? "bg-red-600 text-white shadow-md ring-1 ring-white/40"
                  : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
              }`}
            >
              🌟 نموذج الكروت العائمة (MediCenter Style)
            </button>
            <button
              onClick={() => setModel("player")}
              className={`rounded-lg px-3.5 py-1.5 text-[12.5px] font-bold transition-all ${
                model === "player"
                  ? "bg-red-600 text-white shadow-md ring-1 ring-white/40"
                  : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
              }`}
            >
              📺 نموذج المشغل السينمائي الحي (Live Player)
            </button>
          </div>
        </div>
      </div>

      {/* Render the Selected Model */}
      {model === "medicenter" ? (
        <HeroModelMediCenter onOpenTrial={onOpenTrial} />
      ) : (
        <HeroModelPlayer onOpenTrial={onOpenTrial} />
      )}
    </div>
  );
}
