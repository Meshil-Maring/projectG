import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";
import GetInvolvedHero from "../../components/user/get-involved/GetInvolvedHero";
import GetInvolvedWays from "../../components/user/get-involved/GetInvolvedWays";
import GetInvolvedVolunteer from "../../components/user/get-involved/GetInvolvedVolunteer";
import GetInvolvedDonate from "../../components/user/get-involved/GetInvolvedDonate";
import GetInvolvedSpread from "../../components/user/get-involved/GetInvolvedSpread";

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
