import React, { createContext, useReducer, useContext } from 'react';
// Actions
import {
    LOGIN,
    LOGOUT
} from "./actions"

// Global context init
const ArtContext = createContext();
const { Provider } = ArtContext;

// Reducer function
const reducer = (state, action) => {
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
        default:
            return state
    }
}

// Provider init
const ArtProvider = ({ value = {}, ...props }) => {
    const [state, dispatch] = useReducer(reducer, {
        user: {},
        art:[]
    })

    return <Provider value={[state, dispatch]} {...props} />
}

const useArtContext = () => {
    return useContext(ArtContext);
}

export { ArtProvider, useArtContext }
