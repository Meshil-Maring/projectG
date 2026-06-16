import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { api, syncList } from "../lib/api";

export type ActivityEntry = {
  id: number;
  title: string;
  desc: string;
  imageUrl: string;
};

export type GroupKey = "whg" | "hrds" | "cwg" | "fseds" | "lac" | "whg-blood-donation";

export type GroupActivitiesData = Record<GroupKey, ActivityEntry[]>;

type ActivityRecord = ActivityEntry & { group: GroupKey };

const GROUPS: GroupKey[] = ["whg", "hrds", "cwg", "fseds", "lac", "whg-blood-donation"];

const EMPTY_DATA: GroupActivitiesData = {
  whg: [],
  hrds: [],
  cwg: [],
  fseds: [],
  lac: [],
  "whg-blood-donation": [],
};

type GroupActivitiesContextType = {
  data: GroupActivitiesData;
  loading: boolean;
  updateGroupActivities: (group: GroupKey, activities: ActivityEntry[]) => void;
};

const GroupActivitiesContext = createContext<GroupActivitiesContextType | null>(null);

export function GroupActivitiesProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<GroupActivitiesData>(EMPTY_DATA);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    Promise.all(
      GROUPS.map((g) => api.get<ActivityRecord[]>(`/content/activities?group=${g}`)),
    )
      .then((results) => {
        if (cancelled) return;
        const next: GroupActivitiesData = { ...EMPTY_DATA };
        GROUPS.forEach((g, i) => {
          next[g] = results[i].map(({ id, title, desc, imageUrl }) => ({ id, title, desc, imageUrl }));
        });
        setData(next);
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const updateGroupActivities = (group: GroupKey, activities: ActivityEntry[]) => {
    const prev = data[group];
    setData((d) => ({ ...d, [group]: activities }));

    const prevWithGroup: ActivityRecord[] = prev.map((a) => ({ ...a, group }));
    const nextWithGroup: ActivityRecord[] = activities.map((a) => ({ ...a, group }));

    void syncList<ActivityRecord>(`/content/activities`, prevWithGroup, nextWithGroup).then((result) => {
      setData((d) => ({
        ...d,
        [group]: result.map(({ id, title, desc, imageUrl }) => ({ id, title, desc, imageUrl })),
      }));
    });
  };

  return (
    <GroupActivitiesContext.Provider value={{ data, loading, updateGroupActivities }}>
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
