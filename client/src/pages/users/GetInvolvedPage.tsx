import SEO from "../../shared/components/SEO";
import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";
import SectionNavigator from "../../shared/components/SectionNavigator";
import GetInvolvedHero from "../../components/user/get-involved/GetInvolvedHero";
import GetInvolvedWays from "../../components/user/get-involved/GetInvolvedWays";
import GetInvolvedVolunteer from "../../components/user/get-involved/GetInvolvedVolunteer";
import GetInvolvedDonate from "../../components/user/get-involved/GetInvolvedDonate";
import GetInvolvedSpread from "../../components/user/get-involved/GetInvolvedSpread";
import { PageProvider } from "../../context/PageContext";

const sections = [
  { id: "gi-hero", label: "Overview" },
  { id: "gi-ways", label: "Ways to Help" },
  { id: "gi-volunteer", label: "Volunteer" },
  { id: "gi-donate", label: "Donate" },
  { id: "gi-spread", label: "Spread Word" },
];

export default function GetInvolvedPage() {
  return (
    <PageProvider slug="get-involved">
      <SEO
        title="Get Involved"
        description="Join Project G Manipur as a volunteer, fundraiser, or partner. Together we can create lasting change in communities across Manipur."
      />
      <Navbar />
      <SectionNavigator sections={sections} />
      <div id="gi-hero"><GetInvolvedHero /></div>
      <div id="gi-ways"><GetInvolvedWays /></div>
      <div id="gi-volunteer"><GetInvolvedVolunteer /></div>
      <div id="gi-donate"><GetInvolvedDonate /></div>
      <div id="gi-spread"><GetInvolvedSpread /></div>
      <Footer />
    </PageProvider>
  );
}
