import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, DatePicker, Select, Upload, Steps, message } from 'antd';
import { Upload as UploadIcon, User, MapPin, Phone, CreditCard, ArrowRight } from 'lucide-react';
import { completeOnboarding } from '../redux/slices/authSlice'; // Use authSlice thunk
import { setOnboardingData } from '../redux/slices/onboardingSlice';
import { updateUser } from '../redux/slices/authSlice';
import { motion } from 'framer-motion';

const { Option } = Select;

const Onboarding = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);
    const [form] = Form.useForm();
    const { user } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({});

    if (user?.onboardingCompleted) {
         navigate('/dashboard');
    }

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const onFinish = (values) => {
        // Merge accumulated data with final step values
        const finalData = { ...formData, ...values };
        console.log("Final Onboarding Data:", finalData);

        const submitData = new FormData();
        
        // Append simple fields
        submitData.append('dob', finalData.dob ? finalData.dob.toISOString() : '');
        submitData.append('address', finalData.address || '');
        submitData.append('licenseNumber', finalData.licenseNumber || '');
        submitData.append('emergencyContact', finalData.emergencyContact || '');
        submitData.append('preferredVehicleType', finalData.preferredVehicleType || '');
        
        // Append files
        if (finalData.profileImage && finalData.profileImage.length > 0) {
            submitData.append('profileImage', finalData.profileImage[0].originFileObj);
        }
        if (finalData.licenseImage && finalData.licenseImage.length > 0) {
            submitData.append('licenseImage', finalData.licenseImage[0].originFileObj);
        }

        dispatch(completeOnboarding(submitData)).then((res) => {
            if (!res.error) {
                message.success('Onboarding Completed!');
                navigate('/dashboard');
            } else {
                 message.error(res.payload || 'Onboarding failed');
            }
        });
    };

    const next = () => {
        form.validateFields().then((stepValues) => {
            // Save current step values to state
            setFormData(prev => ({ ...prev, ...stepValues }));
            setCurrent(current + 1);
        });
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const renderStepContent = () => {
        switch(current) {
            case 0:
                return (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                        <Form.Item name="profileImage" label={<span className="text-white">Profile Image</span>} valuePropName="fileList" getValueFromEvent={normFile}>
                            <Upload name="logo" listType="picture" className="dark-upload" beforeUpload={() => false} maxCount={1}>
                                <Button className="bg-dark-800 border-white/20 text-white hover:border-gold-500 hover:text-gold-500" icon={<UploadIcon size={16}/>}>Click to upload</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item name="dob" label={<span className="text-white">Date of Birth</span>} rules={[{ required: true }]}>
                            <DatePicker className="w-full h-12 bg-dark-800 border-white/20 text-white rounded-xl placeholder:text-white/70" />
                        </Form.Item>
                        <Form.Item name="address" label={<span className="text-white">Address</span>} rules={[{ required: true }]}>
                             <Input.TextArea rows={3} className="!bg-dark-800 !border-white/20 !text-white rounded-xl placeholder:!text-white/70" placeholder="123 Main St..." />
                        </Form.Item>
                    </motion.div>
                );
            case 1:
                return (
                     <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                        <Form.Item name="licenseNumber" label={<span className="text-white">Driving License Number</span>} rules={[{ required: true }]}>
                            <div className="relative">
                                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 z-10" size={18} />
                                <Input className="!bg-dark-800 !border-white/20 !text-white !pl-12 h-12 rounded-xl placeholder:!text-white/70" placeholder="DL-123456789" />
                            </div>
                        </Form.Item>
                        <Form.Item name="licenseImage" label={<span className="text-white">License Image</span>} valuePropName="fileList" getValueFromEvent={normFile}>
                            <Upload name="logo" listType="picture" beforeUpload={() => false} maxCount={1}>
                                <Button className="bg-dark-800 border-white/20 text-white hover:border-gold-500 hover:text-gold-500" icon={<UploadIcon size={16}/>}>Upload License Copy</Button>
                            </Upload>
                        </Form.Item>
                    </motion.div>
                );
            case 2:
                return (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                        <Form.Item name="emergencyContact" label={<span className="text-white">Emergency Contact</span>} rules={[{ required: true }]}>
                             <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 z-10" size={18} />
                                <Input className="!bg-dark-800 !border-white/20 !text-white !pl-12 h-12 rounded-xl placeholder:!text-white/70" placeholder="+1 (555) 000-0000" />
                            </div>
                        </Form.Item>
                        <Form.Item name="preferredVehicleType" label={<span className="text-white">Preferred Vehicle Type</span>} rules={[{ required: true }]}>
                             <Select 
                                className="h-12 !bg-dark-800 !border-white/20 text-white rounded-xl custom-select" 
                                popupClassName="bg-dark-900 border border-white/10 text-white"
                                placeholder="Select vehicle type"
                                style={{ color: 'white' }}
                            >
                                <Option value="bike" className="text-white hover:bg-gold-500/20">Bike</Option>
                                <Option value="car" className="text-white hover:bg-gold-500/20">Car</Option>
                            </Select>
                        </Form.Item>
                    </motion.div>
                );
            default: return null;
        }
    }

    return (
        <div className="min-h-screen bg-dark-950 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
            <div className="max-w-xl w-full bg-dark-900 border border-white/10 p-10 rounded-3xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 blur-[60px] rounded-full"></div>
                
                <div className="mb-8 text-center relative z-10">
                    <h2 className="text-3xl font-display font-bold text-white">Complete Profile</h2>
                    <p className="text-gray-500 mt-2">Step {current + 1} of 3</p>
                </div>

                <div className="flex gap-2 mb-10 justify-center">
                    {[0, 1, 2].map(step => (
                        <div key={step} className={`h-1 rounded-full transition-all duration-300 ${step <= current ? 'w-12 bg-gold-500' : 'w-4 bg-gray-700'}`}></div>
                    ))}
                </div>

                <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ preferredVehicleType: 'car' }}>
                    <div className="mb-10 min-h-[250px]">
                        {renderStepContent()}
                    </div>

                    <div className="flex justify-between items-center pt-6 border-t border-white/10">
                        {current > 0 ? (
                            <Button onClick={() => prev()} className="text-gray-400 hover:text-white border-none bg-transparent hover:bg-transparent shadow-none p-0 h-auto">
                                Back
                            </Button>
                        ) : <div></div>}
                        
                        {current < 2 ? (
                            <Button onClick={() => next()} className="h-12 px-8 bg-white text-dark-950 font-bold rounded-xl hover:bg-gold-500 hover:text-dark-950 transition-colors border-none flex items-center gap-2">
                                Next <ArrowRight size={16}/>
                            </Button>
                        ) : (
                            <Button htmlType="submit" className="h-12 px-8 bg-gold-500 text-dark-950 font-bold rounded-xl hover:bg-white transition-colors border-none shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                                Finish Setup
                            </Button>
                        )}
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Onboarding;
