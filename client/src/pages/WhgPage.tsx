import Navbar from "../shared/components/Navbar";
import Footer from "../shared/components/Footer";
import WhgHero from "../components/whg/WhgHero";
import WhgMission from "../components/whg/WhgMission";
import WhgActivities from "../components/whg/WhgActivities";
import WhgCTA from "../components/whg/WhgCTA";
import WhgStats from "../components/whg/WhgStats";
import WhgCommunities from "../components/whg/WhgCommunities";

export default function WhgPage() {
  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", overflowX: "hidden" }}>
      <Navbar />
      <WhgHero />
      <WhgMission />
      <WhgActivities />
      <WhgCTA />
      <WhgStats />
      <WhgCommunities />
      <Footer />
    </div>
  );
}
