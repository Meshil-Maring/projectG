import { usePageSections } from "../../../context/PageContext";
import CauseCommunities from "../cause/CauseCommunities";

const DEFAULT_COMMUNITIES = {
  heading: "Explore Our Other Communities",
};

export default function WhgCommunities() {
  const { getSectionData } = usePageSections();
  const communities = { ...DEFAULT_COMMUNITIES, ...getSectionData("whg-communities") };

  return (
    <CauseCommunities
      currentSlug="whg"
      currentLabel="Work for Humanity Group"
      heading={communities.heading}
    />
  );
}
