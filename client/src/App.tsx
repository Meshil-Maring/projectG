import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import GroupPage from "./components/groups/GroupPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/groups/:slug" element={<GroupPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}

export default App;
