import { createSlice } from '@reduxjs/toolkit'
import { isNumber } from '../util.js';

const initialState = {
  type: 'bouquets',
  minPrice: '',
  maxPrice: '',
  category: '',
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeType(state, action) {
      state.type = action.payload;
      console.log('state.type: ', state.type);
      state.minPrice = '';
      state.maxPrice = '';
      state.category = '';
    },
    changePrice(state, action) {
      if (isNumber(action.payload.value) || action.payload.value === '') {
        state[action.payload.name] = action.payload.value;
      }
    },
  }
});

export const {changeType, changePrice} = filtersSlice.actions;

export default filtersSlice.reducer;