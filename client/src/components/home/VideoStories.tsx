import { useState } from "react";
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
  Maximize2,
  LayoutGrid,
} from "lucide-react";
import familyImg from "../../assets/image/family.jpeg";
import plantingImg from "../../assets/image/planting_tree.png";
import donateImg from "../../assets/image/donate.png";
import earthImg from "../../assets/image/earth.png";

const videos = [
  {
    id: 1,
    title: "Every Step We Take, Creates a Better Tomorrow",
    description:
      "See how your support helps us bring hope, opportunities, and change to those who need it most.",
    thumbnail: familyImg,
    duration: "1:48",
  },
  {
    id: 2,
    title: "Planting Seeds of Change for Future Generations",
    description:
      "Join us as we transform barren landscapes into thriving green spaces for communities in need.",
    thumbnail: plantingImg,
    duration: "2:15",
  },
  {
    id: 3,
    title: "Your Donation Changes Lives Every Single Day",
    description:
      "Witness the real-world impact of every rupee donated — from meals to medicine to education.",
    thumbnail: donateImg,
    duration: "3:02",
  },
  {
    id: 4,
    title: "Together We Build a Greener, Fairer World",
    description:
      "Our volunteers and partners unite across borders to create lasting change for vulnerable families.",
    thumbnail: earthImg,
    duration: "2:33",
  },
];

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

  const current = videos[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((i) => (i - 1 + videos.length) % videos.length);
    setIsPlaying(false);
    setProgress(0);
  };

  const handleNext = () => {
    setCurrentIndex((i) => (i + 1) % videos.length);
    setIsPlaying(false);
    setProgress(0);
  };

  const selectVideo = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(false);
    setProgress(0);
    setShowAllVideos(false);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    setProgress(pct * 100);
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {/* ── Video Player Column ── */}
          <div className="flex-1 w-full">
            {/* Player + Prev/Next row */}
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
                  {/* Thumbnail */}
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentIndex}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.35 }}
                      src={current.thumbnail}
                      alt={current.title}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>

                  {/* Subtle dark overlay */}
                  <div className="absolute inset-0 bg-black/25" />

                  {/* Center Play / Pause */}
                  <button
                    onClick={() => setIsPlaying((p) => !p)}
                    className="absolute inset-0 flex items-center justify-center"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    <motion.div
                      key={isPlaying ? "pause" : "play"}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.93 }}
                      transition={{ duration: 0.2 }}
                      className="w-16 h-16 rounded-full bg-white/90 shadow-lg flex items-center justify-center"
                    >
                      {isPlaying ? (
                        <Pause size={26} className="text-slate-800" />
                      ) : (
                        <Play size={26} className="text-slate-800 ml-1" />
                      )}
                    </motion.div>
                  </button>

                  {/* Bottom Controls */}
                  <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 pt-8 bg-gradient-to-t from-black/70 to-transparent">
                    {/* Progress bar */}
                    <div
                      className="flex-1 h-1 bg-white/30 rounded-full cursor-pointer mb-2 relative"
                      onClick={handleProgressClick}
                    >
                      <div
                        className="h-full bg-white rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                      {/* Scrubber dot */}
                      <div
                        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow"
                        style={{ left: `${progress}%`, transform: "translate(-50%, -50%)" }}
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
                        <Volume2 size={15} className="text-white cursor-pointer hover:text-white/80" />
                        <span className="text-white text-xs tabular-nums">
                          0:00 / {current.duration}
                        </span>
                        <Maximize2 size={15} className="text-white cursor-pointer hover:text-white/80" />
                      </div>
                    </div>
                  </div>
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
              {/* Dot indicators */}
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

              {/* See All Videos */}
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
                exit:   { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
              }}
              className="flex-1 max-w-lg"
            >
              {/* Label */}
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
                  exit:   { opacity: 0, y: -10, transition: { duration: 0.2 } },
                }}
                className="text-xs font-bold uppercase tracking-widest text-[#f97316] mb-3"
              >
                Watch Our Story
              </motion.p>

              {/* Heading */}
              <motion.h2
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
                  exit:   { opacity: 0, y: -12, transition: { duration: 0.2 } },
                }}
                className="text-3xl xl:text-4xl font-bold text-[#1e293b] leading-snug mb-4"
              >
                {current.title}
              </motion.h2>

              {/* Description */}
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
                  exit:   { opacity: 0, y: -10, transition: { duration: 0.2 } },
                }}
                className="text-body leading-relaxed mb-8"
              >
                {current.description}
              </motion.p>

              {/* Feature icons */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
                  exit:   { opacity: 0, y: -8, transition: { duration: 0.2 } },
                }}
                className="flex gap-6 mb-8"
              >
                {features.map(({ key, bgColor, iconColor, label, Icon, filled }) => (
                  <div key={key} className="flex flex-col items-center gap-2 text-center">
                    <div className={`w-14 h-14 rounded-full ${bgColor} flex items-center justify-center`}>
                      <Icon size={24} className={iconColor} fill={filled ? "currentColor" : "none"} />
                    </div>
                    <span className="text-xs font-semibold text-heading whitespace-pre-line leading-tight">
                      {label}
                    </span>
                  </div>
                ))}
              </motion.div>

              {/* Watch Video button */}
              <motion.button
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
                  exit:   { opacity: 0, y: -8, transition: { duration: 0.2 } },
                }}
                onClick={() => setIsPlaying((p) => !p)}
                className="flex items-center gap-3 px-6 py-3 bg-[#1e3a8a] text-white rounded-full font-semibold hover:bg-[#1e40af] transition shadow-md"
              >
                Watch Video
                <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                  <Play size={12} className="text-[#1e3a8a] ml-0.5" />
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
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#f97316] mb-1">
                    Watch Our Story
                  </p>
                  <h3 className="text-xl font-bold text-[#1e293b]">All Videos</h3>
                </div>
                <button
                  onClick={() => setShowAllVideos(false)}
                  aria-label="Close"
                  className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition"
                >
                  <X size={17} className="text-slate-600" />
                </button>
              </div>

              {/* Grid */}
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
                    {/* Thumbnail */}
                    <div className="aspect-video relative">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition" />

                      {/* Play circle */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-11 h-11 rounded-full bg-white/90 flex items-center justify-center shadow">
                          <Play size={16} className="text-slate-800 ml-0.5" />
                        </div>
                      </div>

                      {/* Active badge */}
                      {index === currentIndex && (
                        <div className="absolute top-2 right-2 bg-[#f97316] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Now Playing
                        </div>
                      )}

                      {/* Duration */}
                      <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-md tabular-nums">
                        {video.duration}
                      </div>
                    </div>

                    {/* Caption */}
                    <div className="p-3 bg-white">
                      <p className="text-sm font-semibold text-[#1e293b] line-clamp-2 leading-snug">
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
