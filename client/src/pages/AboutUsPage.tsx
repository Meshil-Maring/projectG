import Navbar from "../shared/components/Navbar";
import Footer from "../shared/components/Footer";
import AboutHero from "../components/about-us/AboutHero";
import AboutStory from "../components/about-us/AboutStory";
import AboutMissionVision from "../components/about-us/AboutMissionVision";
import AboutStats from "../components/about-us/AboutStats";
import AboutValues from "../components/about-us/AboutValues";
import AboutTeam from "../components/about-us/AboutTeam";
import AboutCTA from "../components/about-us/AboutCTA";

export default function AboutUsPage() {
  return (
    <>
      <Navbar />
      <AboutHero />
      <AboutStory />
      <AboutMissionVision />
      <AboutStats />
      <AboutValues />
      <AboutTeam />
      <AboutCTA />
      <Footer />
    </>
  );
}
