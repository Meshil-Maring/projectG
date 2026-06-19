import SEO from "../../shared/components/SEO";
import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";
import SectionNavigator from "../../shared/components/SectionNavigator";
import HrdsHero from "../../components/user/hrds/HrdsHero";
import HrdsMission from "../../components/user/hrds/HrdsMission";
import HrdsCTA from "../../components/user/hrds/HrdsCTA";
import HrdsStats from "../../components/user/hrds/HrdsStats";
import HrdsCommunities from "../../components/user/hrds/HrdsCommunities";
import HrdsGallery from "../../components/user/hrds/HrdsGallery";
import { PageProvider } from "../../context/PageContext";
import { GroupActivitiesProvider } from "../../context/GroupActivitiesContext";

const sections = [
  { id: "hrds-hero", label: "Overview" },
  { id: "hrds-mission", label: "Mission" },
  { id: "hrds-gallery", label: "Gallery" },
  { id: "hrds-cta", label: "Get Involved" },
  { id: "hrds-stats", label: "Stats" },
  { id: "hrds-communities", label: "Communities" },
];

export default function HrdsPage() {
  return (
    <GroupActivitiesProvider>
    <PageProvider slug="hrds">
      <div className="cause-page" style={{ fontFamily: "var(--font-sans)", overflowX: "hidden" }}>
        <SEO
          title="HR Development Society (HRDS)"
          description="The HR Development Society advocates for the rights and dignity of marginalized communities in Manipur through education, awareness, and outreach programs."
        />
        <Navbar />
        <SectionNavigator sections={sections} />
        <div id="hrds-hero"><HrdsHero /></div>
        <div id="hrds-mission"><HrdsMission /></div>
        <div id="hrds-gallery"><HrdsGallery /></div>
        <div id="hrds-cta"><HrdsCTA /></div>
        <div id="hrds-stats"><HrdsStats /></div>
        <div id="hrds-communities"><HrdsCommunities /></div>
        <Footer />
      </div>
    </PageProvider>
    </GroupActivitiesProvider>
  );
}
