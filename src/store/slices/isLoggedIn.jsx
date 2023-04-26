import { createSlice } from '@reduxjs/toolkit';

export const isLoggedInSlice = createSlice({
    name: 'isLoggedIn',
    initialState: false,
    reducers: {
      setIsLoggedIn: (state, action) => {
        const isLoggedIn = action.payload
        return isLoggedIn
      }
    }
})

export const { setIsLoggedIn } = isLoggedInSlice.actions;

export default isLoggedInSlice.reducer;