import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type ActivityEntry = {
  id: number;
  title: string;
  desc: string;
  imageUrl: string;
};

export type GroupKey = "whg" | "hrds" | "cwg" | "fseds" | "lac";

export type GroupActivitiesData = Record<GroupKey, ActivityEntry[]>;

const DEFAULT_DATA: GroupActivitiesData = {
  whg: [
    { id: 1, title: "Community Health Camp", desc: "Free health screenings and wellness checkups organized for underprivileged families across the community.", imageUrl: "" },
    { id: 2, title: "Nutrition & Meal Drive", desc: "Distributing nutritious meals and food kits to families in need during challenging times.", imageUrl: "" },
    { id: 3, title: "Environment Cleanliness Drive", desc: "Area cleaning campaigns and tree plantation activities bringing communities together for a greener future.", imageUrl: "" },
    { id: 4, title: "Elderly Care Visit", desc: "Spending meaningful time with senior residents, offering companionship, care, and essential support.", imageUrl: "" },
    { id: 5, title: "Child Welfare Program", desc: "Educational sessions and learning material distribution to support children's growth and development.", imageUrl: "" },
    { id: 6, title: "Disaster Relief Operation", desc: "Emergency aid, supplies, and rehabilitation support provided to families affected by natural disasters.", imageUrl: "" },
  ],
  hrds: [
    { id: 1, title: "Youth Empowerment Workshop", desc: "Hands-on skill-building sessions helping young adults discover their potential and chart a path forward.", imageUrl: "" },
    { id: 2, title: "Women Leadership Training", desc: "Empowering women with confidence, leadership skills, and communication tools to lead in their communities.", imageUrl: "" },
    { id: 3, title: "Career Development Fair", desc: "Connecting youth and job seekers with mentors, employers, and opportunities for professional growth.", imageUrl: "" },
    { id: 4, title: "Digital Literacy Program", desc: "Teaching essential digital and technology skills to prepare community members for a modern workforce.", imageUrl: "" },
    { id: 5, title: "Mentorship & Coaching Sessions", desc: "One-on-one guidance from experienced professionals supporting individuals on their personal growth journey.", imageUrl: "" },
    { id: 6, title: "Scholarship & Awards Ceremony", desc: "Recognizing and celebrating outstanding students with scholarships and resources to continue their education.", imageUrl: "" },
  ],
  cwg: [
    { id: 1, title: "Inter-School Quiz Championship", desc: "Testing knowledge and fostering academic excellence through competitive quizzes across schools and colleges.", imageUrl: "" },
    { id: 2, title: "Annual Sports Meet", desc: "Promoting physical fitness, teamwork, and sportsmanship through organized sports and athletic events.", imageUrl: "" },
    { id: 3, title: "Debate & Elocution Contest", desc: "Building public speaking, critical thinking, and argumentation skills in a competitive setting.", imageUrl: "" },
    { id: 4, title: "Science & Innovation Fair", desc: "Encouraging scientific curiosity and creative problem-solving among students with hands-on projects.", imageUrl: "" },
    { id: 5, title: "Cultural Arts Festival", desc: "Celebrating diverse talents through music, drama, and visual arts performances open to all.", imageUrl: "" },
    { id: 6, title: "Leadership Development Camp", desc: "Intensive programs building confidence, teamwork, and leadership abilities in young participants.", imageUrl: "" },
  ],
  fseds: [
    { id: 1, title: "Entrepreneurship Bootcamp", desc: "Guiding aspiring entrepreneurs through business planning, pitching, and launch strategies in hands-on sessions.", imageUrl: "" },
    { id: 2, title: "Agricultural Market Connect", desc: "Linking farmers directly to buyers and markets for fair prices, better income, and stronger livelihoods.", imageUrl: "" },
    { id: 3, title: "Women's Self-Help Group Formation", desc: "Organizing SHGs to empower women with savings, credit access, and economic independence in their communities.", imageUrl: "" },
    { id: 4, title: "Financial Literacy Camp", desc: "Teaching communities about budgeting, savings, credit management, and responsible financial planning.", imageUrl: "" },
    { id: 5, title: "Vocational Skills Training", desc: "Hands-on training in marketable trades to enhance employability and open new income opportunities.", imageUrl: "" },
    { id: 6, title: "Rural Infrastructure Development", desc: "Building essential community facilities and infrastructure to support sustainable and resilient local growth.", imageUrl: "" },
  ],
  lac: [
    { id: 1, title: "Legal Awareness Camp", desc: "Interactive sessions educating communities about fundamental rights, laws, and their entitlements as citizens.", imageUrl: "" },
    { id: 2, title: "Free Legal Consultation Drive", desc: "Offering free legal advice and guidance to individuals navigating complex personal and civil legal matters.", imageUrl: "" },
    { id: 3, title: "Constitutional Literacy Program", desc: "Teaching constitutional rights and civic duties through engaging discussions, activities, and real-world scenarios.", imageUrl: "" },
    { id: 4, title: "Women's Legal Rights Workshop", desc: "Empowering women with knowledge of domestic laws, property rights, and protection mechanisms available to them.", imageUrl: "" },
    { id: 5, title: "RTI Training Workshop", desc: "Educating citizens on effectively using the Right to Information Act to access public records and hold officials accountable.", imageUrl: "" },
    { id: 6, title: "Street Plays on Legal Awareness", desc: "Using performing arts and street theatre to spread legal literacy in an accessible and engaging way for communities.", imageUrl: "" },
  ],
};

type GroupActivitiesContextType = {
  data: GroupActivitiesData;
  updateGroupActivities: (group: GroupKey, activities: ActivityEntry[]) => void;
  resetToDefaults: () => void;
};

const GroupActivitiesContext = createContext<GroupActivitiesContextType | null>(null);

export function GroupActivitiesProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<GroupActivitiesData>(() => {
    try {
      const saved = localStorage.getItem("pg_group_activities");
      if (saved) return { ...DEFAULT_DATA, ...JSON.parse(saved) };
    } catch {
      /* ignore parse errors */
    }
    return DEFAULT_DATA;
  });

  useEffect(() => {
    try {
      localStorage.setItem("pg_group_activities", JSON.stringify(data));
    } catch {
      /* ignore storage errors */
    }
  }, [data]);

  const updateGroupActivities = (group: GroupKey, activities: ActivityEntry[]) =>
    setData((d) => ({ ...d, [group]: activities }));

  const resetToDefaults = () => {
    localStorage.removeItem("pg_group_activities");
    setData(DEFAULT_DATA);
  };

  return (
    <GroupActivitiesContext.Provider value={{ data, updateGroupActivities, resetToDefaults }}>
      {children}
    </GroupActivitiesContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- context + hook co-location is intentional
export function useGroupActivities() {
  const ctx = useContext(GroupActivitiesContext);
  if (!ctx) throw new Error("useGroupActivities must be used within GroupActivitiesProvider");
  return ctx;
}

