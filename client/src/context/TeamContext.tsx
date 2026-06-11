import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type BoardMember = {
  id: number;
  name: string;
  role: string;
  badge: string;
  color: string;
};

export type TeamMember = {
  id: number;
  name: string;
  role: string;
  color: string;
};

export type TeamData = {
  board: BoardMember[];
  members: TeamMember[];
};

const DEFAULT_TEAM: TeamData = {
  board: [
    { id: 1, name: "Justice R.S. Sharma (Retd.)", role: "Chairman",        badge: "Chairman",  color: "#1a3270" },
    { id: 2, name: "Dr. Meena Pillai",            role: "Vice Chairperson", badge: "Vice Chair", color: "#2563eb" },
    { id: 3, name: "Adv. Suresh Rajan",           role: "Secretary General", badge: "Secretary", color: "#1a3270" },
  ],
  members: [
    { id: 1,  name: "Anita Verma",   role: "Founder & Director",   color: "#4a90d9" },
    { id: 2,  name: "Rahul Mehta",   role: "Programs Manager",      color: "#2ecc71" },
    { id: 3,  name: "Sneha Kapoor",  role: "Education Lead",        color: "#e74c3c" },
    { id: 4,  name: "Vikram Singh",  role: "Community Outreach",    color: "#9b59b6" },
    { id: 5,  name: "Priya Nair",    role: "Volunteer Coordinator", color: "#f39c12" },
    { id: 6,  name: "Arjun Das",     role: "Finance & Operations",  color: "#1a3270" },
    { id: 7,  name: "Kavitha Rao",   role: "Legal Advisor",         color: "#0891b2" },
    { id: 8,  name: "Deepak Joshi",  role: "Field Coordinator",     color: "#059669" },
    { id: 9,  name: "Nisha Thomas",  role: "Communications Head",   color: "#7c3aed" },
    { id: 10, name: "Sanjay Gupta",  role: "Research Analyst",      color: "#d97706" },
  ],
};

type TeamContextType = {
  data: TeamData;
  updateBoard: (board: BoardMember[]) => void;
  updateMembers: (members: TeamMember[]) => void;
};

const TeamContext = createContext<TeamContextType | null>(null);

export function TeamProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<TeamData>(() => {
    try {
      const saved = localStorage.getItem("pg_team_data");
      if (saved) return { ...DEFAULT_TEAM, ...JSON.parse(saved) };
    } catch {
      /* ignore parse errors */
    }
    return DEFAULT_TEAM;
  });

  useEffect(() => {
    try {
      localStorage.setItem("pg_team_data", JSON.stringify(data));
    } catch {
      /* ignore storage errors */
    }
  }, [data]);

  const updateBoard   = (board: BoardMember[])   => setData((d) => ({ ...d, board }));
  const updateMembers = (members: TeamMember[]) => setData((d) => ({ ...d, members }));

  return (
    <TeamContext.Provider value={{ data, updateBoard, updateMembers }}>
      {children}
    </TeamContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- context + hook co-location is intentional
export function useTeamData() {
  const ctx = useContext(TeamContext);
  if (!ctx) throw new Error("useTeamData must be used within TeamProvider");
  return ctx;
}

