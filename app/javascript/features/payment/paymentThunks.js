import { createAsyncThunk } from '@reduxjs/toolkit';
import PaymentApiClient from '../../services/api/paymentApiClient';

const paymentApi = new PaymentApiClient();

export const fetchPayments = createAsyncThunk('payment/fetchPayments', async () => {
  const headers = {
    'access-token': localStorage.getItem('access-token'),
    client: localStorage.getItem('client'),
    uid: localStorage.getItem('uid'),
  };
  return await paymentApi.getAll(headers);

});

export const searchPayments = createAsyncThunk('payment/searchPayments', async (searchQuery) => {
  const headers = {
    'access-token': localStorage.getItem('access-token'),
    client: localStorage.getItem('client'),
    uid: localStorage.getItem('uid'),
  };
  return await paymentApi.getAll(searchQuery);

});

export const deletePayment = createAsyncThunk('user/deletePayment', async (id) => {
  const headers = {
    'access-token': localStorage.getItem('access-token'),
    client: localStorage.getItem('client'),
    uid: localStorage.getItem('uid'),
  };
  await paymentApi.delete(id, headers);
  return id;
});



export const addPayment = createAsyncThunk('payment/addPayment', async (payment) => {
  const headers = {
    'access-token': localStorage.getItem('access-token'),
    client: localStorage.getItem('client'),
    uid: localStorage.getItem('uid'),
  };
  const response = await paymentApi.post(payment, headers);
  return response;
});


