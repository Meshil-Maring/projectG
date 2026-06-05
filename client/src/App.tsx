import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";

// User pages
import HomePage from "./pages/users/HomePage";
import AboutUsPage from "./pages/users/AboutUsPage";
import StoriesPage from "./pages/users/StoriesPage";
import NoticePage from "./pages/users/NoticePage";
import CausesPage from "./pages/users/CausesPage";
import ContactPage from "./pages/users/ContactPage";
import GetInvolvedPage from "./pages/users/GetInvolvedPage";
import DonatePage from "./pages/users/DonatePage";
import ImpactPage from "./pages/users/ImpactPage";
import LacPage from "./pages/users/LacPage";
import WhgPage from "./pages/users/WhgPage";
import HrdsPage from "./pages/users/HrdsPage";
import CwgPage from "./pages/users/CwgPage";
import FsedsPage from "./pages/users/FsedsPage";
import NotFoundPage from "./pages/users/NotFoundPage";

// User components
import GroupPage from "./components/user/groups/GroupPage";

// Admin pages
import AdminLoginPage from "./pages/admin/AdminLoginPage";

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
        {/* User routes */}
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

        {/* Admin routes */}
        <Route path="/projectG-admin" element={<AdminLoginPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
