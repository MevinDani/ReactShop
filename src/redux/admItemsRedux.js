import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicRequest } from "../base_url/urls";
import { toast } from "react-toastify";

export const itemsFetch = createAsyncThunk("itemsFetch", async (data, { rejectedValue }) => {
    try {
        const response = await publicRequest.get('/products')
        if (response.status == 200) return response.data
    } catch (error) {
        return rejectedValue(error)
    }
})

export const productUpdate = createAsyncThunk("productUpdate", async (data, { rejectedValue }) => {
    const id = data.product._id
    const token = data.token
    try {
        const response = await publicRequest.put(`/products/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        return rejectedValue(error)
    }
})

export const createProduct = createAsyncThunk("createProduct", async (data, { rejectedValue }) => {
    console.log(data)
    const token = data.token
    try {
        const response = await publicRequest.post('/products/create', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log("crtPrd", response.data)
        return response.data
    } catch (error) {
        console.log(error)
        return rejectedValue(error)
    }
})


const admItemSlice = createSlice({
    name: "items",
    initialState: {
        list: [],
        isFetching: false,
        error: false,
        editStatus: "",
        createStatus: ""
    },
    extraReducers: {
        // itemsFetch
        [itemsFetch.pending]: (state, action) => {
            state.isFetching = true
            state.error = false
        },
        [itemsFetch.fulfilled]: (state, action) => {
            state.list = action.payload
            state.isFetching = false
            state.error = false
        },
        [itemsFetch.rejected]: (state, action) => {
            state.isFetching = false
            state.error = true
            console.log("itemsFetchError", action.payload)
        },
        // update Product
        [productUpdate.pending]: (state, action) => {
            state.editStatus = 'pending'
        },
        [productUpdate.fulfilled]: (state, action) => {
            const updatedProducts = state.list.map((product) =>
                product._id === action.payload._id ? action.payload : product
            )
            state.list = updatedProducts
            state.editStatus = 'success'
            toast.success("product successfully updated", {
                position: "top-center"
            })
        },
        [productUpdate.rejected]: (state, action) => {
            state.editStatus = 'rejected'
        },
        // createProduct
        [createProduct.pending]: (state, action) => {
            state.createStatus = 'pending'
        },
        [createProduct.fulfilled]: (state, action) => {
            state.createStatus = 'success'
            state.list.push(action.payload)
            toast.success('New Product added successfully', {
                position: "top-center"
            })
        },
        [createProduct.rejected]: (state, action) => {
            state.createStatus = 'rejected'
        }
    }
})

export const { } = admItemSlice.actions;
export default admItemSlice.reducer;