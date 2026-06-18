export interface Cause {
  id: number;
  image: string;
  imageAlt: string;
  category: string;
  categoryColor: string;
  title: string;
  description: string;
  fullDescription: string;
  amountRaised: number;
  goal: number;
  percentage: number;
  beneficiaries: number;
  location: string;
}

export const causes: Cause[] = [
  {
    id: 1,
    image: "https://pub-6801b1695d3847ba91db17a08032bf71.r2.dev/causes/environment.png",
    imageAlt: "Environment Protection",
    category: "Environment",
    categoryColor: "#16a34a",
    title: "Environment Protection",
    description: "Protect our planet and preserve natural resources for future generations through community-led conservation efforts.",
    fullDescription: "Our environment protection initiative works with local communities to plant trees, clean rivers, and educate youth about sustainable living. Every contribution helps us restore degraded land and protect biodiversity in critical ecosystems across the region.",
    amountRaised: 420000,
    goal: 600000,
    percentage: 70,
    beneficiaries: 1200,
    location: "Multiple Regions",
  },
  {
    id: 2,
    image: "https://pub-6801b1695d3847ba91db17a08032bf71.r2.dev/causes/education.png",
    imageAlt: "Education for All",
    category: "Education",
    categoryColor: "#2563eb",
    title: "Education for All",
    description: "Help every child access quality education regardless of their economic background or geographic location.",
    fullDescription: "We provide scholarships, school supplies, and digital learning tools to underprivileged children. Our tutoring centers and mobile classrooms bring education to the most remote areas, ensuring no child is left behind in the pursuit of knowledge.",
    amountRaised: 185000,
    goal: 410000,
    percentage: 45,
    beneficiaries: 850,
    location: "Rural Districts",
  },
  {
    id: 3,
    image: "https://pub-6801b1695d3847ba91db17a08032bf71.r2.dev/causes/health.png",
    imageAlt: "Health & Wellness",
    category: "Health",
    categoryColor: "#ec4899",
    title: "Health & Wellness",
    description: "Provide medical care and health education to communities that lack access to basic healthcare services.",
    fullDescription: "Our health camps deliver free consultations, medicines, and preventive care to thousands of families every year. We also run maternal health programs and vaccination drives, reducing infant mortality and improving overall community well-being.",
    amountRaised: 310000,
    goal: 500000,
    percentage: 62,
    beneficiaries: 2300,
    location: "Urban & Rural",
  },
  {
    id: 4,
    image: "https://pub-6801b1695d3847ba91db17a08032bf71.r2.dev/causes/hunger.png",
    imageAlt: "Hunger & Food",
    category: "Hunger",
    categoryColor: "#f97316",
    title: "Hunger & Food Security",
    description: "Feed families in need and build sustainable food systems that end hunger at the community level.",
    fullDescription: "Through our community kitchens and food distribution network, we provide nutritious meals daily to vulnerable families. We also support small farmers with resources and training to grow more food and build long-term food security in their communities.",
    amountRaised: 95000,
    goal: 320000,
    percentage: 30,
    beneficiaries: 640,
    location: "City & Villages",
  },
  {
    id: 5,
    image: "https://pub-6801b1695d3847ba91db17a08032bf71.r2.dev/causes/women.png",
    imageAlt: "Women Empowerment",
    category: "Empowerment",
    categoryColor: "#7c3aed",
    title: "Women Empowerment",
    description: "Empower women through skill development, financial literacy, and entrepreneurship support programs.",
    fullDescription: "We run vocational training centers that equip women with skills in tailoring, handicrafts, computing, and small business management. Our micro-finance program helps women start businesses and become financially independent, lifting entire families out of poverty.",
    amountRaised: 230000,
    goal: 350000,
    percentage: 66,
    beneficiaries: 520,
    location: "Semi-Urban Areas",
  },
  {
    id: 6,
    image: "https://pub-6801b1695d3847ba91db17a08032bf71.r2.dev/causes/youth.png",
    imageAlt: "Youth Development",
    category: "Youth",
    categoryColor: "#0891b2",
    title: "Youth Skill Development",
    description: "Equip young people with 21st-century skills, mentorship, and opportunities to build successful futures.",
    fullDescription: "Our youth centers offer coding bootcamps, leadership workshops, sports programs, and career counseling. We connect youth with mentors from industry and academia, giving them the tools and confidence to navigate an increasingly competitive world.",
    amountRaised: 170000,
    goal: 280000,
    percentage: 61,
    beneficiaries: 980,
    location: "Urban Centers",
  },
];

export const categories = ["All", ...Array.from(new Set(causes.map((c) => c.category)))];
