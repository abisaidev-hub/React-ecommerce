import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig'
import { setIsLoading } from './isLoading.slice';
import { setIsCartWithProducts } from './isCartWithProducts.slice';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
      setCart: (state, action) => {
        const cart = action.payload
        return cart
      }
    }
})

export const getCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/cart', getConfig())
        .then((res) => {
          dispatch(setCart(res.data))
          dispatch(setIsCartWithProducts(true))
        })
        .catch(() => dispatch(setIsCartWithProducts(false)))
        .finally(() => {
          document.getElementById('loader-overlay').classList.remove('loader-overlay__appear');
          setTimeout(() => {
            dispatch(setIsLoading(false))
          }, 500);
        });
}

export const addProductToCartThunk = (productToAdd) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post('https://e-commerce-api-v2.academlo.tech/api/v1/cart', productToAdd, getConfig())
        .then(() => dispatch(getCartThunk()))
        .finally(() => {
          document.getElementById('loader-overlay').classList.remove('loader-overlay__appear');
          setTimeout(() => {
            dispatch(setIsLoading(false))
          }, 500);
        });
}

export const updateProductInCartThunk = (productUpdated) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.put(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${productUpdated.id}`, productUpdated.newQuantity, getConfig())
        .then(() => dispatch(getCartThunk()))
        .finally(() => {
          document.getElementById('loader-overlay').classList.remove('loader-overlay__appear');
          setTimeout(() => {
            dispatch(setIsLoading(false))
          }, 500);
        });
}

export const deleteProductInCart = (token) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.delete(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${token}`, getConfig())
        .then(() => dispatch(getCartThunk()))
        .finally(() => {
          document.getElementById('loader-overlay').classList.remove('loader-overlay__appear');
          setTimeout(() => {
            dispatch(setIsLoading(false))
          }, 500);
        });
}

export const purchaseCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post('https://e-commerce-api-v2.academlo.tech/api/v1/purchases', {},getConfig())
        .then(() => dispatch(setCart([])))
        .finally(() => {
          document.getElementById('loader-overlay').classList.remove('loader-overlay__appear');
          setTimeout(() => {
            dispatch(setIsLoading(false))
          }, 500);
          dispatch(setIsCartWithProducts(false))
        });
}

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
