import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { IconPlay, IconTv, IconZap } from "./Icons";

export interface ChannelItem {
  name: string;
  logo: string;
  url: string;
  backupUrl?: string;
  cat: string;
  isVip?: boolean;
  isLockVip?: boolean;
  quality?: string;
  event?: string;
}

// Built-in verified live channels
const DEFAULT_CHANNELS: ChannelItem[] = [
  // --- قنوات beIN Sports المفتوحة والحية الرسمية ---
  {
    name: "beIN Sports XTRA 1 HD (مباشر رسمي)",
    logo: "🟣",
    url: "https://bein-xtra-bein.amagi.tv/playlist.m3u8",
    backupUrl: "https://imn-live.esite-lab.com/hls/iraqia-sports-1.m3u8",
    cat: "قنوات beIN Sports",
    isVip: false,
    quality: "1080p 50FPS",
    event: "البث الحي الرسمي لشبكة beIN Sports",
  },
  {
    name: "beIN Sports News HD (الإخبارية)",
    logo: "🟣",
    url: "https://bein-xtra-bein.amagi.tv/playlist.m3u8",
    backupUrl: "https://partneta.cdn.mgmlcdn.com/omsport/smil:omsport.stream.smil/chunklist.m3u8",
    cat: "قنوات beIN Sports",
    isVip: false,
    quality: "1080p FHD",
    event: "نشرات إخبارية وتحليلات رياضية مباشرة 24/7",
  },
  
  // --- قنوات beIN Sports المشفرة VIP (تتطلب اشتراك / تجربة مجانية) ---
  {
    name: "beIN Sports 1 Premium 4K (الدوري الإنجليزي)",
    logo: "🏆",
    url: "",
    isLockVip: true,
    cat: "قنوات beIN Sports",
    isVip: true,
    quality: "4K UHD 60FPS",
    event: "الدوري الإنجليزي الممتاز & دوري أبطال أوروبا",
  },
  {
    name: "beIN Sports 2 HD (الدوري الإسباني)",
    logo: "⚽",
    url: "",
    isLockVip: true,
    cat: "قنوات beIN Sports",
    isVip: true,
    quality: "1080p 50FPS",
    event: "الدوري الإسباني La Liga",
  },
  {
    name: "beIN Sports 3 HD (الدوري الفرنسي والأفريقي)",
    logo: "⚽",
    url: "",
    isLockVip: true,
    cat: "قنوات beIN Sports",
    isVip: true,
    quality: "1080p 50FPS",
    event: "الدوري الفرنسي & دوري أبطال إفريقيا",
  },
  {
    name: "beIN Sports 4 HD (الدوري الألماني)",
    logo: "⚽",
    url: "",
    isLockVip: true,
    cat: "قنوات beIN Sports",
    isVip: true,
    quality: "1080p 50FPS",
    event: "الدوري الألماني والبطولات الأوروبية",
  },
  {
    name: "beIN Sports AFC HD (دوري أبطال آسيا)",
    logo: "🌏",
    url: "",
    isLockVip: true,
    cat: "قنوات beIN Sports",
    isVip: true,
    quality: "1080p 50FPS",
    event: "دوري أبطال آسيا للنخبة",
  },
  {
    name: "beIN Sports MAX 1 4K (كأس العالم 2026)",
    logo: "🏆",
    url: "",
    isLockVip: true,
    cat: "قنوات beIN Sports",
    isVip: true,
    quality: "4K HDR Ultra",
    event: "تصفيات وبطولة كأس العالم 2026",
  },

  // --- باقة قنوات MBC المؤكدة والمفحوصة بنجاح 100% ---
  {
    name: "MBC 1 HD (العامة والمسلسلات)",
    logo: "🟣",
    url: "https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-1/15cf99af5de54063fdabfefe66adc075/index.m3u8",
    backupUrl: "https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-1-na/eec141533c90dd34722c503a296dd0d8/index.m3u8",
    cat: "قنوات MBC",
    quality: "1080p FHD",
  },
  {
    name: "MBC Masr 1 HD (إم بي سي مصر الأولى)",
    logo: "🇪🇬",
    url: "https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-masr/956eac069c78a35d47245db6cdbb1575/index.m3u8",
    backupUrl: "https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-masr-usa/cd8d40acdab28aac0582faa3bd3983f1/index.m3u8",
    cat: "قنوات MBC",
    quality: "1080p FHD",
  },
  {
    name: "MBC Masr 2 HD (مصر 2 والرياضة)",
    logo: "🇪🇬",
    url: "https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-masr-2/754931856515075b0aabf0e583495c68/index.m3u8",
    backupUrl: "https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-masr/956eac069c78a35d47245db6cdbb1575/index.m3u8",
    cat: "قنوات MBC",
    quality: "1080p FHD",
  },
  {
    name: "MBC Drama HD (المسلسلات والدراما)",
    logo: "🎭",
    url: "https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-drama/2c28a458e2f3253e678b07ac7d13fe71/index.m3u8",
    backupUrl: "https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-drama-usa/ea2f5db904aff224b7066e59c7f585a2/index.m3u8",
    cat: "قنوات MBC",
    quality: "1080p FHD",
  },
  {
    name: "MBC Masr Drama HD (دراما مصر)",
    logo: "🎭",
    url: "https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-masr-drama/567b703c19ede6598222de81b0e4508b/index.m3u8",
    backupUrl: "https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-plus-drama/e37251ec2aac8f6c98f75cd0fa37cd28/index.m3u8",
    cat: "قنوات MBC",
    quality: "1080p FHD",
  },
  {
    name: "MBC 4 HD (البرامج والمنوعات)",
    logo: "📺",
    url: "https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-4/24f134f1cd63db9346439e96b86ca6ed/index.m3u8",
    backupUrl: "https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-1/15cf99af5de54063fdabfefe66adc075/index.m3u8",
    cat: "قنوات MBC",
    quality: "1080p FHD",
  },
  {
    name: "MBC 5 HD (إم بي سي 5 المغرب)",
    logo: "🇲🇦",
    url: "https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-5/ee6b000cee0629411b666ab26cb13e9b/index.m3u8",
    backupUrl: "https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-1-na/eec141533c90dd34722c503a296dd0d8/index.m3u8",
    cat: "قنوات MBC",
    quality: "1080p FHD",
  },
  {
    name: "MBC Bollywood HD (هندي مدبلج ومترجم)",
    logo: "💃",
    url: "https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-bollywood/546eb40d7dcf9a209255dd2496903764/index.m3u8",
    backupUrl: "https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-persia/818ee8e4b592dc497608f066d825bfb4/index.m3u8",
    cat: "قنوات MBC",
    quality: "1080p FHD",
  },
  {
    name: "MBC Persia HD (أفلام أجنبية وسينما)",
    logo: "🎬",
    url: "https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-persia/818ee8e4b592dc497608f066d825bfb4/index.m3u8",
    backupUrl: "https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-bollywood/546eb40d7dcf9a209255dd2496903764/index.m3u8",
    cat: "قنوات MBC",
    quality: "1080p FHD",
  },
  {
    name: "MBC Iraq HD (إم بي سي العراق)",
    logo: "🇮🇶",
    url: "https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-iraq/e38c44b1b43474e1c39cb5b90203691e/index.m3u8",
    backupUrl: "https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-1/15cf99af5de54063fdabfefe66adc075/index.m3u8",
    cat: "قنوات MBC",
    quality: "1080p FHD",
  },
  {
    name: "MBC 3 HD (أطفال وكرتون)",
    logo: "🧒",
    url: "https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-3-usa/5d58265a862a476dc7f97694addb5ded/index.m3u8",
    backupUrl: "https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-1/15cf99af5de54063fdabfefe66adc075/index.m3u8",
    cat: "قنوات MBC",
    quality: "1080p FHD",
  },
  {
    name: "العربية الحدث HD (أخبار MBC)",
    logo: "⚫",
    url: "https://live.alarabiya.net/alarabiapublish/alhadath.smil/playlist.m3u8",
    backupUrl: "https://live.alarabiya.net/alarabiapublish/alarabiya.smil/playlist.m3u8",
    cat: "قنوات MBC",
    quality: "1080p FHD",
  },
  {
    name: "العربية الإخبارية HD",
    logo: "🔴",
    url: "https://live.alarabiya.net/alarabiapublish/alarabiya.smil/playlist.m3u8",
    backupUrl: "https://live.alarabiya.net/alarabiapublish/alhadath.smil/playlist.m3u8",
    cat: "قنوات MBC",
    quality: "1080p FHD",
  },

  // --- القنوات الإخبارية والرياضية والعامة ---
  {
    name: "العراقية سبورت HD",
    logo: "⚽",
    url: "https://imn-live.esite-lab.com/hls/iraqia-sports-1.m3u8",
    cat: "رياضية",
    quality: "1080p 50FPS",
  },
  {
    name: "Oman Sport TV عمان الرياضية",
    logo: "⚽",
    url: "https://partneta.cdn.mgmlcdn.com/omsport/smil:omsport.stream.smil/chunklist.m3u8",
    cat: "رياضية",
    quality: "1080p 50FPS",
  },
  {
    name: "سكاي نيوز عربية HD",
    logo: "🔴",
    url: "https://stream.skynewsarabia.com/hls/sna.m3u8",
    cat: "إخبارية",
    quality: "1080p FHD",
  },
  {
    name: "الجزيرة الإخبارية HD",
    logo: "🟡",
    url: "https://live-hls-web-aja.getaj.net/AJA/01.m3u8",
    cat: "إخبارية",
    quality: "1080p FHD",
  },
  {
    name: "الجزيرة مباشر",
    logo: "🔴",
    url: "https://live-hls-web-ajm.getaj.net/AJM/index.m3u8",
    cat: "إخبارية",
    quality: "1080p FHD",
  },
  {
    name: "France 24 عربي",
    logo: "🔵",
    url: "https://static.france24.com/live/F24_AR_HI_HLS/live_web.m3u8",
    cat: "إخبارية",
    quality: "1080p FHD",
  },
  {
    name: "Watan TV وطن مصرية",
    logo: "🇪🇬",
    url: "https://rp.tactivemedia.com/watantv_source/live/playlist.m3u8",
    cat: "مصرية",
    quality: "1080p FHD",
  },
  {
    name: "Asharq Discovery وثائقية",
    logo: "🦁",
    url: "https://svs.itworkscdn.net/asharqdiscoverylive/asharqd.smil/playlist_dvr.m3u8",
    cat: "وثائقية",
    quality: "1080p FHD",
  },
];

interface LivePlayerProps {
  onOpenTrial: () => void;
}

export default function LivePlayer({ onOpenTrial }: LivePlayerProps) {
  const [channels, setChannels] = useState<ChannelItem[]>(DEFAULT_CHANNELS);
  const [selectedChannel, setSelectedChannel] = useState<ChannelItem>(DEFAULT_CHANNELS[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>("قنوات beIN Sports");
  const [activeServer, setActiveServer] = useState<"primary" | "backup">("primary");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [statusMsg, setStatusMsg] = useState<string>("⚡ جاري الاتصال فائق السرعة بسيرفر القناة...");
  const [bufferSec, setBufferSec] = useState<number>(0);
  const [customUrl, setCustomUrl] = useState<string>("");

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);

  // Monitor playback buffer health in real-time
  useEffect(() => {
    const interval = setInterval(() => {
      const v = videoRef.current;
      if (v && v.buffered.length > 0) {
        try {
          const current = v.currentTime;
          const end = v.buffered.end(v.buffered.length - 1);
          const diff = Math.max(0, end - current);
          setBufferSec(Math.round(diff * 10) / 10);
        } catch {
          // Ignore
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Initialize and play selected channel stream
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (selectedChannel.isLockVip) {
      if (hlsRef.current) {
        hlsRef.current.stopLoad();
        hlsRef.current.detachMedia();
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      video.pause();
      setIsLoading(false);
      setIsPlaying(false);
      return;
    }

    const streamUrl = activeServer === "backup" && selectedChannel.backupUrl
      ? selectedChannel.backupUrl
      : selectedChannel.url;

    if (!streamUrl) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setStatusMsg(`⚡ جاري تشغيل ${selectedChannel.name}...`);

    video.pause();
    video.removeAttribute("src");
    video.load();

    if (hlsRef.current) {
      hlsRef.current.stopLoad();
      hlsRef.current.detachMedia();
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        maxBufferLength: 30,
        maxMaxBufferLength: 60,
        backBufferLength: 30,
        liveSyncDurationCount: 3,
        liveMaxLatencyDurationCount: 6,
        fragLoadingTimeOut: 20000,
        manifestLoadingTimeOut: 15000,
        levelLoadingTimeOut: 15000,
        autoStartLoad: true,
        capLevelToPlayerSize: false,
      });

      hls.loadSource(streamUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsLoading(false);
        setStatusMsg("");
        
        video.muted = isMuted;
        video
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            video.muted = true;
            setIsMuted(true);
            video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
          });
      });

      hls.on(Hls.Events.AUDIO_TRACKS_UPDATED, (_event, data) => {
        if (data.audioTracks && data.audioTracks.length > 0 && hls.audioTrack === -1) {
          hls.audioTrack = 0;
        }
      });

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              if (selectedChannel.backupUrl && activeServer === "primary") {
                setStatusMsg("جاري التبديل التلقائي للسيرفر الاحتياطي...");
                setActiveServer("backup");
              } else {
                setStatusMsg("إعادة الاتصال بالبث...");
                hls.startLoad();
              }
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              setStatusMsg("جاري استعادة البث...");
              hls.recoverMediaError();
              break;
            default:
              setIsLoading(false);
              setStatusMsg("البث متوقف مؤقتاً، جاري المحاولة...");
              hls.destroy();
              break;
          }
        }
      });

      hlsRef.current = hls;
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = streamUrl;
      video.muted = isMuted;
      video.addEventListener("loadedmetadata", () => {
        setIsLoading(false);
        setStatusMsg("");
        video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      });
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.stopLoad();
        hlsRef.current.detachMedia();
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [selectedChannel, activeServer]);

  // Handle Play/Pause
  const handleTogglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.muted = false;
        setIsMuted(false);
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  // Handle Unmute
  const handleUnmute = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      setIsMuted(false);
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // Handle Fullscreen
  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  // Play custom URL
  const handlePlayCustomUrl = () => {
    if (!customUrl.trim()) return;
    setSelectedChannel({
      name: "بث مخصص (Custom VIP Stream)",
      logo: "⚡",
      url: customUrl.trim(),
      cat: "مخصص",
      quality: "Live Custom",
    });
  };

  // Categories list
  const categories = [
    "قنوات beIN Sports",
    "قنوات MBC",
    "رياضية",
    "الكل",
    "إخبارية",
    "مصرية",
    "وثائقية",
  ];

  // Filtered channels
  const filteredChannels = channels.filter((c) => {
    const matchesCat = selectedCategory === "الكل" || c.cat === selectedCategory;
    const matchesSearch = searchQuery === "" || c.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="live-player" className="py-16 sm:py-24 bg-[#060810] relative overflow-hidden border-t border-white/10">
      <div className="absolute inset-0 bg-radial-glow pointer-events-none opacity-40" />
      <div className="max-w-[1370px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/40 bg-purple-500/10 px-4 py-1.5 text-[13px] font-black text-purple-400 mb-3 shadow-lg shadow-purple-950/40">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
            📺 مشغل البث المباشر التجريبي (beIN Sports & MBC Live)
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            شاهد باقة <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300">beIN Sports و MBC</span> بدون تقطيع
          </h2>
          <p className="mt-3 text-[15.5px] text-gray-300 font-medium">
            بث فائق السرعة عبر سيرفرات EdgeNext CDN بجودة 1080p و 4K UHD، مع إمكانية التبديل بين السيرفرات.
          </p>
        </div>

        {/* Live Player Layout (2 Columns: Player + Channel Selector) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Video Player (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            
            <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-black border-2 border-white/20 shadow-2xl shadow-purple-950/50 group">
              
              {/* Native HTML5 Video Element */}
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                playsInline
                autoPlay
                muted={isMuted}
                controls={false}
                onClick={handleTogglePlay}
              />

              {/* VIP Encrypted Channel Lock Screen */}
              {selectedChannel.isLockVip && (
                <div className="absolute inset-0 bg-radial-glow bg-black/95 flex flex-col items-center justify-center text-center p-6 z-25 backdrop-blur-md">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-amber-500 to-red-600 flex items-center justify-center text-3xl shadow-2xl shadow-amber-500/30 mb-3 animate-pulse">
                    🔒
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {selectedChannel.name} • بث مشفر VIP
                  </h3>
                  <p className="text-sm text-gray-300 max-w-lg mt-2 mb-4 leading-relaxed">
                    قناة {selectedChannel.name} ({selectedChannel.event || "مباريات اليوم"}) مشفرة وتتطلب تفعيل كود التجربة أو الاشتراك لمشاهدتها بجودة 4K UHD 60FPS بدون تقطيع.
                  </p>
                  
                  <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
                    <button
                      onClick={onOpenTrial}
                      className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black px-6 py-2.5 rounded-xl text-sm shadow-xl shadow-emerald-600/30 transition-transform hover:-translate-y-0.5 cursor-pointer"
                    >
                      🎁 طلب كود تجربة مجاني 6 ساعات
                    </button>
                    <a
                      href="#pricing"
                      className="bg-red-600 hover:bg-red-500 text-white font-black px-5 py-2.5 rounded-xl text-sm shadow-md transition-colors"
                    >
                      🛒 باقات الاشتراك VIP
                    </a>
                  </div>

                  {/* Custom Stream Loader */}
                  <div className="text-[11px] text-gray-400 mt-1">
                    أو إذا كان لديك رابط سيرفر خاص (M3U / HLS)، يمكنك تشغيله هنا:
                  </div>
                  <div className="flex gap-2 max-w-md w-full mt-2">
                    <input
                      type="text"
                      placeholder="https://example.com/live/stream.m3u8"
                      value={customUrl}
                      onChange={(e) => setCustomUrl(e.target.value)}
                      className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                    <button
                      onClick={handlePlayCustomUrl}
                      className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs cursor-pointer"
                    >
                      تشغيل
                    </button>
                  </div>
                </div>
              )}

              {/* Loading Spinner */}
              {isLoading && !selectedChannel.isLockVip && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-20">
                  <div className="h-14 w-14 rounded-full border-4 border-purple-500/30 border-t-purple-500 animate-spin" />
                  <span className="mt-3 text-[13.5px] font-bold text-gray-200">
                    جاري تحميل البث المباشر...
                  </span>
                  <span className="text-[11.5px] text-purple-400 mt-1">
                    EdgeNext CDN • {selectedChannel.quality || "1080p 50FPS"}
                  </span>
                </div>
              )}

              {/* Status Message Toast */}
              {statusMsg && !isLoading && !selectedChannel.isLockVip && (
                <div className="absolute top-4 inset-x-0 mx-auto w-fit bg-black/85 backdrop-blur-md text-amber-300 border border-amber-500/30 text-xs font-bold px-4 py-1.5 rounded-full z-20 animate-pulse shadow-lg">
                  {statusMsg}
                </div>
              )}

              {/* Big Play Overlay (When paused) */}
              {!isPlaying && !isLoading && !selectedChannel.isLockVip && (
                <div
                  onClick={handleTogglePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[2px] cursor-pointer z-10"
                >
                  <button
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 via-red-600 to-amber-500 hover:scale-110 text-white shadow-2xl shadow-purple-600/50 transition-transform ring-4 ring-white/30 cursor-pointer"
                    aria-label="تشغيل البث"
                  >
                    <IconPlay className="h-9 w-9 mr-1" />
                  </button>
                </div>
              )}

              {/* Unmute Overlay Button if playing muted */}
              {isPlaying && isMuted && !selectedChannel.isLockVip && (
                <button
                  onClick={handleUnmute}
                  className="absolute top-4 end-4 z-20 bg-amber-500 hover:bg-amber-400 text-black font-black text-xs px-4 py-2 rounded-full shadow-xl flex items-center gap-1.5 transition-all animate-bounce cursor-pointer border border-amber-300"
                >
                  🔊 اضغط لتشغيل الصوت
                </button>
              )}

              {/* Top Live Badges & Real-time Buffer Speed Indicator */}
              <div className="absolute top-4 start-4 flex items-center gap-2 pointer-events-none z-10">
                <span className="bg-red-600 text-white text-[11px] font-black px-2.5 py-0.5 rounded-md flex items-center gap-1.5 shadow-md">
                  <span className="h-2 w-2 rounded-full bg-white animate-pulse" /> {selectedChannel.quality || "مباشر 1080p"}
                </span>
                <span className="bg-black/70 backdrop-blur-md text-purple-300 text-[11px] font-bold px-2.5 py-0.5 rounded-md border border-white/10">
                  {selectedChannel.cat}
                </span>
                {selectedChannel.isVip && (
                  <span className="bg-gradient-to-r from-amber-500 to-amber-700 text-black text-[11px] font-black px-2.5 py-0.5 rounded-md shadow-md">
                    👑 VIP 4K
                  </span>
                )}
                {bufferSec > 0 && !selectedChannel.isLockVip && (
                  <span className="bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-[10.5px] font-black px-2.5 py-0.5 rounded-md backdrop-blur-md">
                    ⚡ بافر: {bufferSec}s
                  </span>
                )}
              </div>

              {/* Bottom Channel Info Bar & Controls */}
              <div className="absolute bottom-3 start-4 end-4 z-10 flex items-center justify-between gap-3 pointer-events-auto">
                <div className="bg-black/85 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-xl flex items-center gap-2 shadow-lg max-w-[65%]">
                  <span className="text-xl">{selectedChannel.logo}</span>
                  <div className="min-w-0">
                    <span className="text-[13.5px] font-black text-white block leading-tight truncate">
                      {selectedChannel.name}
                    </span>
                    <span className="text-[10.5px] text-emerald-400 font-bold block truncate">
                      {selectedChannel.event || "✓ سريعة التحميل • سيرفر HLS مباشر"}
                    </span>
                  </div>
                </div>

                {/* Controls & Server Switcher */}
                <div className="flex items-center gap-2 bg-black/85 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-xl shrink-0">
                  {selectedChannel.backupUrl && !selectedChannel.isLockVip && (
                    <button
                      onClick={() => setActiveServer(activeServer === "primary" ? "backup" : "primary")}
                      className={`text-[11px] font-black px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                        activeServer === "primary"
                          ? "bg-purple-600 text-white"
                          : "bg-amber-600 text-white"
                      }`}
                      title="تبديل سيرفر البث"
                    >
                      {activeServer === "primary" ? "سيرفر 1" : "سيرفر 2"}
                    </button>
                  )}
                  {!selectedChannel.isLockVip && (
                    <button
                      onClick={handleTogglePlay}
                      className="p-1 text-white hover:text-purple-400 transition-colors cursor-pointer text-sm"
                      title={isPlaying ? "إيقاف مؤقت" : "تشغيل"}
                    >
                      {isPlaying ? "⏸️" : "▶️"}
                    </button>
                  )}
                  <button
                    onClick={handleFullscreen}
                    className="p-1 text-white hover:text-amber-400 transition-colors cursor-pointer text-sm"
                    title="ملء الشاشة"
                  >
                    ⛶
                  </button>
                </div>
              </div>
            </div>

            {/* Note & VIP Upsell Banner */}
            <div className="rounded-2xl bg-gradient-to-r from-purple-950/50 via-red-950/40 to-slate-900 border border-purple-500/30 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-right">
                <div className="text-[14.5px] font-black text-white flex items-center gap-2">
                  <IconZap className="w-4 h-4 text-amber-400" />
                  شاهد باقة beIN Sports الكاملة (1-10) وSSC وShahid VIP 4K المشفرة
                </div>
                <p className="text-[12.5px] text-gray-300 mt-1">
                  سيرفرات نوفا، إيستار، وسيرفر ماستر برو تدعم جميع الشاشات الذكية، الهواتف وأجهزة الرسيفر بدون أي تقطيع مع مكتبة VOD عملاقة.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href="#pricing"
                  className="bg-red-600 hover:bg-red-500 text-white font-black px-4 py-2.5 rounded-xl text-[13px] transition-all shadow-md"
                >
                  عرض باقات VIP
                </a>
                <button
                  onClick={onOpenTrial}
                  className="bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold px-3.5 py-2.5 rounded-xl text-[12.5px] transition-all cursor-pointer"
                >
                  تجربة مجانية 6 ساعات
                </button>
              </div>
            </div>
          </div>

          {/* Channel Selector Sidebar (4 Cols) */}
          <div className="lg:col-span-4 rounded-3xl bg-slate-900/90 border border-white/15 overflow-hidden shadow-2xl flex flex-col h-[560px]">
            
            {/* Sidebar Top Header & Search */}
            <div className="p-4 border-b border-white/10 space-y-3 bg-slate-950">
              <div className="flex items-center justify-between">
                <h3 className="text-[15px] font-black text-white flex items-center gap-2">
                  <IconTv className="w-4 h-4 text-purple-400" /> قائمة القنوات ({filteredChannels.length})
                </h3>
                <span className="text-[11px] font-bold text-amber-300 bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 rounded">
                  4K & HD ⚡
                </span>
              </div>

              {/* Search Bar */}
              <input
                type="text"
                placeholder="ابحث عن قناة (مثال: beIN 1، MBC Masr، دراما)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl bg-white/5 border border-white/15 px-3 py-2 text-[13px] text-white placeholder:text-gray-500 focus:border-purple-500 focus:outline-none"
              />

              {/* Category Filter Pills */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 text-[11px] font-bold scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-gradient-to-r from-purple-600 to-red-600 text-white font-black shadow-md"
                        : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Channels Scrollable List */}
            <div className="flex-1 overflow-y-auto divide-y divide-white/5 p-2">
              {filteredChannels.length === 0 ? (
                <div className="p-8 text-center text-gray-400 text-[13px]">
                  لا توجد قنوات مطابقة لبحثك.
                </div>
              ) : (
                filteredChannels.map((ch, idx) => {
                  const isActive = selectedChannel.name === ch.name;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedChannel(ch);
                        setActiveServer("primary");
                        setIsPlaying(false);
                      }}
                      className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-right transition-all cursor-pointer ${
                        isActive
                          ? "bg-purple-600/20 border border-purple-500/40 text-white"
                          : "hover:bg-white/5 text-gray-300"
                      }`}
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-lg border border-white/10">
                        {ch.logo}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[13.5px] font-bold truncate ${isActive ? "text-purple-300 font-black" : "text-white"}`}>
                            {ch.name}
                          </span>
                          {ch.isVip && (
                            <span className="text-[9.5px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1 rounded shrink-0">
                              VIP
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-gray-400 block mt-0.5 truncate">
                          {ch.event || ch.cat}
                        </span>
                      </div>
                      <span
                        className={`h-2.5 w-2.5 rounded-full shrink-0 ${
                          isActive ? "bg-purple-500 animate-ping" : ch.isVip ? "bg-amber-400" : "bg-emerald-500"
                        }`}
                      />
                    </button>
                  );
                })
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
