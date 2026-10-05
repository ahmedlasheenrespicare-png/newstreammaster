import { IconFlame, IconShieldCheck, IconTrophy, IconZap } from "./Icons";

export default function TrustStats() {
  const stats = [
    {
      value: "+45,000",
      label: "مشترك نشط ومستمر",
      desc: "في السعودية والخليج ومصر والعالم",
      icon: <IconTrophy className="w-6 h-6 text-yellow-400" />,
      glow: "from-amber-500/20 to-yellow-500/5",
    },
    {
      value: "99.9%",
      label: "ثبات وجودة البث المباشر",
      desc: "بدون تقطيع وقت ضغط المباريات",
      icon: <IconShieldCheck className="w-6 h-6 text-emerald-400" />,
      glow: "from-emerald-500/20 to-teal-500/5",
    },
    {
      value: "5 دقائق",
      label: "سرعة التفعيل الآلي",
      desc: "بيانات الاشتراك فوراً عبر واتساب",
      icon: <IconZap className="w-6 h-6 text-red-400" />,
      glow: "from-red-500/20 to-rose-500/5",
    },
    {
      value: "+16,500",
      label: "قناة حية و65,000 فيلم",
      desc: "تحديثات يومية لأحدث الإصدارات",
      icon: <IconFlame className="w-6 h-6 text-purple-400" />,
      glow: "from-purple-500/20 to-indigo-500/5",
    },
  ];

  return (
    <section className="relative z-20 py-8 bg-[#070a12] border-y border-white/10">
      <div className="max-w-[1370px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${s.glow} border border-white/10 p-5 sm:p-6 transition-transform hover:-translate-y-1 hover:border-white/20`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm">{s.icon}</span>
                <span className="text-[11px] font-bold text-gray-400 bg-black/40 px-2 py-0.5 rounded">موثوق</span>
              </div>
              <div className="text-[26px] sm:text-[32px] font-black text-white tracking-tight">
                {s.value}
              </div>
              <div className="text-[14px] sm:text-[15px] font-bold text-gray-200 mt-1">
                {s.label}
              </div>
              <div className="text-[12px] text-gray-400 mt-1">
                {s.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
