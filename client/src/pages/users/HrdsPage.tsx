import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";
import SectionNavigator from "../../shared/components/SectionNavigator";
import HrdsHero from "../../components/user/hrds/HrdsHero";
import HrdsMission from "../../components/user/hrds/HrdsMission";
import HrdsActivities from "../../components/user/hrds/HrdsActivities";
import HrdsCTA from "../../components/user/hrds/HrdsCTA";
import HrdsStats from "../../components/user/hrds/HrdsStats";
import HrdsCommunities from "../../components/user/hrds/HrdsCommunities";
import { PageProvider } from "../../context/PageContext";

const sections = [
  { id: "hrds-hero", label: "Overview" },
  { id: "hrds-mission", label: "Mission" },
  { id: "hrds-activities", label: "Activities", scrollId: "hrds-activities-gallery" },
  { id: "hrds-cta", label: "Get Involved" },
  { id: "hrds-stats", label: "Stats" },
  { id: "hrds-communities", label: "Communities" },
];

export default function HrdsPage() {
  return (
    <PageProvider slug="hrds">
      <div className="cause-page" style={{ fontFamily: "var(--font-sans)", overflowX: "hidden" }}>
        <Navbar />
        <SectionNavigator sections={sections} />
        <div id="hrds-hero"><HrdsHero /></div>
        <div id="hrds-mission"><HrdsMission /></div>
        <div id="hrds-activities"><HrdsActivities /></div>
        <div id="hrds-cta"><HrdsCTA /></div>
        <div id="hrds-stats"><HrdsStats /></div>
        <div id="hrds-communities"><HrdsCommunities /></div>
        <Footer />
      </div>
    </PageProvider>
  );
}
