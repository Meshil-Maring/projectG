export const PRIMARY = "#c2410c";
export const SECONDARY = "#f97316";
export const LIGHT_BG = "#fff4ec";
export const ACCENT = "#7c2d12";

export const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: "easeOut" as const },
});
