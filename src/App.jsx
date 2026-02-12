import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getVehicles } from './redux/slices/vehicleSlice';
import MainLayout from './components/layout/MainLayout';
import DashboardLayout from './components/layout/DashboardLayout';

import ProtectedRoute from './components/layout/ProtectedRoute';
import PublicRoute from './components/layout/PublicRoute';

// Pages
import Home from './pages/Home';
import Explore from './pages/Explore';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Onboarding from './pages/Onboarding';
import VehicleDetails from './pages/VehicleDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

// Dashboard Pages
import Overview from './pages/dashboard/Overview';
import Analytics from './pages/dashboard/Analytics';
import Favorites from './pages/dashboard/Favorites';
import DashboardExplore from './pages/dashboard/Explore';
import Settings from './pages/dashboard/Settings';
import DashboardVehicleDetails from './pages/dashboard/VehicleDetails';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './components/layout/AdminLayout';
import AdminRoute from './components/layout/AdminRoute';
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminVehicles from './pages/admin/Vehicles';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVehicles());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        
        {/* ================= ADMIN ROUTES ================= */}
        <Route path="/admin/login" element={<AdminLogin />} />
        
        <Route path="/admin" element={<AdminLayout />}>
             <Route index element={<Navigate to="/admin/dashboard" replace />} />
             <Route path="dashboard" element={<AdminDashboard />} />
             <Route path="vehicles" element={<AdminVehicles />} />
             <Route path="users" element={<AdminUsers />} />
             {/* Add Analytics and Settings pages later if needed */}
        </Route>

        {/* ================= USER PUBLIC ROUTES ================= */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="terms" element={<TermsAndConditions />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="login" element={
            <PublicRoute>
                <Login />
            </PublicRoute>
          } />
          <Route path="signup" element={
            <PublicRoute>
                <Signup />
            </PublicRoute>
          } />
          <Route path="forgot-password" element={
            <PublicRoute>
                <ForgotPassword />
            </PublicRoute>
          } />
          <Route path="reset-password/:resetToken" element={
            <PublicRoute>
                <ResetPassword />
            </PublicRoute>
          } />
          <Route path="vehicle/:id" element={<VehicleDetails />} />
          
          {/* Onboarding uses MainLayout for now, but protected */}
          <Route path="onboarding" element={
            <ProtectedRoute>
              <Onboarding />
            </ProtectedRoute>
          } />
        </Route>

        {/* Dashboard Routes with DashboardLayout */}
        <Route path="dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Overview />} />
          <Route path="explore" element={<DashboardExplore />} />
          <Route path="vehicle/:id" element={<DashboardVehicleDetails />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
