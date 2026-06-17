import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";
import SectionNavigator from "../../shared/components/SectionNavigator";
import CwgHero from "../../components/user/cwg/CwgHero";
import CwgMission from "../../components/user/cwg/CwgMission";
import CwgCTA from "../../components/user/cwg/CwgCTA";
import CwgStats from "../../components/user/cwg/CwgStats";
import CwgCommunities from "../../components/user/cwg/CwgCommunities";
import CwgGallery from "../../components/user/cwg/CwgGallery";
import { PageProvider } from "../../context/PageContext";

const sections = [
  { id: "cwg-hero", label: "Overview" },
  { id: "cwg-mission", label: "Mission" },
  { id: "cwg-gallery", label: "Gallery" },
  { id: "cwg-cta", label: "Get Involved" },
  { id: "cwg-stats", label: "Stats" },
  { id: "cwg-communities", label: "Communities" },
];

export default function CwgPage() {
  return (
    <PageProvider slug="cwg">
      <div className="cause-page" style={{ fontFamily: "var(--font-sans)", overflowX: "hidden" }}>
        <Navbar />
        <SectionNavigator sections={sections} />
        <div id="cwg-hero"><CwgHero /></div>
        <div id="cwg-mission"><CwgMission /></div>
        <div id="cwg-gallery"><CwgGallery /></div>
        <div id="cwg-cta"><CwgCTA /></div>
        <div id="cwg-stats"><CwgStats /></div>
        <div id="cwg-communities"><CwgCommunities /></div>
        <Footer />
      </div>
    </PageProvider>
  );
}
