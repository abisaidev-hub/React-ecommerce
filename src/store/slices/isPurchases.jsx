import { createSlice } from '@reduxjs/toolkit';

export const isPurchasesSlice = createSlice({
    name: 'isPurchases',
    initialState: false,
    reducers: {
      setIsPurchases: (state, action) => {
        const isPurchases = action.payload
        return isPurchases
      }
    }
})

export const { setIsPurchases } = isPurchasesSlice.actions;

export default isPurchasesSlice.reducer;