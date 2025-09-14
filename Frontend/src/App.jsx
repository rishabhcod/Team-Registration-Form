import { Routes, Route, Link, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import VerifyPage from "./pages/VerifyPage";
import StatusPage from "./pages/StatusPage";
import AdminLogin from "./pages/AdminLogin";
import AdminPage from "./pages/AdminPage";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  // Don't show navbar on admin login page
  if (location.pathname === '/admin/login') {
    return null;
  }

  return (
    <nav className="bg-indigo-600 p-4 flex justify-between items-center text-white shadow-md">
      <Link to="/" className="font-bold text-xl">Hackathon Portal</Link>
      <div className="flex gap-4">
        <Link to="/register" className="hover:text-indigo-200">Register</Link>
        <Link to="/verify" className="hover:text-indigo-200">Verify</Link>
        <Link to="/status" className="hover:text-indigo-200">Status</Link>
        {isAuthenticated ? (
          <>
            <Link to="/admin" className="hover:text-indigo-200">Admin Dashboard</Link>
            <button 
              onClick={logout}
              className="hover:text-indigo-200"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/admin/login" className="hover:text-indigo-200">Admin Login</Link>
        )}
      </div>
    </nav>
  );
}

function AppContent() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/status" element={<StatusPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
