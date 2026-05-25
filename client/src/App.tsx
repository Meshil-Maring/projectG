import "./App.css";
import Navbar from "./shared/components/Navbar";
import Hero from "./components/home/Hero";
import Mission from "./components/home/Mission";
import VideoStories from "./components/home/VideoStories";
import ImageGallery from "./components/home/ImageGallery";
import Volunteer from "./components/home/Volunteer";
import Impact from "./components/home/Impact";
import Campaigns from "./components/home/Campaigns";
import StoriesOfChange from "./components/home/StoriesOfChange";
import Donate from "./components/home/Donate";
import NewsletterSubscribe from "./components/home/NewsletterSubscribe";
import Footer from "./components/home/Footer";

function App() {
  return (
    <>
      <Navbar />
      <section id="home"><Hero /></section>
      <section id="about">
        <Mission />
        <VideoStories />
        <ImageGallery />
      </section>
      <section id="causes"><Campaigns /></section>
      <section id="impact"><Impact /></section>
      <section id="stories"><StoriesOfChange /></section>
      <section id="get-involved"><Volunteer /></section>
      <section id="donate"><Donate /></section>
      <section id="contact"><NewsletterSubscribe /></section>
      <Footer />
    </>
  );
}

export default App;
