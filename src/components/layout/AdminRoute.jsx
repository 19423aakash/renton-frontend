import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
    const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);

    if (isLoading) return <div className="text-white text-center mt-20">Loading...</div>;

    // Use strict check for role
    if (isAuthenticated && user?.role === 'admin') {
        return <Outlet />;
    } else {
        // Redirect to login if not authenticated or not admin, preserving URL likely handled by login page but simple redirect here
        return <Navigate to="/login" replace />; 
    }
};

export default AdminRoute;
