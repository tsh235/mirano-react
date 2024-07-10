import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_URL } from '../const.js';

export const registerCart = createAsyncThunk('cart/registerCart', async() => {
  const response = fetch(`${API_URL}/api/cart/register`, {
    method: 'POST',
    credentials: 'include',
  });

  return await response.json();
});

export const addItemToCart = createAsyncThunk('cart/addToCart',
  async ({productId, quantity}) => {
    const response = fetch(`${API_URL}/api/cart/items`, {
      method: 'POST',
      credentials: 'include',
      headers: 'application/json',
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
  items: JSON.parse(localStorage.getItem('cartItems') || '[]'),
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
  }
});

export const {toggleCart} = cartSlice.actions;

export default cartSlice.reducer;