import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";
import FsedsHero from "../../components/user/fseds/FsedsHero";
import FsedsMission from "../../components/user/fseds/FsedsMission";
import FsedsActivities from "../../components/user/fseds/FsedsActivities";
import FsedsCTA from "../../components/user/fseds/FsedsCTA";
import FsedsStats from "../../components/user/fseds/FsedsStats";
import FsedsCommunities from "../../components/user/fseds/FsedsCommunities";

export default function FsedsPage() {
  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", overflowX: "hidden" }}>
      <Navbar />
      <FsedsHero />
      <FsedsMission />
      <FsedsActivities />
      <FsedsCTA />
      <FsedsStats />
      <FsedsCommunities />
      <Footer />
    </div>
  );
}
