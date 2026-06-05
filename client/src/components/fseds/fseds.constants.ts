export const PRIMARY = "#6d28d9";
export const SECONDARY = "#7c3aed";
export const LIGHT_BG = "#f3f0ff";

export const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: "easeOut" as const },
});
