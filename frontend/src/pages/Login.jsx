import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; 

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 1. DETERMINE MODE: Are we on /signup or /login?
  const isSignup = location.pathname === "/signup";

  // 2. FORM STATES
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 3. GOOGLE LOGIN HANDLER
  const handleGoogleLogin = () => {
    // Redirect browser to Backend Google Auth Endpoint
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  // 4. CHECK FOR GOOGLE TOKEN (Fallback if App.jsx misses it)
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");
    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard");
    }
  }, [navigate]);

  // 5. EMAIL/PASSWORD SUBMIT HANDLER
  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
        // Dynamic URL: Choose Register or Login endpoint
        const url = isSignup 
            ? "http://localhost:5000/api/auth/register" 
            : "http://localhost:5000/api/auth/login";
        
        // Dynamic Data: Register needs username, Login does not
        const payload = isSignup 
            ? { username, email, password } 
            : { email, password };          

        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (res.ok) {
            // Success! Save token and redirect
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
        } else {
            // Error: Show message from backend (e.g., "Invalid credentials")
            setError(data.message || "Authentication failed");
        }

    } catch (err) {
        console.error(err);
        setError("Server error. Please try again later.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      
      {/* --- HEADER SECTION --- */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/">
            <img className="mx-auto h-16 w-auto object-contain cursor-pointer hover:opacity-90 transition" src={logo} alt="ResQ" />
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
          {isSignup ? "Create your account" : "Sign in to your account"}
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Join the movement to <span className="font-medium text-emerald-600">end hunger</span>.
        </p>
      </div>

      {/* --- CARD SECTION --- */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-xl sm:px-10 border border-gray-100">
          
          {/* GOOGLE BUTTON */}
          <div>
            <button onClick={handleGoogleLogin} className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-slate-300 rounded-lg shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {isSignup ? "Sign up with Google" : "Sign in with Google"}
            </button>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">Or continue with email</span>
              </div>
            </div>

            {/* ERROR MESSAGE DISPLAY */}
            {error && (
                <div className="mt-4 bg-red-50 text-red-600 text-sm p-3 rounded-lg text-center border border-red-100 flex items-center justify-center gap-2">
                    ⚠️ {error}
                </div>
            )}

            {/* EMAIL FORM */}
            <form onSubmit={handleEmailAuth} className="mt-6 grid gap-3">
               
               {/* USERNAME FIELD (Only shows on Signup) */}
               {isSignup && (
                 <input 
                    type="text" 
                    placeholder="Full Name" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm" 
                 />
               )}

               <input 
                  type="email" 
                  placeholder="Email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm" 
               />
               <input 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm" 
               />
               
               <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none disabled:opacity-50 transition-colors">
                 {loading ? "Processing..." : (isSignup ? "Create Account" : "Sign In")}
               </button>
            </form>
          </div>

          {/* FOOTER LINKS */}
          <div className="mt-6 text-center text-sm text-slate-500">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <Link to={isSignup ? "/login" : "/signup"} className="font-medium text-emerald-600 hover:text-emerald-500">
                {isSignup ? "Sign in" : "Sign up"}
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;