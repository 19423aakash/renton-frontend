import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const createBooking = createAsyncThunk(
    'bookings/create',
    async (bookingData, thunkAPI) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: config.headers,
                body: JSON.stringify(bookingData),
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

export const fetchMyBookings = createAsyncThunk(
    'bookings/fetchMy',
    async (_, thunkAPI) => {
        try {
            const response = await fetch('/api/bookings/mybookings', {
                method: 'GET',
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

export const cancelBooking = createAsyncThunk(
    'bookings/cancel',
    async (id, thunkAPI) => {
        try {
            const response = await fetch(`/api/bookings/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if(!response.ok) return thunkAPI.rejectWithValue(data.message);
            return id; 
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const updateBooking = createAsyncThunk(
    'bookings/update',
    async ({ id, bookingData }, thunkAPI) => {
        try {
            const response = await fetch(`/api/bookings/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingData),
            });
            const data = await response.json();
            if(!response.ok) return thunkAPI.rejectWithValue(data.message);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const initialState = {
  bookings: [],
  isLoading: false,
  isError: false,
  message: '',
};

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
      builder
        .addCase(createBooking.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createBooking.fulfilled, (state, action) => {
            state.isLoading = false;
            state.bookings.push(action.payload);
        })
        .addCase(createBooking.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(fetchMyBookings.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchMyBookings.fulfilled, (state, action) => {
            state.isLoading = false;
            // Map backend booking to frontend expected structure if necessary
            // Backend returns populated vehicle, frontend expects flat structure usually or adaptation
            // For now assume logic adaptation in component or here.
            // Let's flatten slightly/normalize for UI if needed, but the UI uses booking.vehicleName
            // Populate gives us booking.vehicle.name
            
            const formattedBookings = action.payload.map(booking => ({
                id: booking._id,
                vehicleId: booking.vehicle?._id,
                vehicleName: booking.vehicle?.name || 'Unknown Vehicle',
                startDate: new Date(booking.startDate).toISOString().split('T')[0],
                endDate: new Date(booking.endDate).toISOString().split('T')[0],
                totalPrice: booking.totalPrice,
                status: booking.status,
                image: booking.vehicle?.image || ''
            }));
            state.bookings = formattedBookings;
        })
        .addCase(fetchMyBookings.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(cancelBooking.fulfilled, (state, action) => {
             state.bookings = state.bookings.filter(booking => booking.id !== action.payload);
        })
        .addCase(updateBooking.fulfilled, (state, action) => {
            const index = state.bookings.findIndex(b => b.id === action.payload._id);
            if (index !== -1) {
                 // Re-format if necessary, or just refetch. For simplicity, let's update basic fields
                 state.bookings[index].startDate = new Date(action.payload.startDate).toISOString().split('T')[0];
                 state.bookings[index].endDate = new Date(action.payload.endDate).toISOString().split('T')[0];
                 state.bookings[index].totalPrice = action.payload.totalPrice;
            }
        });
  }
});

export default bookingSlice.reducer;
