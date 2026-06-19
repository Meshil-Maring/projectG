/** Reusable skeleton shimmer primitives + pre-built page skeleton layouts. */

const shimmerStyle: React.CSSProperties = {
  background:
    "linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%)",
  backgroundSize: "400% 100%",
  animation: "shimmer 3s ease-in-out infinite",
};

/* ── Primitives ───────────────────────────────────────────────────── */

export function SkeletonLine({ width = "100%", height = 16 }: { width?: string | number; height?: number }) {
  return (
    <div
      className="rounded"
      aria-hidden="true"
      style={{ width, height, ...shimmerStyle }}
    />
  );
}

export function SkeletonCircle({ size = 48 }: { size?: number }) {
  return (
    <div
      className="shrink-0 rounded-full"
      aria-hidden="true"
      style={{ width: size, height: size, ...shimmerStyle }}
    />
  );
}

export function SkeletonRect({ width = "100%", height = 160, rounded = "0.875rem" }: {
  width?: string | number;
  height?: number;
  rounded?: string;
}) {
  return (
    <div
      aria-hidden="true"
      style={{ width, height, borderRadius: rounded, ...shimmerStyle }}
    />
  );
}

/* ── Composed skeletons ───────────────────────────────────────────── */

export function SkeletonCard() {
  return (
    <div className="rounded-xl border border-[#e2e8f0] bg-white p-5 shadow-sm flex flex-col gap-3">
      <SkeletonRect height={160} />
      <SkeletonLine height={18} width="70%" />
      <SkeletonLine height={13} />
      <SkeletonLine height={13} width="85%" />
      <div className="flex items-center gap-2 pt-1">
        <SkeletonCircle size={28} />
        <SkeletonLine height={12} width="40%" />
      </div>
    </div>
  );
}

export function SkeletonHero() {
  return (
    <div className="flex flex-col items-center gap-5 py-16 px-6 text-center">
      <SkeletonLine height={14} width={120} />
      <SkeletonLine height={36} width="60%" />
      <SkeletonLine height={36} width="45%" />
      <SkeletonLine height={16} width="55%" />
      <SkeletonLine height={16} width="40%" />
      <div className="flex gap-3 mt-2">
        <SkeletonRect width={140} height={44} rounded="9999px" />
        <SkeletonRect width={140} height={44} rounded="9999px" />
      </div>
    </div>
  );
}

export function SkeletonNavbar() {
  return (
    <div className="flex h-16 items-center justify-between border-b border-[#e2e8f0] bg-white px-6">
      <SkeletonRect width={120} height={36} rounded="0.5rem" />
      <div className="hidden items-center gap-6 sm:flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonLine key={i} width={60} height={13} />
        ))}
      </div>
      <SkeletonRect width={100} height={36} rounded="9999px" />
    </div>
  );
}

/**
 * Full page skeleton — shows Navbar + Hero + grid of cards.
 * Drop this in as a loading placeholder for content-heavy pages.
 */
export default function SkeletonDashboard() {
  return (
    <div className="min-h-screen bg-[#f8fafc]" aria-hidden="true">
      <SkeletonNavbar />
      <SkeletonHero />
      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="mb-6">
          <SkeletonLine height={22} width="30%" />
          <div className="mt-2">
            <SkeletonLine height={14} width="50%" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
