import { useEffect, useState } from "react";
import { fetchCwgGroups, type GalleryGroup } from "../../../lib/api";
import { GroupImageGallery } from "../shared/GroupImageGallery";

const PRIMARY = "#0f766e";
const LIGHT_BG = "#e8f7f6";

export default function CwgGallery() {
  const [groups, setGroups] = useState<GalleryGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCwgGroups()
      .then(setGroups)
      .catch(() => setGroups([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <GroupImageGallery
      primaryColor={PRIMARY}
      lightBg={LIGHT_BG}
      sectionBg="#f0fdfa"
      eyebrow="Events & Competitions"
      title="CWG Photo Gallery"
      description="Browse photos from Competitive World Group events, competitions, skill-development programs, and team activities."
      groups={groups}
      loading={loading}
    />
  );
}
