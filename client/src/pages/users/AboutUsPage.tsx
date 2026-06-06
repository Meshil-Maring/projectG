import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";
import SectionNavigator from "../../shared/components/SectionNavigator";
import AboutHero from "../../components/user/about-us/AboutHero";
import AboutStory from "../../components/user/about-us/AboutStory";
import AboutObjectives from "../../components/user/about-us/AboutObjectives";
import AboutSocieties from "../../components/user/about-us/AboutSocieties";
import AboutValues from "../../components/user/about-us/AboutValues";
import AboutTeam from "../../components/user/about-us/AboutTeam";
import AboutStats from "../../components/user/about-us/AboutStats";

const sections = [
  { id: "about-hero", label: "Overview" },
  { id: "about-story", label: "Our Story" },
  { id: "about-objectives", label: "Objectives" },
  { id: "about-societies", label: "Societies" },
  { id: "about-values", label: "Values" },
  { id: "about-team", label: "Our Team" },
  { id: "about-stats", label: "Impact Stats" },
];

export default function AboutUsPage() {
  return (
    <>
      <Navbar />
      <SectionNavigator sections={sections} />
      <div id="about-hero"><AboutHero /></div>
      <div id="about-story"><AboutStory /></div>
      <div id="about-objectives"><AboutObjectives /></div>
      <div id="about-societies"><AboutSocieties /></div>
      <div id="about-values"><AboutValues /></div>
      <div id="about-team"><AboutTeam /></div>
      <div id="about-stats"><AboutStats /></div>
      <Footer />
    </>
  );
}
