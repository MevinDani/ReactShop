import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

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
                toast.success("Product is added to cart", {
                    position: "top-center"
                })
            } else {
                // If the product does not exist in the cart, add it as a new entry
                state.quantity += 1;
                state.products.push(action.payload);
                state.total += action.payload.price * action.payload.quantity;
                toast.success("Product is added to cart", {
                    position: "top-center"
                })
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
            toast.warning("Product is removed from cart", {
                position: "top-center"
            })
        },
        removeAllCart: (state, action) => {
            state.products = []
            state.quantity = 0
            state.total = 0
        }
    }
})

export const { addProduct, decreaseProduct, increaseProduct, deleteProduct, removeAllCart } = cartSlice.actions;
export default cartSlice.reducer;