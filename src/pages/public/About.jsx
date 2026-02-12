import { Users, Target, ShieldCheck } from 'lucide-react';

const About = () => {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero for About */}
            <div className="bg-secondary text-white py-20 text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-4xl font-bold font-display mb-4">About RentOn</h1>
                    <p className="text-xl text-gray-400">Driving the future of mobility with simplicity and style.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
                    <div>
                        <h2 className="text-3xl font-bold font-display text-gray-900 mb-6">Our Mission</h2>
                        <p className="text-gray-600 text-lg leading-relaxed mb-6">
                            At RentOn, we believe that mobility should be accessible, affordable, and enjoyable for everyone. We started with a simple idea: to make renting a vehicle as easy as ordering a pizza.
                        </p>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Today, we serve thousands of customers, offering a diverse fleet of high-quality cars and motorbikes. Whether it's for a business trip, a weekend getaway, or daily commuting, we have the perfect ride for you.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <img className="rounded-2xl shadow-lg mt-8" src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Team" />
                        <img className="rounded-2xl shadow-lg" src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Car Key" />
                    </div>
                </div>

                <div className="mb-20">
                    <h2 className="text-3xl font-bold font-display text-gray-900 mb-12 text-center">Our Core Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100 text-center hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                                <Users size={32} />
                            </div>
                            <h3 className="text-xl font-bold font-display mb-3 text-gray-900">Customer First</h3>
                            <p className="text-gray-600">Your satisfaction is our top priority. We go the extra mile to ensure a smooth experience.</p>
                        </div>
                        <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100 text-center hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                                <ShieldCheck size={32} />
                            </div>
                            <h3 className="text-xl font-bold font-display mb-3 text-gray-900">Safety & Trust</h3>
                            <p className="text-gray-600">All our vehicles undergo rigorous safety checks regular maintenance.</p>
                        </div>
                        <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100 text-center hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                                <Target size={32} />
                            </div>
                            <h3 className="text-xl font-bold font-display mb-3 text-gray-900">Innovation</h3>
                            <p className="text-gray-600">We constantly innovate our platform to give you the best booking experience.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
