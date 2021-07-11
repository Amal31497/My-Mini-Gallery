import axios from 'axios';

const signup = (user) => axios.post(`/api/user/`, user);
const login = (user) => axios.post('/api/user/login/', user);
const logout = () => axios.post('/api/user/logout/');
const authenticatedUser = () => axios.get("/api/user/authenticatedUser/");
const createArt = (art) => axios.post("/api/art/", art);
const getAllArt = () => axios.get("/api/art/");
const getArtist = (id) => axios.get("/api/user/" + id);
const updateUser = (id,art) => axios.put("/api/user/" + id, art);
const updateUserFavorites = (id,favorite) => axios.put("/api/user/" + id, favorite)
const getOneArt = (id) => axios.get("/api/art/" + id);
const addComment = (comment) => axios.post("/api/comment/", comment);
const loadComments = () => axios.get("/api/comment/");
const updateComment = (id,response) => axios.put("/api/comment/" + id, response)
const updateArt = (id,comment) => axios.put("/api/art/" + id, comment)
const queryArt = (query) => axios.get("/api/query/" + query)
// const deleteArtist = (id) => axios.delete("/api/user/" + id)


export {
    signup,
    login,
    logout,
    authenticatedUser,
    createArt,
    getAllArt,
    getArtist,
    updateUser,
    getOneArt,
    addComment,
    loadComments,
    updateArt,
    updateComment,
    updateUserFavorites,
    queryArt
    // deleteArtist
}