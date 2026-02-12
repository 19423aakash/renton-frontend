import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../redux/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, message } from 'antd';
import { User, Lock, Mail, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, message: errorMessage, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
        navigate('/dashboard');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (isError) {
        message.error(errorMessage);
        dispatch(reset());
    }
  }, [isError, errorMessage, dispatch]);

  const onFinish = (values) => {
    dispatch(register(values))
        .unwrap()
        .then(() => {
            message.success('Account created successfully!');
            navigate('/onboarding');
        })
        .catch((err) => {
            message.error(err || 'Registration failed');
        });
  };

  return (
    <div className="min-h-screen bg-dark-950 flex justify-center items-center py-12 px-4 relative overflow-hidden">
        {/* Abstract Backgrounds */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold-500/5 blur-[150px] rounded-full"></div>

        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-5xl w-full bg-dark-900 rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row"
        >
            {/* Left Brand Panel */}
            <div className="bg-dark-800 p-12 md:w-5/12 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-[#D4AF37] mix-blend-multiply opacity-20"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                
                <div className="relative z-10">
                    <h2 className="text-3xl font-display font-bold text-white mb-4">RentOn<span className="text-brand-orange">.</span></h2>
                    <p className="text-gray-400">Join the exclusive community of premium vehicle enthusiasts.</p>
                </div>

                <div className="relative z-10 mt-12 space-y-6">
                    <div className="flex items-center gap-4 text-white/80">
                        <div className="w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-500"><ArrowRight size={14}/></div>
                        <span>Exclusive Fleet Access</span>
                    </div>
                    <div className="flex items-center gap-4 text-white/80">
                        <div className="w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-500"><ArrowRight size={14}/></div>
                        <span>Priority Booking</span>
                    </div>
                    <div className="flex items-center gap-4 text-white/80">
                        <div className="w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-500"><ArrowRight size={14}/></div>
                        <span>24/7 Premium Support</span>
                    </div>
                </div>

                <div className="relative z-10 mt-12 text-sm text-gray-500">
                    © 2026 RentOn Inc.
                </div>
            </div>

            {/* Right Form Panel */}
            <div className="p-12 md:w-7/12 bg-dark-900/50 backdrop-blur-sm">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
                    <p className="text-gray-500">Enter your details to get started.</p>
                </div>

                <Form
                name="signup_form"
                layout="vertical"
                onFinish={onFinish}
                requiredMark={false}
                size="large"
                className="space-y-4"
                >
                <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Please input your Name!' }]}
                >
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 z-10" size={18} />
                        <Input placeholder="Full Name" className="!bg-dark-800 !border-white/10 !text-white !pl-12 !h-12 !rounded-xl hover:!border-gold-500 focus:!border-gold-500 placeholder:!text-white/70" />
                    </div>
                </Form.Item>

                <Form.Item
                    name="email"
                    rules={[
                    { required: true, message: 'Please input your Email!' },
                    { type: 'email', message: 'Please enter a valid email!' }
                    ]}
                >
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 z-10" size={18} />
                        <Input placeholder="Email Address" className="!bg-dark-800 !border-white/10 !text-white !pl-12 !h-12 !rounded-xl hover:!border-gold-500 focus:!border-gold-500 placeholder:!text-white/70" />
                    </div>
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 z-10" size={18} />
                        <Input.Password placeholder="Password" className="!bg-dark-800 !border-white/10 !text-white !pl-12 !h-12 !rounded-xl hover:!border-gold-500 focus:!border-gold-500 placeholder:!text-white/70" />
                    </div>
                </Form.Item>

                <Form.Item className="mt-6">
                    <button type="submit" disabled={isLoading} className="w-full h-14 bg-white hover:bg-gold-500 text-dark-950 font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                         {isLoading ? 'Creating...' : 'Sign Up Free'} <ArrowRight size={18}/>
                    </button>
                </Form.Item>

                <div className="text-center text-sm text-gray-500 mt-6">
                    Already have an account? <Link to="/login" className="text-white font-bold hover:text-brand-orange ml-1 transition-colors">Log in</Link>
                </div>
                </Form>
            </div>
        </motion.div>
    </div>
  );
};

export default Signup;
