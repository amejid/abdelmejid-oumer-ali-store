import { createSlice } from '@reduxjs/toolkit';

const initialState = { label: 'USD', symbol: '$', value: 0 };

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCurrency(state, action) {
      state.label = action.payload.label;
      state.symbol = action.payload.symbol;
      state.value = action.payload.value;
    },
  },
});

export const { setCurrency } = currencySlice.actions;

export default currencySlice.reducer;
