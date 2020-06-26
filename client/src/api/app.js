import axios from 'axios'

const api = axios.create({
    baseURL: 'https://kilogramsbackend.herokuapp.com/api',
})

export const insertItem = payload => api.post(`/shoppinglist`, payload)
export const getAllItems = () => api.get(`/shoppinglist`)
//export const updateMovieById = (id, payload) => api.put(`/shoppinglist/${id}`, payload)
export const deleteItemById = id => api.delete(`/shoppinglist/${id}`)
//export const getMovieById = id => api.get(`/shoppinglist/${id}`)

/*const apis = {
    insertMovie,
    getAllMovies,
    updateMovieById,
    deleteMovieById,
    getMovieById,
}*/
const apis = {
    insertItem,
    getAllItems,
    deleteItemById
}

export default apis