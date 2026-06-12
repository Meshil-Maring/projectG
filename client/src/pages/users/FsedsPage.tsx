import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";
import SectionNavigator from "../../shared/components/SectionNavigator";
import FsedsHero from "../../components/user/fseds/FsedsHero";
import FsedsMission from "../../components/user/fseds/FsedsMission";
import FsedsActivities from "../../components/user/fseds/FsedsActivities";
import FsedsCTA from "../../components/user/fseds/FsedsCTA";
import FsedsStats from "../../components/user/fseds/FsedsStats";
import FsedsCommunities from "../../components/user/fseds/FsedsCommunities";
import { PageProvider } from "../../context/PageContext";

const sections = [
  { id: "fseds-hero", label: "Overview" },
  { id: "fseds-mission", label: "Mission" },
  { id: "fseds-activities", label: "Activities" },
  { id: "fseds-cta", label: "Get Involved" },
  { id: "fseds-stats", label: "Stats" },
  { id: "fseds-communities", label: "Communities" },
];

export default function FsedsPage() {
  return (
    <PageProvider slug="fseds">
      <div style={{ fontFamily: "'Poppins', sans-serif", overflowX: "hidden" }}>
        <Navbar />
        <SectionNavigator sections={sections} />
        <div id="fseds-hero"><FsedsHero /></div>
        <div id="fseds-mission"><FsedsMission /></div>
        <div id="fseds-activities"><FsedsActivities /></div>
        <div id="fseds-cta"><FsedsCTA /></div>
        <div id="fseds-stats"><FsedsStats /></div>
        <div id="fseds-communities"><FsedsCommunities /></div>
        <Footer />
      </div>
    </PageProvider>
  );
}
