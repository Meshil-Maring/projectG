import SEO from "../../shared/components/SEO";
import Navbar from "../../shared/components/Navbar";
import SectionNavigator from "../../shared/components/SectionNavigator";
import LazySection from "../../shared/components/LazySection";
import Hero from "../../components/user/home/Hero";
import Mission from "../../components/user/home/Mission";
import VideoStories from "../../components/user/home/VideoStories";
import ImageGallery from "../../components/user/home/ImageGallery";
import Groups from "../../components/user/home/Groups";
import Volunteer from "../../components/user/home/Volunteer";
import Impact from "../../components/user/home/Impact";
import Campaigns from "../../components/user/home/Campaigns";
import RecentNotices from "../../components/user/home/RecentNotices";
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
      <SEO
        title="Project G Manipur"
        description="Project G Manipur is a grassroots organization empowering communities through legal awareness, women's health, human rights, and socio-economic development in Manipur, India."
      />
      <Navbar />
      <SectionNavigator sections={sections} />

      {/* Above fold — always render immediately */}
      <section id="home">
        <Hero />
      </section>
      <RecentNotices />

      {/* About section — slightly below fold, small rootMargin */}
      <section id="about">
        <Mission />
        <LazySection rootMargin="200px">
          <VideoStories />
        </LazySection>
        <LazySection rootMargin="200px">
          <ImageGallery />
        </LazySection>
      </section>

      {/* Everything below here is well below fold */}
      <LazySection rootMargin="400px">
        <section id="groups">
          <Groups />
        </section>
      </LazySection>

      <LazySection rootMargin="400px">
        <section id="causes">
          <Campaigns />
        </section>
      </LazySection>

      <LazySection rootMargin="400px">
        <section id="impact">
          <Impact />
        </section>
      </LazySection>

      <LazySection rootMargin="400px">
        <section id="stories">
          <StoriesOfChange />
        </section>
      </LazySection>

      <LazySection rootMargin="400px">
        <section id="get-involved">
          <Volunteer />
        </section>
      </LazySection>

      <LazySection rootMargin="400px">
        <section id="donate">
          <Donate />
        </section>
      </LazySection>

      <LazySection rootMargin="400px">
        <section id="contact">
          <NewsletterSubscribe />
        </section>
        <Footer />
      </LazySection>
    </>
  );
}
