import { BarChart3, PieChart, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const Analytics = () => {
    return (
        <div className="space-y-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold font-display text-white mb-2">Analytics</h1>
                <p className="text-gray-400">Track your rental habits and spending.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart 1 Placeholder */}
                <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 lg:col-span-2">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-white">Monthly Spending</h3>
                        <BarChart3 className="text-gray-500" />
                    </div>
                    <div className="h-64 bg-gray-950/50 rounded-lg flex items-end justify-between p-4 gap-2 border border-gray-800">
                        <div className="w-full bg-gray-800 rounded-t-md h-[40%] relative group hover:bg-gray-700 transition-colors">
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">₹1200</div>
                        </div>
                        <div className="w-full bg-gray-800 rounded-t-md h-[60%] relative group hover:bg-gray-700 transition-colors">
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">₹1800</div>
                        </div>
                        <div className="w-full bg-gray-800 rounded-t-md h-[30%] relative group hover:bg-gray-700 transition-colors">
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">₹900</div>
                        </div>
                        <div className="w-full bg-primary/20 rounded-t-md h-[80%] relative group hover:bg-primary/30 transition-colors">
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">₹2400</div>
                        </div>
                        <div className="w-full bg-primary rounded-t-md h-[55%] relative group hover:bg-orange-600 transition-colors">
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">₹1600</div>
                        </div>
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-gray-500 font-medium uppercase tracking-wide">
                        <span>Aug</span>
                        <span>Sep</span>
                        <span>Oct</span>
                        <span>Nov</span>
                        <span>Dec</span>
                    </div>
                </div>

                {/* Stats List */}
                <div className="space-y-6">
                    <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
                        <h3 className="font-bold text-white mb-4">Top Vehicle Types</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-400">Sedan</span>
                                <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                                    <div className="bg-primary h-full w-[70%]"></div>
                                </div>
                                <span className="text-sm font-bold text-white">70%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-400">SUV</span>
                                <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                                    <div className="bg-gray-600 h-full w-[45%]"></div>
                                </div>
                                <span className="text-sm font-bold text-white">45%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-400">Sport</span>
                                <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                                    <div className="bg-gray-700 h-full w-[25%]"></div>
                                </div>
                                <span className="text-sm font-bold text-white">25%</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-green-500/10 text-green-500 rounded-lg">
                                <Activity size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-bold tracking-wide">Total Clean Miles</p>
                                <h3 className="text-2xl font-bold text-white">1,240 <span className="text-sm font-normal text-gray-400">mi</span></h3>
                            </div>
                        </div>
                        <div className="text-sm text-gray-400">
                            You've saved roughly <span className="font-bold text-green-500">250kg</span> of CO2 emission.
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity Table */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center">
                    <h3 className="font-bold text-white">Recent Activity</h3>
                    <button className="text-primary text-sm font-bold hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-400">
                        <thead className="bg-gray-950 text-gray-300 uppercase font-bold text-xs tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Transaction</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            <tr className="hover:bg-gray-800 transition-colors">
                                <td className="px-6 py-4 font-medium text-white">Tata Nexon EV Rental</td>
                                <td className="px-6 py-4">Oct 24, 2023</td>
                                <td className="px-6 py-4"><span className="bg-green-500/10 text-green-500 px-2 py-1 rounded-full text-xs font-bold">Completed</span></td>
                                <td className="px-6 py-4 text-right font-bold text-white">-₹3,500.00</td>
                            </tr>
                            <tr className="hover:bg-gray-800 transition-colors">
                                <td className="px-6 py-4 font-medium text-white">Deposit Refund</td>
                                <td className="px-6 py-4">Oct 22, 2023</td>
                                <td className="px-6 py-4"><span className="bg-green-500/10 text-green-500 px-2 py-1 rounded-full text-xs font-bold">Processed</span></td>
                                <td className="px-6 py-4 text-right font-bold text-green-500">+₹5,000.00</td>
                            </tr>
                            <tr className="hover:bg-gray-800 transition-colors">
                                <td className="px-6 py-4 font-medium text-white">Royal Enfield Classic Rental</td>
                                <td className="px-6 py-4">Oct 15, 2023</td>
                                <td className="px-6 py-4"><span className="bg-green-500/10 text-green-500 px-2 py-1 rounded-full text-xs font-bold">Completed</span></td>
                                <td className="px-6 py-4 text-right font-bold text-white">-₹1,200.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
