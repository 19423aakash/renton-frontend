import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async Thunks
export const register = createAsyncThunk(
    'auth/register',
    async (userData, thunkAPI) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) {
                return thunkAPI.rejectWithValue(data.message);
            }

            localStorage.setItem('user', JSON.stringify(data));
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (userData, thunkAPI) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) {
                return thunkAPI.rejectWithValue(data.message);
            }

            localStorage.setItem('user', JSON.stringify(data));
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const completeOnboarding = createAsyncThunk(
    'auth/completeOnboarding',
    async (onboardingData, thunkAPI) => {
        try {
            // Check if onboardingData is FormData; if so, do NOT set Content-Type header manually
            const isFormData = onboardingData instanceof FormData;
            const headers = isFormData ? {} : { 'Content-Type': 'application/json' };
            const body = isFormData ? onboardingData : JSON.stringify(onboardingData);

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/onboarding`, {
                method: 'PUT',
                headers,
                body,
            });

            const data = await response.json();

            if (!response.ok) {
                return thunkAPI.rejectWithValue(data.message);
            }

            localStorage.setItem('user', JSON.stringify(data));
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const updateProfile = createAsyncThunk(
    'auth/updateProfile',
    async (profileData, thunkAPI) => {
        try {
            const isFormData = profileData instanceof FormData;
            const headers = isFormData ? {} : { 'Content-Type': 'application/json' };
            const body = isFormData ? profileData : JSON.stringify(profileData);

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
                method: 'PUT',
                headers,
                body,
            });

            const data = await response.json();

            if (!response.ok) {
                return thunkAPI.rejectWithValue(data.message);
            }

            localStorage.setItem('user', JSON.stringify(data));
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const deleteAccount = createAsyncThunk(
    'auth/deleteAccount',
    async (_, thunkAPI) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (!response.ok) {
                return thunkAPI.rejectWithValue(data.message);
            }

            localStorage.removeItem('user');
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const getUserProfile = createAsyncThunk(
    'auth/getUserProfile',
    async (_, thunkAPI) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
                method: 'GET',
            });

            const data = await response.json();

            if (!response.ok) {
                return thunkAPI.rejectWithValue(data.message);
            }

            // Update localStorage with fresh data
            localStorage.setItem('user', JSON.stringify(data));
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async (email, thunkAPI) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/forgotpassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                return thunkAPI.rejectWithValue(data.message);
            }

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async ({ resetToken, password }, thunkAPI) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/resetpassword/${resetToken}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();

            if (!response.ok) {
                return thunkAPI.rejectWithValue(data.message);
            }

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: !!localStorage.getItem('user'),
    role: JSON.parse(localStorage.getItem('user'))?.role || 'guest',
    isLoading: false,
    isError: false,
    message: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.role = 'guest';
            state.isLoading = false;
            state.isError = false;
            state.message = '';
            localStorage.removeItem('user');
        },
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.message = '';
        },
        updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };
            localStorage.setItem('user', JSON.stringify(state.user));
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
                state.role = action.payload.role;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
                state.role = action.payload.role;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(completeOnboarding.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(completeOnboarding.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(completeOnboarding.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteAccount.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.role = 'guest';
                state.isLoading = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
            });
    }
});

export const { logout, reset, updateUser } = authSlice.actions;
export default authSlice.reducer;
