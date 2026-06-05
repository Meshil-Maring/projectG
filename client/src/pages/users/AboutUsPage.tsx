import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";
import AboutHero from "../../components/user/about-us/AboutHero";
import AboutStory from "../../components/user/about-us/AboutStory";
import AboutSocieties from "../../components/user/about-us/AboutSocieties";
import AboutValues from "../../components/user/about-us/AboutValues";
import AboutTeam from "../../components/user/about-us/AboutTeam";
import AboutStats from "../../components/user/about-us/AboutStats";
import AboutCTA from "../../components/user/about-us/AboutCTA";

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
