import { Route, Routes } from "react-router-dom";
import AuthorizationPage from "./pages/AuthorizationPage/AuthorizationPage";
import AnalyticsPage from "./pages/AnalyticsPage/AnalyiticsPage";

export default function AppRouts() {
  return (
    <Routes>
      <Route path="/" element={<AuthorizationPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
    </Routes>
  );
}
