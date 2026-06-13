import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";
import SectionNavigator from "../../shared/components/SectionNavigator";
import LacHero from "../../components/user/lac/LacHero";
import LacWhatWeDo from "../../components/user/lac/LacWhatWeDo";
import LacLegalAwarenessCamps from "../../components/user/lac/LacLegalAwarenessCamps";
import LacActivities from "../../components/user/lac/LacActivities";
import LacImpact from "../../components/user/lac/LacImpact";
import LacContact from "../../components/user/lac/LacContact";
import LacCTA from "../../components/user/lac/LacCTA";
import LacCommunities from "../../components/user/lac/LacCommunities";
import { PageProvider } from "../../context/PageContext";

const sections = [
  { id: "lac-hero", label: "Overview" },
  { id: "lac-what-we-do", label: "What We Do" },
  { id: "lac-camps", label: "Legal Camps" },
  { id: "lac-activities", label: "Activities" },
  { id: "lac-impact", label: "Impact" },
  { id: "lac-contact", label: "Contact" },
  { id: "lac-cta", label: "Get Involved" },
  { id: "lac-communities", label: "Communities" },
];

export default function LacPage() {
  return (
    <PageProvider slug="lac">
      <div className="cause-page" style={{ fontFamily: "var(--font-sans)", overflowX: "hidden" }}>
        <Navbar />
        <SectionNavigator sections={sections} />
        <div id="lac-hero"><LacHero /></div>
        <div id="lac-what-we-do"><LacWhatWeDo /></div>
        <div id="lac-camps"><LacLegalAwarenessCamps /></div>
        <div id="lac-activities"><LacActivities /></div>
        <div id="lac-impact"><LacImpact /></div>
        <div id="lac-contact"><LacContact /></div>
        <div id="lac-cta"><LacCTA /></div>
        <div id="lac-communities"><LacCommunities /></div>
        <Footer />
      </div>
    </PageProvider>
  );
}
