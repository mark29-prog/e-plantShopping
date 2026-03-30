import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    // Add a new item to the cart
    addItem: (state, action) => {
      const newItem = action.payload;

      // Check if the item already exists in the cart
      const existingItem = state.items.find(item => item.name === newItem.name);

      if (existingItem) {
        // If it exists, just increase the quantity
        existingItem.quantity += newItem.quantity || 1;
      } else {
        // Otherwise, add the new item with quantity default to 1 if not provided
        state.items.push({ ...newItem, quantity: newItem.quantity || 1 });
      }
    },

    // Remove an item from the cart based on its name
    removeItem: (state, action) => {
      const itemName = action.payload;
      state.items = state.items.filter(item => item.name !== itemName);
    },

    // Update the quantity of an existing item
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;

      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
  },
});

// Export actions to dispatch in components
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export reducer to configure in store
export default CartSlice.reducer;