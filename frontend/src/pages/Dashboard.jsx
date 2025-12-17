import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlusCircle, MapPin, Clock, History } from 'lucide-react';

const Dashboard = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/donations");
        const data = await res.json();
        if (res.ok) setDonations(data.data); 
      } catch (err) {
        console.error("Error fetching food:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDonations();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="mt-2 text-slate-600">Welcome back! Ready to make a difference?</p>
          </div>
          <Link to="/donate" className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-emerald-700 transition flex items-center gap-2">
            <PlusCircle className="h-5 w-5" />
            Donate Now
          </Link>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
           <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="text-emerald-600 font-bold text-lg mb-1">Total Donations</div>
              <div className="text-4xl font-extrabold text-slate-900">{donations.length}</div>
              <div className="text-sm text-slate-500 mt-2">Active listings available</div>
           </div>

           <Link to="/my-donations" className="group bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:border-purple-200 cursor-pointer">
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
                  <History className="h-6 w-6 text-purple-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">My History</h3>
              <p className="text-slate-500 text-sm">View and manage your past donations.</p>
           </Link>
        </div>

        {/* Feed */}
        <h2 className="text-xl font-bold text-slate-900 mb-6">Recent Donations</h2>
        {loading ? <p>Loading food...</p> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {donations.map((food) => (
              <div key={food._id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 w-full bg-gray-200 relative">
                  <img src={food.image} alt={food.title} className="w-full h-full object-cover"/>
                  <span className="absolute top-3 right-3 bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                    {food.status}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{food.title}</h3>
                  <p className="text-slate-500 text-sm mb-4 line-clamp-2">{food.description}</p>
                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-slate-400" /> <span>{food.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-slate-400" /> <span>Expires: {new Date(food.expiresAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Link to={`/donations/${food._id}`} className="block text-center mt-5 w-full py-2 border border-emerald-600 text-emerald-600 font-bold rounded-lg hover:bg-emerald-50 transition-colors">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
            {donations.length === 0 && <div className="col-span-full text-center py-10 text-slate-500">No active donations found.</div>}
          </div>
        )}
      </div>
    </div>
  );
};
export default Dashboard;