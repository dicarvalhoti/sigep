import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthApiClient from '../../services/api/authApiClient';

const authApi = new AuthApiClient();

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authApi.sign_in(credentials);
      const accessToken = response.headers.get('access-token');
      const client = response.headers.get('client');
      const uid = response.headers.get('uid');

      if (accessToken && client && uid) {
        localStorage.setItem('access-token', accessToken);
        localStorage.setItem('client', client);
        localStorage.setItem('uid', uid);
        const userData = await response.json();
        
        return userData;
      }
      localStorage.removeItem('persist:root');
      return rejectWithValue('Falha na autenticação');
      
    } catch (error) {
      
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    const headers = {
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    };
    try {
      await authApi.logout(headers);
      localStorage.removeItem('access-token');
      localStorage.removeItem('client');
      localStorage.removeItem('uid');
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const isAuthenticated = () => {
  const accessToken = localStorage.getItem('access-token');
  const client = localStorage.getItem('client');
  const uid = localStorage.getItem('uid');

  return !!(accessToken && client && uid);
};

export const validateToken = createAsyncThunk(
  'auth/validateToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApi.validateToken();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

