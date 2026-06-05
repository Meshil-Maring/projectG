import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  X,
  Heart,
  Users,
  Volume2,
  VolumeX,
  Maximize2,
  LayoutGrid,
} from "lucide-react";
import familyImg from "../../../assets/image/family.jpeg";
import plantingImg from "../../../assets/image/planting_tree.png";
import donateImg from "../../../assets/image/donate.png";
import earthImg from "../../../assets/image/earth.png";

type VideoEntry = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  youtubeId?: string;
  videoUrl?: string;
  duration: string;
};

const videos: VideoEntry[] = [
  {
    id: 1,
    title: "Every Step We Take, Creates a Better Tomorrow",
    description:
      "See how your support helps us bring hope, opportunities, and change to those who need it most.",
    thumbnail: familyImg as string,
    youtubeId: "lArdfIpLlAA",
    duration: "—",
  },
  {
    id: 2,
    title: "Planting Seeds of Change for Future Generations",
    description:
      "Join us as we transform barren landscapes into thriving green spaces for communities in need.",
    thumbnail: plantingImg as string,
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    duration: "10:54",
  },
  {
    id: 3,
    title: "Your Donation Changes Lives Every Single Day",
    description:
      "Witness the real-world impact of every rupee donated — from meals to medicine to education.",
    thumbnail: donateImg as string,
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    duration: "0:15",
  },
  {
    id: 4,
    title: "Together We Build a Greener, Fairer World",
    description:
      "Our volunteers and partners unite across borders to create lasting change for vulnerable families.",
    thumbnail: earthImg as string,
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    duration: "12:14",
  },
];

const fmt = (s: number) => {
  if (!s || isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

const features = [
  {
    key: "heart",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
    label: "Real People\nReal Stories",
    Icon: Heart,
    filled: true,
  },
  {
    key: "impact",
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
    label: "Meaningful\nImpact",
    Icon: Users,
    filled: false,
  },
  {
    key: "together",
    bgColor: "bg-orange-100",
    iconColor: "text-orange-500",
    label: "Stronger\nTogether",
    Icon: Users,
    filled: false,
  },
];

export default function VideoStories() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAllVideos, setShowAllVideos] = useState(false);
  const [progress, setProgress] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [muted, setMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const current = videos[currentIndex];
  const isYoutube = !!current.youtubeId;

  // Sync play/pause for native videos only
  useEffect(() => {
    if (isYoutube) return;
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.play().catch(() => setIsPlaying(false));
    } else {
      video.pause();
    }
  }, [isPlaying, isYoutube]);

  // Reset state when switching videos
  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
    setElapsed(0);
  }, [currentIndex]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    setElapsed(video.currentTime);
    setProgress((video.currentTime / video.duration) * 100);
  };

  const handlePrev = () =>
    setCurrentIndex((i) => (i - 1 + videos.length) % videos.length);

  const handleNext = () =>
    setCurrentIndex((i) => (i + 1) % videos.length);

  const selectVideo = (index: number) => {
    setCurrentIndex(index);
    setShowAllVideos(false);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    if (videoRef.current?.duration) {
      videoRef.current.currentTime = pct * videoRef.current.duration;
    }
    setProgress(pct * 100);
  };

  const toggleMute = () => {
    setMuted((m) => {
      if (videoRef.current) videoRef.current.muted = !m;
      return !m;
    });
  };

  const handleFullscreen = () => {
    videoRef.current?.requestFullscreen?.();
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {/* ── Video Player Column ── */}
          <div className="flex-1 w-full">
            <div className="flex items-center gap-3">
              {/* Prev */}
              <button
                onClick={handlePrev}
                aria-label="Previous video"
                className="shrink-0 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center hover:bg-slate-50 transition"
              >
                <ChevronLeft size={20} className="text-slate-600" />
              </button>

              {/* Player */}
              <div className="relative flex-1 rounded-2xl overflow-hidden shadow-2xl bg-black group">
                <div className="aspect-video relative">

                  {/* ── YouTube: show iframe when playing, thumbnail when paused ── */}
                  {isYoutube ? (
                    isPlaying ? (
                      <iframe
                        key={`yt-${currentIndex}`}
                        src={`https://www.youtube.com/embed/${current.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={current.title}
                      />
                    ) : (
                      <>
                        <img
                          src={current.thumbnail}
                          alt={current.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/25 pointer-events-none" />
                        {/* Play overlay for YouTube */}
                        <button
                          onClick={() => setIsPlaying(true)}
                          className="absolute inset-0 flex items-center justify-center"
                          aria-label="Play"
                        >
                          <div className="w-20 h-20 rounded-full bg-red-600 shadow-xl flex items-center justify-center hover:bg-red-500 transition">
                            <Play size={32} className="text-white ml-1.5" />
                          </div>
                        </button>
                        {/* YouTube badge */}
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/70 text-white text-xs px-2.5 py-1 rounded-full font-medium">
                          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-red-500">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                          </svg>
                          YouTube
                        </div>
                      </>
                    )
                  ) : (
                    /* ── Native video ── */
                    <>
                      <video
                        key={currentIndex}
                        ref={videoRef}
                        src={current.videoUrl}
                        poster={current.thumbnail}
                        className="w-full h-full object-cover"
                        onTimeUpdate={handleTimeUpdate}
                        onEnded={() => {
                          setIsPlaying(false);
                          setProgress(100);
                        }}
                        muted={muted}
                        playsInline
                      />

                      {/* Subtle overlay */}
                      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

                      {/* Center play/pause — fades while playing, reappears on hover */}
                      <button
                        onClick={() => setIsPlaying((p) => !p)}
                        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                          isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                        }`}
                        aria-label={isPlaying ? "Pause" : "Play"}
                      >
                        <div className="w-16 h-16 rounded-full bg-white/90 shadow-lg flex items-center justify-center">
                          {isPlaying ? (
                            <Pause size={26} className="text-slate-800" />
                          ) : (
                            <Play size={26} className="text-slate-800 ml-1" />
                          )}
                        </div>
                      </button>

                      {/* Bottom Controls */}
                      <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 pt-8 bg-linear-to-t from-black/70 to-transparent">
                        {/* Progress bar */}
                        <div
                          className="h-1 bg-white/30 rounded-full cursor-pointer mb-2 relative"
                          onClick={handleProgressClick}
                        >
                          <div
                            className="h-full bg-white rounded-full"
                            style={{ width: `${progress}%` }}
                          />
                          <div
                            className="absolute top-1/2 w-3 h-3 bg-white rounded-full shadow"
                            style={{
                              left: `${progress}%`,
                              transform: "translate(-50%, -50%)",
                            }}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => setIsPlaying((p) => !p)}
                            className="text-white hover:text-white/80 transition"
                            aria-label={isPlaying ? "Pause" : "Play"}
                          >
                            {isPlaying ? <Pause size={15} /> : <Play size={15} />}
                          </button>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={toggleMute}
                              className="text-white hover:text-white/80 transition"
                              aria-label={muted ? "Unmute" : "Mute"}
                            >
                              {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                            </button>
                            <span className="text-white text-xs tabular-nums">
                              {fmt(elapsed)} / {current.duration}
                            </span>
                            <button
                              onClick={handleFullscreen}
                              className="text-white hover:text-white/80 transition"
                              aria-label="Fullscreen"
                            >
                              <Maximize2 size={15} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Next */}
              <button
                onClick={handleNext}
                aria-label="Next video"
                className="shrink-0 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center hover:bg-slate-50 transition"
              >
                <ChevronRight size={20} className="text-slate-600" />
              </button>
            </div>

            {/* Dots + See All */}
            <div className="flex flex-col items-center gap-3 mt-4">
              <div className="flex items-center gap-2">
                {videos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => selectVideo(i)}
                    aria-label={`Video ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === currentIndex
                        ? "bg-[#f97316] w-6"
                        : "bg-slate-300 w-2 hover:bg-slate-400"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setShowAllVideos(true)}
                className="flex items-center gap-2 px-5 py-2 bg-[#1e3a8a] text-white rounded-full text-sm font-semibold hover:bg-[#1e40af] transition shadow-sm"
              >
                <LayoutGrid size={15} />
                See All Videos
              </button>
            </div>
          </div>

          {/* ── Right Content Column ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } },
                exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
              }}
              className="flex-1 max-w-lg"
            >
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
                  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
                }}
                className="text-xs font-bold uppercase tracking-widest text-[#f97316] mb-3"
              >
                Watch Our Story
              </motion.p>

              <motion.h2
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
                  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
                }}
                className="text-3xl xl:text-4xl font-bold text-heading leading-snug mb-4"
              >
                {current.title}
              </motion.h2>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
                  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
                }}
                className="text-body leading-relaxed mb-8"
              >
                {current.description}
              </motion.p>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
                  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
                }}
                className="flex gap-6 mb-8"
              >
                {features.map(({ key, bgColor, iconColor, label, Icon, filled }) => (
                  <div key={key} className="flex flex-col items-center gap-2 text-center">
                    <div
                      className={`w-14 h-14 rounded-full ${bgColor} flex items-center justify-center`}
                    >
                      <Icon
                        size={24}
                        className={iconColor}
                        fill={filled ? "currentColor" : "none"}
                      />
                    </div>
                    <span className="text-xs font-semibold text-heading whitespace-pre-line leading-tight">
                      {label}
                    </span>
                  </div>
                ))}
              </motion.div>

              <motion.button
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
                  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
                }}
                onClick={() => setIsPlaying((p) => !p)}
                className="flex items-center gap-3 px-6 py-3 bg-[#1e3a8a] text-white rounded-full font-semibold hover:bg-[#1e40af] transition shadow-md"
              >
                {isPlaying ? "Pause Video" : "Watch Video"}
                <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                  {isPlaying ? (
                    <Pause size={12} className="text-[#1e3a8a]" />
                  ) : (
                    <Play size={12} className="text-[#1e3a8a] ml-0.5" />
                  )}
                </span>
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── All Videos Overlay ── */}
      <AnimatePresence>
        {showAllVideos && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-6"
            onClick={() => setShowAllVideos(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl p-7 w-full max-w-3xl max-h-[85vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#f97316] mb-1">
                    Watch Our Story
                  </p>
                  <h3 className="text-xl font-bold text-heading">All Videos</h3>
                </div>
                <button
                  onClick={() => setShowAllVideos(false)}
                  aria-label="Close"
                  className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition"
                >
                  <X size={17} className="text-slate-600" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {videos.map((video, index) => (
                  <button
                    key={video.id}
                    onClick={() => selectVideo(index)}
                    className={`relative rounded-xl overflow-hidden group border-2 transition-all text-left ${
                      index === currentIndex
                        ? "border-[#f97316] ring-2 ring-[#f97316]/30"
                        : "border-transparent hover:border-[#1e3a8a]/40"
                    }`}
                  >
                    <div className="aspect-video relative">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition" />

                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className={`w-11 h-11 rounded-full flex items-center justify-center shadow ${
                            video.youtubeId ? "bg-red-600" : "bg-white/90"
                          }`}
                        >
                          <Play
                            size={16}
                            className={`ml-0.5 ${video.youtubeId ? "text-white" : "text-slate-800"}`}
                          />
                        </div>
                      </div>

                      {/* YouTube badge in grid */}
                      {video.youtubeId && (
                        <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
                          <svg viewBox="0 0 24 24" className="w-3 h-3 fill-red-500">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                          </svg>
                          YouTube
                        </div>
                      )}

                      {index === currentIndex && (
                        <div className="absolute top-2 right-2 bg-[#f97316] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Now Playing
                        </div>
                      )}

                      <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-md tabular-nums">
                        {video.duration}
                      </div>
                    </div>

                    <div className="p-3 bg-white">
                      <p className="text-sm font-semibold text-heading line-clamp-2 leading-snug">
                        {video.title}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
