import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import familyImg from "../assets/image/family.jpeg";
import plantingImg from "../assets/image/planting_tree.png";
import donateImg from "../assets/image/donate.png";

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
  videos: VideoEntry[];
  photos: PhotoEntry[];
  stats: ImpactStat[];
  stories: StoryEntry[];
};

const DEFAULT_DATA: HomeData = {
  heroImageUrl: "",
  videos: [
    {
      id: 1,
      title: "Every Step We Take, Creates a Better Tomorrow",
      description:
        "See how your support helps us bring hope, opportunities, and change to those who need it most.",
      thumbnail: familyImg as string,
      youtubeId: "lArdfIpLlAA",
      duration: "—",
    },
    {
      id: 2,
      title: "Planting Seeds of Change for Future Generations",
      description:
        "Join us as we transform barren landscapes into thriving green spaces for communities in need.",
      thumbnail: plantingImg as string,
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      duration: "10:54",
    },
    {
      id: 3,
      title: "Your Donation Changes Lives Every Single Day",
      description:
        "Witness the real-world impact of every rupee donated — from meals to medicine to education.",
      thumbnail: donateImg as string,
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      duration: "0:15",
    },
    {
      id: 4,
      title: "Together We Build a Greener, Fairer World",
      description:
        "Our volunteers and partners unite across borders to create lasting change for vulnerable families.",
      thumbnail:
        "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&q=80",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      duration: "12:14",
    },
  ],
  photos: [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&q=90",
      alt: "Children Planting Trees",
      description:
        "Young community members learn environmental stewardship by planting trees in their neighborhood park — one sapling at a time, they are reshaping the future.",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=90",
      alt: "Children Having a Meal",
      description:
        "Nutritious meals are provided daily to over 500 children through our feeding program, ensuring no child has to study on an empty stomach.",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=90",
      alt: "Doctor With Students",
      description:
        "Healthcare volunteers bring free medical check-ups and health education to underserved school communities, bridging the gap between care and access.",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=1200&q=90",
      alt: "Children Raising Hands",
      description:
        "Eager students participate in our after-school learning program, breaking barriers to quality education and discovering the joy of curiosity.",
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&q=90",
      alt: "Volunteer Distributing Supplies",
      description:
        "Dedicated volunteers distribute emergency relief kits to families in need, bringing warmth, dignity, and hope during the most difficult times.",
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&q=90",
      alt: "Education for All",
      description:
        "Books and learning materials donated to rural schools where resources are scarce — because every child deserves the tools to dream bigger.",
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&q=90",
      alt: "Environment Protection",
      description:
        "Community-led clean energy and conservation initiatives help reduce carbon footprints across rural villages, protecting nature for generations to come.",
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&q=90",
      alt: "Community Gathering",
      description:
        "Neighbors unite at our annual community fair to celebrate shared progress, strengthen bonds, and plan a brighter future together.",
    },
  ],
  stats: [
    { id: 1, iconKey: "Users", value: "25K+", label: "Lives\nImpacted" },
    { id: 2, iconKey: "GraduationCap", value: "10K+", label: "Children\nEducated" },
    { id: 3, iconKey: "Leaf", value: "150+", label: "Communities\nServed" },
    { id: 4, iconKey: "HandHeart", value: "500+", label: "Volunteers\nWorldwide" },
  ],
  stories: [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80",
      quote: "Thanks to the scholarship, I am now able to study and dream of a better future.",
      name: "Aarav Kumar",
      role: "Scholarship Recipient",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=120&q=80",
      quote: "The support we received helped us rebuild our home and live with dignity again.",
      name: "Sunita Devi",
      role: "Community Beneficiary",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80",
      quote: "Volunteering here has been the most meaningful experience of my life.",
      name: "Rohan Mehta",
      role: "Volunteer",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80",
      quote: "Every contribution transformed not just my child's future but our entire community.",
      name: "Priya Sharma",
      role: "Parent Beneficiary",
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&q=80",
      quote: "I never imagined clean water would change everything — it truly gave us a new life.",
      name: "Meera Nair",
      role: "Village Resident",
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=120&q=80",
      quote: "The skills training I received opened doors I never knew existed.",
      name: "Samuel Osei",
      role: "Vocational Graduate",
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=120&q=80",
      quote: "Seeing my students read their first sentence was worth more than words can express.",
      name: "Fatima Al-Hassan",
      role: "Community Teacher",
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&q=80",
      quote: "From receiving help to leading others — that journey is something I cherish forever.",
      name: "Diego Reyes",
      role: "Farmer & Community Trainer",
    },
  ],
};

type HomePageContextType = {
  data: HomeData;
  updateHeroImage: (url: string) => void;
  updateVideos: (videos: VideoEntry[]) => void;
  updatePhotos: (photos: PhotoEntry[]) => void;
  updateStats: (stats: ImpactStat[]) => void;
  updateStories: (stories: StoryEntry[]) => void;
  resetToDefaults: () => void;
};

const HomePageContext = createContext<HomePageContextType | null>(null);

export function HomePageProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<HomeData>(() => {
    try {
      const saved = localStorage.getItem("pg_home_data");
      if (saved) return { ...DEFAULT_DATA, ...JSON.parse(saved) };
    } catch {
      /* ignore parse errors */
    }
    return DEFAULT_DATA;
  });

  useEffect(() => {
    try {
      localStorage.setItem("pg_home_data", JSON.stringify(data));
    } catch {
      /* ignore storage errors */
    }
  }, [data]);

  const updateHeroImage = (url: string) =>
    setData((d) => ({ ...d, heroImageUrl: url }));
  const updateVideos = (videos: VideoEntry[]) =>
    setData((d) => ({ ...d, videos }));
  const updatePhotos = (photos: PhotoEntry[]) =>
    setData((d) => ({ ...d, photos }));
  const updateStats = (stats: ImpactStat[]) =>
    setData((d) => ({ ...d, stats }));
  const updateStories = (stories: StoryEntry[]) =>
    setData((d) => ({ ...d, stories }));
  const resetToDefaults = () => {
    localStorage.removeItem("pg_home_data");
    setData(DEFAULT_DATA);
  };

  return (
    <HomePageContext.Provider
      value={{
        data,
        updateHeroImage,
        updateVideos,
        updatePhotos,
        updateStats,
        updateStories,
        resetToDefaults,
      }}
    >
      {children}
    </HomePageContext.Provider>
  );
}

export function useHomePageData() {
  const ctx = useContext(HomePageContext);
  if (!ctx) throw new Error("useHomePageData must be used within HomePageProvider");
  return ctx;
}

export { DEFAULT_DATA };
