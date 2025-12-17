import { Link } from "react-router-dom";

const Hero = () => {
  // CHECK IF USER IS LOGGED IN
  const token = localStorage.getItem("token");

  return (
    <div className="relative isolate overflow-hidden bg-gray-900 pb-16 pt-10 sm:pb-24">
      
      {/* BACKGROUND IMAGE - Warm, Community Vibe */}
      <img
        src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop"
        alt="People sharing food"
        className="absolute inset-0 -z-10 h-full w-full object-cover brightness-[0.4]" // Darker filter so text pops
      />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl py-20 sm:py-28 text-center">
          
          {/* Main Headline - SUPER BIG */}
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-7xl drop-shadow-lg">
            Share Food. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-300">
              Save Lives.
            </span>
          </h1>
          
          {/* Subtitle - Readable Size */}
          <p className="mt-6 text-xl leading-8 text-gray-200 max-w-2xl mx-auto font-medium">
            Don't let good food go to waste. Connect surplus food from your home or business to neighbors in need instantly.
          </p>
          
          {/* SMART BUTTONS */}
          <div className="mt-10 flex items-center justify-center gap-x-6">
            
            {/* Logic: If Token exists, Go Dashboard. Else, Go Login */}
            <Link
              to={token ? "/dashboard" : "/login"}
              className="rounded-full bg-emerald-500 px-10 py-4 text-lg font-bold text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 hover:scale-105 transition-all duration-300"
            >
              {token ? "Go to Dashboard →" : "Start Donating"}
            </Link>
            
            <a href="#how-it-works" className="text-base font-bold leading-6 text-white hover:text-emerald-300 transition underline-offset-4 hover:underline">
              How it works
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;