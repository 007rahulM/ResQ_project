import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, ArrowLeft, Calendar } from "lucide-react";

const MyDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch My Donations
  const fetchMyDonations = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/donations/my-donations", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setDonations(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyDonations();
  }, []);

  // Handle Delete
  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/donations/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        alert("Donation Deleted");
        fetchMyDonations(); // Refresh the list
      } else {
        alert("Failed to delete");
      }
    } catch (err) {
        console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4">
        
        <Link to="/dashboard" className="inline-flex items-center text-slate-500 hover:text-emerald-600 mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
        </Link>

        <h1 className="text-3xl font-bold text-slate-900 mb-8">My Donation History</h1>

        {loading ? <p>Loading...</p> : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {donations.map((food) => (
                    <div key={food._id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-bold text-slate-900 text-lg">{food.title}</h3>
                                <span className={`text-xs font-bold px-2 py-1 rounded-full uppercase ${food.status === 'available' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'}`}>
                                    {food.status}
                                </span>
                            </div>
                            <p className="text-sm text-slate-500 mb-2">Quantity: {food.quantity}</p>
                            <div className="text-xs text-slate-400 flex items-center gap-1 mb-4">
                                <Calendar className="h-3 w-3"/> Posted: {new Date(food.createdAt).toLocaleDateString()}
                            </div>
                        </div>

                        {/* DELETE BUTTON */}
                        <button 
                            onClick={() => handleDelete(food._id)}
                            className="w-full flex items-center justify-center gap-2 text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 py-2 rounded-lg transition-colors font-medium text-sm"
                        >
                            <Trash2 className="h-4 w-4" /> Delete Donation
                        </button>
                    </div>
                ))}

                {donations.length === 0 && <p>You haven't donated anything yet.</p>}
            </div>
        )}
      </div>
    </div>
  );
};

export default MyDonations;
