import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";
import SectionNavigator from "../../shared/components/SectionNavigator";
import WhgHero from "../../components/user/whg/WhgHero";
import WhgMission from "../../components/user/whg/WhgMission";
import WhgActivities from "../../components/user/whg/WhgActivities";
import WhgCTA from "../../components/user/whg/WhgCTA";
import WhgStats from "../../components/user/whg/WhgStats";
import WhgCommunities from "../../components/user/whg/WhgCommunities";
import { PageProvider } from "../../context/PageContext";

const sections = [
  { id: "whg-hero", label: "Overview" },
  { id: "whg-mission", label: "Mission" },
  { id: "whg-activities", label: "Activities" },
  { id: "whg-cta", label: "Get Involved" },
  { id: "whg-stats", label: "Stats" },
  { id: "whg-communities", label: "Communities" },
];

export default function WhgPage() {
  return (
    <PageProvider slug="whg">
      <div style={{ fontFamily: "'Poppins', sans-serif", overflowX: "hidden" }}>
        <Navbar />
        <SectionNavigator sections={sections} />
        <div id="whg-hero"><WhgHero /></div>
        <div id="whg-mission"><WhgMission /></div>
        <div id="whg-activities"><WhgActivities /></div>
        <div id="whg-cta"><WhgCTA /></div>
        <div id="whg-stats"><WhgStats /></div>
        <div id="whg-communities"><WhgCommunities /></div>
        <Footer />
      </div>
    </PageProvider>
  );
}
