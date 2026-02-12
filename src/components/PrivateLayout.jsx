import { useState } from 'react';
import Sidebar from './Sidebar';
import PrivateHeader from './PrivateHeader';

const PrivateLayout = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-black text-white">
            <Sidebar isCollapsed={isCollapsed} toggleSidebar={() => setIsCollapsed(!isCollapsed)} />
            <PrivateHeader isCollapsed={isCollapsed} />

            <main
                className={`pt-24 pb-8 px-8 transition-all duration-300 min-h-screen ${isCollapsed ? 'ml-20' : 'ml-64'
                    }`}
            >
                {children}
            </main>
        </div>
    );
};

export default PrivateLayout;
