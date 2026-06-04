import Navbar from "../shared/components/Navbar";
import Footer from "../shared/components/Footer";
import GetInvolvedHero from "../components/get-involved/GetInvolvedHero";
import GetInvolvedWays from "../components/get-involved/GetInvolvedWays";
import GetInvolvedVolunteer from "../components/get-involved/GetInvolvedVolunteer";
import GetInvolvedDonate from "../components/get-involved/GetInvolvedDonate";
import GetInvolvedSpread from "../components/get-involved/GetInvolvedSpread";

export default function GetInvolvedPage() {
  return (
    <>
      <Navbar />
      <GetInvolvedHero />
      <GetInvolvedWays />
      <GetInvolvedVolunteer />
      <GetInvolvedDonate />
      <GetInvolvedSpread />
      <Footer />
    </>
  );
}
