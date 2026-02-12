import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
      setLoading(true);
      setTimeout(() => {
          message.success('Message Sent Successfully!');
          setLoading(false);
      }, 1500);
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-[150px]"></div>

        <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Visual / Info Side */}
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <span className="text-brand-orange font-bold uppercase tracking-widest text-sm mb-4 block">24/7 Support</span>
                    <h1 className="text-6xl font-display font-bold mb-6 leading-tight">Let's start a <br/>conversation.</h1>
                    <p className="text-gray-400 text-lg mb-10 max-w-md leading-relaxed">
                        We are available around the clock to ensure your journey is smooth and exceptional.
                    </p>

                    <div className="space-y-6">
                         {[
                             { icon: <Mail size={20}/>, title: "Email Support", val: "support@renton.com" },
                             { icon: <Phone size={20}/>, title: "Call Hotline", val: "+1 (888) 123-4567" },
                             { icon: <MapPin size={20}/>, title: "Visit Headquarters", val: "Beverly Hills, CA 90210" }
                         ].map((item, i) => (
                             <div key={i} className="flex items-center gap-6 bg-white/5 border border-white/5 p-6 rounded-2xl hover:bg-white/10 transition-colors group">
                                 <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-gold-500 group-hover:scale-110 transition-transform">
                                     {item.icon}
                                 </div>
                                 <div className="flex-grow">
                                     <h3 className="text-gray-400 text-sm font-medium mb-1">{item.title}</h3>
                                     <p className="text-white font-bold text-lg">{item.val}</p>
                                 </div>
                             </div>
                         ))}
                    </div>
                </motion.div>

                {/* Form Side */}
                <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-dark-900 border border-white/10 p-10 rounded-[2.5rem] relative overflow-hidden shadow-2xl"
                >
                    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-gold-500/20 to-transparent blur-[50px]"></div>
                    
                    <h2 className="text-3xl font-bold mb-8 relative z-10">Send a Message</h2>
                    
                    <Form layout="vertical" onFinish={onFinish} size="large" className="relative z-10 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Form.Item name="name" rules={[{ required: true }]}>
                                <Input placeholder="Your Name" className="!bg-dark-800 !border-white/10 !text-white h-12 rounded-xl focus:!border-gold-500 font-medium placeholder:!text-white/70" />
                            </Form.Item>
                            <Form.Item name="email" rules={[{ required: true, type: 'email' }]}>
                                <Input placeholder="Your Email" className="!bg-dark-800 !border-white/10 !text-white h-12 rounded-xl focus:!border-gold-500 font-medium placeholder:!text-white/70" />
                            </Form.Item>
                        </div>
                        
                        <Form.Item name="subject">
                                <Input placeholder="Subject (Optional)" className="!bg-dark-800 !border-white/10 !text-white h-12 rounded-xl focus:!border-gold-500 font-medium placeholder:!text-white/70" />
                        </Form.Item>

                        <Form.Item name="message" rules={[{ required: true }]}>
                                <Input.TextArea rows={4} placeholder="How can we help you?" className="!bg-dark-800 !border-white/10 !text-white rounded-xl focus:!border-gold-500 font-medium placeholder:!text-white/70" />
                        </Form.Item>

                        <Form.Item className="mb-0">
                            <button disabled={loading} className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gold-500 transition-all flex items-center justify-center gap-2 text-base shadow-lg">
                                {loading ? 'Sending...' : 'Send Message'} <Send size={18}/>
                            </button>
                        </Form.Item>
                    </Form>
                </motion.div>
            </div>

        </div>
    </div>
  );
};

export default Contact;
