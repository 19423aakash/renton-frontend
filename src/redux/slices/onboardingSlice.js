import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isCompleted: false,
  step: 0,
  data: {
      dob: '',
      address: '',
      licenseNumber: '',
      emergencyContact: '',
      preferredVehicleType: '',
  }
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setOnboardingData: (state, action) => {
        state.data = { ...state.data, ...action.payload };
    },
    completeOnboarding: (state) => {
        state.isCompleted = true;
    },
    setStep: (state, action) => {
        state.step = action.payload;
    }
  },
});

export const { setOnboardingData, completeOnboarding, setStep } = onboardingSlice.actions;
export default onboardingSlice.reducer;
