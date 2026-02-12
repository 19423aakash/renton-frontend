import { Save, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Settings = () => {
    const { user } = useAuth();

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold font-display text-white mb-2">Account Settings</h1>
                <p className="text-gray-400">Manage your profile and preferences.</p>
            </div>

            <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
                <div className="p-8">
                    <div className="flex items-center gap-6 mb-8">
                        <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center text-primary border-4 border-gray-700 shadow-md overflow-hidden relative group">
                            {user?.avatar ? (
                                <img src={user.avatar} className="w-full h-full object-cover" alt="Profile" />
                            ) : (
                                <User size={48} />
                            )}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">{user?.name}</h2>
                            <p className="text-gray-500">{user?.email}</p>
                            <button className="text-primary text-sm font-bold mt-2 hover:underline">Change Avatar</button>
                        </div>
                    </div>

                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-400">Full Name</label>
                                <input type="text" defaultValue={user?.name} className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary text-white outline-none transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-400">Email Address</label>
                                <input type="email" defaultValue={user?.email} className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary text-white outline-none transition-all" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-400">Phone Number</label>
                            <input type="tel" placeholder="+1 (555) 000-0000" className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary text-white outline-none transition-all" />
                        </div>

                        <div className="pt-6 border-t border-gray-800">
                            <h3 className="text-lg font-bold text-white mb-4">Change Password</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400">Current Password</label>
                                    <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary text-white outline-none transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400">New Password</label>
                                    <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary text-white outline-none transition-all" />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-6">
                            <button type="button" className="bg-primary hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-orange-900/40 flex items-center gap-2">
                                <Save size={20} /> Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Settings;
