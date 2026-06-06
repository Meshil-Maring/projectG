import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";
import SectionNavigator from "../../shared/components/SectionNavigator";
import CwgHero from "../../components/user/cwg/CwgHero";
import CwgMission from "../../components/user/cwg/CwgMission";
import CwgActivities from "../../components/user/cwg/CwgActivities";
import CwgCTA from "../../components/user/cwg/CwgCTA";
import CwgStats from "../../components/user/cwg/CwgStats";
import CwgCommunities from "../../components/user/cwg/CwgCommunities";

const sections = [
  { id: "cwg-hero", label: "Overview" },
  { id: "cwg-mission", label: "Mission" },
  { id: "cwg-activities", label: "Activities" },
  { id: "cwg-cta", label: "Get Involved" },
  { id: "cwg-stats", label: "Stats" },
  { id: "cwg-communities", label: "Communities" },
];

export default function CwgPage() {
  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", overflowX: "hidden" }}>
      <Navbar />
      <SectionNavigator sections={sections} />
      <div id="cwg-hero"><CwgHero /></div>
      <div id="cwg-mission"><CwgMission /></div>
      <div id="cwg-activities"><CwgActivities /></div>
      <div id="cwg-cta"><CwgCTA /></div>
      <div id="cwg-stats"><CwgStats /></div>
      <div id="cwg-communities"><CwgCommunities /></div>
      <Footer />
    </div>
  );
}
