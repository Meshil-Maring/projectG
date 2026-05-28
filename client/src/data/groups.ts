import { Scale, Heart, Users, Globe, Trophy, type LucideIcon } from "lucide-react";

export interface Group {
  id: string;
  slug: string;
  name: string;
  abbreviation: string;
  color: string;
  lightColor: string;
  gradientFrom: string;
  gradientTo: string;
  tagline: string;
  icon: LucideIcon;
}

export const groups: Group[] = [
  {
    id: "lac",
    slug: "lac",
    name: "Legal Aid Club",
    abbreviation: "LAC",
    color: "#1a3270",
    lightColor: "#eef1fb",
    gradientFrom: "#1a3270",
    gradientTo: "#2563eb",
    tagline: "Justice for all, barriers for none",
    icon: Scale,
  },
  {
    id: "whg",
    slug: "whg",
    name: "Work for Humanity Group",
    abbreviation: "WHG",
    color: "#c2410c",
    lightColor: "#fff4ec",
    gradientFrom: "#c2410c",
    gradientTo: "#f97316",
    tagline: "Serving humanity, one step at a time",
    icon: Heart,
  },
  {
    id: "hrds",
    slug: "hrds",
    name: "Human Resources Developmental Society",
    abbreviation: "HRDS",
    color: "#15803d",
    lightColor: "#edf7f1",
    gradientFrom: "#15803d",
    gradientTo: "#16a34a",
    tagline: "Empowering people, building futures",
    icon: Users,
  },
  {
    id: "fseds",
    slug: "fseds",
    name: "Foundation for Socio-Economic Development Society",
    abbreviation: "FSEDS",
    color: "#6d28d9",
    lightColor: "#f3f0ff",
    gradientFrom: "#6d28d9",
    gradientTo: "#7c3aed",
    tagline: "Building communities through economic empowerment",
    icon: Globe,
  },
  {
    id: "cwg",
    slug: "cwg",
    name: "Competitive World Group",
    abbreviation: "CWG",
    color: "#0f766e",
    lightColor: "#e8f7f6",
    gradientFrom: "#0f766e",
    gradientTo: "#0d9488",
    tagline: "Sharpening minds, shaping champions",
    icon: Trophy,
  },
];
