import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, ShieldCheck, CreditCard } from 'lucide-react';
import { fetchMyBookings, cancelBooking, updateBooking } from '../../redux/slices/bookingSlice';

const Overview = () => {
    const { bookings } = useSelector((state) => state.bookings);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchMyBookings());
    }, [dispatch]);

    // Mock active rental
    const activeRental = null; 

    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-dark-900 p-6 rounded-2xl border border-white/5 hover:border-gold-500/30 transition-all">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl"><Calendar size={20}/></div>
                        <span className="text-gray-400 text-sm font-medium">Total Bookings</span>
                    </div>
                    <p className="text-3xl font-bold text-white pl-2">{bookings.length}</p>
                    </div>

                    <div className="bg-dark-900 p-6 rounded-2xl border border-white/5 hover:border-gold-500/30 transition-all">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-3 bg-red-500/10 text-red-500 rounded-xl"><Clock size={20}/></div>
                        <span className="text-gray-400 text-sm font-medium">Active Rentals</span>
                    </div>
                    <p className="text-3xl font-bold text-white pl-2">{activeRental ? 1 : 0}</p>
                    </div>

                    <div className="bg-dark-900 p-6 rounded-2xl border border-white/5 hover:border-gold-500/30 transition-all">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-3 bg-green-500/10 text-green-500 rounded-xl"><ShieldCheck size={20}/></div>
                        <span className="text-gray-400 text-sm font-medium">Safe Miles</span>
                    </div>
                    <p className="text-3xl font-bold text-white pl-2">1,240</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-gold-600 to-amber-600 p-6 rounded-2xl border-none shadow-[0_10px_30px_rgba(212,175,55,0.2)]">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-3 bg-black/20 text-white rounded-xl"><CreditCard size={20}/></div>
                        <span className="text-white/80 text-sm font-medium">Reward Points</span>
                    </div>
                    <p className="text-3xl font-bold text-white pl-2">850</p>
                    </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Bookings - Takes up 2 cols */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-white">Recent Activity</h2>
                    </div>
                    
                    {bookings.length > 0 ? (
                        <div className="space-y-4">
                            {bookings.map((booking) => (
                                <div key={booking.id} className="bg-dark-900 p-4 rounded-2xl border border-white/5 flex flex-col sm:flex-row items-center gap-6 hover:bg-white/5 transition-colors relative">
                                    <div className="w-full sm:w-32 h-20 rounded-xl overflow-hidden flex-shrink-0">
                                        <img src={booking.image?.startsWith('http') ? booking.image : `${import.meta.env.VITE_API_URL}${booking.image}`} className="w-full h-full object-cover" alt="Vehicle"/>
                                    </div>
                                    <div className="flex-grow text-center sm:text-left">
                                        <h3 className="font-bold text-lg text-white">{booking.vehicleName}</h3>
                                        <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-500 mt-1">
                                            <Calendar size={14}/> {booking.startDate} - {booking.endDate}
                                        </div>
                                    </div>
                                    <div className="text-center sm:text-right flex flex-col items-center sm:items-end gap-2">
                                        <p className="text-lg font-bold text-gold-500">₹{booking.totalPrice}</p>
                                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${booking.status === 'Completed' ? 'bg-green-500/10 text-green-500' : booking.status === 'Cancelled' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'}`}>
                                            {booking.status}
                                        </span>
                                        {booking.status !== 'Cancelled' && booking.status !== 'Completed' && (
                                            <div className="flex gap-2 mt-2">
                                                 <button 
                                                    onClick={() => {
                                                        const newStart = prompt("Enter new start date (YYYY-MM-DD)", booking.startDate);
                                                        const newEnd = prompt("Enter new end date (YYYY-MM-DD)", booking.endDate);
                                                        if (newStart && newEnd) {
                                                            dispatch(updateBooking({ id: booking.id, bookingData: { startDate: newStart, endDate: newEnd } }));
                                                        }
                                                    }}
                                                    className="px-3 py-1 bg-white/10 text-white text-xs rounded hover:bg-white/20 transition-colors"
                                                >
                                                    Change Dates
                                                </button>
                                                <button 
                                                    onClick={() => {
                                                        if(window.confirm('Are you sure you want to cancel this booking?')) {
                                                            dispatch(cancelBooking(booking.id));
                                                        }
                                                    }}
                                                    className="px-3 py-1 bg-red-500/10 text-red-500 text-xs rounded hover:bg-red-500/20 transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                            <div className="bg-dark-900 rounded-2xl p-12 text-center border border-dashed border-white/10">
                            <p className="text-gray-500 mb-4">No booking history yet.</p>
                            <button onClick={() => navigate('/dashboard/explore')} className="text-gold-500 hover:text-white font-medium">Browse Vehicles</button>
                            </div>
                    )}
                </div>

                {/* Promo / Banner - Right Col */}
                <div className="space-y-8">
                        <div className="bg-gradient-to-br from-dark-800 to-dark-900 p-8 rounded-[2rem] border border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 blur-[50px] rounded-full"></div>
                            <h3 className="text-xl font-bold text-white mb-4 relative z-10">Upgrade to Platinum</h3>
                            <p className="text-gray-400 text-sm mb-6 relative z-10">Get 50% off insurance and free delivery on all rentals.</p>
                            <button disabled className="w-full py-3 bg-white/5 border border-white/10 text-white/50 rounded-xl cursor-not-allowed font-bold text-sm relative z-10 transition-all">
                                Coming Soon
                            </button>
                        </div>

                        {activeRental ? (
                            <div className="bg-dark-900 p-6 rounded-2xl border border-white/5 border-l-4 border-l-green-500">
                                <h4 className="font-bold text-white mb-2">Active Rental</h4>
                                <p className="text-sm text-gray-400 mb-4">You have a vehicle currently picked up.</p>
                                <button className="text-green-500 text-sm font-bold flex items-center gap-1">View Details <ArrowRight size={14}/></button>
                            </div>
                        ) : (
                            <div className="bg-dark-900 p-6 rounded-2xl border border-white/5 border-l-4 border-l-brand-orange">
                                <h4 className="font-bold text-white mb-2">No Active Rentals</h4>
                                <p className="text-sm text-gray-400">Ready for your next trip?</p>
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
};

export default Overview;
