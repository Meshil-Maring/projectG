import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import familyImg from "../assets/image/family.jpeg";

export type StoryVideo = {
  title: string;
  description: string;
  thumbnail: string;
  youtubeId?: string;
  videoUrl?: string;
  duration: string;
};

export type AboutUsData = {
  storyVideo: StoryVideo;
};

const DEFAULT_DATA: AboutUsData = {
  storyVideo: {
    title: "How Project Generation Began",
    description:
      "A short film about the founding of Project Generation and the journey from a small group of students to a movement that touches thousands of lives.",
    thumbnail: familyImg as string,
    youtubeId: "lArdfIpLlAA",
    duration: "—",
  },
};

type AboutUsContextType = {
  data: AboutUsData;
  updateStoryVideo: (video: StoryVideo) => void;
  resetToDefaults: () => void;
};

const AboutUsContext = createContext<AboutUsContextType | null>(null);

export function AboutUsProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AboutUsData>(() => {
    try {
      const saved = localStorage.getItem("pg_aboutus_data");
      if (saved) return { ...DEFAULT_DATA, ...JSON.parse(saved) };
    } catch {
      /* ignore */
    }
    return DEFAULT_DATA;
  });

  useEffect(() => {
    try {
      localStorage.setItem("pg_aboutus_data", JSON.stringify(data));
    } catch {
      /* ignore */
    }
  }, [data]);

  const updateStoryVideo = (storyVideo: StoryVideo) =>
    setData((d) => ({ ...d, storyVideo }));

  const resetToDefaults = () => {
    localStorage.removeItem("pg_aboutus_data");
    setData(DEFAULT_DATA);
  };

  return (
    <AboutUsContext.Provider value={{ data, updateStoryVideo, resetToDefaults }}>
      {children}
    </AboutUsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- context + hook co-location is intentional
export function useAboutUsData() {
  const ctx = useContext(AboutUsContext);
  if (!ctx) throw new Error("useAboutUsData must be used within AboutUsProvider");
  return ctx;
}

