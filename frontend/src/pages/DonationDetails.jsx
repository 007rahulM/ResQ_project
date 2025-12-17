import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"; 
import { MapPin, Clock, User, Phone, ArrowLeft, CheckCircle } from "lucide-react";

const DonationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(false); // New state for loading button

  useEffect(() => {
    const fetchDonation = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/donations/${id}`);
        const data = await res.json();
        if (res.ok) {
          setDonation(data);
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonation();
  }, [id]);

  // --- NEW: HANDLE CLAIM ---
  const handleClaim = async () => {
    if(!window.confirm("Are you sure you want to claim this donation?")) return;

    setClaiming(true);
    try {
      const token = localStorage.getItem("token"); // Get wristband
      const res = await fetch(`http://localhost:5000/api/donations/${id}/claim`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (res.ok) {
        alert("Success! You have claimed this donation. 🎉");
        navigate("/dashboard"); // Go back to dashboard
      } else {
        alert("Error: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setClaiming(false);
    }
  };

  if (loading) return <div className="text-center py-20">Loading details...</div>;
  if (!donation) return <div className="text-center py-20">Donation not found!</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-4">
        
        <Link to="/dashboard" className="inline-flex items-center text-slate-500 hover:text-emerald-600 mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            
            <div className="h-64 w-full bg-gray-200 relative">
                <img src={donation.image} alt={donation.title} className="w-full h-full object-cover"/>
                <div className={`absolute top-4 right-4 px-4 py-1.5 rounded-full font-bold uppercase text-sm shadow-sm ${donation.status === 'available' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-600'}`}>
                    {donation.status}
                </div>
            </div>

            <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">{donation.title}</h1>
                        <p className="text-lg text-slate-600">{donation.quantity}</p>
                    </div>
                    <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg flex items-center gap-2 font-medium">
                        <Clock className="h-5 w-5" />
                        <span>Expires: {new Date(donation.expiresAt).toLocaleDateString()}</span>
                    </div>
                </div>

                <div className="prose text-slate-600 mb-8 border-b border-slate-100 pb-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Description</h3>
                    <p>{donation.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Pickup Location</h3>
                        <div className="flex items-start gap-3">
                            <div className="bg-blue-50 p-2.5 rounded-full text-blue-600"><MapPin className="h-6 w-6" /></div>
                            <p className="font-medium text-slate-900">{donation.address}</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Donor Contact</h3>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <div className="flex items-center gap-3 mb-2">
                                <User className="h-5 w-5 text-slate-400" />
                                <span className="font-medium text-slate-900">{donation.donor?.username || "Anonymous"}</span>
                            </div>
                            <div className="flex items-center gap-3 text-emerald-600 font-bold">
                                <Phone className="h-5 w-5" />
                                <span>{donation.donor?.phone || "No phone provided"}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- CLAIM BUTTON (Only shows if available) --- */}
                {donation.status === "available" ? (
                  <button 
                    onClick={handleClaim}
                    disabled={claiming}
                    className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 flex justify-center items-center gap-2 text-lg disabled:opacity-50"
                  >
                      {claiming ? "Processing..." : (
                        <>
                          <CheckCircle className="h-6 w-6" />
                          Claim This Donation
                        </>
                      )}
                  </button>
                ) : (
                  <div className="w-full bg-gray-100 text-gray-500 font-bold py-4 rounded-xl flex justify-center items-center gap-2 text-lg">
                      This donation has been claimed.
                  </div>
                )}

            </div>
        </div>
      </div>
    </div>
  );
};

export default DonationDetails;