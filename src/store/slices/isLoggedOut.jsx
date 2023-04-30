import { createSlice } from '@reduxjs/toolkit';

export const isLoggedOutSlice = createSlice({
    name: 'isLoggedOut',
    initialState: false,
    reducers: {
      setIsLoggedOut: (state, action) => {
        const isLoggedOut = action.payload
        return isLoggedOut
      }
    }
})

export const { setIsLoggedOut } = isLoggedOutSlice.actions;

export default isLoggedOutSlice.reducer;