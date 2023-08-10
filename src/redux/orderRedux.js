import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicRequest } from "../base_url/urls";
import { toast } from "react-toastify";

export const ordersFetch = createAsyncThunk("ordersFetch", async (data, { rejectedValue }) => {
    try {
        const response = await publicRequest.get('/orders', {
            headers: {
                Authorization: `Bearer ${data}`
            }
        })
        return response.data
    } catch (error) {
        return rejectedValue(error)
    }
})

export const ordersEdit = createAsyncThunk("ordersEdit", async (values, { getState }) => {
    const state = getState()

    let currentOrder = state.orders.orders.filter(
        (order) => order._id === values.id
    )

    const newOrder = {
        ...currentOrder[0],
        delivery_status: values.delivery_status
    }

    try {
        const response = await publicRequest.put(`/orders/${values.id}`, newOrder, {
            headers: {
                Authorization: `Bearer ${values.token}`
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
    }

})


const orderRedux = createSlice({
    name: "orders",
    initialState: {
        orders: [],
        isFetching: false,
        error: false,
        editStatus: "",
        createStatus: ""
    },
    extraReducers: {
        // itemsFetch
        [ordersFetch.pending]: (state, action) => {
            state.isFetching = true
            state.error = false
        },
        [ordersFetch.fulfilled]: (state, action) => {
            state.orders = action.payload
            state.isFetching = false
            state.error = false
        },
        [ordersFetch.rejected]: (state, action) => {
            state.isFetching = false
            state.error = true
            console.log("itemsFetchError", action.payload)
        },
        [ordersEdit.pending]: (state, action) => {
            state.editStatus = 'pending'
        },
        [ordersEdit.fulfilled]: (state, action) => {
            const updatedOrders = state.orders.map((order) =>
                order._id === action.payload._id ? action.payload : order
            )
            state.orders = updatedOrders
            state.editStatus = 'success'
        },
        [ordersEdit.rejected]: (state, action) => {
            state.editStatus = 'rejected'
        }
        // update Product
        // [productUpdate.pending]: (state, action) => {
        //     state.editStatus = 'pending'
        // },
        // [productUpdate.fulfilled]: (state, action) => {
        //     const updatedProducts = state.list.map((product) =>
        //         product._id === action.payload._id ? action.payload : product
        //     )
        //     state.list = updatedProducts
        //     state.editStatus = 'success'
        //     toast.success("product successfully updated", {
        //         position: "top-center"
        //     })
        // },
        // [productUpdate.rejected]: (state, action) => {
        //     state.editStatus = 'rejected'
        // },
        // // createProduct
        // [createProduct.pending]: (state, action) => {
        //     state.createStatus = 'pending'
        // },
        // [createProduct.fulfilled]: (state, action) => {
        //     state.createStatus = 'success'
        //     state.list.push(action.payload)
        //     toast.success('New Product added successfully', {
        //         position: "top-center"
        //     })
        // },
        // [createProduct.rejected]: (state, action) => {
        //     state.createStatus = 'rejected'
        // }
    }
})

export const { } = orderRedux.actions;
export default orderRedux.reducer;