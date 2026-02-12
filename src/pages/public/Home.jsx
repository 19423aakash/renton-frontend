import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../../api/client';
import VehicleCard from '../../components/VehicleCard';
import { ArrowRight, Star, Shield, Cpu } from 'lucide-react';
import heroImg from '../../assets/images/hero-car.jpg';

const Home = () => {
    const [featuredVehicles, setFeaturedVehicles] = useState([]);

    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [vehiclesRes, servicesRes] = await Promise.all([
                    api.get('/vehicles'),
                    api.get('/services')
                ]);
                setFeaturedVehicles(vehiclesRes.data.slice(0, 3));
                setServices(servicesRes.data);
            } catch (err) {
                console.error('Failed to load data', err);
            }
        };

        fetchData();
    }, []);

    const getIcon = (iconName) => {
        switch (iconName) {
            case 'Car': return <Star size={28} />;
            case 'Tag': return <Shield size={28} />;
            case 'Phone': return <Cpu size={28} />;
            default: return <Star size={28} />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-secondary py-20 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20">
                    <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-primary to-transparent transform skew-x-12 translate-x-20"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            Drive Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Dreams</span> Today
                        </h1>
                        <p className="text-slate-300 text-lg md:text-xl mb-8 leading-relaxed max-w-lg mx-auto md:mx-0">
                            Rent top-rated cars and motorbikes at unbeatable prices. Flexible plans, no hidden fees, and premium 24/7 support.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Link to="/explore" className="bg-primary hover:bg-orange-600 text-white px-8 py-3 rounded-full font-bold text-lg transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2">
                                Explore Fleet <ArrowRight size={20} />
                            </Link>
                            <Link to="/about" className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-full font-bold text-lg transition-all border border-slate-700">
                                Learn More
                            </Link>
                        </div>

                        <div className="mt-12 flex items-center justify-center md:justify-start gap-8 text-slate-400">
                            <div className="text-center md:text-left">
                                <p className="text-3xl font-bold text-white">50+</p>
                                <p className="text-sm">Vehicles</p>
                            </div>
                            <div className="w-px h-10 bg-slate-700"></div>
                            <div className="text-center md:text-left">
                                <p className="text-3xl font-bold text-white">2k+</p>
                                <p className="text-sm">Happy Users</p>
                            </div>
                            <div className="w-px h-10 bg-slate-700"></div>
                            <div className="text-center md:text-left">
                                <p className="text-3xl font-bold text-white">4.9</p>
                                <p className="text-sm">Rating</p>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <img
                            src={heroImg}
                            alt="Hero Car"
                            className="rounded-2xl shadow-2xl shadow-primary/20 transform md:-rotate-2 hover:rotate-0 transition-transform duration-700"
                        />
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose RentOn?</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">We offer more than just vehicles; we offer a seamless rental experience designed for your convenience.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div key={service.id} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                                <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center mb-6 text-primary">
                                    {getIcon(service.icon)}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                                <p className="text-slate-500 leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Vehicles */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-2">Featured Fleet</h2>
                            <p className="text-slate-600">Top picks for this week.</p>
                        </div>
                        <Link to="/explore" className="hidden md:flex items-center gap-2 text-primary font-bold hover:underline">
                            View All <ArrowRight size={18} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredVehicles.map((vehicle) => (
                            <VehicleCard key={vehicle.id} vehicle={vehicle} />
                        ))}
                    </div>

                    <div className="mt-12 text-center md:hidden">
                        <Link to="/explore" className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 font-bold py-3 px-6 rounded-lg shadow-sm">
                            View All Vehicles <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-primary text-white text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to hit the road?</h2>
                    <p className="text-orange-100 text-lg mb-10 max-w-2xl mx-auto">Join thousands of satisfied customers who trust RentOn for their daily commutes and weekend adventures.</p>
                    <Link to="/login" className="bg-white text-primary px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-gray-100 transition-colors">
                        Get Started Now
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
