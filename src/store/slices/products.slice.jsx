import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';
import { setShowAll } from './showAll.slice';
import axios from 'axios';

export const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
      setProducts: (state, action) => {
        const products = action.payload
        return products
      }
    }
});

export const getProductsThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/products')
        .then((res) => dispatch(setProducts(res.data)))
        .finally(() => {
          dispatch(setIsLoading(false))
          dispatch(setShowAll(false))
        });
}

export const filterProductsThunk = (searchedValueFixed) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?title=${searchedValueFixed}`)
        .then((res) => dispatch(setProducts(res.data)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const filterByCategoryThunk = (categoryId) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?categoryId=${categoryId}`)
        .then((res) => dispatch(setProducts(res.data)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
