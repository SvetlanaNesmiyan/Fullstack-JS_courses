import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  totalQuantity: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload
      const existingItem = state.items.find(item => item.id === product.id)
      
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({
          ...product,
          quantity: 1
        })
      }
      
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0)
    },
    removeFromCart: (state, action) => {
      const productId = action.payload
      state.items = state.items.filter(item => item.id !== productId)
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0)
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.items.find(item => item.id === id)
      
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(i => i.id !== id)
        } else {
          item.quantity = quantity
        }
      }
      
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0)
    },
    clearCart: (state) => {
      state.items = []
      state.totalQuantity = 0
    }
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
