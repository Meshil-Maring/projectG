import Navbar from "../../shared/components/Navbar";
import SectionNavigator from "../../shared/components/SectionNavigator";
import Hero from "../../components/user/home/Hero";
import Mission from "../../components/user/home/Mission";
import VideoStories from "../../components/user/home/VideoStories";
import ImageGallery from "../../components/user/home/ImageGallery";
import Groups from "../../components/user/home/Groups";
import Volunteer from "../../components/user/home/Volunteer";
import Impact from "../../components/user/home/Impact";
import Campaigns from "../../components/user/home/Campaigns";
import StoriesOfChange from "../../components/user/home/StoriesOfChange";
import Donate from "../../components/user/home/Donate";
import NewsletterSubscribe from "../../components/user/home/NewsletterSubscribe";
import Footer from "../../shared/components/Footer";

export default function HomePage() {
  const sections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "groups", label: "Our Groups" },
    { id: "causes", label: "Causes" },
    { id: "impact", label: "Impact" },
    { id: "stories", label: "Stories" },
    { id: "get-involved", label: "Get Involved" },
    { id: "donate", label: "Donate" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <>
      <Navbar />
      <SectionNavigator sections={sections} />
      <section id="home">
        <Hero />
      </section>
      <section id="about">
        <Mission />
        <VideoStories />
        <ImageGallery />
      </section>
      <section id="groups">
        <Groups />
      </section>
      <section id="causes">
        <Campaigns />
      </section>
      <section id="impact">
        <Impact />
      </section>
      <section id="stories">
        <StoriesOfChange />
      </section>
      <section id="get-involved">
        <Volunteer />
      </section>
      <section id="donate">
        <Donate />
      </section>
      <section id="contact">
        <NewsletterSubscribe />
      </section>
      <Footer />
    </>
  );
}
