import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Car, Menu, X, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import logo from '../assets/images/logo.png';

const Navbar = () => {
    const { isAuthenticated, logout, user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsOpen(false);
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Explore', path: '/explore' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    const authLinks = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'My Rentals', path: '/private/explore' },
        { name: 'Analytics', path: '/analytics' },
        { name: 'Settings', path: '/settings' },
    ];

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2 group">
                            <img src={logo} alt="RentOn Logo" className="w-20 h-20 object-contain" />
                            <span className="text-3xl font-display font-bold text-secondary group-hover:text-black transition-colors">
                                RentOn<span className="text-primary">.</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <div className="flex space-x-6">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `text-sm font-medium transition-colors ${isActive
                                            ? 'text-primary font-bold'
                                            : 'text-gray-500 hover:text-black'
                                        }`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                        </div>

                        <div className="pl-6 border-l border-gray-200 flex items-center gap-4">
                            {isAuthenticated ? (
                                <div className="flex items-center gap-6">
                                    {authLinks.map((link) => (
                                        <NavLink
                                            key={link.name}
                                            to={link.path}
                                            className={({ isActive }) =>
                                                `text-sm font-medium transition-colors ${isActive ? 'text-primary font-bold' : 'text-gray-500 hover:text-black'
                                                }`
                                            }
                                        >
                                            {link.name}
                                        </NavLink>
                                    ))}
                                    <div className="flex items-center gap-4">
                                        {user && (
                                            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-gray-300">
                                                <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                        <button
                                            onClick={handleLogout}
                                            className="text-gray-400 hover:text-red-600 transition-colors"
                                            title="Logout"
                                        >
                                            <LogOut size={20} />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-4">
                                    <Link
                                        to="/login"
                                        className="text-sm font-semibold text-gray-900 hover:text-primary transition-colors"
                                    >
                                        Log In
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="bg-black hover:bg-gray-800 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-900 focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100">
                    <div className="px-4 pt-4 pb-6 space-y-2">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) =>
                                    `block py-3 text-base font-medium border-b border-gray-50 last:border-0 ${isActive
                                        ? 'text-primary'
                                        : 'text-gray-600'
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}

                        {isAuthenticated ? (
                            <div className="pt-4 mt-2 border-t border-gray-100">
                                <div className="flex items-center gap-3 mb-4 px-2">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                        {user?.name?.[0].toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">{user?.name}</p>
                                        <p className="text-xs text-gray-500">{user?.email}</p>
                                    </div>
                                </div>
                                {authLinks.map((link) => (
                                    <NavLink
                                        key={link.name}
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className={({ isActive }) =>
                                            `block py-3 text-base font-medium ${isActive
                                                ? 'text-primary'
                                                : 'text-gray-600'
                                            }`
                                        }
                                    >
                                        {link.name}
                                    </NavLink>
                                ))}
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left mt-4 py-3 text-red-600 font-medium flex items-center gap-2"
                                >
                                    <LogOut size={18} /> Logout
                                </button>
                            </div>
                        ) : (
                            <div className="pt-6 grid grid-cols-2 gap-4">
                                <Link
                                    to="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full text-center border border-gray-200 text-gray-900 px-4 py-3 rounded-xl font-bold hover:bg-gray-50"
                                >
                                    Log In
                                </Link>
                                <Link
                                    to="/signup"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full text-center bg-primary text-white px-4 py-3 rounded-xl font-bold shadow-lg shadow-orange-200"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
