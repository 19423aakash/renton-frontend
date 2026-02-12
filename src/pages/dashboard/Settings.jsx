import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Switch, Button, Upload, message, Modal } from 'antd';
import { Upload as UploadIcon, User, Bell, Lock, CreditCard, AlertTriangle, Trash2 } from 'lucide-react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { updateProfile, deleteAccount } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const { confirm } = Modal;

const Settings = () => {
    const { user, isLoading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [fileList, setFileList] = useState([]);
    const [licenseFileList, setLicenseFileList] = useState([]);
    const [passwordForm] = Form.useForm();
    const [profileForm] = Form.useForm();

    React.useEffect(() => {
        if (user) {
            profileForm.setFieldsValue({
                name: user.name,
                email: user.email,
                bio: user.bio || "Automotive enthusiast. Premium member since 2026.",
                phone: user.phone || "",
                licenseNumber: user.licenseNumber || ""
            });
        }
    }, [user, profileForm]);

    const onFinishProfile = (values) => {
        const formData = new FormData();
        
        if (values.name) formData.append('name', values.name);
        if (values.email) formData.append('email', values.email);
        if (values.bio) formData.append('bio', values.bio);
        if (values.phone) formData.append('phone', values.phone);
        if (values.licenseNumber) formData.append('licenseNumber', values.licenseNumber);
        
        if (fileList.length > 0 && fileList[0].originFileObj) {
            formData.append('profileImage', fileList[0].originFileObj);
        }

        if (licenseFileList.length > 0 && licenseFileList[0].originFileObj) {
            formData.append('licenseImage', licenseFileList[0].originFileObj);
        }

        dispatch(updateProfile(formData)).then((res) => {
            if (!res.error) {
                message.success('Profile updated successfully');
            } else {
                message.error(res.payload || 'Update failed');
            }
        });
    };

    const onFinishPassword = (values) => {
        const formData = new FormData();
        formData.append('password', values.password);

        dispatch(updateProfile(formData)).then((res) => {
             if (!res.error) {
                message.success('Password updated successfully');
                passwordForm.resetFields(['password', 'confirmPassword']); // Clear password fields
            } else {
                message.error(res.payload || 'Password update failed');
            }
        });
    }

    const handleUploadChange = ({ fileList: newFileList }) => {
        setFileList(newFileList.slice(-1)); // Only keep the last uploaded file
    };

    const handleLicenseUploadChange = ({ fileList: newFileList }) => {
        setLicenseFileList(newFileList.slice(-1));
    };

    const handleDeleteAccount = () => {
        confirm({
            title: 'Are you sure you want to delete your account?',
            icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
            content: 'This action cannot be undone. All your data will be permanently removed.',
            okText: 'Yes, Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            className: 'delete-confirm-modal',
            onOk() {
                return dispatch(deleteAccount()).unwrap()
                    .then(() => {
                        message.success('Account deleted successfully');
                        navigate('/');
                    })
                    .catch((err) => {
                        message.error(err || 'Delete failed');
                    });
            },
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            
            {/* Profile Section */}
            <div className="bg-dark-900 border border-white/5 rounded-3xl p-8">
                {/* ... existing header code ... */}
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex-shrink-0 text-center">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-dark-800 mb-4 mx-auto relative group">
                            <img src={user?.profileImage?.startsWith('http') ? user.profileImage : `${import.meta.env.VITE_API_URL}${user?.profileImage}`} alt="Profile" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <Upload 
                                    showUploadList={false} 
                                    beforeUpload={() => false} 
                                    onChange={handleUploadChange}
                                >
                                    <UploadIcon className="text-white cursor-pointer"/>
                                </Upload>
                            </div>
                        </div>
                        <Upload 
                            showUploadList={false} 
                            beforeUpload={() => false} 
                            onChange={handleUploadChange}
                        >
                            <p className="text-gold-500 font-bold text-sm cursor-pointer hover:underline">Change Photo</p>
                        </Upload>
                    </div>

                    <Form 
                        form={profileForm}
                        layout="vertical" 
                        initialValues={{ name: user?.name, email: user?.email, bio: user?.bio || "Automotive enthusiast. Premium member since 2026." }} 
                        onFinish={onFinishProfile} 
                        className="flex-grow w-full"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Form.Item label={<span className="text-white">Full Name</span>} name="name">
                                <Input className="!bg-dark-800 !border-white/10 !text-white h-12 rounded-xl" />
                            </Form.Item>
                            <Form.Item label={<span className="text-white">Email</span>} name="email">
                                <Input disabled className="!bg-dark-800/50 !border-white/5 !text-gray-400 h-12 rounded-xl" suffix={<Lock size={14} className="text-gray-500"/>} />
                            </Form.Item>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Form.Item label={<span className="text-white">Phone</span>} name="phone">
                                <Input className="!bg-dark-800 !border-white/10 !text-white h-12 rounded-xl" placeholder="+1234567890" />
                            </Form.Item>
                            <Form.Item label={<span className="text-white">License Number</span>} name="licenseNumber">
                                <Input className="!bg-dark-800 !border-white/10 !text-white h-12 rounded-xl" placeholder="DL-12345" />
                            </Form.Item>
                        </div>

                         <div className="flex flex-col gap-3 mb-6">
                             <span className="text-white font-medium">Driving License Copy</span>
                             <div className="flex flex-col sm:flex-row items-center gap-6">
                                <div className="relative group w-full sm:w-64 h-40 rounded-xl overflow-hidden border-2 border-dashed border-white/20 bg-dark-800 flex items-center justify-center transition-all hover:border-gold-500/50">
                                    {user?.licenseImage ? (
                                        <>
                                            <img 
                                                src={user.licenseImage.startsWith('http') ? user.licenseImage : `${import.meta.env.VITE_API_URL}${user.licenseImage}`} 
                                                alt="License" 
                                                className="w-full h-full object-cover" 
                                            />
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                <Upload 
                                                    showUploadList={false} 
                                                    fileList={licenseFileList}
                                                    beforeUpload={() => false} 
                                                    onChange={handleLicenseUploadChange}
                                                >
                                                    <Button className="bg-transparent border-white text-white hover:bg-white hover:text-black font-medium" icon={<UploadIcon size={16}/>}>
                                                        Change Image
                                                    </Button>
                                                </Upload>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-center p-6">
                                             <Upload 
                                                showUploadList={false} 
                                                fileList={licenseFileList}
                                                beforeUpload={() => false} 
                                                onChange={handleLicenseUploadChange}
                                            >
                                                <div className="cursor-pointer flex flex-col items-center gap-2 text-gray-400 group-hover:text-gold-500 transition-colors">
                                                    <CreditCard size={32} />
                                                    <span className="text-sm font-medium">Upload License Front</span>
                                                </div>
                                            </Upload>
                                        </div>
                                    )}
                                </div>
                                <div className="text-sm text-gray-500 max-w-xs">
                                    <p>Upload a clear image of your driving license for verification. Accepted formats: JPG, PNG.</p>
                                </div>
                             </div>
                         </div>
                        
                        <Form.Item label={<span className="text-white">Bio</span>} name="bio">
                            <Input.TextArea rows={4} className="!bg-dark-800 !border-white/10 !text-white rounded-xl" />
                        </Form.Item>
                        <Button htmlType="submit" loading={isLoading} className="bg-gold-500 text-black border-none font-bold h-12 px-8 rounded-xl hover:!bg-white hover:!text-black">
                            Save Changes
                        </Button>
                    </Form>
                </div>
            </div>

            {/* Notifications Section */}

            {/* Payment Methods */}
            <div className="bg-dark-900 border border-white/5 rounded-3xl p-8">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl">
                        <CreditCard size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Payment Methods</h2>
                        <p className="text-gray-400 text-sm">Manage your cards and billing.</p>
                    </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex justify-between items-center mb-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                            <span className="font-bold text-blue-800 italic">VISA</span>
                        </div>
                        <div>
                            <p className="text-white font-bold">•••• •••• •••• 4242</p>
                            <p className="text-gray-500 text-xs">Expires 12/25</p>
                        </div>
                    </div>
                    <span className="text-xs font-bold bg-gold-500/20 text-gold-500 px-2 py-1 rounded">Primary</span>
                </div>

                <button className="text-gold-500 font-bold text-sm hover:underline">+ Add New Card</button>
            </div>

            {/* Change Password */}
            <div className="bg-dark-900 border border-white/5 rounded-3xl p-8">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-green-500/10 text-green-500 rounded-xl">
                        <Lock size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Security</h2>
                        <p className="text-gray-400 text-sm">Update your password to keep your account secure.</p>
                    </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                     <Form layout="vertical" onFinish={onFinishPassword} form={passwordForm}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Form.Item label={<span className="text-white">New Password</span>} name="password" rules={[{ min: 6, message: 'Password must be at least 6 characters' }]}>
                                <Input.Password className="!bg-dark-800 !border-white/10 !text-white h-12 rounded-xl" />
                            </Form.Item>
                             <Form.Item label={<span className="text-white">Confirm Password</span>} name="confirmPassword" 
                                dependencies={['password']}
                                rules={[
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The two passwords do not match!'));
                                        },
                                    }),
                                ]}
                             >
                                <Input.Password className="!bg-dark-800 !border-white/10 !text-white h-12 rounded-xl" />
                            </Form.Item>
                        </div>
                        <Button htmlType="submit" loading={isLoading} className="bg-white text-black border-none font-bold h-12 px-8 rounded-xl hover:!bg-gold-500 transition-colors">
                            Update Password
                        </Button>
                     </Form>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-500/5 border border-red-500/20 rounded-3xl p-8">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-red-500/10 text-red-500 rounded-xl">
                        <AlertTriangle size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Danger Zone</h2>
                        <p className="text-gray-400 text-sm">Irreversible actions for your account.</p>
                    </div>
                </div>
                
                <div className="bg-red-500/10 border border-red-500/10 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h3 className="text-white font-bold mb-1">Delete Account</h3>
                        <p className="text-gray-400 text-sm">Once you delete your account, there is no going back. Please be certain.</p>
                    </div>
                    <button onClick={handleDeleteAccount} className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-xl transition-colors flex items-center gap-2">
                        <Trash2 size={18} /> Delete Account
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Settings;
