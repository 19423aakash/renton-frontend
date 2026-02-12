import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { ArrowUp, ArrowDown, DollarSign, Calendar, TrendingUp } from 'lucide-react';

const Analytics = () => {
    // Mock Data
    const earningsData = [
        { name: 'Jan', amount: 4000 },
        { name: 'Feb', amount: 3000 },
        { name: 'Mar', amount: 5000 },
        { name: 'Apr', amount: 2780 },
        { name: 'May', amount: 1890 },
        { name: 'Jun', amount: 2390 },
        { name: 'Jul', amount: 3490 },
        { name: 'Aug', amount: 5500 },
        { name: 'Sep', amount: 6000 },
        { name: 'Oct', amount: 4500 },
        { name: 'Nov', amount: 7000 },
        { name: 'Dec', amount: 8000 },
    ];

    const vehicleTypeData = [
        { name: 'Luxury Cars', value: 400 },
        { name: 'Sports Bikes', value: 300 },
        { name: 'SUVs', value: 300 },
        { name: 'Electric', value: 200 },
    ];

    const COLORS = ['#D4AF37', '#F59E0B', '#F97316', '#FFFFFF'];

    const StatCard = ({ title, value, change, icon: Icon, isPositive }) => (
        <div className="bg-dark-900 border border-white/5 p-6 rounded-2xl hover:bg-white/5 transition-colors group">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/5 rounded-xl text-gold-500 group-hover:bg-gold-500 group-hover:text-black transition-colors">
                    <Icon size={24} />
                </div>
                <span className={`text-sm font-bold flex items-center gap-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {change} {isPositive ? <ArrowUp size={14}/> : <ArrowDown size={14}/>}
                </span>
            </div>
            <p className="text-gray-400 text-sm mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-white">{value}</h3>
        </div>
    );

    return (
        <div className="space-y-8">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard title="Total Spent" value="$12,450" change="+12%" icon={DollarSign} isPositive={true} />
                <StatCard title="Total Trips" value="24" change="+5%" icon={Calendar} isPositive={true} />
                <StatCard title="Avg. Trip Cost" value="$518" change="-2%" icon={TrendingUp} isPositive={false} />
                <StatCard title="Reward Points" value="2,400" change="+150" icon={Users} isPositive={true} />
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Earnings Chart */}
                <div className="lg:col-span-2 bg-dark-900 border border-white/5 p-6 rounded-3xl">
                    <h3 className="text-xl font-bold text-white mb-6">Spending Overview</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={earningsData}>
                                <defs>
                                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="name" stroke="#666" tick={{fill: '#666'}} axisLine={false} tickLine={false} />
                                <YAxis stroke="#666" tick={{fill: '#666'}} axisLine={false} tickLine={false} prefix="$" />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="amount" stroke="#D4AF37" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie Chart */}
                <div className="lg:col-span-1 bg-dark-900 border border-white/5 p-6 rounded-3xl">
                     <h3 className="text-xl font-bold text-white mb-6">Vehicle Preferences</h3>
                     <div className="h-[300px] w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={vehicleTypeData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {vehicleTypeData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}/>
                            </PieChart>
                        </ResponsiveContainer>
                     </div>
                     <div className="flex flex-wrap justify-center gap-4 mt-4">
                         {vehicleTypeData.map((entry, index) => (
                             <div key={index} className="flex items-center gap-2">
                                 <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                                 <span className="text-xs text-gray-400">{entry.name}</span>
                             </div>
                         ))}
                     </div>
                </div>
            </div>
            
            <div className="bg-dark-900 border border-white/5 p-6 rounded-3xl">
                <h3 className="text-xl font-bold text-white mb-6">Rental Frequency</h3>
                 <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={earningsData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="name" stroke="#666" tick={{fill: '#666'}} axisLine={false} tickLine={false} />
                                <Tooltip 
                                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                                    contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                                />
                                <Bar dataKey="amount" fill="#F97316" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
            </div>
        </div>
    );
};

// Simple User Icon replacement since I forgot to import it
const Users = ({size}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
);

export default Analytics;
