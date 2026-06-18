import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  Calendar,
  MapPin,
  FileCheck,
  Volume2,
  VolumeX,
  Maximize2,
} from "lucide-react";
import { useAboutUsData } from "../../../context/AboutUsContext";
import { usePageSections } from "../../../context/PageContext";
import { YoutubeLogoIcon } from "../../../assets/icons";

const DEFAULT_STORY = {
  eyebrow: "Our Story",
  heading: "How It All Began",
  paragraph1:
    "Project Generation was founded with a simple belief — that small acts of kindness can create a big change.",
  paragraph2:
    "What started as a group of passionate students has grown into a movement that touches thousands of lives every year.",
  founded: "2012",
  headquarters: "Manipur, India",
  legalStatus: "Registered NGO",
};

const fmt = (s: number) => {
  if (!s || isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" as const },
  }),
};

export default function AboutStory() {
  const { data } = useAboutUsData();
  const video = data.storyVideo;
  const { getSectionData } = usePageSections();
  const story = { ...DEFAULT_STORY, ...getSectionData("about-story") };

  const infoBadges = [
    { icon: Calendar, label: "Founded", value: story.founded },
    { icon: MapPin, label: "Headquarters", value: story.headquarters },
    { icon: FileCheck, label: "Legal Status", value: story.legalStatus },
  ];

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [muted, setMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isYoutube = !!video.youtubeId;

  useEffect(() => {
    if (isYoutube) return;
    const v = videoRef.current;
    if (!v) return;
    if (isPlaying) {
      v.play().catch(() => setIsPlaying(false));
    } else {
      v.pause();
    }
  }, [isPlaying, isYoutube]);

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setElapsed(v.currentTime);
    setProgress((v.currentTime / v.duration) * 100);
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
    <section className="py-20 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-14 relative">

        {/* Left — video player */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="shrink-0 w-full lg:w-120 relative rounded-2xl overflow-hidden shadow-xl bg-black group"
        >
          <div className="aspect-video relative">

            {/* YouTube */}
            {isYoutube ? (
              isPlaying ? (
                <iframe
                  src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={video.title}
                />
              ) : (
                <>
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 pointer-events-none" />
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="absolute inset-0 flex items-center justify-center"
                    aria-label="Play"
                  >
                    <div className="w-16 h-16 rounded-full bg-red-600 shadow-xl flex items-center justify-center hover:bg-red-500 transition">
                      <Play size={26} className="text-white ml-1.5" />
                    </div>
                  </button>
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/70 text-white text-xs px-2.5 py-1 rounded-full font-medium">
                    <YoutubeLogoIcon className="w-3.5 h-3.5 fill-red-500" />
                    YouTube
                  </div>
                </>
              )
            ) : (
              /* Native video */
              <>
                <video
                  ref={videoRef}
                  src={video.videoUrl}
                  poster={video.thumbnail}
                  className="w-full h-full object-cover"
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={() => {
                    setIsPlaying(false);
                    setProgress(100);
                  }}
                  muted={muted}
                  playsInline
                />
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

                {/* Bottom controls */}
                <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 pt-8 bg-linear-to-t from-black/70 to-transparent">
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
                        {fmt(elapsed)} / {video.duration}
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
        </motion.div>

        {/* Right — story text */}
        <div className="flex-1 relative">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-xs font-bold uppercase tracking-widest text-[#f97316] mb-2"
          >
            {story.eyebrow}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="text-3xl xl:text-4xl font-extrabold text-heading leading-tight mb-3"
          >
            {story.heading}
          </motion.h2>
          <div className="w-12 h-1 bg-primary rounded mb-6" />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="space-y-3 text-sm text-[#64748b] leading-relaxed mb-8"
          >
            <p>{story.paragraph1}</p>
            <p>{story.paragraph2}</p>
          </motion.div>

          {/* Info badges */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
            className="flex flex-wrap gap-3"
          >
            {infoBadges.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-3 border border-[#e2e8f0] rounded-xl px-4 py-3 bg-surface"
              >
                <Icon size={16} className="text-primary shrink-0" />
                <div>
                  <p className="text-[10px] text-muted uppercase font-semibold tracking-wide">
                    {label}
                  </p>
                  <p className="text-sm font-bold text-heading">{value}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Blue birds decoration */}
          <svg
            className="absolute -right-6 top-0 w-20 h-40 opacity-30 pointer-events-none hidden lg:block"
            viewBox="0 0 80 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M40 10 Q55 2 65 12 Q55 14 40 10Z" fill="#1a3270" />
            <path d="M30 28 Q45 20 55 30 Q45 32 30 28Z" fill="#1a3270" />
            <path d="M50 48 Q62 42 70 50 Q62 52 50 48Z" fill="#1a3270" />
            <path d="M20 65 Q32 58 42 66 Q32 68 20 65Z" fill="#1a3270" />
          </svg>
        </div>
      </div>
    </section>
  );
}
