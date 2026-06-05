import Navbar from "../shared/components/Navbar";
import Footer from "../shared/components/Footer";
import HrdsHero from "../components/hrds/HrdsHero";
import HrdsMission from "../components/hrds/HrdsMission";
import HrdsActivities from "../components/hrds/HrdsActivities";
import HrdsCTA from "../components/hrds/HrdsCTA";
import HrdsStats from "../components/hrds/HrdsStats";
import HrdsCommunities from "../components/hrds/HrdsCommunities";

export default function HrdsPage() {
  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", overflowX: "hidden" }}>
      <Navbar />
      <HrdsHero />
      <HrdsMission />
      <HrdsActivities />
      <HrdsCTA />
      <HrdsStats />
      <HrdsCommunities />
      <Footer />
    </div>
  );
}
