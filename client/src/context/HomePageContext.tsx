import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from "react";
import { api, syncList } from "../lib/api";

export type IconKey =
  | "Users"
  | "GraduationCap"
  | "Leaf"
  | "HandHeart"
  | "Heart"
  | "Star"
  | "Globe"
  | "BookOpen";

export type VideoEntry = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  youtubeId?: string;
  videoUrl?: string;
  duration: string;
};

export type PhotoEntry = {
  id: number;
  src: string;
  alt: string;
  description: string;
};

export type ImpactStat = {
  id: number;
  iconKey: IconKey;
  value: string;
  label: string;
};

export type StoryEntry = {
  id: number;
  image: string;
  quote: string;
  name: string;
  role: string;
};

export type HomeData = {
  heroImageUrl: string;
  heroTitle: string;
  heroDescription: string;
  videos: VideoEntry[];
  photos: PhotoEntry[];
  stats: ImpactStat[];
  stories: StoryEntry[];
};

export const DEFAULT_HERO_TITLE = "Together We Can Change Lives";
export const DEFAULT_HERO_DESCRIPTION =
  "We're committed to building a better future for children, families and communities through education, care and support.";

const EMPTY_DATA: HomeData = {
  heroImageUrl: "",
  heroTitle: "",
  heroDescription: "",
  videos: [],
  photos: [],
  stats: [],
  stories: [],
};

type SiteSettings = {
  heroImageUrl: string;
  heroTitle: string;
  heroDescription: string;
};

type HomePageContextType = {
  data: HomeData;
  loading: boolean;
  updateHeroImage: (url: string) => void;
  updateHeroTitle: (title: string) => void;
  updateHeroDescription: (description: string) => void;
  updateVideos: (videos: VideoEntry[]) => void;
  updatePhotos: (photos: PhotoEntry[]) => void;
  updateStats: (stats: ImpactStat[]) => void;
  updateStories: (stories: StoryEntry[]) => void;
};

const HomePageContext = createContext<HomePageContextType | null>(null);

export function HomePageProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<HomeData>(EMPTY_DATA);
  const [loading, setLoading] = useState(true);

  // Refs track the last server-confirmed state so concurrent syncList calls
  // never use an intermediate fake-ID state as their `prev` baseline.
  const serverVideos = useRef<VideoEntry[]>([]);
  const serverPhotos = useRef<PhotoEntry[]>([]);
  const serverStats = useRef<ImpactStat[]>([]);
  const serverStories = useRef<StoryEntry[]>([]);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      api.get<SiteSettings>("/content/settings"),
      api.get<VideoEntry[]>("/content/videos"),
      api.get<PhotoEntry[]>("/content/photos"),
      api.get<ImpactStat[]>("/content/stats"),
      api.get<StoryEntry[]>("/content/stories"),
    ])
      .then(([settings, videos, photos, stats, stories]) => {
        if (cancelled) return;
        serverVideos.current = videos;
        serverPhotos.current = photos;
        serverStats.current = stats;
        serverStories.current = stories;
        setData({
          heroImageUrl: settings.heroImageUrl,
          heroTitle: settings.heroTitle,
          heroDescription: settings.heroDescription,
          videos,
          photos,
          stats,
          stories,
        });
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const updateHeroImage = (heroImageUrl: string) => {
    setData((d) => ({ ...d, heroImageUrl }));
    void api.put("/content/settings", { heroImageUrl });
  };
  const updateHeroTitle = (heroTitle: string) => {
    setData((d) => ({ ...d, heroTitle }));
    void api.put("/content/settings", { heroTitle });
  };
  const updateHeroDescription = (heroDescription: string) => {
    setData((d) => ({ ...d, heroDescription }));
    void api.put("/content/settings", { heroDescription });
  };

  const updateVideos = (videos: VideoEntry[]) => {
    const prev = serverVideos.current;
    setData((d) => ({ ...d, videos }));
    void syncList("/content/videos", prev, videos).then((result) => {
      serverVideos.current = result;
      setData((d) => ({ ...d, videos: result }));
    });
  };

  const updatePhotos = (photos: PhotoEntry[]) => {
    const prev = serverPhotos.current;
    setData((d) => ({ ...d, photos }));
    void syncList("/content/photos", prev, photos).then((result) => {
      serverPhotos.current = result;
      setData((d) => ({ ...d, photos: result }));
    });
  };

  const updateStats = (stats: ImpactStat[]) => {
    const prev = serverStats.current;
    setData((d) => ({ ...d, stats }));
    void syncList("/content/stats", prev, stats).then((result) => {
      serverStats.current = result;
      setData((d) => ({ ...d, stats: result }));
    });
  };

  const updateStories = (stories: StoryEntry[]) => {
    const prev = serverStories.current;
    setData((d) => ({ ...d, stories }));
    void syncList("/content/stories", prev, stories).then((result) => {
      serverStories.current = result;
      setData((d) => ({ ...d, stories: result }));
    });
  };

  return (
    <HomePageContext.Provider
      value={{
        data,
        loading,
        updateHeroImage,
        updateHeroTitle,
        updateHeroDescription,
        updateVideos,
        updatePhotos,
        updateStats,
        updateStories,
      }}
    >
      {children}
    </HomePageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- context + hook co-location is intentional
export function useHomePageData() {
  const ctx = useContext(HomePageContext);
  if (!ctx) throw new Error("useHomePageData must be used within HomePageProvider");
  return ctx;
}
