import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { toast } from 'react-toastify';
import { publicRequest, userRequest, userUpdateRequest } from '../base_url/urls';



export const userLogin = createAsyncThunk("userLogin", async (data, { rejectedValue }) => {
    // console.log(data)
    try {
        const response = await publicRequest.post('/auth/login', data)
        if (response.status == 200) return response.data
    } catch (error) {
        return rejectedValue(error)
    }
})

export const userRegister = createAsyncThunk("userRegister", async (data, { rejectWithValue }) => {
    try {
        const response = await publicRequest.post('/auth/register', data)
        if (response.status === 200) return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const userUpdate = createAsyncThunk("userUpdate", async (data, { rejectWithValue }) => {
    // console.log(data)
    const id = data.userId
    const token = data.token
    try {
        const response = await publicRequest.put(`/users/${id}`, { data }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        // console.log(response)
        if (response.status == 200) {
            return response.data
        }
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})


const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
        reqSuccess: false,
    },
    reducers: {
        logout: (state) => {
            state.currentUser = null;
            state.isFetching = false;
            state.error = false;
            localStorage.removeItem('token')
            toast.info("You have been logged out", {
                position: "top-center"
            })
        }
    },
    extraReducers: (builder) => {
        // userRegister
        builder.addCase(userRegister.pending, (state) => {
            state.isFetching = true
            state.error = false
            state.reqSuccess = false
        });
        builder.addCase(userRegister.fulfilled, (state, action) => {
            state.isFetching = false
            state.error = false
            state.reqSuccess = true
            console.log(action.payload)
            // if (action.payload) {
            //     toast.success('User Successfully registerd, Login to the account', {
            //         position: "top-center"
            //     })
            // }
        });
        builder.addCase(userRegister.rejected, (state, action) => {
            state.isFetching = false
            state.error = true
            state.reqSuccess = false
            // console.log(action.payload)
        });

        // userLogin
        builder.addCase(userLogin.pending, (state) => {
            state.isFetching = true
            state.error = false
        });
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.isFetching = false;
            state.error = false;
            state.currentUser = action.payload;
            localStorage.setItem('token', JSON.stringify(action.payload.accessToken))
            toast.success(`welcome ${state.currentUser.username}`, {
                position: "top-center"
            })
        });
        builder.addCase(userLogin.rejected, (state, action) => {
            state.isFetching = false
            state.error = true
            console.log(action.payload)
        });

        // userUpdate
        builder.addCase(userUpdate.pending, (state) => {
            state.isFetching = true
            state.error = false
        });
        builder.addCase(userUpdate.fulfilled, (state, action) => {
            state.isFetching = false;
            state.error = false;
            state.currentUser = action.payload;
            toast.success(`UserProfile have been updated`, {
                position: "top-center"
            })
        });
        builder.addCase(userUpdate.rejected, (state, action) => {
            state.isFetching = false;
            state.error = true
            console.log(action.payload)
        });
    }

})

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;
export default userSlice.reducer;