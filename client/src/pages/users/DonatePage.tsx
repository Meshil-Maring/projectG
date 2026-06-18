import SEO from "../../shared/components/SEO";
import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";
import SectionNavigator from "../../shared/components/SectionNavigator";
import DonateHero from "../../components/user/donate/DonateHero";
import DonateImpact from "../../components/user/donate/DonateImpact";
import DonateFormSection from "../../components/user/donate/DonateFormSection";
import DonateFAQ from "../../components/user/donate/DonateFAQ";
import { PageProvider } from "../../context/PageContext";

const sections = [
  { id: "donate-hero", label: "Overview" },
  { id: "donate-impact", label: "Our Impact" },
  { id: "donate-form", label: "Donate Now" },
  { id: "donate-faq", label: "FAQ" },
];

export default function DonatePage() {
  return (
    <PageProvider slug="donate">
      <SEO
        title="Donate"
        description="Support Project G Manipur with a donation. Your contribution directly funds legal awareness, healthcare, education, and community development in Manipur."
      />
      <Navbar />
      <SectionNavigator sections={sections} />
      <div id="donate-hero"><DonateHero /></div>
      <div id="donate-impact"><DonateImpact /></div>
      <div id="donate-form"><DonateFormSection /></div>
      <div id="donate-faq"><DonateFAQ /></div>
      <Footer />
    </PageProvider>
  );
}
