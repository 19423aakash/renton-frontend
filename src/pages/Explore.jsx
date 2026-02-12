import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../redux/slices/vehicleSlice';
import { Button } from 'antd';
import { Search, Filter, Fuel, Settings, Users, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Explore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { filteredVehicles, filterType } = useSelector((state) => state.vehicles);

  const handleTabChange = (key) => {
    dispatch(setFilter(key));
  };

  return (
    <div className="min-h-screen bg-black text-white py-12">
      {/* Header Section */}
      <div className="container mx-auto px-6 md:px-12 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-gray-800 pb-8">
              <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Drive</h1>
                  <p className="text-gray-400 max-w-lg">Browse our extensive collection of premium vehicles. From city commuters to highway cruisers.</p>
              </div>
              
              {/* Search Bar */}
              <div className="w-full md:w-auto relative">
                  <input 
                      type="text" 
                      placeholder="Search vehicles..." 
                      className="w-full md:w-80 bg-gray-900 border border-gray-800 text-white pl-12 pr-4 py-3 rounded-full focus:outline-none focus:border-gold-500 transition-colors"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              </div>
          </div>
      </div>

      <div className="container mx-auto px-6 md:px-12">
        {/* Filters */}
        <div className="flex gap-4 mb-10 overflow-x-auto pb-2">
            {['All', 'Car', 'Bike'].map((type) => (
                <button
                    key={type}
                    onClick={() => handleTabChange(type)}
                    className={`px-6 py-2 rounded-full font-bold text-sm transition-all border ${
                        filterType === type 
                        ? 'bg-gold-500 text-black border-gold-500' 
                        : 'bg-transparent text-gray-400 border-gray-800 hover:border-white hover:text-white'
                    }`}
                >
                    {type === 'All' ? 'View All' : `${type}s`}
                </button>
            ))}
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVehicles.map((vehicle, index) => (
            <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }} 
                className="bg-gray-900 rounded-3xl overflow-hidden group hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] transition-all duration-300"
            >
                {/* Image Area */}
                <div className="relative h-64 overflow-hidden">
                    <img 
                        src={vehicle.image} 
                        alt={vehicle.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80"></div>
                    
                    {/* Floating Price Tag */}
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                        <span className="text-gold-500 font-bold">₹{vehicle.price || vehicle.pricePerDay}</span>
                        <span className="text-xs text-gray-400">/day</span>
                    </div>

                    <div className="absolute bottom-4 left-4">
                        <span className="bg-gold-500 text-black text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">{vehicle.type}</span>
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-bold text-white">{vehicle.name}</h3>
                        <div className="flex items-center gap-1">
                             <span className="text-gold-500">★</span>
                             <span className="text-gray-300 font-bold text-sm">{vehicle.rating}</span>
                        </div>
                    </div>

                    {/* Quick Specs */}
                    <div className="flex gap-4 mb-8 border-t border-gray-800 pt-4">
                        <div className="flex items-center gap-2 text-gray-500 text-xs">
                            <Fuel size={14}/> <span>Petrol</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 text-xs">
                            <Settings size={14}/> <span>Auto</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 text-xs">
                            <Users size={14}/> <span>4 Seats</span>
                        </div>
                    </div>

                    <button 
                        onClick={() => navigate(`/vehicle/${vehicle.id}`)}
                        className="w-full py-4 bg-black border border-gray-800 text-white font-bold rounded-xl hover:bg-gold-500 hover:text-black hover:border-gold-500 transition-all flex items-center justify-center gap-2 group-hover:translate-x-1"
                    >
                        View Details <ArrowRight size={18} />
                    </button>
                </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
