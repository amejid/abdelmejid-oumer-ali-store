import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = { currency: { label: 'USD', symbol: '$', value: 0 } };

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCurrency(state, action) {
      state.currency = action.payload;
    },
  },
});

export const { setCurrency } = currencySlice.actions;

const store = configureStore({
  reducer: currencySlice.reducer,
});

export default store;
