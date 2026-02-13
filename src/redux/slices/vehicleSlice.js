import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async Thunks
export const getVehicles = createAsyncThunk(
  'vehicles/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/vehicles`);
      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message);
      }

      // Normalize id to string if needed, though Mongo provides _id
      return data.map(v => ({ ...v, id: v._id }));
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  vehicles: [],
  filteredVehicles: [],
  filterType: 'All', // All, Car, Bike
  isLoading: false,
  isError: false,
  message: '',
};

const vehicleSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filterType = action.payload;
      if (action.payload === 'All') {
        state.filteredVehicles = state.vehicles;
      } else {
        state.filteredVehicles = state.vehicles.filter(v => v.type === action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVehicles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVehicles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.vehicles = action.payload;
        // Re-apply filter
        if (state.filterType === 'All') {
          state.filteredVehicles = action.payload;
        } else {
          state.filteredVehicles = action.payload.filter(v => v.type === state.filterType);
        }
      })
      .addCase(getVehicles.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { setFilter } = vehicleSlice.actions;
export default vehicleSlice.reducer;
