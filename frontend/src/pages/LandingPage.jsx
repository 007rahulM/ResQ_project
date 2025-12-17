import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Stats from "../components/Stats";
// Import the new components
import Testimonials from "../components/Testimonials";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div className="bg-white">
      {/* 1. Main Hero Section */}
      <Hero />
      
      {/* 2. Three Steps Section */}
      <HowItWorks />
      
      {/* 3. Numbers Section */}
      <Stats />
      
      {/* 4. Reviews Section (NEW) */}
      <Testimonials />
      
      {/* 5. Bottom Call To Action (NEW) */}
      <CallToAction />
      
      {/* 6. Footer (NEW) */}
      <Footer />
    </div>
  );
};

export default LandingPage;