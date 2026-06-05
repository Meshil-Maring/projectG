import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";
import HrdsHero from "../../components/user/hrds/HrdsHero";
import HrdsMission from "../../components/user/hrds/HrdsMission";
import HrdsActivities from "../../components/user/hrds/HrdsActivities";
import HrdsCTA from "../../components/user/hrds/HrdsCTA";
import HrdsStats from "../../components/user/hrds/HrdsStats";
import HrdsCommunities from "../../components/user/hrds/HrdsCommunities";

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
