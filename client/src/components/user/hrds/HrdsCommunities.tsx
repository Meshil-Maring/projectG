import { usePageSections } from "../../../context/PageContext";
import CauseCommunities from "../cause/CauseCommunities";

const DEFAULT_COMMUNITIES = {
  heading: "Explore Our Other Communities",
};

export default function HrdsCommunities() {
  const { getSectionData } = usePageSections();
  const communities = { ...DEFAULT_COMMUNITIES, ...getSectionData("hrds-communities") };

  return <CauseCommunities currentSlug="hrds" heading={communities.heading} />;
}
