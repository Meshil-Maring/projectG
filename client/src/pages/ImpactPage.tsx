import Navbar from "../shared/components/Navbar";
import Footer from "../shared/components/Footer";
import ImpactHero from "../components/impact/ImpactHero";
import ImpactNumbers from "../components/impact/ImpactNumbers";
import ImpactAreas from "../components/impact/ImpactAreas";
import ImpactTimeline from "../components/impact/ImpactTimeline";
import ImpactTestimonials from "../components/impact/ImpactTestimonials";
import ImpactCTA from "../components/impact/ImpactCTA";

export default function ImpactPage() {
  return (
    <>
      <Navbar />
      <ImpactHero />
      <ImpactNumbers />
      <ImpactAreas />
      <ImpactTimeline />
      <ImpactTestimonials />
      <ImpactCTA />
      <Footer />
    </>
  );
}
