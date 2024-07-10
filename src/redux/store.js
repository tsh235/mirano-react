import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice.js'
import orderReducer from './orderSlice.js'
import goodsReducer from './goodsSlice.js'
import filterReducer from './filterSlice.js'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orderReducer,
    goods: goodsReducer,
    filters: filterReducer,
  },
});

export default store;