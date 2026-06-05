import Navbar from "../shared/components/Navbar";
import Footer from "../shared/components/Footer";
import LacHero from "../components/lac/LacHero";
import LacWhatWeDo from "../components/lac/LacWhatWeDo";
import LacImpact from "../components/lac/LacImpact";
import LacContact from "../components/lac/LacContact";
import LacCTA from "../components/lac/LacCTA";
import LacCommunities from "../components/lac/LacCommunities";

export default function LacPage() {
  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", overflowX: "hidden" }}>
      <Navbar />
      <LacHero />
      <LacWhatWeDo />
      <LacImpact />
      <LacContact />
      <LacCTA />
      <LacCommunities />
      <Footer />
    </div>
  );
}
