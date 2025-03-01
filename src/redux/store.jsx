// store.jsx
import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from './loadingSlice'; // Adjust path if different
import userReducer from './userSlice'; // Correct import for userSlice

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    user: userReducer,  // Use the userReducer here
  },
});
