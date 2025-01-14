import { createSlice } from '@reduxjs/toolkit';
import { login, logout, validateToken } from './authThunks';

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  isAdmin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.isAuthenticated = true;
        state.isAdmin = action.payload.role === 'admin';
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Falha ao fazer login';
      })
      .addCase(logout.fulfilled, (state) => {
        state.currentUser = null;
        state.isAuthenticated = false;
        state.isAdmin = false;
        state.error = null;
      })
      .addCase(validateToken.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.currentUser = action.payload;
        state.isAdmin = action.payload.role === 'admin';
      })
      .addCase(validateToken.rejected, (state) => {
        state.isAuthenticated = false;
        state.currentUser = null;
        state.error = 'Token inválido ou expirado';
      });
  },
});

export const { clearAuth, clearError } = authSlice.actions;
export default authSlice.reducer;