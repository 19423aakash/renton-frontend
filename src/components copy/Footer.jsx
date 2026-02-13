import { Car, Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const Footer = () => {
    return (
        <footer className="bg-secondary text-white pt-12 pb-6 border-t border-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-4 group">
                            <img src={logo} alt="RentOn" className="w-20 h-20 object-contain" />
                            <span className="text-2xl font-display font-bold text-white group-hover:text-primary transition-colors">RentOn.</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Premium car and bike rentals for every journey. Experience the best fleet in the city with transparent pricing and 24/7 support.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold font-display mb-4 text-white">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-gray-400 hover:text-primary transition-colors text-sm">Home</Link></li>
                            <li><Link to="/explore" className="text-gray-400 hover:text-primary transition-colors text-sm">Explore Fleet</Link></li>
                            <li><Link to="/about" className="text-gray-400 hover:text-primary transition-colors text-sm">About Us</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-primary transition-colors text-sm">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold font-display mb-4 text-white">Support</h3>
                        <ul className="space-y-2">
                            <li><Link to="#" className="text-gray-400 hover:text-primary transition-colors text-sm">Help Center</Link></li>
                            <li><Link to="#" className="text-gray-400 hover:text-primary transition-colors text-sm">Terms of Service</Link></li>
                            <li><Link to="#" className="text-gray-400 hover:text-primary transition-colors text-sm">Privacy Policy</Link></li>
                            <li><Link to="#" className="text-gray-400 hover:text-primary transition-colors text-sm">FAQs</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold font-display mb-4 text-white">Connect With Us</h3>
                        <div className="flex space-x-4 mb-4">
                            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-primary transition-colors text-white hover:text-white">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-primary transition-colors text-white hover:text-white">
                                <Twitter size={18} />
                            </a>
                            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-primary transition-colors text-white hover:text-white">
                                <Instagram size={18} />
                            </a>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <Mail size={16} />
                            <span>support@renton.com</span>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-900 pt-6 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm">© {new Date().getFullYear()} RentOn. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <span className='text-gray-600 text-xs'>Design by Antigravity</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
