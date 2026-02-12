import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is authenticated but hasn't completed onboarding, and they are not ON the onboarding page
  if (isAuthenticated && !user?.onboardingCompleted && location.pathname !== '/onboarding') {
      return <Navigate to="/onboarding" replace />;
  }

  return children;
};

export default ProtectedRoute;
