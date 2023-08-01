import axios from "axios"


const BACK_URL = "http://localhost:5000/api";
// const token = JSON.parse(localStorage.getItem('token')); 

export const publicRequest = axios.create({
    baseURL: BACK_URL
})


// export const userRequest = axios.create({
//     baseURL: BACK_URL,
//     headers: { Authorization: `Bearer ${token}` }
// })

// export const userUpdateRequest = axios.create({
//     baseURL: BACK_URL,
//     headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': "multipart/form-data"
//     }
// })