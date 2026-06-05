export const NAV_BLUE = "#1a3270";
export const BRIGHT_BLUE = "#2563eb";
export const GOLD = "#b8860b";

export const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: "easeOut" as const },
});
