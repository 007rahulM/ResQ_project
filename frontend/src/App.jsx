import { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Donate from "./pages/Donate";
import DonationDetails from "./pages/DonationDetails";
import MyDonations from "./pages/MyDonations"; 

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // --- GLOBAL TOKEN CATCHER ---
  useEffect(() => {
    // 1. Look for token in the URL
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");

    if (token) {
      console.log("🎟️ Token found in URL! Saving...");
      
      // 2. Save to LocalStorage
      localStorage.setItem("token", token);
      
      // 3. Clean the URL (remove the ugly ?token=xyz part) without reloading
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // 4. Force a re-render/navigation to ensure the app knows we are logged in
      // If we are on login/signup page, go to dashboard. Otherwise stay put.
      if (location.pathname === "/login" || location.pathname === "/signup") {
        navigate("/dashboard");
      } else {
        // Just force update/stay here
        navigate(location.pathname); 
      }
    }
  }, [navigate, location]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/donations/:id" element={<DonationDetails />} />
        <Route path="/my-donations" element={<MyDonations />} />
      </Routes>
    </>
  );
}

export default App;