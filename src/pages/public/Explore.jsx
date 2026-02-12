import { useState, useEffect } from 'react';
import api from '../../api/client';
import VehicleCard from '../../components/VehicleCard';
import { Search, SlidersHorizontal, Loader2 } from 'lucide-react';

const Explore = () => {
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const { data } = await api.get('/vehicles');
                setVehicles(data);
            } catch (err) {
                setError('Failed to load vehicles');
                console.error(err);
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
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="animate-spin text-primary" size={40} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-bold font-display text-gray-900 mb-4">Explore Our Fleet</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">Find the perfect vehicle for your needs. From sporty cars to efficient bikes, we have it all.</p>
                </div>

                {/* Filters and Search */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-10 flex flex-col md:flex-row justify-between items-center gap-4">

                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none text-gray-700"
                        />
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                        <span className="flex items-center gap-1 text-gray-500 text-sm font-medium whitespace-nowrap">
                            <SlidersHorizontal size={16} /> Filter by:
                        </span>
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${filter === 'all' ? 'bg-primary text-white shadow-md' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                        >
                            All Vehicles
                        </button>
                        <button
                            onClick={() => setFilter('car')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${filter === 'car' ? 'bg-primary text-white shadow-md' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                        >
                            Cars
                        </button>
                        <button
                            onClick={() => setFilter('bike')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${filter === 'bike' ? 'bg-primary text-white shadow-md' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                        >
                            Motorbikes
                        </button>
                    </div>
                </div>

                {/* Grid */}
                {filteredVehicles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredVehicles.map((vehicle) => (
                            <VehicleCard key={vehicle.id} vehicle={vehicle} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                            <Search size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No vehicles found</h3>
                        <p className="text-gray-500">Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Explore;
