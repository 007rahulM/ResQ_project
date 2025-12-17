import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, MapPin, Calendar, Type, FileText, ShoppingBag } from "lucide-react";

const Donate = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "", description: "", quantity: "", address: "", expiresAt: "", image: null
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("quantity", formData.quantity);
        data.append("address", formData.address);
        data.append("expiresAt", formData.expiresAt);
        if (formData.image) data.append("image", formData.image);

       try {
            const token = localStorage.getItem("token");
            
            const headers = { 
                "Authorization": `Bearer ${token}` 
            };
            
            // 🛑 IMPORTANT FIX: DO NOT set Content-Type for FormData
            // The browser sets 'Content-Type: multipart/form-data' automatically
            // with the correct boundary, which Multer requires.

            const res = await fetch("http://localhost:5000/api/donations", {
                method: "POST",
                // Pass the headers object without Content-Type
                headers: headers, 
                body: data
            });
            if (res.ok) {
                alert("Donation Posted Successfully! 🎉");
                navigate("/dashboard");
            } else {
                alert("Failed to post donation.");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-2xl mx-auto">
                <Link to="/dashboard" className="inline-flex items-center text-slate-500 hover:text-emerald-600 mb-6 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
                </Link>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                    <h1 className="text-2xl font-bold text-slate-900 mb-6">Donate Food</h1>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Food Image</label>
                            <input type="file" onChange={handleFileChange} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"/>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Food Title</label>
                                <div className="relative">
                                    <Type className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                                    <input type="text" name="title" placeholder="e.g. Rice & Curry" onChange={handleChange} required className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"/>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Quantity</label>
                                <div className="relative">
                                    <ShoppingBag className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                                    <input type="text" name="quantity" placeholder="e.g. 5kg or 10 packets" onChange={handleChange} required className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"/>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                            <div className="relative">
                                <FileText className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                                <textarea name="description" placeholder="Describe the food..." onChange={handleChange} required className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all h-24"></textarea>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Pickup Address</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                                    <input type="text" name="address" placeholder="Full Address" onChange={handleChange} required className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"/>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Expires At</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                                    <input type="datetime-local" name="expiresAt" onChange={handleChange} required className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"/>
                                </div>
                            </div>
                        </div>
                        <button type="submit" disabled={loading} className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200">
                            {loading ? "Posting..." : "Post Donation"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Donate;