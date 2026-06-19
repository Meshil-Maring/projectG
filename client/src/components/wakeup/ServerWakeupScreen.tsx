import { motion, AnimatePresence } from "framer-motion";

interface Props {
  progress: number;
  message: string;
  showLongWait: boolean;
  elapsed: number;
}

/**
 * Non-blocking wake-up indicator:
 * - A thin gradient progress bar pinned to the top of the viewport
 * - A small status card in the bottom-left corner
 * Neither element captures pointer events outside itself, so the page
 * remains fully interactive while the server is starting.
 */
export default function ServerWakeupScreen({ progress, message, showLongWait, elapsed }: Props) {
  const remaining = Math.max(0, 45 - elapsed);

  return (
    <>
      {/* ── Top progress rail ─────────────────────────────────────── */}
      <div
        className="fixed top-0 left-0 right-0 z-10000 h-0.75"
        style={{ background: "rgba(255,255,255,0.08)" }}
        aria-hidden="true"
      >
        <motion.div
          className="h-full origin-left"
          style={{
            background: "linear-gradient(90deg, #1a3270, #2563eb, #f97316)",
          }}
          animate={{ scaleX: progress / 100 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
        {/* Travelling shimmer on the filled portion */}
        <motion.div
          className="absolute top-0 h-full w-20 opacity-60"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
            left: `${Math.max(0, progress - 15)}%`,
          }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* ── Bottom-left status card ────────────────────────────────── */}
      <motion.div
        role="status"
        aria-live="polite"
        aria-label="Server is starting up"
        className="fixed bottom-5 left-5 z-10000 w-72 rounded-xl shadow-xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0f1f4a ee, #1a3270)",
          border: "1px solid rgba(255,255,255,0.12)",
          backdropFilter: "blur(12px)",
        }}
        initial={{ opacity: 0, y: 16, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Progress fill accent */}
        <div className="h-0.5 w-full" style={{ background: "rgba(255,255,255,0.06)" }}>
          <motion.div
            className="h-full"
            style={{ background: "linear-gradient(90deg, #2563eb, #f97316)" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>

        <div className="px-4 py-3">
          {/* Header row */}
          <div className="flex items-center gap-2 mb-2">
            {/* Pulsing dot */}
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-400" />
            </span>
            <span className="text-xs font-semibold text-white/90 tracking-wide uppercase">
              Server starting
            </span>
            <span className="ml-auto text-xs font-mono text-white/40">{Math.round(progress)}%</span>
          </div>

          {/* Rotating status message */}
          <div className="h-5 relative mb-2 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={message}
                className="absolute inset-0 text-xs text-white/60 leading-5"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
              >
                {message}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Footer row */}
          <div className="flex items-center justify-between">
            {/* Dot loader */}
            <div className="flex gap-1" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="block h-1 w-1 rounded-full bg-white/30"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                />
              ))}
            </div>

            {/* Time hint */}
            <AnimatePresence mode="wait">
              {showLongWait ? (
                <motion.span
                  key="longwait"
                  className="text-xs text-amber-400/80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Taking longer than usual…
                </motion.span>
              ) : remaining > 0 ? (
                <motion.span
                  key="remaining"
                  className="text-xs text-white/35 font-mono"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  ~{remaining}s
                </motion.span>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </>
  );
}
