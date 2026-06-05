import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";
import LacHero from "../../components/user/lac/LacHero";
import LacWhatWeDo from "../../components/user/lac/LacWhatWeDo";
import LacImpact from "../../components/user/lac/LacImpact";
import LacContact from "../../components/user/lac/LacContact";
import LacCTA from "../../components/user/lac/LacCTA";
import LacCommunities from "../../components/user/lac/LacCommunities";

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
