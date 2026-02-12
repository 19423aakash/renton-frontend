import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, DatePicker, message } from 'antd';
import { createBooking } from '../../redux/slices/bookingSlice';
import { ArrowLeft, Check, Calendar, Settings, Shield, Fuel, Star, Share2, Heart, Award, MapPin, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const { RangePicker } = DatePicker;

const DashboardVehicleDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { vehicles } = useSelector((state) => state.vehicles);
    const { isAuthenticated } = useSelector((state) => state.auth);
    
    const vehicle = vehicles.find(v => v.id === id);
    const [dates, setDates] = useState(null);
    const [loading, setLoading] = useState(false);

    if (!vehicle) {
        return <div className="min-h-[50vh] flex items-center justify-center text-white">Vehicle not found</div>;
    }
    const handleBooking = () => {
        if (!dates) {
            message.error('Please select booking dates');
            return;
        }

        const bookingData = {
            vehicleId: vehicle.id,
            startDate: dates[0].format('YYYY-MM-DD'),
            endDate: dates[1].format('YYYY-MM-DD'),
            totalPrice: (vehicle.price || vehicle.pricePerDay) * dates[1].diff(dates[0], 'days'),
        };

        setLoading(true);
        dispatch(createBooking(bookingData))
            .unwrap()
            .then(() => {
                message.success('Booking Confirmed! Enjoy your ride.');
                navigate('/dashboard');
            })
            .catch((err) => {
                message.error(err || 'Booking failed');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="text-white font-sans pb-10">
            {/* Immersive Hero Section */}
            <div className="relative h-[50vh] w-full overflow-hidden rounded-3xl border border-white/10 mb-8 group">
                <div className="absolute inset-0 bg-black/20 z-10 transition-colors"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent z-10"></div>
                
                {/* Parallax Image */}
                <motion.img 
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                    src={vehicle.image} 
                    alt={vehicle.name} 
                    className="w-full h-full object-cover"
                />
                
                {/* Back Button Overlay */}
                <button 
                    onClick={() => navigate(-1)} 
                    className="absolute top-6 left-6 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full text-white hover:bg-gold-500 hover:text-black transition-all border border-white/10 font-bold"
                >
                    <ArrowLeft size={18}/> Back
                </button>

                {/* Hero Content */}
                <div className="absolute bottom-10 left-0 w-full z-20 px-8">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                        <motion.div 
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="max-w-3xl"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <span className="bg-gold-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    {vehicle.type} Edition
                                </span>
                                <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                                    <Star size={14} fill="#F59E0B" className="text-amber-500"/> 
                                    <span className="text-white font-bold text-sm">{vehicle.rating}</span>
                                </div>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-2 tracking-tight">{vehicle.name}</h1>
                            <div className="flex items-center gap-6 text-base text-gray-300">
                                <span className="flex items-center gap-2"><MapPin size={16} className="text-gold-500"/> Los Angeles, CA</span>
                                <span className="flex items-center gap-2"><Award size={16} className="text-gold-500"/> Premium Host</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Column: Details */}
                <div className="lg:col-span-2 space-y-8">
                    {/* High-End Specifications */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { icon: <Settings size={20}/>, label: "Transmission", val: "Automatic" },
                            { icon: <Fuel size={20}/>, label: "Fuel Type", val: "Petrol 95" },
                            { icon: <Users size={20}/>, label: "Capacity", val: "4 Persons" },
                            { icon: <Shield size={20}/>, label: "Protection", val: "Premium" }
                        ].map((spec, i) => (
                            <div 
                                key={i} 
                                className="bg-dark-900 border border-white/5 p-4 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors"
                            >
                                <div className="text-gold-500 mb-2">
                                    {spec.icon}
                                </div>
                                <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">{spec.label}</span>
                                <span className="text-white font-display font-bold text-md">{spec.val}</span>
                            </div>
                        ))}
                    </div>

                    {/* Story / Description */}
                    <div className="bg-dark-900 border border-white/5 p-8 rounded-3xl">
                        <h3 className="text-2xl font-display font-bold mb-4">The Experience</h3>
                        <p className="text-gray-400 leading-7">
                            Command the road in the {vehicle.name}, a masterpiece of engineering designed for those who refuse to compromise. 
                            Whether you're navigating urban canyons or coastal highways, this vehicle delivers responsive performance and 
                            first-class comfort. Equipped with the Premium Tech Package including autonomous driving assists and a concert-hall 
                            sound system.
                        </p>
                    </div>
                </div>

                {/* Right Column: Premium Booking Card */}
                <div className="lg:col-span-1">
                     <div className="bg-dark-900 border border-white/10 p-6 rounded-3xl shadow-xl relative overflow-hidden backdrop-blur-xl sticky top-4">
                        <div className="flex justify-between items-end mb-6">
                            <div>
                                <p className="text-gray-400 font-medium mb-1 text-sm">Daily Rate</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-bold font-display text-white">₹{vehicle.price || vehicle.pricePerDay}</span>
                                    <span className="text-gray-500 text-sm">/day</span>
                                </div>
                            </div>
                            <div className="text-right">
                                 <span className="text-gold-500 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 justify-end mb-1">
                                    <Check size={10}/> Best Price
                                 </span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-white mb-2 block pl-1">Select Dates</label>
                                <RangePicker 
                                    className="w-full h-12 !bg-white/5 !border !border-white/10 text-white rounded-xl hover:!border-gold-500 focus:!border-gold-500 transition-all shadow-inner" 
                                    popupClassName="dark-picker"
                                    onChange={setDates}
                                    separator={<span className="text-gray-500">-</span>}
                                />
                            </div>

                            {dates ? (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="bg-white/5 rounded-xl p-4 border border-white/5 space-y-3"
                                >
                                    <div className="flex justify-between text-xs text-gray-400">
                                        <span>{dates[1].diff(dates[0], 'days')} Days x ₹{vehicle.price || vehicle.pricePerDay}</span>
                                        <span className="text-white">₹{(vehicle.price || vehicle.pricePerDay) * dates[1].diff(dates[0], 'days')}</span>
                                    </div>
                                    <div className="border-t border-white/10 pt-3 flex justify-between font-bold text-white text-base">
                                        <span>Total</span>
                                        <span className="text-gold-500">₹{(vehicle.price || vehicle.pricePerDay) * dates[1].diff(dates[0], 'days')}</span>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="bg-white/5 rounded-xl p-4 border border-white/5 text-center text-gray-500 text-xs">
                                    Select dates to see total
                                </div>
                            )}

                            <Button 
                                block 
                                size="large"
                                onClick={handleBooking}
                                loading={loading}
                                className="h-14 bg-gold-500 hover:bg-white text-black font-display font-bold text-lg rounded-xl border-none shadow-lg transition-all"
                            >
                                Book Now
                            </Button>
                            
                            <div className="flex justify-center items-center gap-2 text-[10px] text-gray-500 mt-2">
                                <Shield size={10}/> Secure Payment • Free Cancellation
                            </div>
                        </div>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardVehicleDetails;
