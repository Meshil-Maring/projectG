import { useState, useEffect, useRef, useCallback } from "react";

const API_URL = import.meta.env.VITE_API_URL ?? "";

// Health lives at the server root, not under /api/v1
function getHealthUrl(): string {
  try {
    return `${new URL(API_URL).origin}/health`;
  } catch {
    return "/health";
  }
}
const HEALTH_URL = getHealthUrl();

export type WakeupStatus = "idle" | "waking" | "ready";

export const WAKEUP_MESSAGES = [
  "Preparing secure connection...",
  "Waking up server...",
  "Starting services...",
  "Loading your experience...",
  "Almost ready...",
] as const;

const THRESHOLD_MS = 1_500;
const LONG_WAIT_MS = 60_000;
const PROGRESS_EASE_MS = 55_000;

function easeOutProgress(elapsedMs: number): number {
  const t = Math.min(elapsedMs / PROGRESS_EASE_MS, 1);
  return 95 * (1 - Math.pow(1 - t, 2.5));
}

async function pingHealth(signal?: AbortSignal): Promise<boolean> {
  try {
    const res = await fetch(HEALTH_URL, { signal });
    return res.ok;
  } catch {
    return false;
  }
}

export function useServerWakeup() {
  const [status, setStatus] = useState<WakeupStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [msgIdx, setMsgIdx] = useState(0);
  const [showLongWait, setShowLongWait] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  // Persist across StrictMode double-invocation so guards survive cleanup+remount
  const resolved = useRef(false);
  const wakingStarted = useRef(false);
  const startTime = useRef(0);
  const rafId = useRef(0);
  const msgTimer = useRef<ReturnType<typeof setInterval>>(undefined!);
  const elapsedTimer = useRef<ReturnType<typeof setInterval>>(undefined!);
  const longWaitTimer = useRef<ReturnType<typeof setTimeout>>(undefined!);
  const pollTimer = useRef<ReturnType<typeof setInterval>>(undefined!);
  const thresholdTimer = useRef<ReturnType<typeof setTimeout>>(undefined!);
  const abortCtrl = useRef<AbortController>(null!);

  const done = useCallback(() => {
    if (resolved.current) return;
    resolved.current = true;
    cancelAnimationFrame(rafId.current);
    clearTimeout(thresholdTimer.current);
    clearTimeout(longWaitTimer.current);
    clearInterval(msgTimer.current);
    clearInterval(elapsedTimer.current);
    clearInterval(pollTimer.current);
    setProgress(100);
    setTimeout(() => setStatus("ready"), 800);
  }, []);

  useEffect(() => {
    // Reset guards on each real mount (StrictMode remounts reset refs too)
    resolved.current = false;
    wakingStarted.current = false;
    startTime.current = Date.now();
    abortCtrl.current = new AbortController();

    function enterWaking() {
      // Ref guard: only one RAF loop and one set of timers ever start
      if (resolved.current || wakingStarted.current) return;
      wakingStarted.current = true;
      setStatus("waking");

      const tick = () => {
        if (resolved.current) return;
        setProgress(easeOutProgress(Date.now() - startTime.current));
        rafId.current = requestAnimationFrame(tick);
      };
      rafId.current = requestAnimationFrame(tick);

      msgTimer.current = setInterval(
        () => setMsgIdx((i) => (i + 1) % WAKEUP_MESSAGES.length),
        3_000,
      );
      elapsedTimer.current = setInterval(
        () => setElapsed((s) => s + 1),
        1_000,
      );
      longWaitTimer.current = setTimeout(() => {
        if (!resolved.current) setShowLongWait(true);
      }, LONG_WAIT_MS);
    }

    // Show indicator if server hasn't responded within threshold
    thresholdTimer.current = setTimeout(enterWaking, THRESHOLD_MS);

    // Long-wait initial ping — aborted on cleanup so StrictMode's
    // second run doesn't have a ghost fetch racing the new one
    (async () => {
      const ok = await pingHealth(abortCtrl.current.signal);
      if (ok) {
        clearTimeout(thresholdTimer.current);
        done();
      }
      // Non-ok (404 etc.) leaves polling to handle it; threshold timer
      // will show the indicator if still waiting
    })();

    // Backup polling every 4 s
    pollTimer.current = setInterval(async () => {
      if (resolved.current) { clearInterval(pollTimer.current); return; }
      if (await pingHealth()) done();
    }, 4_000);

    return () => {
      abortCtrl.current?.abort();
      cancelAnimationFrame(rafId.current);
      clearTimeout(thresholdTimer.current);
      clearTimeout(longWaitTimer.current);
      clearInterval(msgTimer.current);
      clearInterval(elapsedTimer.current);
      clearInterval(pollTimer.current);
    };
  }, [done]);

  return {
    status,
    progress,
    message: WAKEUP_MESSAGES[msgIdx],
    showLongWait,
    elapsed,
    isWaking: status === "waking",
  };
}
