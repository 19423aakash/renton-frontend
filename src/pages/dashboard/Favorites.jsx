import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, Fuel, Settings, Users, ArrowRight, Trash2 } from 'lucide-react';
import { toggleFavoriteAsync } from '../../redux/slices/favoritesSlice';

const Favorites = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items } = useSelector((state) => state.favorites);
    const { vehicles } = useSelector((state) => state.vehicles);
    
    // Filter full vehicle objects
    const favoriteVehicles = vehicles.filter(v => items.includes(v.id));

    if (favoriteVehicles.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                <div className="w-24 h-24 bg-dark-900 rounded-full flex items-center justify-center mb-6">
                    <Heart size={40} className="text-gray-600" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">No Favorites Yet</h2>
                <p className="text-gray-400 mb-8 max-w-md">Start exploring our fleet and save your dream machines here for quick access.</p>
                <button 
                    onClick={() => navigate('/dashboard/explore')}
                    className="px-8 py-3 bg-gold-500 text-black font-bold rounded-xl hover:bg-white transition-colors"
                >
                    Explore Vehicles
                </button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {favoriteVehicles.map((vehicle, index) => (
                <motion.div
                    key={vehicle.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }} 
                    className="bg-dark-900 border border-white/5 rounded-3xl overflow-hidden group hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] transition-all"
                >
                    <div className="relative h-48 overflow-hidden">
                        <img 
                            src={vehicle.image} 
                            alt={vehicle.name} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-80"></div>
                        
                        <button 
                            onClick={() => dispatch(toggleFavoriteAsync(vehicle.id))}
                            className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-red-500 hover:bg-white hover:text-red-600 transition-colors"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>

                    <div className="p-5">
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="text-xl font-bold text-white truncate pr-2">{vehicle.name}</h3>
                            <span className="text-gold-500 font-bold whitespace-nowrap">₹{vehicle.price || vehicle.pricePerDay}<span className="text-xs text-gray-500">/d</span></span>
                        </div>

                        <div className="flex gap-3 mb-6 border-t border-white/5 pt-3">
                            <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                                <Fuel size={12}/> <span>Petrol</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                                <Settings size={12}/> <span>Auto</span>
                            </div>
                        </div>

                        <button 
                            onClick={() => navigate(`/dashboard/vehicle/${vehicle.id}`)}
                            className="w-full py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-gold-500 hover:text-black hover:border-gold-500 transition-all flex items-center justify-center gap-2"
                        >
                            View Details <ArrowRight size={16} />
                        </button>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default Favorites;
