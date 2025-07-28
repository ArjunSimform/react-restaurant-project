import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User } from '../../types';
import { toast } from 'sonner';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

// localStorage se user data load
const storedUser = localStorage.getItem('user');
if (storedUser) {
  initialState.user = JSON.parse(storedUser);
  initialState.isAuthenticated = true;
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      // localStorage me save
      localStorage.setItem('user', JSON.stringify(action.payload));
      toast.success('Login successful');
    },
    loginFailure: (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      // localStorage se remove
      localStorage.removeItem('user');
      toast.error('Login failed');
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;

      // localStorage se remove
      localStorage.removeItem('user');
      toast.success('Logout successful');
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export default authSlice.reducer;
