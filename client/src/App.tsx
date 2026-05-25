import "./App.css";
import Navbar from "./shared/components/Navbar";
import Hero from "./components/home/Hero";
import Mission from "./components/home/Mission";
import Campaigns from "./components/home/Campaigns";
import Donate from "./components/home/Donate";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Mission />
      <Campaigns />
      <Donate />
    </>
  );
}

export default App;
