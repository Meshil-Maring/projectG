import SEO from "../../shared/components/SEO";
import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";
import SectionNavigator from "../../shared/components/SectionNavigator";
import WhgHero from "../../components/user/whg/WhgHero";
import WhgMission from "../../components/user/whg/WhgMission";
import WhgCTA from "../../components/user/whg/WhgCTA";
import WhgStats from "../../components/user/whg/WhgStats";
import WhgCommunities from "../../components/user/whg/WhgCommunities";
import WhgBloodDonation from "../../components/user/whg/WhgBloodDonation";
import { PageProvider } from "../../context/PageContext";
import { GroupActivitiesProvider } from "../../context/GroupActivitiesContext";

const sections = [
  { id: "whg-hero", label: "Overview" },
  { id: "whg-mission", label: "Mission" },
  { id: "whg-blood-donation", label: "Blood Donation" },
  { id: "whg-cta", label: "Get Involved" },
  { id: "whg-stats", label: "Stats" },
  { id: "whg-communities", label: "Communities" },
];

export default function WhgPage() {
  return (
    <GroupActivitiesProvider>
    <PageProvider slug="whg">
      <div className="cause-page" style={{ fontFamily: "var(--font-sans)", overflowX: "hidden" }}>
        <SEO
          title="Work for Humanity Group (WHG)"
          description="The Work for Humanity Group focuses on women's health, blood donation drives, and community welfare initiatives across Manipur. Discover our programs."
        />
        <Navbar />
        <SectionNavigator sections={sections} />
        <div id="whg-hero"><WhgHero /></div>
        <div id="whg-mission"><WhgMission /></div>
        <div id="whg-blood-donation"><WhgBloodDonation /></div>
        <div id="whg-cta"><WhgCTA /></div>
        <div id="whg-stats"><WhgStats /></div>
        <div id="whg-communities"><WhgCommunities /></div>
        <Footer />
      </div>
    </PageProvider>
    </GroupActivitiesProvider>
  );
}
