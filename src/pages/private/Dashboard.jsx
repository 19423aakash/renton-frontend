import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/client';
import { CreditCard, DollarSign, Calendar, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useAuth();
    const [rentedVehicles, setRentedVehicles] = useState([]);

    useEffect(() => {
        const fetchRentals = async () => {
            try {
                const { data } = await api.get('/vehicles');
                // Mocking active rentals by showing first 2 vehicles
                setRentedVehicles(data.slice(0, 2));
            } catch (err) {
                console.error("Failed to fetch rentals", err);
            }
        };
        fetchRentals();
    }, []);

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold font-display text-white mb-2">Dashboard</h1>
                    <p className="text-gray-400">Welcome back, <span className="text-white font-semibold">{user?.name}</span>. You have new notifications.</p>
                </div>
                <Link to="/private/explore" className="bg-primary hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-bold text-sm transition-all shadow-lg shadow-orange-900/20 flex items-center gap-2">
                    Rent New Vehicle <ArrowRight size={16} />
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 hover:border-gray-700 transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-gray-800 text-primary rounded-xl">
                            <CreditCard size={20} />
                        </div>
                        <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded-full">+12%</span>
                    </div>
                    <h3 className="text-3xl font-bold font-display text-white mb-1">2</h3>
                    <p className="text-gray-500 text-sm font-medium">Active Rentals</p>
                </div>

                <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 hover:border-gray-700 transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-gray-800 text-green-400 rounded-xl">
                            <DollarSign size={20} />
                        </div>
                        <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded-full">+5%</span>
                    </div>
                    <h3 className="text-3xl font-bold font-display text-white mb-1">₹4,500</h3>
                    <p className="text-gray-500 text-sm font-medium">Total Spent</p>
                </div>

                <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 hover:border-gray-700 transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-gray-800 text-purple-400 rounded-xl">
                            <Calendar size={20} />
                        </div>
                        <span className="text-xs font-bold text-gray-400 bg-gray-700 px-2 py-1 rounded-full">0%</span>
                    </div>
                    <h3 className="text-3xl font-bold font-display text-white mb-1">14</h3>
                    <p className="text-gray-500 text-sm font-medium">Days Rented</p>
                </div>

                <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 hover:border-gray-700 transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-gray-800 text-accent rounded-xl">
                            <TrendingUp size={20} />
                        </div>
                        <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded-full">Top 10%</span>
                    </div>
                    <h3 className="text-3xl font-bold font-display text-white mb-1">Gold</h3>
                    <p className="text-gray-500 text-sm font-medium">Member Tier</p>
                </div>
            </div>

            {/* Current Rentals Section */}
            <div>
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-primary rounded-full"></span>
                    Current Active Rentals
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rentedVehicles.map((vehicle) => (
                        // Custom Card Wrapper for Dark Theme
                        <div key={vehicle.id} className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden group hover:border-primary/50 transition-all">
                            <div className="h-48 relative overflow-hidden">
                                <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-gray-700">
                                    {vehicle.type}
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-white mb-1">{vehicle.name}</h3>
                                <p className="text-gray-500 text-sm mb-4 line-clamp-1">{vehicle.description}</p>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                                    <div className="text-xs text-gray-400">
                                        Expires in <span className="text-white font-bold">2 days</span>
                                    </div>
                                    <button className="text-primary text-sm font-bold hover:underline">Extend</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
