import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect, type ReactNode } from "react";
import "./App.css";
import ScrollToTopButton from "./shared/components/ScrollToTopButton";

// Home stays eagerly loaded for the fastest first paint; every other
// page is split into its own chunk and fetched on navigation.
import HomePage from "./pages/users/HomePage";

const AboutUsPage = lazy(() => import("./pages/users/AboutUsPage"));
const StoriesPage = lazy(() => import("./pages/users/StoriesPage"));
const NoticePage = lazy(() => import("./pages/users/NoticePage"));
const CausesPage = lazy(() => import("./pages/users/CausesPage"));
const ContactPage = lazy(() => import("./pages/users/ContactPage"));
const GetInvolvedPage = lazy(() => import("./pages/users/GetInvolvedPage"));
const DonatePage = lazy(() => import("./pages/users/DonatePage"));
const ImpactPage = lazy(() => import("./pages/users/ImpactPage"));
const LacPage = lazy(() => import("./pages/users/LacPage"));
const WhgPage = lazy(() => import("./pages/users/WhgPage"));
const HrdsPage = lazy(() => import("./pages/users/HrdsPage"));
const CwgPage = lazy(() => import("./pages/users/CwgPage"));
const FsedsPage = lazy(() => import("./pages/users/FsedsPage"));
const NotFoundPage = lazy(() => import("./pages/users/NotFoundPage"));

// Admin pages
const AdminLoginPage = lazy(() => import("./pages/admin/AdminLoginPage"));
const AdminDashboardPage = lazy(() => import("./pages/admin/AdminDashboardPage"));

function ProtectedAdminRoute({ children }: { children: ReactNode }) {
  const isAuth = !!localStorage.getItem("pg_admin_token");
  return isAuth ? <>{children}</> : <Navigate to="/projectG-admin" replace />;
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Wait a frame so the target page has rendered before scrolling.
      requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

function PageLoader() {
  return (
    <div
      role="status"
      aria-label="Loading page"
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          width: "36px",
          height: "36px",
          border: "3px solid #e2e8f0",
          borderTopColor: "#1a3270",
          borderRadius: "50%",
          animation: "pg-spin 0.8s linear infinite",
        }}
      />
      <style>{`@keyframes pg-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function App() {
  return (
    <>
      <ScrollToTop />
      <ScrollToTopButton />
      <Suspense fallback={<PageLoader />}>
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

        {/* Group pages — /groups/* is canonical; short slugs redirect */}
        <Route path="/groups/lac" element={<LacPage />} />
        <Route path="/groups/whg" element={<WhgPage />} />
        <Route path="/groups/hrds" element={<HrdsPage />} />
        <Route path="/groups/cwg" element={<CwgPage />} />
        <Route path="/groups/fseds" element={<FsedsPage />} />
        <Route path="/lac" element={<Navigate to="/groups/lac" replace />} />
        <Route path="/whg" element={<Navigate to="/groups/whg" replace />} />
        <Route path="/hrds" element={<Navigate to="/groups/hrds" replace />} />
        <Route path="/cwg" element={<Navigate to="/groups/cwg" replace />} />
        <Route path="/fseds" element={<Navigate to="/groups/fseds" replace />} />

        {/* Admin routes */}
        <Route path="/projectG-admin" element={<AdminLoginPage />} />
        <Route
          path="/projectG-admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardPage />
            </ProtectedAdminRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </Suspense>
    </>
  );
}

export default App;
