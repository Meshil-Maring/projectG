import Navbar from "../shared/components/Navbar";
import Footer from "../shared/components/Footer";
import AboutHero from "../components/about-us/AboutHero";
import AboutStory from "../components/about-us/AboutStory";
import AboutSocieties from "../components/about-us/AboutSocieties";
import AboutValues from "../components/about-us/AboutValues";
import AboutTeam from "../components/about-us/AboutTeam";
import AboutStats from "../components/about-us/AboutStats";
import AboutCTA from "../components/about-us/AboutCTA";

export default function AboutUsPage() {
  return (
    <>
      <Navbar />
      <AboutHero />
      <AboutStory />
      <AboutSocieties />
      <AboutValues />
      <AboutTeam />
      <AboutStats />
      <AboutCTA />
      <Footer />
    </>
  );
}
