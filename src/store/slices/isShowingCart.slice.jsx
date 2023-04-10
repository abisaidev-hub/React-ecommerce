import { createSlice } from '@reduxjs/toolkit';

export const isShowingCartSlice = createSlice({
    name: 'isShowingCart',
    initialState: false,
    reducers: {
      setIsShowingCart: (state, action) => {
        const showState = action.payload
        return showState
      }
    }
})

export const { setIsShowingCart } = isShowingCartSlice.actions;

export default isShowingCartSlice.reducer;
