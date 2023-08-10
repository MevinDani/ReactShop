import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicRequest } from "../base_url/urls";
import { toast } from "react-toastify";

export const usersFetch = createAsyncThunk("usersFetch", async (data, { rejectedValue }) => {
    try {
        const response = await publicRequest.get('/users', {
            headers: {
                Authorization: `Bearer ${data.token}`
            }
        })
        return response.data
    } catch (error) {
        return rejectedValue(error)
    }
})

export const userDelete = createAsyncThunk("userDelete", async (data) => {
    try {
        const response = await publicRequest.delete(`/users/${data.id}`, {
            headers: {
                Authorization: `Bearer ${data.token}`
            }
        })
        return response.data
    } catch (error) {
        console.log(error.response.data)
        toast.error(error.response?.data, {
            position: "top-center"
        })
    }
})


const admUsersSlice = createSlice({
    name: "admUsers",
    initialState: {
        userlist: [],
        isFetching: false,
        error: false,
        editStatus: "",
        createStatus: "",
        deleteStatus: ""
    },
    extraReducers: {
        // itemsFetch
        [usersFetch.pending]: (state, action) => {
            state.isFetching = true
            state.error = false
        },
        [usersFetch.fulfilled]: (state, action) => {
            state.userlist = action.payload
            state.isFetching = false
            state.error = false
        },
        [usersFetch.rejected]: (state, action) => {
            state.isFetching = false
            state.error = true
            console.log("usersErrorFetched", action.payload)
        },
        // delete User
        [userDelete.pending]: (state, action) => {
            state.deleteStatus = 'pending'
        },
        [userDelete.fulfilled]: (state, action) => {
            const newList = state.userlist.filter(
                user => user._id !== action.payload._id
            )
            state.userlist = newList
            state.deleteStatus = 'success'
            toast.warning("product successfully deleted", {
                position: "top-center"
            })
        },
        [userDelete.rejected]: (state, action) => {
            state.deleteStatus = 'rejected'
        },
        // createProduct
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

export const { } = admUsersSlice.actions;
export default admUsersSlice.reducer;