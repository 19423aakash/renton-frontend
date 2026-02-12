import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../redux/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Checkbox, message } from 'antd';
import { Lock, Mail, ArrowRight, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, message: errorMessage, user } = useSelector((state) => state.auth);

  const [form] = Form.useForm();

  useEffect(() => {
      const rememberedEmail = localStorage.getItem('rememberedEmail');
      const rememberedPassword = localStorage.getItem('rememberedPassword');
      if (rememberedEmail || rememberedPassword) {
          form.setFieldsValue({ 
              email: rememberedEmail, 
              password: rememberedPassword,
              remember: true 
          });
      }
  }, [form]);

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
      if (values.remember) {
          localStorage.setItem('rememberedEmail', values.email);
          localStorage.setItem('rememberedPassword', values.password);
      } else {
          localStorage.removeItem('rememberedEmail');
          localStorage.removeItem('rememberedPassword');
      }

      dispatch(login(values))
        .unwrap()
        .then(() => {
            message.success('Welcome back!');
            navigate('/dashboard');
        })
        .catch((err) => {
            message.error(err || 'Login failed');
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
            className="relative z-10 w-full max-w-5xl h-[600px] bg-dark-900 rounded-[2rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex overflow-hidden"
        >
            {/* Visual Side */}
            <div className="hidden lg:flex w-1/2 flex-col justify-between p-12 relative">
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2000&auto=format')] bg-cover bg-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                 </div>
                 
                 <div className="relative z-10">
                     <Link to="/" className="text-3xl font-display font-bold text-white tracking-tighter">RentOn<span className="text-gold-500">.</span></Link>
                 </div>

                 <div className="relative z-10">
                     <h2 className="text-5xl font-display font-bold text-white mb-4 leading-tight">Master <br/>the Journey.</h2>
                     <p className="text-gray-300 text-lg max-w-sm">Access the world's finest fleet of vehicles with a single login.</p>
                 </div>
            </div>

            {/* Form Side */}
            <div className="w-full lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center bg-dark-800/80 backdrop-blur-3xl">
                <div className="mb-8">
                    <h3 className="text-3xl font-bold text-white mb-2">Welcome Back</h3>
                    <p className="text-gray-400">Please enter your details.</p>
                </div>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    requiredMark={false}
                    size="large"
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                        className="mb-4"
                    >
                         <Input 
                            prefix={<Mail className="text-gold-500 mr-2" size={18}/>} 
                            placeholder="Email Address" 
                            className="!bg-white/5 !border-white/10 !text-white h-12 rounded-xl focus:!border-gold-500 hover:!border-white/20 placeholder:!text-white/70" 
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                        className="mb-2"
                    >
                         <Input.Password 
                            prefix={<Lock className="text-gold-500 mr-2" size={18}/>} 
                            placeholder="Password" 
                            className="!bg-white/5 !border-white/10 !text-white h-12 rounded-xl focus:!border-gold-500 hover:!border-white/20 placeholder:!text-white/70" 
                        />
                    </Form.Item>

                    <div className="flex justify-between items-center mb-8">
                         <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox className="text-gray-400 hover:text-white">Remember me</Checkbox>
                         </Form.Item>
                         <Link to="/forgot-password" className="text-sm font-bold text-gold-500 hover:text-white transition-colors">Forgot Password?</Link>
                    </div>

                    <Form.Item className="mb-6">
                        <button 
                            disabled={isLoading}
                            className="w-full h-14 bg-gradient-to-r from-gold-500 to-amber-500 text-black font-bold rounded-xl hover:from-white hover:to-white transition-all shadow-[0_4px_20px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2 text-lg"
                        >
                            {isLoading ? 'Accessing Garage...' : 'Sign In'}
                        </button>
                    </Form.Item>

                    <div className="text-center">
                        <span className="text-gray-500">Don't have an account? </span>
                        <Link to="/signup" className="text-white font-bold hover:text-gold-500 transition-colors">Sign up for free</Link>
                    </div>
                </Form>
            </div>
        </motion.div>
    </div>
  );
};

export default Login;
