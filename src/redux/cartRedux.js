import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        quantity: 0,
        total: 0
    },
    reducers: {
        addProduct: (state, action) => {
            const existingProductIndex = state.products.findIndex(
                (product) => product._id === action.payload.id
            );

            if (existingProductIndex !== -1) {
                // If the product already exists in the cart, update its quantity
                state.products[existingProductIndex].quantity += action.payload.quantity;
                state.total += action.payload.price * action.payload.quantity;
            } else {
                // If the product does not exist in the cart, add it as a new entry
                state.quantity += 1;
                state.products.push(action.payload);
                state.total += action.payload.price * action.payload.quantity;
            }
        },
        decreaseProduct: (state, action) => {
            const prodIndex = state.products.findIndex(
                item => item._id === action.payload.id
            )
            if (state.products[prodIndex].quantity > 1) {
                state.products[prodIndex].quantity -= 1
                state.total -= state.products[prodIndex].price
            }
        },
        increaseProduct: (state, action) => {
            const prodIndex = state.products.findIndex(
                item => item._id === action.payload.id
            )
            if (state.products[prodIndex].quantity) {
                state.products[prodIndex].quantity += 1
                state.total += state.products[prodIndex].price
            }
        },
        deleteProduct: (state, action) => {
            const filteredCart = state.products.filter(
                (item) => item._id !== action.payload.id
            )
            state.products = filteredCart
            state.quantity -= 1
            state.total -= action.payload.price
        }
    }
})

export const { addProduct, decreaseProduct, increaseProduct, deleteProduct } = cartSlice.actions;
export default cartSlice.reducer;