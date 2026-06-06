import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";
import SectionNavigator from "../../shared/components/SectionNavigator";
import DonateHero from "../../components/user/donate/DonateHero";
import DonateImpact from "../../components/user/donate/DonateImpact";
import DonateFormSection from "../../components/user/donate/DonateFormSection";
import DonateFAQ from "../../components/user/donate/DonateFAQ";

const sections = [
  { id: "donate-hero", label: "Overview" },
  { id: "donate-impact", label: "Our Impact" },
  { id: "donate-form", label: "Donate Now" },
  { id: "donate-faq", label: "FAQ" },
];

export default function DonatePage() {
  return (
    <>
      <Navbar />
      <SectionNavigator sections={sections} />
      <div id="donate-hero"><DonateHero /></div>
      <div id="donate-impact"><DonateImpact /></div>
      <div id="donate-form"><DonateFormSection /></div>
      <div id="donate-faq"><DonateFAQ /></div>
      <Footer />
    </>
  );
}
