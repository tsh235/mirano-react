import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_URL } from '../const.js';

export const fetchGoods = createAsyncThunk('goods/fetchGoods', async (params) => {
  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(`${API_URL}/api/products${queryString ? `?${queryString}` : ''}`);

  return await response.json();
});

const initialState = {
  items: [],
  status: 'idle',
  error: null,
  title: '',
}

const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoods.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGoods.fulfilled, (state, action) => {
        console.log('action: ', action);
        state.status = 'success';
        state.items = action.payload;
        switch (action.meta.arg.type) {
          case 'bouquets':
            state.title = 'Цветы';
            break;
          case 'toys':
            state.title = 'Игрушки';
            break;
          case 'postcards':
            state.title = 'Открытки';
            break;
        }
      })
      .addCase(fetchGoods.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default goodsSlice.reducer;