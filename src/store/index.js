import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import currencyReducer from './currencySlice';
import cartReducer from './cartSlice';

const persistConfig = {
  key: 'scandiShopAmejid',
  version: 1,
  storage,
};

const reducer = combineReducers({
  currency: currencyReducer,
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
