import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="bg-black min-h-screen text-white pt-24 pb-12 px-6">
            <div className="container mx-auto max-w-4xl">
                <h1 className="text-4xl font-display font-bold mb-8 text-gold-500">Privacy Policy</h1>
                
                <div className="space-y-6 text-gray-300 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Information Collection</h2>
                        <p>We collect information you provide directly to us, such as when you create an account, book a vehicle, or contact customer support.</p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
                        <p>We use your information to facilitate bookings, process payments, and improve our services. We do not sell your personal data.</p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Data Security</h2>
                        <p>We implement appropriate security measures to protect your personal information from unauthorized access or disclosure.</p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Cookies</h2>
                        <p>We use cookies to enhance your browsing experience and analyze site traffic. You can control cookie settings in your browser.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Third-Party Services</h2>
                        <p>We may use third-party services for payments and analytics. These providers have their own privacy policies.</p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">6. Contact Us</h2>
                        <p>If you have any questions about this Privacy Policy, please contact us via our support channels.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
