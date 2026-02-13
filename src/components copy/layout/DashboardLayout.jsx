import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, getUserProfile } from '../../redux/slices/authSlice';
import { LayoutDashboard, BarChart2, Heart, Settings, LogOut, Menu, X, Bell, Search, Car } from 'lucide-react';
import { Avatar, Dropdown, Badge } from 'antd';
import { motion } from 'framer-motion';

const DashboardLayout = () => {
    const { user } = useSelector((state) => state.auth);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    React.useEffect(() => {
        dispatch(getUserProfile());
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const sidebarItems = [
        { path: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Overview' },
        { path: '/dashboard/explore', icon: <Search size={20} />, label: 'Explore More' }, // Internal dashboard explore
        { path: '/dashboard/analytics', icon: <BarChart2 size={20} />, label: 'Analytics' },
        { path: '/dashboard/favorites', icon: <Heart size={20} />, label: 'Favorites' },
        { path: '/dashboard/settings', icon: <Settings size={20} />, label: 'Settings' },
    ];

    const getPageTitle = () => {
        const item = sidebarItems.find(i => i.path === location.pathname);
        if (item) return item.label;
        if (location.pathname.includes('analytics')) return 'Analytics';
        if (location.pathname.includes('favorites')) return 'Favorites';
        if (location.pathname.includes('settings')) return 'Settings';
        if (location.pathname.includes('explore')) return 'Explore Vehicles';
        if (location.pathname.includes('vehicle')) return 'Vehicle Details';
        return 'Dashboard';
    };

    const userMenu = [
        {
            key: '0',
            label: <div className="px-4 py-2">
                <p className="font-bold text-white">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
            </div>,
            disabled: true,
        },
        { type: 'divider' },
        {
            key: '1',
            label: <span onClick={() => navigate('/dashboard/settings')}>Profile Settings</span>,
        },
        {
             key: '3',
             label: <span onClick={handleLogout} className="text-red-500">Sign Out</span>,
        }
    ];

    return (
        <div className="flex h-screen bg-dark-950 text-white overflow-hidden font-sans">
            {/* Sidebar */}
            <motion.aside 
                initial={false}
                animate={{ width: sidebarOpen ? 280 : 80 }}
                className={`bg-dark-900 border-r border-white/5 flex flex-col z-20 transition-all duration-300 relative ${sidebarOpen ? 'w-full md:w-[280px]' : 'w-[80px]'}`}
            >
                {/* Logo */}
                <div className="h-20 flex items-center px-6 border-b border-white/5">
                    <Link to="/" className="flex items-center gap-3">
                         <div className="bg-gold-500 p-2 rounded-lg text-black">
                            <Car size={24} />
                        </div>
                        {sidebarOpen && (
                            <motion.span 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-xl font-display font-bold tracking-wider"
                            >
                                RentOn
                            </motion.span>
                        )}
                    </Link>
                </div>

                {/* Nav Items */}
                <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto custom-scrollbar">
                    {sidebarItems.map((item) => {
                        const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
                        return (
                             <Link 
                                key={item.path} 
                                to={item.path}
                                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all group ${
                                    isActive 
                                    ? 'bg-gold-500 text-black font-bold shadow-[0_0_20px_rgba(212,175,55,0.3)]' 
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                            >
                                <div className={`${isActive ? 'text-black' : 'text-gray-400 group-hover:text-gold-500'}`}>
                                    {item.icon}
                                </div>
                                {sidebarOpen && (
                                    <motion.span 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="whitespace-nowrap"
                                    >
                                        {item.label}
                                    </motion.span>
                                )}
                            </Link>
                        )
                    })}
                </nav>

                {/* Bottom Actions */}
                <div className="p-4 border-t border-white/5">
                    <button 
                        onClick={handleLogout}
                        className={`flex items-center gap-4 w-full px-4 py-3.5 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors ${!sidebarOpen && 'justify-center'}`}
                    >
                        <LogOut size={20} />
                        {sidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                 {/* Header */}
                 <header className="h-20 bg-dark-950/80 backdrop-blur-md border-b border-white/5 flex justify-between items-center px-8 z-10">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-white/5 rounded-lg text-gray-400">
                            <Menu size={20}/>
                        </button>
                        <h1 className="text-2xl font-display font-bold text-white hidden md:block">{getPageTitle()}</h1>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex relative">
                            <input 
                                type="text" 
                                placeholder="Search..." 
                                className="bg-dark-900 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:border-gold-500 w-64 placeholder:text-white/30"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16}/>
                        </div>



                        <div className="h-8 w-[1px] bg-white/10 mx-2"></div>

                        <Dropdown menu={{ items: userMenu }} placement="bottomRight" overlayClassName="dark-picker">
                            <div className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-2 rounded-xl transition-colors">
                                <Avatar src={user?.profileImage?.startsWith('http') ? user.profileImage : `${import.meta.env.VITE_API_URL}${user?.profileImage}`} size="large" className="bg-gold-500 text-black border-2 border-dark-800" icon={<span className="text-lg font-bold">{user?.name?.charAt(0)}</span>} />
                                <div className="hidden md:block text-left">
                                    <p className="text-sm font-bold text-white leading-none mb-1">{user?.name}</p>
                                    <p className="text-xs text-gray-400 leading-none">Premium Member</p>
                                </div>
                            </div>
                        </Dropdown>
                    </div>
                 </header>

                 {/* Page Content */}
                 <main className="flex-1 overflow-y-auto p-4 md:p-8 relative custom-scrollbar">
                     <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[120px] pointer-events-none"></div>
                     <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none"></div>
                     <div className="relative z-10">
                        <Outlet />
                     </div>
                 </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
