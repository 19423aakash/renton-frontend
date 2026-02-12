import { Mail, MapPin, Phone, Send } from 'lucide-react';

const Contact = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold font-display text-gray-900 mb-4">Get in Touch</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">Have questions or need assistance? Our team is here to help you.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Info */}
                    <div className="lg:col-span-1 bg-white p-8 rounded-2xl shadow-lg border border-gray-100 h-fit">
                        <h3 className="text-2xl font-bold font-display text-gray-900 mb-8">Contact Info</h3>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="bg-orange-50 p-3 rounded-lg text-primary">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Our Office</h4>
                                    <p className="text-gray-500 text-sm mt-1">123 Mobility Lane, Innovation City, CA 90210</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-orange-50 p-3 rounded-lg text-primary">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Email Us</h4>
                                    <p className="text-gray-500 text-sm mt-1">support@renton.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-orange-50 p-3 rounded-lg text-primary">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Call Us</h4>
                                    <p className="text-gray-500 text-sm mt-1">+1 (555) 123-4567</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                        <h3 className="text-2xl font-bold font-display text-gray-900 mb-6">Send Message</h3>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">First Name</label>
                                    <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Last Name</label>
                                    <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="Doe" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Email Address</label>
                                <input type="email" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="john@example.com" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Subject</label>
                                <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="How can we help?" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Message</label>
                                <textarea rows="5" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none" placeholder="Your message..."></textarea>
                            </div>

                            <button type="button" className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                                <Send size={20} /> Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
