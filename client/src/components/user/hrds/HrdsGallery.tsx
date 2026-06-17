import { useEffect, useState } from "react";
import { fetchHrdsGroups, type GalleryGroup } from "../../../lib/api";
import { GroupImageGallery } from "../shared/GroupImageGallery";

const PRIMARY = "#15803d";
const LIGHT_BG = "#edf7f1";

export default function HrdsGallery() {
  const [groups, setGroups] = useState<GalleryGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHrdsGroups()
      .then(setGroups)
      .catch(() => setGroups([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <GroupImageGallery
      primaryColor={PRIMARY}
      lightBg={LIGHT_BG}
      sectionBg="#f0fdf4"
      eyebrow="Events & Programs"
      title="HRDS Photo Gallery"
      description="Browse photos from Human Resources Developmental Society events, training programs, and community development initiatives."
      groups={groups}
      loading={loading}
    />
  );
}
