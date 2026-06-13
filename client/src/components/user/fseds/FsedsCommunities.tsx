import { usePageSections } from "../../../context/PageContext";
import CauseCommunities from "../cause/CauseCommunities";

const DEFAULT_COMMUNITIES = {
  heading: "Explore Our Other Communities",
};

export default function FsedsCommunities() {
  const { getSectionData } = usePageSections();
  const communities = { ...DEFAULT_COMMUNITIES, ...getSectionData("fseds-communities") };

  return <CauseCommunities currentSlug="fseds" heading={communities.heading} />;
}
