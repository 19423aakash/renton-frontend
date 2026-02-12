import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import vehicleReducer from './slices/vehicleSlice';
import bookingReducer from './slices/bookingSlice';
import onboardingReducer from './slices/onboardingSlice';
import favoritesReducer from './slices/favoritesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    vehicles: vehicleReducer,
    bookings: bookingReducer,
    onboarding: onboardingReducer,
    favorites: favoritesReducer,
  },
});
