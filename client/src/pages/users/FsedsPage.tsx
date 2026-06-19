import SEO from "../../shared/components/SEO";
import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";
import SectionNavigator from "../../shared/components/SectionNavigator";
import FsedsHero from "../../components/user/fseds/FsedsHero";
import FsedsMission from "../../components/user/fseds/FsedsMission";
import FsedsCTA from "../../components/user/fseds/FsedsCTA";
import FsedsStats from "../../components/user/fseds/FsedsStats";
import FsedsCommunities from "../../components/user/fseds/FsedsCommunities";
import FsedsGallery from "../../components/user/fseds/FsedsGallery";
import { PageProvider } from "../../context/PageContext";
import { GroupActivitiesProvider } from "../../context/GroupActivitiesContext";

const sections = [
  { id: "fseds-hero", label: "Overview" },
  { id: "fseds-mission", label: "Mission" },
  { id: "fseds-gallery", label: "Gallery" },
  { id: "fseds-cta", label: "Get Involved" },
  { id: "fseds-stats", label: "Stats" },
  { id: "fseds-communities", label: "Communities" },
];

export default function FsedsPage() {
  return (
    <GroupActivitiesProvider>
    <PageProvider slug="fseds">
      <div className="cause-page" style={{ fontFamily: "var(--font-sans)", overflowX: "hidden" }}>
        <SEO
          title="Foundation for Socio-Economic Development (FSEDS)"
          description="FSEDS works to lift communities in Manipur out of poverty through education, skill development, and economic empowerment programs."
        />
        <Navbar />
        <SectionNavigator sections={sections} />
        <div id="fseds-hero"><FsedsHero /></div>
        <div id="fseds-mission"><FsedsMission /></div>
        <div id="fseds-gallery"><FsedsGallery /></div>
        <div id="fseds-cta"><FsedsCTA /></div>
        <div id="fseds-stats"><FsedsStats /></div>
        <div id="fseds-communities"><FsedsCommunities /></div>
        <Footer />
      </div>
    </PageProvider>
    </GroupActivitiesProvider>
  );
}
