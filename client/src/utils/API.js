import axios from 'axios';

const signup = (user) => axios.post(`/api/user`, user);
const login = (user) => axios.post('/api/user/login', user);
const logout = () => axios.post('/api/user/logout')
const authenticatedUser = () => axios.get("/api/user/authenticatedUser");
const createArt = (art) => axios.post("/api/art", art)
const getAllArt = () => axios.get("/api/art")


export {
    signup,
    login,
    logout,
    authenticatedUser,
    createArt,
    getAllArt
}