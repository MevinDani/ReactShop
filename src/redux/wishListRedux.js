import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const wishSlice = createSlice({
    name: "wish",
    initialState: {
        products: [],
        quantity: 0,
        total: 0
    },
    reducers: {
        addRemWish: (state, action) => {
            const existingProductIndex = state.products.findIndex(
                (product) => product._id === action.payload.id
            )
            if (existingProductIndex !== -1) {
                state.total -= action.payload.price
                const filteredWish = state.products.filter(
                    (item) => item._id !== action.payload.id
                )
                state.quantity -= 1
                state.products = filteredWish
                toast.warn("Item is removed from wishlist", {
                    position: "top-center"
                })
            } else {
                state.quantity += 1;
                state.products.push(action.payload);
                state.total += action.payload.price;
                toast.success("Product is added to your wishList", {
                    position: "top-center"
                })
            }
        },
        increaseWish: (state, action) => {
            const prodIndex = state.products.findIndex(
                item => item._id === action.payload.id
            )
            if (state.products[prodIndex].quantity) {
                state.products[prodIndex].quantity += 1
                state.total += state.products[prodIndex].price
            }
        },
        decreaseWish: (state, action) => {
            const prodIndex = state.products.findIndex(
                item => item._id === action.payload.id
            )
            if (state.products[prodIndex].quantity > 1) {
                state.products[prodIndex].quantity -= 1
                state.total -= state.products[prodIndex].price
            }
        },
        deleteWish: (state, action) => {
            const filteredWish = state.products.filter(
                (item) => item._id !== action.payload.id
            )
            state.products = filteredWish
            state.quantity -= 1
            state.total -= action.payload.price
            toast.warning("Product is removed from wishList", {
                position: "top-center"
            })
        },
        removeAllWish: (state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0
        }
    }
})

export const { addRemWish, removeAllWish, increaseWish, decreaseWish, deleteWish } = wishSlice.actions
export default wishSlice.reducer