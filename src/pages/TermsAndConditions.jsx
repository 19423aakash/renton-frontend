import React from 'react';

const TermsAndConditions = () => {
    return (
        <div className="bg-black min-h-screen text-white pt-24 pb-12 px-6">
            <div className="container mx-auto max-w-4xl">
                <h1 className="text-4xl font-display font-bold mb-8 text-gold-500">Terms and Conditions</h1>
                
                <div className="space-y-6 text-gray-300 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                        <p>Welcome to RentOn. By accessing our website and using our services, you agree to bound by the following terms and conditions.</p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Rental Agreement</h2>
                        <p>The rental contract is between the Renter (User) and RentOn. The vehicle must be returned in the same condition as it was rented.</p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. User Responsibilities</h2>
                        <p>You must hold a valid driver's license and be at least 21 years of age. You are responsible for any fines or penalties incurred during the rental period.</p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Payment and Fees</h2>
                        <p>All payments are due at the time of booking. Security deposits may be required and will be refunded upon safe return of the vehicle.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Cancellation Policy</h2>
                        <p>Cancellations made 24 hours before the booking start time are eligible for a full refund. Late cancellations may incur a fee.</p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">6. Liability</h2>
                        <p>RentOn is not liable for any personal injury or property damage arising from the use of the rented vehicle, except where required by law.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
