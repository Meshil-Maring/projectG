import { useEffect, useState } from "react";
import { fetchLacGroups, type GalleryGroup } from "../../../lib/api";
import { GroupImageGallery } from "../shared/GroupImageGallery";

const PRIMARY = "#1a3270";
const LIGHT_BG = "#e8edf8";

export default function LacGallery() {
  const [groups, setGroups] = useState<GalleryGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLacGroups()
      .then(setGroups)
      .catch(() => setGroups([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <GroupImageGallery
      primaryColor={PRIMARY}
      lightBg={LIGHT_BG}
      sectionBg="#f0f4ff"
      eyebrow="Events & Programs"
      title="LAC Photo Gallery"
      description="Browse photos from Legal Aid Club events, legal awareness camps, workshops, and community outreach programs."
      groups={groups}
      loading={loading}
    />
  );
}
