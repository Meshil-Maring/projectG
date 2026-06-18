import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { api, syncList } from "../lib/api";

export type BoardMember = {
  id: number;
  name: string;
  role: string;
  badge: string;
  color: string;
  image?: string;
  description?: string;
};

export type TeamMember = {
  id: number;
  name: string;
  role: string;
  color: string;
  image?: string;
  description?: string;
};

export type TeamData = {
  board: BoardMember[];
  members: TeamMember[];
};

const EMPTY_DATA: TeamData = { board: [], members: [] };

type TeamContextType = {
  data: TeamData;
  loading: boolean;
  updateBoard: (board: BoardMember[]) => void;
  updateMembers: (members: TeamMember[]) => void;
};

const TeamContext = createContext<TeamContextType | null>(null);

export function TeamProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<TeamData>(EMPTY_DATA);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      api.get<BoardMember[]>("/content/team/board"),
      api.get<TeamMember[]>("/content/team/members"),
    ])
      .then(([board, members]) => {
        if (cancelled) return;
        setData({ board, members });
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const updateBoard = (board: BoardMember[]) => {
    const prev = data.board;
    setData((d) => ({ ...d, board }));
    void syncList("/content/team/board", prev, board).then((result) =>
      setData((d) => ({ ...d, board: result })),
    );
  };

  const updateMembers = (members: TeamMember[]) => {
    const prev = data.members;
    setData((d) => ({ ...d, members }));
    void syncList("/content/team/members", prev, members).then((result) =>
      setData((d) => ({ ...d, members: result })),
    );
  };

  return (
    <TeamContext.Provider value={{ data, loading, updateBoard, updateMembers }}>
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
