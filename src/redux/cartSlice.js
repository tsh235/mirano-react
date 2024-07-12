import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_URL } from '../const.js';

export const registerCart = createAsyncThunk('cart/registerCart', async() => {
  const response = await fetch(`${API_URL}/api/cart/register`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Не удалось зарегистрировать корзину');
  }

  return await response.json();
});

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const response = await fetch(`${API_URL}/api/cart`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Не удалось получить данные корзины');
  }

  return await response.json();
},);

export const addItemToCart = createAsyncThunk('cart/addItemToCart',
  async ({productId, quantity}) => {
    const response = await fetch(`${API_URL}/api/cart/items`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({productId, quantity}),
    });

    if (!response.ok) {
      throw new Error('Не удалось добавить товар в корзину');
    }
    
    return await response.json();
  },
);

const initialState = {
  isOpen: false,
  items: [],
  total: 0,
  status: 'idle',
  accessKey: null,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },
    calculateCartTotalPrice(state) {
      state.total = state.items.reduce((acc, item) => acc + item.price, 0);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerCart.fulfilled, (state, action) => {
        state.status = 'success';
        state.accessKey = action.payload.accessKey;
      })
      .addCase(registerCart.rejected, (state, action) => {
        state.status = 'failed';
        state.accessKey = '';
        state.error = action.error.message;
      })
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'success';
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addItemToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.status = 'success';
        state.items = action.payload;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  }
});

export const {toggleCart, calculateCartTotalPrice} = cartSlice.actions;

export default cartSlice.reducer;