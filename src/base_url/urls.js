import axios from "axios"

const BACK_URL = "http://localhost:5000/api"
const token = ""

export const publicRequest = axios.create({
    baseURL: BACK_URL
})

export const userRequest = axios.create({
    baseURL: BACK_URL,
    headers: { token: `Bearer ${token}` }
})