import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  visible: boolean;
  message?: string;
  children?: ReactNode;
}

/**
 * Semi-transparent overlay for post-wakeup loading states.
 * Renders children (e.g. SkeletonDashboard) behind a soft scrim.
 */
export default function LoadingOverlay({ visible, message, children }: Props) {
  return (
    <div className="relative">
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-3"
            style={{ background: "rgba(248,250,252,0.8)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="status"
            aria-label={message ?? "Loading…"}
          >
            <span
              className="block rounded-full border-[3px] border-[#e2e8f0]"
              style={{
                width: 32,
                height: 32,
                borderTopColor: "#1a3270",
                animation: "pg-spin 0.8s linear infinite",
              }}
            />
            {message && (
              <p className="text-sm font-medium text-[#475569]">{message}</p>
            )}
            <style>{`@keyframes pg-spin { to { transform: rotate(360deg); } }`}</style>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
