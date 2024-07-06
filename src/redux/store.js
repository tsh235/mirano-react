import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice.js'
import orderReducer from './orderSlice.js'
import goodsReducer from './goodsSlice.js'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orderReducer,
    goods: goodsReducer,
  },
});

export default store;