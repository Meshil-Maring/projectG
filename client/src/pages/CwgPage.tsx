import Navbar from "../shared/components/Navbar";
import Footer from "../shared/components/Footer";
import CwgHero from "../components/cwg/CwgHero";
import CwgMission from "../components/cwg/CwgMission";
import CwgActivities from "../components/cwg/CwgActivities";
import CwgCTA from "../components/cwg/CwgCTA";
import CwgStats from "../components/cwg/CwgStats";
import CwgCommunities from "../components/cwg/CwgCommunities";

export default function CwgPage() {
  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", overflowX: "hidden" }}>
      <Navbar />
      <CwgHero />
      <CwgMission />
      <CwgActivities />
      <CwgCTA />
      <CwgStats />
      <CwgCommunities />
      <Footer />
    </div>
  );
}
