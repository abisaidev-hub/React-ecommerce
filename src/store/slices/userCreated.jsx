import { createSlice } from '@reduxjs/toolkit';

export const userCreatedSlice = createSlice({
    name: 'userCreated',
    initialState: false,
    reducers: {
      setUserCreated: (state, action) => {
        const userCreated = action.payload
        return userCreated
      }
    }
})

export const { setUserCreated } = userCreatedSlice.actions;

export default userCreatedSlice.reducer;