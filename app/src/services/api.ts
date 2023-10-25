import axios from 'axios';

const url : string = (process.env.NODE_ENV === 'production') ? 'urlprod' : "http://localhost:8080/"

const api = axios.create({
    baseURL: url
})

export default api;