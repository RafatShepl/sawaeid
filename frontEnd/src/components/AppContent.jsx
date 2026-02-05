import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import { useAuth } from "../context/AuthContext";
import { RiseLoader } from "react-spinners";

const AppContent = () => {
  const { user, loading } = useAuth();

  // Show a loading indicator while checking user auth
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RiseLoader
          color="#065f46"   // forest-start
          size={12}
          speedMultiplier={1}
        />
      </div>
    );
  }

  return (
    <Routes>
      {/* If logged in, redirect login/register to home */}
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/" />}
      />
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/" />}
      />

      {/* Protected Home route with nested support */}
      <Route
        path="/*"
        element={user ? <Home /> : <Navigate to="/login" />}
      />

      {/* Catch all */}
      <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
    </Routes>
  );
};

export default AppContent;
