export const PRIMARY = "#15803d";
export const SECONDARY = "#16a34a";
export const LIGHT_BG = "#edf7f1";
export const ACCENT = "#14532d";

export const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: "easeOut" as const },
});
