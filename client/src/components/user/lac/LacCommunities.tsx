import { usePageSections } from "../../../context/PageContext";
import CauseCommunities from "../cause/CauseCommunities";

const DEFAULT_COMMUNITIES = {
  heading: "Explore Our Other Communities",
};

export default function LacCommunities() {
  const { getSectionData } = usePageSections();
  const communities = { ...DEFAULT_COMMUNITIES, ...getSectionData("lac-communities") };

  return (
    <CauseCommunities
      currentSlug="lac"
      currentLabel="Legal Aid Club"
      heading={communities.heading}
    />
  );
}
