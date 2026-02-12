import { BadgeCheck, Fuel, Gauge } from 'lucide-react';
import { Link } from 'react-router-dom';

const VehicleCard = ({ vehicle }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-black shadow-sm uppercase tracking-wide">
                    {vehicle.type}
                </div>
                {!vehicle.available && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="bg-red-500 text-white px-4 py-1 rounded-full font-bold uppercase tracking-widest text-sm transform -rotate-12 border-2 border-white">
                            Rented Out
                        </span>
                    </div>
                )}
            </div>

            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold font-display text-gray-900 group-hover:text-primary transition-colors">{vehicle.name}</h3>
                </div>

                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{vehicle.description}</p>

                <div className="flex items-center gap-4 mb-4 text-xs text-gray-400 font-medium">
                    <div className="flex items-center gap-1">
                        <Fuel size={14} />
                        <span>Petrol/Electric</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Gauge size={14} />
                        <span>Auto/Manual</span>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-auto">
                    <div>
                        <span className="text-2xl font-bold text-primary">₹{vehicle.price}</span>
                        <span className="text-gray-400 text-sm">/day</span>
                    </div>

                    <button
                        disabled={!vehicle.available}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${vehicle.available
                            ? 'bg-black text-white hover:bg-primary shadow-lg shadow-gray-200 hover:shadow-orange-200'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        {vehicle.available ? 'Rent Now' : 'Unavailable'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VehicleCard;
