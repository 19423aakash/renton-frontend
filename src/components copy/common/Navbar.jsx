import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { Dropdown, Avatar } from 'antd';
import { User, LogOut, LayoutDashboard, Menu, X, Car } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const navLinks = [
      { name: 'Home', path: '/' },
      { name: 'Explore', path: '/explore' },
      { name: 'About', path: '/about' },
      { name: 'Contact', path: '/contact' },
  ];

  const menuItems = [
    {
      key: '1',
      label: <Link to="/dashboard" className="flex items-center gap-2"><LayoutDashboard size={16}/> Dashboard</Link>,
    },
    {
      key: '2',
      label: <span onClick={handleLogout} className="flex items-center gap-2 text-red-500 cursor-pointer"><LogOut size={16}/> Logout</span>,
    }
  ];

  return (
    <nav className="bg-black text-white px-6 py-4 md:px-12 border-b border-gray-800">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Simple Logo */}
        <Link to="/" className="flex items-center gap-2">
            <div className="bg-gold-500 p-2 rounded text-black">
                <Car size={24} />
            </div>
            <span className="text-xl font-bold tracking-wider">RentOn</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
              <Link 
                  key={link.path} 
                  to={link.path} 
                  className={`text-sm font-medium hover:text-gold-500 transition-colors ${location.pathname === link.path ? 'text-gold-500' : 'text-gray-300'}`}
              >
                  {link.name}
              </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <Dropdown menu={{ items: menuItems }} placement="bottomRight">
               <div className="flex items-center gap-2 cursor-pointer">
                  <Avatar src={user?.profileImage} icon={<User />} className="bg-gray-700" />
                  <span className="font-medium">{user?.name}</span>
               </div>
            </Dropdown>
          ) : (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white">Log in</Link>
              <Link to="/signup">
                <button className="bg-gold-500 text-black px-4 py-2 rounded font-bold hover:bg-gold-400">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X /> : <Menu />}
            </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-800 pt-4">
              {navLinks.map((link) => (
                  <Link 
                      key={link.path} 
                      to={link.path} 
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 text-gray-300 hover:text-gold-500"
                  >
                      {link.name}
                  </Link>
              ))}
          </div>
      )}
    </nav>
  );
};

export default Navbar;
