import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";
import SectionNavigator from "../../shared/components/SectionNavigator";
import ImpactHero from "../../components/user/impact/ImpactHero";
import ImpactNumbers from "../../components/user/impact/ImpactNumbers";
import ImpactAreas from "../../components/user/impact/ImpactAreas";
import ImpactTimeline from "../../components/user/impact/ImpactTimeline";
import ImpactTestimonials from "../../components/user/impact/ImpactTestimonials";
import ImpactCTA from "../../components/user/impact/ImpactCTA";
import { PageProvider } from "../../context/PageContext";

const sections = [
  { id: "impact-hero", label: "Overview" },
  { id: "impact-numbers", label: "Numbers" },
  { id: "impact-areas", label: "Focus Areas" },
  { id: "impact-timeline", label: "Timeline" },
  { id: "impact-testimonials", label: "Testimonials" },
  { id: "impact-cta", label: "Get Involved" },
];

export default function ImpactPage() {
  return (
    <PageProvider slug="impact">
      <Navbar />
      <SectionNavigator sections={sections} />
      <div id="impact-hero"><ImpactHero /></div>
      <div id="impact-numbers"><ImpactNumbers /></div>
      <div id="impact-areas"><ImpactAreas /></div>
      <div id="impact-timeline"><ImpactTimeline /></div>
      <div id="impact-testimonials"><ImpactTestimonials /></div>
      <div id="impact-cta"><ImpactCTA /></div>
      <Footer />
    </PageProvider>
  );
}
