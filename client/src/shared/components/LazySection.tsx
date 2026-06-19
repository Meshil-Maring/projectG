import { useEffect, useRef, useState, type ReactNode } from "react";

interface LazySectionProps {
  children: ReactNode;
  rootMargin?: string;
}

export default function LazySection({ children, rootMargin = "400px" }: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setRevealed(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return <div ref={ref}>{revealed ? children : null}</div>;
}
