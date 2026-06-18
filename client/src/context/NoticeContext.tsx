import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { api, syncList } from "../lib/api";

export type NoticeCategory = "Announcement" | "Event" | "Update" | "Reminder";

export type NoticeEntry = {
  id: number;
  title: string;
  category: NoticeCategory;
  date: string;
  summary: string;
  body: string;
  imageUrl?: string;
};

/** Formats a stored notice date (YYYY-MM-DD) as "Month D, YYYY" for display. */
export function formatNoticeDate(date: string): string {
  if (!date) return "";
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

type NoticeContextType = {
  notices: NoticeEntry[];
  loading: boolean;
  updateNotices: (notices: NoticeEntry[]) => void;
};

const NoticeContext = createContext<NoticeContextType | null>(null);

export function NoticeProvider({ children }: { children: ReactNode }) {
  const [notices, setNotices] = useState<NoticeEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    api
      .get<NoticeEntry[]>("/content/notices")
      .then((data) => {
        if (!cancelled) setNotices(data);
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const updateNotices = (next: NoticeEntry[]) => {
    const prev = notices;
    setNotices(next);
    void syncList("/content/notices", prev, next).then((result) => setNotices(result));
  };

  return (
    <NoticeContext.Provider value={{ notices, loading, updateNotices }}>
      {children}
    </NoticeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- context + hook co-location is intentional
export function useNoticeData() {
  const ctx = useContext(NoticeContext);
  if (!ctx) throw new Error("useNoticeData must be used within NoticeProvider");
  return ctx;
}
