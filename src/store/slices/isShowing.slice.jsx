import { createSlice } from '@reduxjs/toolkit';

export const isShowingSlice = createSlice({
    name: 'isShowing',
    initialState: false,
    reducers: {
      setIsShowing: (state, action) => {
        const showingState = action.payload
        return showingState
      }
    }
})

export const { setIsShowing } = isShowingSlice.actions;

export default isShowingSlice.reducer;
