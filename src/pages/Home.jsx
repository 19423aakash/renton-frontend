import React from 'react';
import { Button } from 'antd';
import { ArrowRight, Shield, Zap, Clock, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setFilter } from '../redux/slices/vehicleSlice';
import { motion } from 'framer-motion';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleExplore = (type) => {
        dispatch(setFilter(type));
        navigate('/explore');
    }

    return (
        <div className="bg-black min-h-screen text-white overflow-hidden">
            
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-20">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2000&auto=format')] bg-cover bg-center opacity-40"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                
                <div className="container mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="max-w-2xl"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md mb-6">
                            <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse"></span>
                            <span className="text-sm font-medium tracking-wide">Premium Fleet Available 24/7</span>
                        </div>
                        <h1 className="text-6xl md:text-7xl font-display font-bold leading-tight mb-6">
                            Drive the <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-amber-600">Extraordinary.</span>
                        </h1>
                        <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-lg">
                            Experience the thrill of the open road with our curated collection of luxury cars and high-performance bikes.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button onClick={() => handleExplore('Car')} className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gold-500 hover:text-black transition-all flex items-center gap-2 group">
                                Rent a Car <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
                            </button>
                            <button onClick={() => handleExplore('Bike')} className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all">
                                Rent a Bike
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Strip */}
            <section className="py-20 bg-black border-y border-white/5">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                         {[
                             { icon: <Zap size={32}/>, title: "Instant Booking", text: "Verified digital process. Get in the driver's seat in minutes." },
                             { icon: <Shield size={32}/>, title: "Full Insurance", text: "Every rental comes with comprehensive coverage for peace of mind." },
                             { icon: <Clock size={32}/>, title: "Flexible Plans", text: "Rent by the hour, day, or week. Extend anytime via the app." }
                         ].map((f, i) => (
                             <div key={i} className="p-6">
                                 <div className="w-16 h-16 mx-auto bg-gray-900 rounded-2xl flex items-center justify-center text-gold-500 mb-6">
                                     {f.icon}
                                 </div>
                                 <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                                 <p className="text-gray-400 leading-relaxed">{f.text}</p>
                             </div>
                         ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
