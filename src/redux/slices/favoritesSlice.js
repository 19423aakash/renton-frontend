import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const toggleFavoriteAsync = createAsyncThunk(
    'favorites/toggle',
    async (vehicleId, thunkAPI) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/favorites`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ vehicleId })
            });
            const data = await response.json();
            if (!response.ok) return thunkAPI.rejectWithValue(data.message);
            // API returns updated favorites array
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const initialState = {
    items: [], // Array of vehicle IDs
    isLoading: false,
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        setFavorites: (state, action) => {
            state.items = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(toggleFavoriteAsync.fulfilled, (state, action) => {
                state.items = action.payload; // Sync with backend
            });
    }
});

export const { setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
