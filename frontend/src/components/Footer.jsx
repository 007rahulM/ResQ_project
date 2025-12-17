import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
                <Link to="/" className="text-2xl font-bold text-emerald-500 mb-4 block">ResQ</Link>
                <p className="text-slate-400 max-w-xs">Connecting surplus food to those in need. Building a zero-hunger world, one meal at a time.</p>
            </div>
            
            <div>
                <h4 className="text-white font-bold mb-4">Platform</h4>
                <ul className="space-y-2">
                    <li><Link to="/dashboard" className="hover:text-emerald-500 transition">Browse Food</Link></li>
                    <li><Link to="/donate" className="hover:text-emerald-500 transition">Donate Now</Link></li>
                    <li><Link to="/login" className="hover:text-emerald-500 transition">Login / Signup</Link></li>
                </ul>
            </div>

            <div>
                <h4 className="text-white font-bold mb-4">Support</h4>
                <ul className="space-y-2">
                    <li><a href="#" className="hover:text-emerald-500 transition">Help Center</a></li>
                    <li><a href="#" className="hover:text-emerald-500 transition">Safety Guidelines</a></li>
                    <li><a href="#" className="hover:text-emerald-500 transition">Contact Us</a></li>
                </ul>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-800 text-center text-sm">
            &copy; {new Date().getFullYear()} ResQ Platform. All rights reserved.
        </div>
    </footer>
  );
};

export default Footer;