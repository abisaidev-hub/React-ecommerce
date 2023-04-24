import { createSlice } from '@reduxjs/toolkit';

export const isCartWithProductsSlice = createSlice({
    name: 'isCartWithProducts',
    initialState: false,
    reducers: {
      setIsCartWithProducts: (state, action) => {
        const isCartWithProducts = action.payload
        return isCartWithProducts
      }
    }
})

export const { setIsCartWithProducts } = isCartWithProductsSlice.actions;

export default isCartWithProductsSlice.reducer;