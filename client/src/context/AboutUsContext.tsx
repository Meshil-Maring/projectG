import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { api } from "../lib/api";
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

type SiteSettings = {
  storyTitle: string;
  storyDescription: string;
  storyThumbnail: string;
  storyYoutubeId: string;
  storyVideoUrl: string;
  storyDuration: string;
};

type AboutUsContextType = {
  data: AboutUsData;
  loading: boolean;
  updateStoryVideo: (video: StoryVideo) => void;
};

const AboutUsContext = createContext<AboutUsContextType | null>(null);

export function AboutUsProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AboutUsData>(DEFAULT_DATA);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    api
      .get<SiteSettings>("/content/settings")
      .then((settings) => {
        if (cancelled) return;
        if (!settings.storyTitle && !settings.storyDescription && !settings.storyThumbnail) return;
        setData({
          storyVideo: {
            title: settings.storyTitle,
            description: settings.storyDescription,
            thumbnail: settings.storyThumbnail,
            youtubeId: settings.storyYoutubeId || undefined,
            videoUrl: settings.storyVideoUrl || undefined,
            duration: settings.storyDuration,
          },
        });
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const updateStoryVideo = (storyVideo: StoryVideo) => {
    setData((d) => ({ ...d, storyVideo }));
    void api.put("/content/settings", {
      storyTitle: storyVideo.title,
      storyDescription: storyVideo.description,
      storyThumbnail: storyVideo.thumbnail,
      storyYoutubeId: storyVideo.youtubeId ?? "",
      storyVideoUrl: storyVideo.videoUrl ?? "",
      storyDuration: storyVideo.duration,
    });
  };

  return (
    <AboutUsContext.Provider value={{ data, loading, updateStoryVideo }}>
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
