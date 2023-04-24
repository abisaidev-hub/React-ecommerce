import { configureStore } from '@reduxjs/toolkit';
import productsSlice from './slices/products.slice';
import isLoadingSlice from './slices/isLoading.slice';
import isShowingSlice from './slices/isShowing.slice';
import showAllSlice from './slices/showAll.slice';
import userSlice from './slices/user.slice';
import isShowingCartSlice from './slices/isShowingCart.slice';
import cartSlice from './slices/cart.slice';
import isCartWithProductsSlice from './slices/isCartWithProducts.slice';
import purchasesSlice from './slices/purchases.slice';
import isShowingPasswordSlice from './slices/isShowingPassword.slice';
import userCreatedSlice  from './slices/userCreated';

export default configureStore({
    reducer: {
      products: productsSlice,
      isLoading: isLoadingSlice,
      isShowing: isShowingSlice,
      showAll: showAllSlice,
      user: userSlice,
      isShowingCart: isShowingCartSlice,
      cart: cartSlice,
      isCartWithProducts: isCartWithProductsSlice,
      purchases: purchasesSlice,
      isShowingPassword: isShowingPasswordSlice,
      userCreated: userCreatedSlice,
    }
})
