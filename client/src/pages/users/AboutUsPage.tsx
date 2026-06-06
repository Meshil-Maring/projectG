import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";
import AboutHero from "../../components/user/about-us/AboutHero";
import AboutStory from "../../components/user/about-us/AboutStory";
import AboutObjectives from "../../components/user/about-us/AboutObjectives";
import AboutSocieties from "../../components/user/about-us/AboutSocieties";
import AboutValues from "../../components/user/about-us/AboutValues";
import AboutTeam from "../../components/user/about-us/AboutTeam";
import AboutStats from "../../components/user/about-us/AboutStats";

export default function AboutUsPage() {
  return (
    <>
      <Navbar />
      <AboutHero />
      <AboutStory />
      <AboutObjectives />
      <AboutSocieties />
      <AboutValues />
      <AboutTeam />
      <AboutStats />
      <Footer />
    </>
  );
}
