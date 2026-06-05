import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import GroupPage from "./components/groups/GroupPage";
import AboutUsPage from "./pages/AboutUsPage";
import StoriesPage from "./pages/StoriesPage";
import NoticePage from "./pages/NoticePage";
import NotFoundPage from "./pages/NotFoundPage";
import CausesPage from "./pages/CausesPage";
import ContactPage from "./pages/ContactPage";
import GetInvolvedPage from "./pages/GetInvolvedPage";
import DonatePage from "./pages/DonatePage";
import ImpactPage from "./pages/ImpactPage";
import LacPage from "./pages/LacPage";
import WhgPage from "./pages/WhgPage";
import HrdsPage from "./pages/HrdsPage";
import CwgPage from "./pages/CwgPage";
import FsedsPage from "./pages/FsedsPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/stories" element={<StoriesPage />} />
        <Route path="/notice" element={<NoticePage />} />
        <Route path="/causes" element={<CausesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/get-involved" element={<GetInvolvedPage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/impact" element={<ImpactPage />} />
        <Route path="/lac" element={<LacPage />} />
        <Route path="/groups/lac" element={<LacPage />} />
        <Route path="/whg" element={<WhgPage />} />
        <Route path="/groups/whg" element={<WhgPage />} />
        <Route path="/hrds" element={<HrdsPage />} />
        <Route path="/groups/hrds" element={<HrdsPage />} />
        <Route path="/cwg" element={<CwgPage />} />
        <Route path="/groups/cwg" element={<CwgPage />} />
        <Route path="/fseds" element={<FsedsPage />} />
        <Route path="/groups/fseds" element={<FsedsPage />} />
        <Route path="/groups/:slug" element={<GroupPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
