import React, { createContext, useReducer, useContext } from 'react';
import {
    LOGIN,
    LOGOUT,
    ADD_ART
    // CREATE_ART,
    // GET_ALL_ART,
    // CREATE_ARTIST,
    // GET_ARTIST,
    // UPDATE_ARTIST
} from "./actions"

const ArtContext = createContext();
const { Provider } = ArtContext;

const reducer = (state, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user: action.user,
                art: action.art
            }
        case LOGOUT:
            return {
                ...state,
                user: {}
            }
        // case ADD_ART:
        //     return {
        //         ...state,
        //         art: [action.artWork,...state.art]
        //     }
        // case CREATE_ART:
        //     return {
        //         ...state,
        //         art: [action.art, ...state.arts]
        //     }
        // case GET_ALL_ART:
        //     return {
        //         ...state,
        //         arts: action.arts,
        //         genre: action.genre
        //     }
        // case CREATE_ARTIST:
        //     return {
        //         ...state,
        //         artist: action.artist
        //     }
        // case GET_ARTIST:
        //     return {
        //         ...state,
        //         artist: action.artist
        //     }
        // case UPDATE_ARTIST:
        //     return {
        //         ...state,
        //         artist: action.artist,
        //     }
            default:
                return state
    }
}

const ArtProvider = ({ value = {}, ...props }) => {
    const [state, dispatch] = useReducer(reducer, {
        user: {}
        // art:[]
    })

    return <Provider value={[state, dispatch]} {...props} />
}

const useArtContext = () => {
    return useContext(ArtContext);
}

export { ArtProvider, useArtContext }
