import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, X, Upload as UploadIcon, MapPin } from 'lucide-react';
import { Modal, Form, Input, InputNumber, Select, Switch, Upload, Button, message } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const AdminVehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingVehicle, setEditingVehicle] = useState(null);
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);

    const fetchVehicles = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/vehicles`); // Public route, maybe need admin check?
            // Actually, for admin dashboard we might want a specific admin route that returns even inactive ones?
            // Currently getting all.
            const data = await response.json();
            if (response.ok) {
                setVehicles(data);
            }
        } catch (error) {
            console.error('Failed to fetch vehicles', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to deactivate this vehicle?')) return;
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/vehicles/${id}`, { method: 'DELETE' });
            if (response.ok) {
                message.success('Vehicle deactivated successfully');
                fetchVehicles();
            } else {
                message.error('Failed to deactivate vehicle');
            }
        } catch (error) {
            console.error('Failed to delete vehicle', error);
        }
    };

    const handleEdit = (vehicle) => {
        setEditingVehicle(vehicle);
        setFileList([]); // Clear new files
        // Pre-fill form
        form.setFieldsValue({
            name: vehicle.name,
            type: vehicle.type,
            pricePerDay: vehicle.pricePerDay,
            extraChargePerHour: vehicle.extraChargePerHour,
            description: vehicle.description,
            transmission: vehicle.transmission,
            fuelType: vehicle.fuelType,
            capacity: vehicle.capacity,
            address: vehicle.address,
            lat: vehicle.pickupLocation?.lat,
            lng: vehicle.pickupLocation?.lng,
            isActive: vehicle.isActive,
            isAvailable: vehicle.isAvailable,
        });
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setEditingVehicle(null);
        setFileList([]);
        form.resetFields();
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setEditingVehicle(null);
    };

    const handleUploadChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const onFinish = async (values) => {
        const formData = new FormData();

        // Append simple fields
        Object.keys(values).forEach(key => {
            if (key !== 'lat' && key !== 'lng' && key !== 'images') {
                if (values[key] !== undefined) formData.append(key, values[key]);
            }
        });

        // Construct pickupLocation
        const location = {
            lat: parseFloat(values.lat),
            lng: parseFloat(values.lng)
        };
        formData.append('pickupLocation', JSON.stringify(location));

        // Append Images
        fileList.forEach(file => {
            if (file.originFileObj) {
                formData.append('images', file.originFileObj);
            }
        });

        const url = editingVehicle ? `${import.meta.env.VITE_API_URL}/api/vehicles/${editingVehicle._id}` : `${import.meta.env.VITE_API_URL}/api/vehicles`;
        const method = editingVehicle ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                body: formData, // No Content-Type header when using FormData
            });

            if (response.ok) {
                message.success(`Vehicle ${editingVehicle ? 'updated' : 'created'} successfully`);
                setIsModalOpen(false);
                fetchVehicles();
            } else {
                const err = await response.json();
                message.error(err.message || 'Operation failed');
            }
        } catch (error) {
            console.error('Form submission error', error);
            message.error('Something went wrong');
        }
    };

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-white">Manage Vehicles</h2>
                <Button
                    type="primary"
                    onClick={handleAdd}
                    className="bg-gold-500 text-black border-none font-bold h-10 px-6 rounded-xl hover:!bg-white hover:!text-black flex items-center gap-2"
                >
                    <Plus size={18} /> Add Vehicle
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicles.map(vehicle => (
                    <div key={vehicle._id} className={`bg-dark-900 border ${vehicle.isActive ? 'border-white/5' : 'border-red-500/50'} rounded-2xl overflow-hidden group relative`}>
                        {!vehicle.isActive && <div className="absolute inset-0 bg-black/60 z-10 flex items-center justify-center pointer-events-none"><span className="bg-red-500 text-white px-3 py-1 rounded font-bold">INACTIVE</span></div>}

                        <div className="h-48 overflow-hidden relative">
                            <img
                                src={vehicle.images?.[0]?.startsWith('http') ? vehicle.images[0] : vehicle.images?.[0] ? `${import.meta.env.VITE_API_URL}${vehicle.images[0]}` : 'https://via.placeholder.com/300'}
                                alt={vehicle.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-2 right-2 flex gap-2 z-20">
                                <button onClick={() => handleEdit(vehicle)} className="bg-black/50 text-white p-2 rounded-full hover:bg-blue-500 transition-colors"><Edit size={16} /></button>
                                <button onClick={() => handleDelete(vehicle._id)} className="bg-black/50 text-white p-2 rounded-full hover:bg-red-500 transition-colors"><Trash2 size={16} /></button>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="text-xl font-bold text-white mb-1">{vehicle.name}</h3>
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-gold-500 font-bold">₹{vehicle.price || vehicle.pricePerDay}<span className="text-gray-500 text-sm font-normal">/day</span></p>
                                    <p className="text-xs text-gray-400 mt-1">Extra: ₹{vehicle.extraChargePerHour}/hr</p>
                                </div>
                                <div className="flex gap-2 text-xs text-gray-400">
                                    <span className="px-2 py-1 bg-white/5 rounded border border-white/5">{vehicle.type}</span>
                                    <span className="px-2 py-1 bg-white/5 rounded border border-white/5">{vehicle.transmission}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Modal
                title={<span className="text-xl font-bold">{editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}</span>}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                width={800}
                className="dark-modal"
            >
                <Form form={form} layout="vertical" onFinish={onFinish} className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Form.Item name="name" label="Vehicle Name" rules={[{ required: true }]}>
                            <Input placeholder="e.g. Tesla Model 3" />
                        </Form.Item>
                        <Form.Item name="type" label="Type" rules={[{ required: true }]}>
                            <Select className="custom-select">
                                <Option value="Car">Car</Option>
                                <Option value="Bike">Bike</Option>
                            </Select>
                        </Form.Item>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Form.Item name="pricePerDay" label="Price Per Day (₹)" rules={[{ required: true }]}>
                            <InputNumber min={0} className="w-full" />
                        </Form.Item>
                        <Form.Item name="extraChargePerHour" label="Extra Charge / Hour (₹)" rules={[{ required: true }]}>
                            <InputNumber min={0} className="w-full" />
                        </Form.Item>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Form.Item name="transmission" label="Transmission">
                            <Select className="custom-select">
                                <Option value="Automatic">Automatic</Option>
                                <Option value="Manual">Manual</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="fuelType" label="Fuel Type">
                            <Select className="custom-select">
                                <Option value="Petrol">Petrol</Option>
                                <Option value="Diesel">Diesel</Option>
                                <Option value="Electric">Electric</Option>
                                <Option value="Hybrid">Hybrid</Option>
                            </Select>
                        </Form.Item>
                    </div>

                    <Form.Item name="capacity" label="Capacity">
                        <Input placeholder="e.g. 4 Persons" />
                    </Form.Item>

                    <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                        <TextArea rows={4} />
                    </Form.Item>

                    <div className="border-t border-gray-200 dark:border-gray-700 my-4 pt-4">
                        <h4 className="font-bold mb-4 flex items-center gap-2"><MapPin size={18} /> Location Details</h4>
                        <Form.Item name="address" label="Full Address" rules={[{ required: true }]}>
                            <Input placeholder="123 Example St, City, Country" />
                        </Form.Item>
                        <div className="grid grid-cols-2 gap-4">
                            <Form.Item name="lat" label="Latitude" rules={[{ required: true }]}>
                                <InputNumber className="w-full" step="0.000001" />
                            </Form.Item>
                            <Form.Item name="lng" label="Longitude" rules={[{ required: true }]}>
                                <InputNumber className="w-full" step="0.000001" />
                            </Form.Item>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 my-4 pt-4">
                        <h4 className="font-bold mb-4 flex items-center gap-2"><UploadIcon size={18} /> Images</h4>
                        <Form.Item label="Upload Images">
                            <Upload
                                listType="picture-card"
                                fileList={fileList}
                                onChange={handleUploadChange}
                                beforeUpload={() => false} // Manual upload
                                multiple
                            >
                                <div>
                                    <Plus />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            </Upload>
                        </Form.Item>
                    </div>

                    <div className="flex gap-4 mb-4">
                        <Form.Item name="isAvailable" valuePropName="checked" label="Available for Rent">
                            <Switch />
                        </Form.Item>
                        <Form.Item name="isActive" valuePropName="checked" label="Active (Visible)">
                            <Switch />
                        </Form.Item>
                    </div>

                    <div className="flex justify-end gap-4 mt-6">
                        <Button onClick={handleCancel}>Cancel</Button>
                        <Button type="primary" htmlType="submit" className="bg-black text-white">
                            {editingVehicle ? 'Update Vehicle' : 'Create Vehicle'}
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default AdminVehicles;
