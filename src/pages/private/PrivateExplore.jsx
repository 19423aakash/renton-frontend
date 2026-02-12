import { useState, useEffect } from 'react';
import api from '../../api/client';
import { Search, SlidersHorizontal, Fuel, Gauge, ArrowRight, Loader2 } from 'lucide-react';

const PrivateExplore = () => {
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const { data } = await api.get('/vehicles');
                setVehicles(data);
            } catch (err) {
                console.error("Failed to load vehicles", err);
            } finally {
                setLoading(false);
            }
        };

        fetchVehicles();
    }, []);

    const filteredVehicles = vehicles.filter((vehicle) => {
        const matchesFilter = filter === 'all' || vehicle.type === filter;
        const matchesSearch = vehicle.name.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    if (loading) {
        return (
            <div className="h-96 flex items-center justify-center">
                <Loader2 className="animate-spin text-primary" size={40} />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-display text-white">Marketplace</h1>
                    <p className="text-gray-400">Discover and book from our premium fleet.</p>
                </div>

                {/* Filters */}
                <div className="flex bg-gray-900 p-1 rounded-lg border border-gray-800 w-fit">
                    {['all', 'car', 'bike'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilter(type)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all capitalize ${filter === type
                                ? 'bg-gray-800 text-white shadow-sm'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            {type === 'all' ? 'All Vehicles' : type + 's'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Search and Advanced Filters Bar */}
            <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by vehicle name..."
                        className="w-full bg-black border border-gray-800 rounded-lg py-2.5 pl-10 pr-4 text-gray-300 focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none text-sm placeholder:text-gray-600"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-black border border-gray-800 rounded-lg text-gray-400 hover:text-white hover:border-gray-700 transition-all text-sm font-medium">
                    <SlidersHorizontal size={18} />
                    Filters
                </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredVehicles.map((vehicle) => (
                    <div key={vehicle.id} className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden group hover:border-gray-700 hover:shadow-2xl hover:shadow-black/50 transition-all duration-300 flex flex-col">
                        <div className="h-48 relative overflow-hidden">
                            <img
                                src={vehicle.image}
                                alt={vehicle.name}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>

                            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10 uppercase tracking-wide">
                                {vehicle.type}
                            </div>

                            {!vehicle.available && (
                                <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px] flex items-center justify-center">
                                    <span className="text-white font-bold text-sm uppercase tracking-widest border border-white/20 px-4 py-2 rounded bg-black/50">Rented</span>
                                </div>
                            )}
                        </div>

                        <div className="p-5 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{vehicle.name}</h3>
                                <div className="text-right">
                                    <span className="text-xl font-bold text-white">₹{vehicle.price}</span>
                                    <span className="text-gray-500 text-xs block">/day</span>
                                </div>
                            </div>

                            <p className="text-gray-500 text-sm mb-4 line-clamp-2">{vehicle.description}</p>

                            <div className="flex items-center gap-4 mb-6 text-xs text-gray-400 font-medium">
                                <div className="flex items-center gap-1.5 bg-black/50 px-2 py-1 rounded">
                                    <Fuel size={14} className="text-primary" />
                                    <span>Petrol</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-black/50 px-2 py-1 rounded">
                                    <Gauge size={14} className="text-primary" />
                                    <span>Auto</span>
                                </div>
                            </div>

                            <button
                                disabled={!vehicle.available}
                                className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 mt-auto ${vehicle.available
                                    ? 'bg-white text-black hover:bg-primary hover:text-white'
                                    : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                {vehicle.available ? <>Rent Now <ArrowRight size={16} /></> : 'Unavailable'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PrivateExplore;
