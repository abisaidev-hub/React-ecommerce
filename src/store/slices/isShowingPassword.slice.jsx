import { createSlice } from '@reduxjs/toolkit';

export const isShowingPasswordSlice = createSlice({
    name: 'isShowingPassword',
    initialState: false,
    reducers: {
      setIsShowingPassword: (state, action) => {
        const isShowingPassword = action.payload
        return isShowingPassword
      }
    }
})

export const { setIsShowingPassword } = isShowingPasswordSlice.actions;

export default isShowingPasswordSlice.reducer;
