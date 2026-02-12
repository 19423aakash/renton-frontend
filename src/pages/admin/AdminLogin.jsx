import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/slices/authSlice';
import { Lock, Mail } from 'lucide-react';

const AdminLogin = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const resultAction = await dispatch(login(values));
            if (login.fulfilled.match(resultAction)) {
                if (resultAction.payload.role === 'admin') {
                    message.success('Welcome back, Admin');
                    navigate('/admin/dashboard');
                } else {
                    message.error('Access Denied. Admins only.');
                    // Optionally logout the user immediately if they are not admin
                }
            } else {
                message.error(resultAction.payload || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            message.error('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="bg-dark-900 border border-white/10 rounded-3xl p-8 w-full max-w-md shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-500 to-yellow-600"></div>
                
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
                    <p className="text-gray-400">Secure access for RentOn administrators</p>
                </div>

                <Form
                    name="admin_login"
                    onFinish={onFinish}
                    layout="vertical"
                    size="large"
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your Email!' }, { type: 'email', message: 'Invalid email!' }]}
                    >
                        <Input 
                            prefix={<Mail className="text-gray-500" size={18} />} 
                            placeholder="Admin Email" 
                            className="!bg-gray-900 !border-white/10 !text-white rounded-xl h-12 hover:!border-gold-500 focus:!border-gold-500 placeholder:text-gray-500"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input.Password 
                            prefix={<Lock className="text-gray-500" size={18} />} 
                            placeholder="Password" 
                            className="!bg-gray-900 !border-white/10 !text-white rounded-xl h-12 hover:!border-gold-500 focus:!border-gold-500 placeholder:text-gray-500"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            loading={loading}
                            className="w-full bg-gold-500 text-black font-bold h-12 rounded-xl border-none hover:!bg-white hover:!text-black transition-colors text-lg"
                        >
                            Access Dashboard
                        </Button>
                    </Form.Item>
                </Form>
                
                <div className="text-center mt-6 text-xs text-gray-600">
                    <p>Unauthorized access is prohibited.</p>
                    <p>IP Address Logged.</p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
