import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  type: 'bouquets',
  minPrice: '',
  maxPrice: '',
  category: '',
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilters(state, action) {
      state.type = action.payload.type;
    }
  }
});

export const {setFilters} = filterSlice.actions;

export default filterSlice.reducer;