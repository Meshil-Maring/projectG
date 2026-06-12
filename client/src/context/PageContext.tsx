import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { api } from "../lib/api";

export type Section = {
  id: number;
  type: string;
  enabled: boolean;
  order: number;
  data: Record<string, string>;
};

type PageWithSections = {
  id: string;
  slug: string;
  title: string;
  sections: Section[];
};

type PageContextType = {
  sections: Section[];
  loading: boolean;
  getSectionData: (type: string) => Record<string, string> | undefined;
  isSectionEnabled: (type: string) => boolean;
  updateSectionData: (type: string, data: Record<string, string>) => void;
};

const PageContext = createContext<PageContextType | null>(null);

export function PageProvider({ slug, children }: { slug: string; children: ReactNode }) {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    api
      .get<PageWithSections>(`/pages/${slug}`)
      .then((page) => {
        if (!cancelled) setSections(page.sections);
      })
      .catch(() => {
        // Page not seeded yet — components fall back to their defaults.
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [slug]);

  function getSectionData(type: string) {
    return sections.find((s) => s.type === type)?.data;
  }

  function isSectionEnabled(type: string) {
    return sections.find((s) => s.type === type)?.enabled ?? true;
  }

  function updateSectionData(type: string, data: Record<string, string>) {
    const existing = sections.find((s) => s.type === type);
    if (!existing) return;
    setSections((prev) => prev.map((s) => (s.type === type ? { ...s, data } : s)));
    void api.patch(`/sections/${existing.id}`, { data });
  }

  return (
    <PageContext.Provider value={{ sections, loading, getSectionData, isSectionEnabled, updateSectionData }}>
      {children}
    </PageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- context + hook co-location is intentional
export function usePageSections() {
  const ctx = useContext(PageContext);
  if (!ctx) throw new Error("usePageSections must be used within PageProvider");
  return ctx;
}
