import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";
import WhgHero from "../../components/user/whg/WhgHero";
import WhgMission from "../../components/user/whg/WhgMission";
import WhgActivities from "../../components/user/whg/WhgActivities";
import WhgCTA from "../../components/user/whg/WhgCTA";
import WhgStats from "../../components/user/whg/WhgStats";
import WhgCommunities from "../../components/user/whg/WhgCommunities";

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
