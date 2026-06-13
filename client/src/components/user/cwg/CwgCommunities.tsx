import { usePageSections } from "../../../context/PageContext";
import CauseCommunities from "../cause/CauseCommunities";

const DEFAULT_COMMUNITIES = {
  heading: "Explore Our Other Communities",
};

export default function CwgCommunities() {
  const { getSectionData } = usePageSections();
  const communities = { ...DEFAULT_COMMUNITIES, ...getSectionData("cwg-communities") };

  return <CauseCommunities currentSlug="cwg" heading={communities.heading} />;
}
