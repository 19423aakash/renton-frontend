import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Award, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-dark-950 text-white relative overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4"></div>

        <div className="pt-32 pb-20 relative z-10">
            <div className="container mx-auto px-6 md:px-12">
                
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto text-center mb-24"
                >
                    <span className="text-gold-500 font-bold uppercase tracking-[0.2em] mb-4 block text-sm">Our Story</span>
                    <h1 className="text-5xl md:text-7xl font-display font-bold mb-8">Redefining <br/>Premium Mobility</h1>
                    <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                        RentOn was born from a passion for exceptional machines and the freedom of the open road. 
                        We don't just rent vehicles; we curate experiences for those who demand excellence.
                    </p>
                </motion.div>

                {/* Values Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                     {[
                         { icon: <Shield size={32}/>, title: "Uncompromised Safety", desc: "Every vehicle undergoes rigorous 150-point inspections before every journey.", color: "text-blue-400" },
                         { icon: <Award size={32}/>, title: "Premium Fleet", desc: "Access to the world's most exclusive cars and bikes, maintained to showroom standards.", color: "text-gold-500" },
                         { icon: <Zap size={32}/>, title: "Seamless Experience", desc: "From booking to drop-off, our digital-first process gets you on the road in minutes.", color: "text-brand-orange" }
                     ].map((item, idx) => (
                         <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-dark-900 border border-white/5 p-8 rounded-3xl hover:bg-white/5 hover:border-gold-500/20 transition-all group"
                         >
                             <div className={`w-14 h-14 rounded-2xl bg-dark-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${item.color}`}>
                                 {item.icon}
                             </div>
                             <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                             <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                         </motion.div>
                     ))}
                </div>

                {/* Stats / Proof */}
                <div className="bg-dark-900 rounded-[3rem] p-12 md:p-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1493238792015-1a778bc09064?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-luminosity"></div>
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Trusted by <br/><span className="text-gold-500">Thousands</span></h2>
                            <p className="text-gray-400 max-w-md">Join an elite community of drivers who choose RentOn for their definitive travel needs.</p>
                        </div>
                        <div className="flex gap-12">
                            <div>
                                <h3 className="text-5xl font-bold text-white mb-2">10k+</h3>
                                <span className="text-gray-500 uppercase tracking-widest text-sm">Trips</span>
                            </div>
                            <div>
                                <h3 className="text-5xl font-bold text-white mb-2">4.9</h3>
                                <span className="text-gray-500 uppercase tracking-widest text-sm">Rating</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
  );
};

export default About;
