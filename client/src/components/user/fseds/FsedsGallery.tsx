import { useEffect, useState } from "react";
import { fetchFsedsGroups, type GalleryGroup } from "../../../lib/api";
import { GroupImageGallery } from "../shared/GroupImageGallery";

const PRIMARY = "#6d28d9";
const LIGHT_BG = "#f3f0ff";

export default function FsedsGallery() {
  const [groups, setGroups] = useState<GalleryGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFsedsGroups()
      .then(setGroups)
      .catch(() => setGroups([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <GroupImageGallery
      primaryColor={PRIMARY}
      lightBg={LIGHT_BG}
      sectionBg="#faf5ff"
      eyebrow="Events & Programs"
      title="FSEDS Photo Gallery"
      description="Browse photos from Foundation for Socio-Economic Development Society events, community programs, and development initiatives."
      groups={groups}
      loading={loading}
    />
  );
}
