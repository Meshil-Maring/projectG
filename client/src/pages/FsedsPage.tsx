import Navbar from "../shared/components/Navbar";
import Footer from "../shared/components/Footer";
import FsedsHero from "../components/fseds/FsedsHero";
import FsedsMission from "../components/fseds/FsedsMission";
import FsedsActivities from "../components/fseds/FsedsActivities";
import FsedsCTA from "../components/fseds/FsedsCTA";
import FsedsStats from "../components/fseds/FsedsStats";
import FsedsCommunities from "../components/fseds/FsedsCommunities";

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
