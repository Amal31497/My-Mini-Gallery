import axios from 'axios';

// User authentication
const signup = (user) => axios.post(`/api/user/`, user);
const login = (user) => axios.post('/api/user/login/', user);
const logout = () => axios.post('/api/user/logout/');
const authenticatedUser = () => axios.get("/api/user/authenticatedUser/");

// Art routes
const createArt = (art) => axios.post("/api/art/", art);
const getAllArt = () => axios.get("/api/art/");
const getOneArt = (id) => axios.get("/api/art/" + id);
const updateArt = (id, comment) => axios.put("/api/art/" + id, comment);
const dropArtistArt = (user) => axios.delete("/api/art/emptyUserArt/" + user);
const deleteArt = (id) => axios.delete("/api/art/" + id);

// Artist/User routes
const getArtist = (id) => axios.get("/api/user/" + id);
const updateUser = (id, user) => axios.put("/api/user/" + id, user);
const addNewArtToUser = (id, artId) => axios.put("/api/user/addNewArt/" + id, artId);
const addNewFavoriteArt = (id, artId) => axios.put("/api/user/addNewFavorite/" + id, artId);
const deleteArtist = (id) => axios.delete("/api/user/" + id);

// Comment routes
const addComment = (comment) => axios.post("/api/comment/", comment);
const loadComments = () => axios.get("/api/comment/");
const updateComment = (id, response) => axios.put("/api/comment/" + id, response);
const dropUserComments = (user) => axios.delete("/api/comment/emptyUserComments/" + user);
const dropArtComments = (art) => axios.delete("/api/comment/emptyArtComments/" + art)
const deleteComment = (id) => axios.delete("/api/comment/" + id);

// Search routes
const queryArt = (query) => axios.get("/api/query/" + query);

export {
    // User authentication
    signup,
    login,
    logout,
    authenticatedUser,

    // Art routes
    createArt,
    getAllArt,
    getOneArt,
    updateArt,
    dropArtComments,
    deleteArt,
    dropArtistArt,

    // Artist/User routes
    getArtist,
    updateUser,
    addNewArtToUser,
    addNewFavoriteArt,
    deleteArtist,

    // Comment routes
    addComment,
    loadComments,
    updateComment,
    dropUserComments,
    deleteComment,

    // Search routes
    queryArt
}