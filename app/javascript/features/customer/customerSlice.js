import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import CustomerApiClient from '../../services/api/customerApiClient';


//TODO Mover para um action
const customerApi = new CustomerApiClient();

  export const fetchCustomers = createAsyncThunk('user/fetchCustomers', async () => {
    const response = await customerApi.getAll();
    console.log("RESPONSE",response)
    return response
  })

const initialState = {
    loading: false,
    error: null,
    customers: []
};

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCustomers.fulfilled, (state, action) => {
                state.loading = false;
                state.customers = action.payload;
            })
            .addCase(fetchCustomers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });



    },
});

export default customerSlice.reducer;