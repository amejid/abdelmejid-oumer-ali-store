import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = { totalCount: 0, products: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action) {
      const product = action.payload;
      let same = false;
      let cartId = '';

      state.products.forEach((prod) => {
        if (prod.id === product.id) {
          same = true;
          prod.attributes.forEach((attr, index) => {
            if (attr.selected.id !== product.attributes[index].selected.id) {
              same = false;
            }
          });
          if (same) cartId = prod.cartId;
        }
      });

      if (same) {
        state.products = state.products.map((prod) => {
          if (prod.cartId === cartId) {
            prod.count += 1;
          }
          return prod;
        });
        state.totalCount += 1;
      } else {
        const newPro = JSON.parse(JSON.stringify(product));
        newPro.count = 1;
        newPro.cartId = uuidv4();
        state.products.push(newPro);
        state.totalCount += 1;
      }
    },
    incrementProduct(state, action) {
      state.products = state.products.map((prod) => {
        if (prod.cartId === action.payload) {
          prod.count += 1;
        }
        return prod;
      });
      state.totalCount += 1;
    },
    decrementProduct(state, action) {
      state.products = state.products.map((prod) => {
        if (prod.cartId === action.payload) {
          prod.count -= 1;
        }
        return prod;
      });
      state.products = state.products.filter((prod) => prod.count > 0);
      state.totalCount -= 1;
    },
  },
});

export const { addProduct } = cartSlice.actions;

export default cartSlice.reducer;
