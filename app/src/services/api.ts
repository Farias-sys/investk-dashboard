import axios from 'axios';

const url : string = (process.env.NODE_ENV === 'production') ? 'https://investk-api.onrender.com/' : "http://localhost:8080/"

const api = axios.create({
    baseURL: url
})

export default api;