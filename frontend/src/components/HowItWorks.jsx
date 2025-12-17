import { Upload, Search, Heart } from "lucide-react";

const HowItWorks = () => {
  return (
    // The ID here matches the href in Hero.jsx
    <section id="how-it-works" className="py-20 bg-slate-50"> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900">How ResQ Works</h2>
          <p className="mt-4 text-lg text-slate-600">Three simple steps to make a difference.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Step 1 */}
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 text-emerald-600">
              <Upload className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">1. Post Donation</h3>
            <p className="text-slate-600">Donors upload details about surplus food including photos and pickup location.</p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
              <Search className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">2. NGOs Connect</h3>
            <p className="text-slate-600">Verified NGOs view available food nearby and claim what they need.</p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 text-purple-600">
              <Heart className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">3. Food Rescue</h3>
            <p className="text-slate-600">Food is picked up and distributed to those in need before it spoils.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;