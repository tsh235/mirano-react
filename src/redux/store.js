import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice.js'
import modalReducer from './modalSlice.js'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalReducer,
  },
});

export default store;