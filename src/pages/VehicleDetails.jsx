import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, DatePicker, message } from 'antd';
import { createBooking } from '../redux/slices/bookingSlice';
import { ArrowLeft, Check, Calendar, Settings, Shield, Fuel, Star, Share2, Heart, Award, MapPin, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const { RangePicker } = DatePicker;

const VehicleDetails = () => {
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
        return <div className="min-h-screen bg-black flex items-center justify-center text-white">Vehicle not found</div>;
    }

    const handleBooking = () => {
        if (!isAuthenticated) {
            message.warning("Please login to complete your booking");
            navigate('/login', { state: { from: location.pathname } });
            return;
        }

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
        <div className="min-h-screen bg-black text-white pb-20 font-sans">
            {/* Immersive Hero Section */}
            <div className="relative h-[70vh] w-full overflow-hidden">
                <div className="absolute inset-0 bg-black/30 z-10 transition-colors"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                
                {/* Parallax Image */}
                <motion.img 
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                    src={vehicle.image} 
                    alt={vehicle.name} 
                    className="w-full h-full object-cover"
                />
                
                {/* Floating Nav */}
                <nav className="absolute top-0 left-0 w-full z-20 p-6 flex justify-between items-center">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-6 py-3 rounded-full text-white hover:bg-gold-500 hover:text-black transition-all border border-white/10 font-bold"
                    >
                        <ArrowLeft size={20}/> Back
                    </button>
                    <div className="flex gap-4">
                         <button className="w-12 h-12 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-md border border-white/10 hover:bg-white hover:text-black transition-all">
                             <Share2 size={20}/>
                         </button>
                         <button className="w-12 h-12 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-md border border-white/10 hover:bg-white hover:text-red-500 transition-all">
                             <Heart size={20}/>
                         </button>
                    </div>
                </nav>

                {/* Hero Content */}
                <div className="absolute bottom-20 left-0 w-full z-20">
                    <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-end gap-8">
                        <motion.div 
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="max-w-3xl"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <span className="bg-gold-500 text-black text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                                    {vehicle.type} Edition
                                </span>
                                <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                                    <Star size={16} fill="#F59E0B" className="text-amber-500"/> 
                                    <span className="text-white font-bold">{vehicle.rating}</span>
                                    <span className="text-gray-400 text-sm">(50+ Reviews)</span>
                                </div>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-display font-bold text-white mb-2 tracking-tight">{vehicle.name}</h1>
                            <div className="flex items-center gap-6 text-lg text-gray-300">
                                <span className="flex items-center gap-2"><MapPin size={18} className="text-gold-500"/> Los Angeles, CA</span>
                                <span className="flex items-center gap-2"><Award size={18} className="text-gold-500"/> Premium Host</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-30">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 -mt-10">
                    
                    {/* Left Column: Details */}
                    <div className="lg:col-span-2 space-y-12 pt-10">
                        {/* High-End Specifications */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { icon: <Settings size={24}/>, label: "Transmission", val: "Automatic" },
                                { icon: <Fuel size={24}/>, label: "Fuel Type", val: "Petrol 95" },
                                { icon: <Users size={24}/>, label: "Capacity", val: "4 Persons" },
                                { icon: <Shield size={24}/>, label: "Protection", val: "Premium" }
                            ].map((spec, i) => (
                                <motion.div 
                                    key={i} 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-dark-900/50 backdrop-blur border border-white/10 p-6 rounded-3xl flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors group"
                                >
                                    <div className="w-12 h-12 rounded-full bg-black border border-white/10 flex items-center justify-center text-gold-500 mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-black">
                                        {spec.icon}
                                    </div>
                                    <span className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">{spec.label}</span>
                                    <span className="text-white font-display font-bold text-lg">{spec.val}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Story / Description */}
                        <div className="bg-dark-900/30 border border-white/5 p-8 rounded-[2rem]">
                            <h3 className="text-3xl font-display font-bold mb-6">The Experience</h3>
                            <p className="text-gray-400 leading-8 text-lg">
                                Command the road in the {vehicle.name}, a masterpiece of engineering designed for those who refuse to compromise. 
                                Whether you're navigating urban canyons or coastal highways, this vehicle delivers responsive performance and 
                                first-class comfort. Equipped with the Premium Tech Package including autonomous driving assists and a concert-hall 
                                sound system.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Premium Booking Card */}
                    <div className="lg:col-span-1 relative">
                        <div className="sticky top-28">
                             <div className="absolute inset-0 bg-gold-500/10 blur-[60px] rounded-full opacity-40"></div>
                             
                             <div className="bg-[#0A0A0A] border border-white/10 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden backdrop-blur-xl">
                                {/* Decorative Gradient Line */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent"></div>

                                <div className="flex justify-between items-end mb-8">
                                    <div>
                                        <p className="text-gray-400 font-medium mb-1">Daily Rate</p>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-4xl font-bold font-display text-white">₹{vehicle.price || vehicle.pricePerDay}</span>
                                            <span className="text-gray-500">/day</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                         <span className="text-gold-500 text-xs font-bold uppercase tracking-wider flex items-center gap-1 justify-end mb-1">
                                            <Check size={12}/> Best Price
                                         </span>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="text-sm font-bold text-white mb-3 block pl-1">Select Dates</label>
                                        <RangePicker 
                                            className="w-full h-14 !bg-white/5 !border !border-white/10 text-white rounded-2xl hover:!border-gold-500 focus:!border-gold-500 transition-all shadow-inner" 
                                            popupClassName="dark-picker"
                                            onChange={setDates}
                                            separator={<span className="text-gray-500">-</span>}
                                        />
                                    </div>

                                    {dates ? (
                                        <motion.div 
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="bg-white/5 rounded-2xl p-5 border border-white/5 space-y-4"
                                        >
                                            <div className="flex justify-between text-sm text-gray-400">
                                                <span>{dates[1].diff(dates[0], 'days')} Days x ₹{vehicle.price || vehicle.pricePerDay}</span>
                                                <span className="text-white">₹{(vehicle.price || vehicle.pricePerDay) * dates[1].diff(dates[0], 'days')}</span>
                                            </div>
                                            <div className="flex justify-between text-sm text-gray-400">
                                                <span>Taxes & Fees</span>
                                                <span className="text-white">$0</span>
                                            </div>
                                            <div className="border-t border-white/10 pt-4 flex justify-between font-bold text-white text-lg">
                                                <span>Total</span>
                                                <span className="text-gold-500">₹{(vehicle.price || vehicle.pricePerDay) * dates[1].diff(dates[0], 'days')}</span>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <div className="bg-white/5 rounded-2xl p-5 border border-white/5 text-center text-gray-500 text-sm">
                                            Select dates to see total
                                        </div>
                                    )}

                                    <Button 
                                        block 
                                        size="large"
                                        onClick={handleBooking}
                                        loading={loading}
                                        className="h-16 bg-gradient-to-r from-gold-500 to-amber-500 hover:from-white hover:to-white text-black font-display font-bold text-xl rounded-2xl border-none shadow-[0_10px_30px_rgba(212,175,55,0.2)] hover:shadow-[0_10px_40px_rgba(212,175,55,0.4)] transition-all transform hover:-translate-y-1"
                                    >
                                        Book Now
                                    </Button>
                                    
                                    <div className="flex justify-center items-center gap-2 text-xs text-gray-500 mt-4">
                                        <Shield size={12}/> Secure Payment • Free Cancellation
                                    </div>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleDetails;
