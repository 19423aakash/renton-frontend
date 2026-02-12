import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
          {/* Brand */}
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-white">RentOn<span className="text-brand-orange">.</span></h2>
            <p className="text-gray-400 leading-relaxed text-sm">
                Redefining mobility with a touch of luxury. 
                Premium vehicles, seamless experience, and 24/7 support.
            </p>
            <div className="flex gap-4">
                 {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                     <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-dark-950 hover:bg-gold-500 hover:border-gold-500 transition-all duration-300">
                         <Icon size={18} />
                     </a>
                 ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-bold mb-6 tracking-wide">Explore</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/explore" className="hover:text-gold-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-gold-500 opacity-0 group-hover:opacity-100 transition-all"></span>Cars Fleet</Link></li>
              <li><Link to="/explore" className="hover:text-gold-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-gold-500 opacity-0 group-hover:opacity-100 transition-all"></span>Bikes Collection</Link></li>
              <li><Link to="/about" className="hover:text-gold-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-gold-500 opacity-0 group-hover:opacity-100 transition-all"></span>Company</Link></li>
            </ul>
          </div>

          {/* Contact */}
          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-6 tracking-wide">Support</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/contact" className="hover:text-gold-400 transition-colors">Help Center</Link></li>
              <li><Link to="/terms" className="hover:text-gold-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-gold-400 transition-colors">Privacy Policy</Link></li>
              
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold mb-6 tracking-wide">Stay Updated</h3>
            <div className="relative">
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-gold-500 transition-colors text-sm"
                />
                <Link to="/contact">
                    <button className="absolute right-2 top-2 bottom-2 bg-gold-500 text-dark-950 p-2 rounded-md hover:bg-white transition-colors">
                        <ArrowRight size={16} />
                    </button>
                </Link>
            </div>
            <p className="text-xs text-gray-500 mt-4">Join 10,000+ others and never miss out on new tips, tutorials, and more.</p>
          </div>        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">&copy; 2026 RentOn Inc. All rights reserved.</p>
          <div className="flex gap-8 text-sm text-gray-600">
              <span>Made with <span className="text-brand-orange">♥</span> for Speed</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
