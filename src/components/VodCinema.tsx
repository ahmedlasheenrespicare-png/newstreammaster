import { useState } from "react";
import { IconFlame, IconPlay, IconZap, IconStar, IconCheck } from "./Icons";

export interface VodItem {
  id: string;
  title: string;
  category: string;
  year: number;
  rating: string;
  duration: string;
  quality: string;
  poster: string;
  genre: string[];
  platform: "netflix" | "shahid" | "cinema" | "disney" | "turkish";
  description: string;
  trailerUrl?: string;
}

export const VOD_CATALOG: VodItem[] = [
  // --- Netflix & Global Exclusives 2026 ---
  {
    id: "vod-1",
    title: "Stranger Things (الموسم الأخير 2026)",
    category: "مسلسلات نتفليكس",
    year: 2026,
    rating: "8.9",
    duration: "8 حلقات • 4K HDR",
    quality: "4K Dolby Vision",
    poster: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=800&auto=format&fit=crop",
    genre: ["خيال علمي", "غموض", "دراما", "مترجم عربي"],
    platform: "netflix",
    description: "المعركة النهائية في هوكينز لإنقاذ العالم في أضخم إنتاجات نتفليكس الحصرية بجودة 4K أصلية مع صوت محيطي 5.1.",
    trailerUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  },
  {
    id: "vod-2",
    title: "Dune: Part Two (الكثبان: الجزء الثاني)",
    category: "أفلام السينما 4K",
    year: 2026,
    rating: "8.8",
    duration: "2 س 46 د",
    quality: "4K IMAX Enhanced",
    poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop",
    genre: ["أكشن", "مغامرة", "خيال علمي", "مترجم"],
    platform: "cinema",
    description: "رحلة بول أتريدس الأسطورية مع الشاني وفريمن للانتقام من المتآمرين الذين دمروا عائلته.",
    trailerUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  },
  {
    id: "vod-3",
    title: "الحشاشين (ملحمة حسن الصباح)",
    category: "مسلسلات شاهد VIP",
    year: 2025,
    rating: "9.2",
    duration: "30 حلقة • 4K",
    quality: "4K UHD 60FPS",
    poster: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop",
    genre: ["تاريخي", "تشويق", "دراما عربية"],
    platform: "shahid",
    description: "الملحمة التاريخية الأضخم في الدراما العربية التي تحكي قصة تأسيس طائفة الفدائيين في قلعة ألموت.",
    trailerUrl: "https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-drama/2c28a458e2f3253e678b07ac7d13fe71/index.m3u8",
  },
  {
    id: "vod-4",
    title: "قيامة عثمان (Kuruluş Osman - الموسم الجديد)",
    category: "مسلسلات تركية",
    year: 2026,
    rating: "8.6",
    duration: "حلقات أسبوعية مدبلجة ومترجمة",
    quality: "1080p FHD 50FPS",
    poster: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=800&auto=format&fit=crop",
    genre: ["أكشن", "تاريخي", "حروب", "مدبلج عربي"],
    platform: "turkish",
    description: "تأسيس الدولة العثمانية والفتوحات الكبرى وصراعات عثمان بن أرطغرل مع المغول والروم بجودة فائقة.",
    trailerUrl: "https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-drama/2c28a458e2f3253e678b07ac7d13fe71/index.m3u8",
  },
  {
    id: "vod-5",
    title: "Avatar 3: Fire and Ash (أفاتار 3)",
    category: "أفلام السينما 4K",
    year: 2026,
    rating: "9.0",
    duration: "3 س 10 د",
    quality: "4K HDR Dolby",
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
    genre: ["مغامرة", "خيال علمي", "أكشن"],
    platform: "cinema",
    description: "الفصل الثالث الملحمي من عالم باندورا مع قبيلة النار والرماد للمخرج جيمس كاميرون بدقة 4K خرافية.",
    trailerUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  },
  {
    id: "vod-6",
    title: "House of the Dragon (آل التنين - الموسم 3)",
    category: "مسلسلات نتفليكس",
    year: 2026,
    rating: "8.7",
    duration: "10 حلقات • 4K",
    quality: "4K UHD HDR",
    poster: "https://images.unsplash.com/photo-1533613220915-609f661a6fe1?q=80&w=800&auto=format&fit=crop",
    genre: ["فانتازيا", "أكشن", "دراما", "مترجم"],
    platform: "netflix",
    description: "اشتعال رقصة التنانين والحرب الأهلية بين التارغاريان من أجل عرش ويستروس الحديدي.",
    trailerUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  },
  {
    id: "vod-7",
    title: "Inside Out 2 (قلباً وقالباً 2)",
    category: "أفلام ديزني وأطفال",
    year: 2025,
    rating: "8.5",
    duration: "1 س 36 د",
    quality: "4K Ultra HD",
    poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop",
    genre: ["أنيميشن", "كوميديا", "عائلي", "مدبلج مصري"],
    platform: "disney",
    description: "مشاعر جديدة ومفاجآت مرحة في رأس رايلي مع مشاعر القلق والإحراج بدبلجة مصرية وفصحى ممتازة.",
    trailerUrl: "https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-3-usa/5d58265a862a476dc7f97694addb5ded/index.m3u8",
  },
  {
    id: "vod-8",
    title: "موضوع عائلي (الموسم الثالث الحصري)",
    category: "مسلسلات شاهد VIP",
    year: 2026,
    rating: "8.9",
    duration: "12 حلقة • 4K",
    quality: "4K UHD",
    poster: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=800&auto=format&fit=crop",
    genre: ["كوميديا", "دراما عائلية", "مصري"],
    platform: "shahid",
    description: "مغامرات إبراهيم وعائلته في موسم جديد مليء بالضحك والمواقف الإنسانية الرائعة بدقة 4K.",
    trailerUrl: "https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-masr/956eac069c78a35d47245db6cdbb1575/index.m3u8",
  },
];

interface VodCinemaProps {
  onOpenTrial: () => void;
}

export default function VodCinema({ onOpenTrial }: VodCinemaProps) {
  const [selectedCat, setSelectedCat] = useState<string>("الكل");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeItem, setActiveItem] = useState<VodItem | null>(null);

  const categories = [
    "الكل",
    "أفلام السينما 4K",
    "مسلسلات نتفليكس",
    "مسلسلات شاهد VIP",
    "مسلسلات تركية",
    "أفلام ديزني وأطفال",
  ];

  const filteredItems = VOD_CATALOG.filter((item) => {
    const matchCat = selectedCat === "الكل" || item.category === selectedCat;
    const matchSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.genre.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <section id="vod-cinema" className="py-16 sm:py-24 bg-[#080b14] relative overflow-hidden border-t border-white/10">
      <div className="absolute inset-0 bg-radial-glow pointer-events-none opacity-50" />
      
      <div className="max-w-[1370px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/40 bg-pink-500/10 px-4 py-1.5 text-[13px] font-black text-pink-400 mb-3 shadow-lg shadow-pink-950/40">
            <span className="h-2 w-2 rounded-full bg-pink-500 animate-pulse" />
            🎬 سينما ستريم ماستر • مكتبة VOD الترفيهية الشاملة
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            أضخم مكتبة <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-amber-300">أفلام ومسلسلات 4K</span> محدثة يومياً
          </h2>
          <p className="mt-3 text-[15.5px] text-gray-300 font-medium">
            أكثر من 85,000 فيلم ومسلسل من نتفليكس، شاهد VIP، ديزني+ وهوليوود مع الترجمة والدبلجة الاحترافية.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-4 sm:p-5 mb-8 backdrop-blur-md space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-96">
              <input
                type="text"
                placeholder="ابحث عن فيلم، مسلسل، أو تصنيف (مثال: نتفليكس، Dune، أكشن)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
              />
              <span className="absolute end-3.5 top-2.5 text-gray-400">🔍</span>
            </div>

            {/* Trial CTA button */}
            <button
              onClick={onOpenTrial}
              className="w-full sm:w-auto bg-gradient-to-r from-pink-600 via-purple-600 to-amber-500 hover:scale-105 text-white font-black px-6 py-2.5 rounded-xl text-sm transition-transform shadow-lg shadow-pink-600/30 shrink-0 cursor-pointer"
            >
              🎁 اطلب تجربة مجانية لفتح كامل المكتبة (+85,000 عمل)
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 text-xs font-bold scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  selectedCat === cat
                    ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white font-black shadow-lg shadow-purple-600/40"
                    : "bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* VOD Items Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl overflow-hidden bg-slate-900/90 border border-white/10 hover:border-pink-500/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between"
            >
              {/* Poster Container */}
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-black">
                <img
                  src={item.poster}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                />

                {/* Platform Badge */}
                <div className="absolute top-2.5 start-2.5">
                  {item.platform === "netflix" && (
                    <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-md">
                      NETFLIX
                    </span>
                  )}
                  {item.platform === "shahid" && (
                    <span className="bg-amber-500 text-black text-[10px] font-black px-2 py-0.5 rounded shadow-md">
                      SHAHID VIP
                    </span>
                  )}
                  {item.platform === "cinema" && (
                    <span className="bg-purple-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-md">
                      CINEMA 4K
                    </span>
                  )}
                  {item.platform === "turkish" && (
                    <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-md">
                      TURKISH
                    </span>
                  )}
                  {item.platform === "disney" && (
                    <span className="bg-indigo-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-md">
                      DISNEY+
                    </span>
                  )}
                </div>

                {/* Rating & Quality Badges */}
                <div className="absolute top-2.5 end-2.5 flex flex-col items-end gap-1">
                  <span className="bg-black/75 backdrop-blur-md text-amber-300 border border-amber-500/30 text-[10.5px] font-black px-2 py-0.5 rounded flex items-center gap-1">
                    ★ {item.rating}
                  </span>
                  <span className="bg-black/75 backdrop-blur-md text-emerald-400 border border-emerald-500/30 text-[9.5px] font-extrabold px-1.5 py-0.5 rounded">
                    {item.quality.split(" ")[0]}
                  </span>
                </div>

                {/* Hover Play Button Overlay */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3 text-center">
                  <button
                    onClick={() => setActiveItem(item)}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-xl hover:scale-110 transition-transform ring-2 ring-white/30 cursor-pointer"
                  >
                    <IconPlay className="h-6 w-6 mr-0.5" />
                  </button>
                  <span className="text-[11px] font-black text-white">
                    معاينة العمل
                  </span>
                </div>
              </div>

              {/* Info Bottom */}
              <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-[13.5px] sm:text-[14.5px] font-black text-white leading-snug line-clamp-1 group-hover:text-pink-400 transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-1">
                    <span>{item.year}</span>
                    <span>•</span>
                    <span className="truncate">{item.duration}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.genre.slice(0, 2).map((g, i) => (
                      <span
                        key={i}
                        className="bg-white/5 border border-white/10 text-gray-300 text-[10px] px-1.5 py-0.5 rounded"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-1">
                  <button
                    onClick={() => setActiveItem(item)}
                    className="text-[11px] font-black text-pink-400 hover:text-pink-300 transition-colors cursor-pointer"
                  >
                    التفاصيل والمشاهدة ←
                  </button>
                  <button
                    onClick={onOpenTrial}
                    className="bg-pink-600/20 hover:bg-pink-600/40 text-pink-300 text-[10.5px] font-bold px-2 py-1 rounded transition-colors cursor-pointer"
                  >
                    تشغيل VIP
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Item Details & Preview */}
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
            <div className="relative w-full max-w-2xl bg-slate-900 border border-pink-500/40 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6 text-right">
              
              {/* Close Button */}
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 start-4 h-9 w-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-lg font-bold transition-colors cursor-pointer"
              >
                ✕
              </button>

              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <img
                  src={activeItem.poster}
                  alt={activeItem.title}
                  className="w-36 sm:w-44 aspect-[2/3] object-cover rounded-2xl border border-white/15 shadow-xl shrink-0 mx-auto sm:mx-0"
                />

                <div className="space-y-3 flex-1">
                  <div className="inline-block bg-pink-600/20 border border-pink-500/40 text-pink-300 text-xs font-black px-2.5 py-0.5 rounded">
                    {activeItem.category}
                  </div>
                  <h3 className="text-2xl font-black text-white">
                    {activeItem.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-300 font-bold">
                    <span className="text-amber-400">★ {activeItem.rating} IMDb</span>
                    <span>•</span>
                    <span>{activeItem.year}</span>
                    <span>•</span>
                    <span>{activeItem.duration}</span>
                    <span>•</span>
                    <span className="text-emerald-400 font-black">{activeItem.quality}</span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {activeItem.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {activeItem.genre.map((g, i) => (
                      <span key={i} className="bg-white/10 text-white text-xs px-2.5 py-1 rounded-lg font-medium">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons inside modal */}
              <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-gray-400">
                  متوفر للمشاهدة الفورية بدقة 4K على سيرفر نوفا وسيرفر ماستر برو.
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setActiveItem(null);
                      onOpenTrial();
                    }}
                    className="flex-1 sm:flex-none bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black px-5 py-2.5 rounded-xl text-sm transition-transform shadow-md cursor-pointer"
                  >
                    🎁 تشغيل بتجربة مجانية 6 ساعات
                  </button>
                  <a
                    href="https://streammasterstore.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-none bg-red-600 hover:bg-red-500 text-white font-black px-4 py-2.5 rounded-xl text-sm text-center transition-colors shadow-md"
                  >
                    🛒 شراء اشتراك VIP
                  </a>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
