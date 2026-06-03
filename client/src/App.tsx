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
        <Route path="/groups/:slug" element={<GroupPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
