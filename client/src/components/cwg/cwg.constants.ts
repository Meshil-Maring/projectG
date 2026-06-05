export const PRIMARY = "#0f766e";
export const SECONDARY = "#0d9488";
export const LIGHT_BG = "#e8f7f6";

export const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: "easeOut" as const },
});
