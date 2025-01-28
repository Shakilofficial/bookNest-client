import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICartItem {
  product: string;
  title: string;
  price: number;
  quantity: number;
  stock: number;
  coverImage: string;
}

interface CartState {
  items: ICartItem[];
  totalQuantity: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ICartItem>) {
      const existingItem = state.items.find(
        (item) => item.product === action.payload.product
      );
      if (existingItem) {
        // Ensure quantity doesn't exceed stock
        if (
          existingItem.quantity + action.payload.quantity <=
          existingItem.stock
        ) {
          existingItem.quantity += action.payload.quantity;
          state.totalQuantity += action.payload.quantity;
          state.totalPrice += action.payload.price * action.payload.quantity;
        } else {
          console.log("Not enough stock available");
        }
      } else {
        // Add new item if it doesn't exist in cart
        if (action.payload.quantity <= action.payload.stock) {
          state.items.push(action.payload);
          state.totalQuantity += action.payload.quantity;
          state.totalPrice += action.payload.price * action.payload.quantity;
        } else {
          console.log("Not enough stock available");
        }
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item.product === itemId);
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.price * existingItem.quantity;
        state.items = state.items.filter((item) => item.product !== itemId);
      }
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.product === id);
      if (existingItem && quantity > 0) {
        // Ensure quantity doesn't exceed stock
        if (quantity <= existingItem.stock) {
          const quantityDifference = quantity - existingItem.quantity;
          existingItem.quantity = quantity;
          state.totalQuantity += quantityDifference;
          state.totalPrice += quantityDifference * existingItem.price;
        } else {
          console.log("Not enough stock available");
        }
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
