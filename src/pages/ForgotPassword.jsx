import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, message } from 'antd';
import { Mail, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../redux/slices/authSlice';

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const { isLoading, isError, message: errorMessage } = useSelector((state) => state.auth);
    const [sent, setSent] = useState(false);

    const onFinish = (values) => {
        dispatch(forgotPassword(values.email))
            .unwrap()
            .then(() => {
                setSent(true);
                message.success('Password reset link sent to your email!');
            })
            .catch((err) => {
                message.error(err || 'Failed to send reset link');
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
             {/* Background Effects */}
             <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                 <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-gold-500/10 rounded-full blur-[120px]"></div>
                 <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-brand-orange/10 rounded-full blur-[100px]"></div>
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
            </div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-md bg-dark-900/80 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-8 md:p-12"
            >
                <Link to="/login" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft size={16} className="mr-2"/> Back to Login
                </Link>

                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-display font-bold text-white mb-2">Reset Password</h2>
                    <p className="text-gray-400">Enter your email to receive a reset link.</p>
                </div>

                {!sent ? (
                    <Form
                        layout="vertical"
                        onFinish={onFinish}
                        requiredMark={false}
                        size="large"
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: 'Please input your email!' },
                                { type: 'email', message: 'Please enter a valid email!' }
                            ]}
                            className="mb-8"
                        >
                            <Input 
                                prefix={<Mail className="text-gold-500 mr-2" size={18}/>} 
                                placeholder="Email Address" 
                                className="!bg-white/5 !border-white/10 !text-white h-12 rounded-xl focus:!border-gold-500 hover:!border-white/20 placeholder:!text-white/70" 
                            />
                        </Form.Item>

                        <Form.Item>
                            <button 
                                disabled={isLoading}
                                className="w-full h-14 bg-gradient-to-r from-gold-500 to-amber-500 text-black font-bold rounded-xl hover:from-white hover:to-white transition-all shadow-[0_4px_20px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2 text-lg"
                            >
                                {isLoading ? 'Sending...' : 'Send Reset Link'}
                            </button>
                        </Form.Item>
                    </Form>
                ) : (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Mail size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Check your inbox</h3>
                        <p className="text-gray-400 mb-8">We've sent a password reset link to your email address.</p>
                        <button 
                            onClick={() => setSent(false)}
                            className="text-gold-500 font-bold hover:text-white transition-colors"
                        >
                            Try another email
                        </button>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
