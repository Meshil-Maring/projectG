import Navbar from "../shared/components/Navbar";
import Footer from "../shared/components/Footer";
import ContactHero from "../components/contact/ContactHero";
import ContactFormSection from "../components/contact/ContactFormSection";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <ContactHero />
      <ContactFormSection />
      <Footer />
    </>
  );
}
