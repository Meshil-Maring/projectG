import SEO from "../../shared/components/SEO";
import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";
import SectionNavigator from "../../shared/components/SectionNavigator";
import AboutHero from "../../components/user/about-us/AboutHero";
import AboutStory from "../../components/user/about-us/AboutStory";
import AboutMissionVision from "../../components/user/about-us/AboutMissionVision";
import AboutObjectives from "../../components/user/about-us/AboutObjectives";
import AboutSocieties from "../../components/user/about-us/AboutSocieties";
import AboutValues from "../../components/user/about-us/AboutValues";
import AboutTeam from "../../components/user/about-us/AboutTeam";
import AboutStats from "../../components/user/about-us/AboutStats";
import AboutCTA from "../../components/user/about-us/AboutCTA";
import { PageProvider } from "../../context/PageContext";

const sections = [
  { id: "about-hero", label: "Overview" },
  { id: "about-story", label: "Our Story" },
  { id: "about-mission-vision", label: "Mission & Vision" },
  { id: "about-objectives", label: "Objectives" },
  { id: "about-societies", label: "Societies" },
  { id: "about-values", label: "Values" },
  { id: "about-team", label: "Our Team" },
  { id: "about-stats", label: "Impact Stats" },
];

export default function AboutUsPage() {
  return (
    <PageProvider slug="about-us">
      <SEO
        title="About Us"
        description="Learn about Project G Manipur's mission, vision, and the dedicated team working to uplift communities across Manipur through education, health, and rights advocacy."
      />
      <Navbar />
      <SectionNavigator sections={sections} />
      <div id="about-hero"><AboutHero /></div>
      <div id="about-story"><AboutStory /></div>
      <div id="about-mission-vision"><AboutMissionVision /></div>
      <div id="about-objectives"><AboutObjectives /></div>
      <div id="about-societies"><AboutSocieties /></div>
      <div id="about-values"><AboutValues /></div>
      <div id="about-team"><AboutTeam /></div>
      <div id="about-stats"><AboutStats /></div>
      <AboutCTA />
      <Footer />
    </PageProvider>
  );
}
