import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";
import ImpactHero from "../../components/user/impact/ImpactHero";
import ImpactNumbers from "../../components/user/impact/ImpactNumbers";
import ImpactAreas from "../../components/user/impact/ImpactAreas";
import ImpactTimeline from "../../components/user/impact/ImpactTimeline";
import ImpactTestimonials from "../../components/user/impact/ImpactTestimonials";
import ImpactCTA from "../../components/user/impact/ImpactCTA";

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
