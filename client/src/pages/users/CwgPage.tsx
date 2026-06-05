import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";
import CwgHero from "../../components/user/cwg/CwgHero";
import CwgMission from "../../components/user/cwg/CwgMission";
import CwgActivities from "../../components/user/cwg/CwgActivities";
import CwgCTA from "../../components/user/cwg/CwgCTA";
import CwgStats from "../../components/user/cwg/CwgStats";
import CwgCommunities from "../../components/user/cwg/CwgCommunities";

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
