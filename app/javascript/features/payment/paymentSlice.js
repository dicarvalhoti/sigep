

import { createSlice } from '@reduxjs/toolkit';
import { fetchPayments, addPayment, searchPayments, deletePayment } from './paymentThunks';

const initialState = {
    payments: [],
    loading: false,
    error: null,
};

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPayments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPayments.fulfilled, (state, action) => {
                state.loading = false;
                state.payments = action.payload;
            })
            .addCase(fetchPayments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addPayment.fulfilled, (state, action) => {
                state.payments.push(action.payload);
            })
            .addCase(addPayment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(searchPayments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchPayments.fulfilled, (state, action) => {
                state.loading = false;
                state.payments = action.payload;
            })
            .addCase(searchPayments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deletePayment.fulfilled, (state, action) => {
                state.payments = state.payments.filter((payment) => payment.id !== action.payload);
            });



    },
});

export default paymentSlice.reducer;