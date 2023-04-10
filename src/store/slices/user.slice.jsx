import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
      setUser: (state, action) => {
        const user = action.payload
        return user
      }
    }
})

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
