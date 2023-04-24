import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setIsLoading } from './isLoading.slice';

export const purchasesSlice = createSlice({
    name: 'purchases',
    initialState: [],
    reducers: {
      setPurchases: (state, action) => {
        const purchases = action.payload
        return purchases
      }
    }
})

export const getPurchasesThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/purchases', getConfig())
        .then((res) => dispatch(setPurchases(res.data)))
        .finally(() => {
          document.getElementById('loader-overlay').classList.remove('loader-overlay__appear');
          setTimeout(() => {
            dispatch(setIsLoading(false))
          }, 500);
        });
}

export const { setPurchases } = purchasesSlice.actions;

export default purchasesSlice.reducer;
