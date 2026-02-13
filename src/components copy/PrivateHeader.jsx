import { Bell, Search, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PrivateHeader = ({ isCollapsed }) => {
    const { user } = useAuth();

    return (
        <header className={`fixed top-0 right-0 h-20 bg-black/90 backdrop-blur-md border-b border-gray-900 z-40 transition-all duration-300 flex items-center justify-between px-8 ${isCollapsed ? 'left-20' : 'left-64'}`}>
            {/* Search Bar */}
            <div className="w-96 hidden md:block">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search anything..."
                        className="w-full bg-gray-900 border-none rounded-full py-2.5 pl-10 pr-4 text-gray-300 focus:ring-1 focus:ring-primary focus:bg-gray-800 transition-all outline-none text-sm placeholder:text-gray-600"
                    />
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6">
                <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-2 ring-black"></span>
                </button>

                <div className="flex items-center gap-3 pl-6 border-l border-gray-800">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-white">{user?.name}</p>
                        <p className="text-xs text-primary">Premium Member</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-800 border-2 border-gray-700 overflow-hidden cursor-pointer hover:border-primary transition-colors">
                        <img src={user?.avatar} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default PrivateHeader;
