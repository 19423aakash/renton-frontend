import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import {
    LayoutDashboard,
    Car,
    BarChart3,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Menu
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
    const { logout } = useAuth();

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: Car, label: 'Marketplace', path: '/private/explore' },
        { icon: BarChart3, label: 'Analytics', path: '/analytics' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    return (
        <aside
            className={`fixed left-0 top-0 h-screen bg-black border-r border-gray-900 transition-all duration-300 z-50 flex flex-col ${isCollapsed ? 'w-20' : 'w-64'
                }`}
        >
            {/* Logo Area */}
            <div className="h-20 flex items-center justify-center border-b border-gray-900 overflow-hidden">
                <div className="flex items-center gap-3 px-4 w-full">
                    <img src={logo} alt="Logo" className="w-10 h-10 min-w-[40px] object-contain" />
                    <span className={`text-2xl font-display font-bold text-white transition-all duration-300 whitespace-nowrap ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>
                        RentOn<span className="text-primary">.</span>
                    </span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-8 px-4 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${isActive
                                ? 'bg-primary text-white shadow-lg shadow-orange-900/20'
                                : 'text-gray-400 hover:bg-gray-900 hover:text-white'
                            }`
                        }
                    >
                        <item.icon size={20} className={`${isCollapsed ? 'mx-auto' : ''}`} />
                        <span className={`font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
                            {item.label}
                        </span>
                        {/* Tooltip for collapsed state */}
                        {isCollapsed && (
                            <div className="absolute left-16 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap border border-gray-700">
                                {item.label}
                            </div>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Footer / Toggle */}
            <div className="p-4 border-t border-gray-900">
                <button
                    onClick={logout}
                    className={`flex items-center gap-4 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 w-full transition-all mb-4 ${isCollapsed ? 'justify-center' : ''}`}
                >
                    <LogOut size={20} />
                    <span className={`font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
                        Logout
                    </span>
                </button>

                <button
                    onClick={toggleSidebar}
                    className="flex items-center justify-center w-full p-2 bg-gray-900 text-gray-400 rounded-lg hover:text-white transition-colors"
                >
                    {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
