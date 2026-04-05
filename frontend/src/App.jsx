import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import BrowseClubsPage from "./pages/BrowseClubsPage";
import ClubDetailPage from "./pages/ClubDetailPage";
import CreateClubPage from "./pages/CreateClubPage";
import EditClubPage from "./pages/EditClubPage";
import ClubMembersPage from "./pages/ClubMembersPage";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/clubs" element={<BrowseClubsPage />} />

      {/* Auth Routes (redirect to dashboard if already logged in) */}
      <Route
        element={<ProtectedRoute requireAuth={false} redirectTo="/dashboard" />}
      >
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute requireAuth redirectTo="/login" />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/clubs/create" element={<CreateClubPage />} />
        <Route path="/clubs/:id/edit" element={<EditClubPage />} />
        <Route path="/clubs/:id/members" element={<ClubMembersPage />} />
      </Route>

      {/* Dynamic club detail — must come last */}
      <Route path="/clubs/:id" element={<ClubDetailPage />} />
    </Routes>
  );
}

export default App;