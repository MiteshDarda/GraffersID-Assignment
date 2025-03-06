import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserState } from '../../types/User';

const initialState: UserState = {
  currentUser: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pdGVzaEBlbWFpbC5jb20iLCJpZCI6MSwicm9sZSI6InVzZXIiLCJpYXQiOjE3MzcwNDQ1NzQsImV4cCI6MTc0MjIyODU3NH0.mBaRhRPmOw-edATMxg8tGWHhDl9tLA9cQRPCVZmxBFM',
    id: '1',
    email: 'mitesh818@gmail.com',
    name: 'Mitesh'
  },
  isAuthenticated: false,
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    }
  }
});

export const { loginStart, loginSuccess, loginFailure, logout, updateProfile } = userSlice.actions;

export default userSlice.reducer;
