import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";
import DonateHero from "../../components/user/donate/DonateHero";
import DonateImpact from "../../components/user/donate/DonateImpact";
import DonateFormSection from "../../components/user/donate/DonateFormSection";
import DonateFAQ from "../../components/user/donate/DonateFAQ";

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
