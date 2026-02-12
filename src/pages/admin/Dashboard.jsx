import React, { useEffect, useState } from 'react';
import { Users, Car, Calendar, DollarSign } from 'lucide-react';

// Mock data or fetch real stats later
const AdminDashboard = () => {
    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white">Dashboard Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-dark-900 p-6 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl"><Users size={20}/></div>
                        <span className="text-gray-400 text-sm font-medium">Total Users</span>
                    </div>
                    <p className="text-3xl font-bold text-white pl-2">1,234</p>
                </div>
                
                 <div className="bg-dark-900 p-6 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-3 bg-gold-500/10 text-gold-500 rounded-xl"><Car size={20}/></div>
                        <span className="text-gray-400 text-sm font-medium">Total Vehicles</span>
                    </div>
                    <p className="text-3xl font-bold text-white pl-2">45</p>
                </div>

                 <div className="bg-dark-900 p-6 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-3 bg-green-500/10 text-green-500 rounded-xl"><DollarSign size={20}/></div>
                        <span className="text-gray-400 text-sm font-medium">Revenue</span>
                    </div>
                    <p className="text-3xl font-bold text-white pl-2">$12,450</p>
                </div>

                 <div className="bg-dark-900 p-6 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-3 bg-purple-500/10 text-purple-500 rounded-xl"><Calendar size={20}/></div>
                        <span className="text-gray-400 text-sm font-medium">Active Bookings</span>
                    </div>
                    <p className="text-3xl font-bold text-white pl-2">28</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
