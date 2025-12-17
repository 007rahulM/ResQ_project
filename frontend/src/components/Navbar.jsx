import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import logo from "../assets/logo.png"; 

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path ? "text-emerald-800 font-bold bg-white/20 rounded-lg px-3 py-1" : "text-slate-700 hover:text-emerald-800 hover:bg-white/30 rounded-lg px-3 py-1 transition-all";

  return (
    // NEW: Gradient Background with Blur
    <nav className="bg-gradient-to-r from-emerald-50 via-teal-50 to-white/80 backdrop-blur-lg border-b border-emerald-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* LOGO AREA */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-white p-1.5 rounded-full shadow-sm group-hover:scale-105 transition-transform">
                <img src={logo} alt="ResQ Logo" className="h-10 w-auto object-contain" />
            </div>
            <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 tracking-tight">
                ResQ
            </span>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className={isActive("/")}>Home</Link>
            
            {/* Show "Find Food" to everyone, keeps UI consistent */}
            <Link to="/dashboard" className={isActive("/dashboard")}>
                {token ? "Find Food" : "Browse Donations"}
            </Link>
            
            {token ? (
              // LOGGED IN VIEW
              <div className="flex items-center gap-4 ml-2 pl-6 border-l border-emerald-200">
                 <Link to="/my-donations" className="flex items-center gap-2 text-slate-700 hover:text-emerald-700 font-medium">
                    <LayoutDashboard className="h-5 w-5" /> My Activity
                 </Link>
                 <button onClick={handleLogout} className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full hover:bg-red-100 font-bold transition shadow-sm hover:shadow">
                    <LogOut className="h-4 w-4" /> Logout
                 </button>
              </div>
            ) : (
              // LOGGED OUT VIEW
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-slate-700 font-bold hover:text-emerald-700 transition">
                  Log in
                </Link>
                <Link to="/signup" className="bg-emerald-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-emerald-700 transition shadow-lg shadow-emerald-200 hover:-translate-y-0.5">
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-emerald-800 p-2">
              {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-emerald-100 p-4 space-y-4 shadow-xl absolute w-full">
          <Link to="/" className="block text-lg font-medium text-slate-800" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/dashboard" className="block text-lg font-medium text-slate-800" onClick={() => setIsMobileMenuOpen(false)}>Browse Food</Link>
          {token ? (
             <>
               <Link to="/my-donations" className="block text-lg font-medium text-slate-800" onClick={() => setIsMobileMenuOpen(false)}>My Activity</Link>
               <button onClick={handleLogout} className="block w-full text-left text-red-600 font-bold pt-4">Logout</button>
             </>
          ) : (
            <div className="grid grid-cols-2 gap-4 pt-4">
              <Link to="/login" className="text-center py-3 border border-slate-200 rounded-xl font-bold text-slate-700" onClick={() => setIsMobileMenuOpen(false)}>Log in</Link>
              <Link to="/signup" className="text-center py-3 bg-emerald-600 text-white rounded-xl font-bold shadow-lg" onClick={() => setIsMobileMenuOpen(false)}>Sign up</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;