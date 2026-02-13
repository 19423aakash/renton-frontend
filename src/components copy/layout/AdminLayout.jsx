import React, { useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { LayoutDashboard, Users, Car, LogOut, Settings, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLayout = () => {
    const { user, isLoading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!isLoading && (!user || user.role !== 'admin')) {
            navigate('/admin/login', { replace: true });
        }
    }, [user, isLoading, navigate]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/admin/login', { replace: true });
    };

    if (isLoading) return <div className="h-screen bg-black flex items-center justify-center text-white">Authenticating...</div>;
    if (!user || user.role !== 'admin') return null;

    const navItems = [
        { path: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
        { path: '/admin/vehicles', label: 'Vehicles', icon: Car },
        { path: '/admin/users', label: 'Users', icon: Users },
        { path: '/admin/analytics', label: 'Analytics', icon: BarChart2 },
        { path: '/admin/settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className="flex bg-black min-h-screen font-sans">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 bottom-0 w-64 bg-dark-900 border-r border-white/10 z-50 flex flex-col items-center">
                <div className="p-8 border-b border-white/10 w-full text-center">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-gold-500 to-yellow-600 bg-clip-text text-transparent italic">
                        RentOn <span className="text-sm text-gray-400 not-italic block mt-1">Admin Panel</span>
                    </h1>
                </div>

                <nav className="flex-1 w-full p-4 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) => `
                                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 w-full
                                    ${isActive ? 'bg-gold-500 text-black font-bold shadow-lg shadow-gold-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}
                                `}
                            >
                                <Icon size={20} className={isActive ? 'text-black' : 'text-gold-500'} />
                                <span>{item.label}</span>
                            </NavLink>
                        );
                    })}
                </nav>

                <div className="p-4 w-full border-t border-white/10">
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full text-red-500 hover:bg-red-500/10 rounded-xl transition-colors font-medium"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                    <div className="mt-4 flex items-center gap-3 px-2">
                         <div className="w-8 h-8 rounded-full bg-dark-800 border border-white/20 overflow-hidden">
                            <img src={user.profileImage} alt="Admin" className="w-full h-full object-cover"/>
                        </div>
                        <div className="text-xs">
                            <p className="text-white font-bold">{user.name}</p>
                            <p className="text-gray-500 truncate w-32">{user.email}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="ml-64 flex-1 p-8 overflow-y-auto">
                {/* Header/Breadcrumbs could go here */}
                {/* <div className="mb-8 flex justify-between items-center pb-6 border-b border-white/10">
                    <h2 className="text-3xl font-bold text-white tracking-tight">
                        {navItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
                    </h2>
                    <span className="text-gray-500 text-sm">v1.2.0 • Last Synced Just now</span>
                </div> */}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <Outlet />
                </motion.div>
            </main>
        </div>
    );
};

export default AdminLayout;
