import "./App.css";
import Navbar from "./shared/components/Navbar";
import Hero from "./components/home/Hero";
import Mission from "./components/home/Mission";
import Volunteer from "./components/home/Volunteer";
import Impact from "./components/home/Impact";
import Campaigns from "./components/home/Campaigns";
import Donate from "./components/home/Donate";
import Footer from "./components/home/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Mission />
      <Volunteer />
      <Impact />
      <Campaigns />
      <Donate />
      <Footer />
    </>
  );
}

export default App;
