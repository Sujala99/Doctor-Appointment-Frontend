// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // Initially set to null or an empty object
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState:{
    user: null
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
