import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://backendinventariosfinal.herokuapp.com/'
})

export {
    axiosInstance
}