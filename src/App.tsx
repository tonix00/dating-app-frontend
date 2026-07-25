import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import DiscoveryPage from "./pages/DiscoveryPage";
import Layout from "./components/Layout";
import MatchesPage from "./pages/MatchesPage";
import NotificationsPage from "./pages/NotificationsPage";
import ChatPage from "./pages/ChatPage";
import ViewProfilePage from "./pages/ViewProfilePage";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const isExpired = payload.exp * 1000 < Date.now();

    if (isExpired) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      return <Navigate to="/login" replace />;
    }
  } catch (err) {
    // Invalid token format
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    return <Navigate to="/login" replace />;
  }

  return <Layout>{children}</Layout>;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DiscoveryPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/matches"
        element={
          <ProtectedRoute>
            <MatchesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <NotificationsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/chat/:matchId/:receiverId"
        element={
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/view/:userId"
        element={
          <ProtectedRoute>
            <ViewProfilePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
