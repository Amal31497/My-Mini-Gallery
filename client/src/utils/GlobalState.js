import React, { createContext, useReducer, useContext } from 'react';
import {
    LOGIN,
    LOGOUT,
    CREATE_ART,
    GET_ALL_ART,
    RESET
} from "./actions"

const ArtContext = createContext();
const { Provider } = ArtContext;


const reducer = (state,action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user: action.user
            }
        case LOGOUT:
            return {
                ...state,
                user: {}
            }
        case CREATE_ART:
            return {
                ...state,
                art: [action.art, ...state.arts]
            }
        case GET_ALL_ART:
            return {
                ...state,
                arts: action.arts,
                genre: action.genre
            }
        case RESET:
            return {
                ...state,
                arts: [],
                genre: ""
            }
            default:
                return state
    }
}

const ArtProvider = ({ value = {}, ...props }) => {
    const [state, dispatch] = useReducer(reducer, {
        arts: [],
        user: {},
        genre: ""
    })

    return <Provider value={[state, dispatch]} {...props} />
}

const useArtContext = () => {
    return useContext(ArtContext);
}

export { ArtProvider, useArtContext }
