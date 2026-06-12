import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";
import SectionNavigator from "../../shared/components/SectionNavigator";
import ContactHero from "../../components/user/contact/ContactHero";
import ContactFormSection from "../../components/user/contact/ContactFormSection";
import { PageProvider } from "../../context/PageContext";

const sections = [
  { id: "contact-hero", label: "Overview" },
  { id: "contact-form", label: "Contact Us" },
];

export default function ContactPage() {
  return (
    <PageProvider slug="contact">
      <Navbar />
      <SectionNavigator sections={sections} />
      <div id="contact-hero"><ContactHero /></div>
      <div id="contact-form"><ContactFormSection /></div>
      <Footer />
    </PageProvider>
  );
}
