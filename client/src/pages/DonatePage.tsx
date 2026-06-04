import Navbar from "../shared/components/Navbar";
import Footer from "../shared/components/Footer";
import DonateHero from "../components/donate/DonateHero";
import DonateImpact from "../components/donate/DonateImpact";
import DonateFormSection from "../components/donate/DonateFormSection";
import DonateFAQ from "../components/donate/DonateFAQ";

export default function DonatePage() {
  return (
    <>
      <Navbar />
      <DonateHero />
      <DonateImpact />
      <DonateFormSection />
      <DonateFAQ />
      <Footer />
    </>
  );
}
