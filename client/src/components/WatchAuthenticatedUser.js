import React, { useEffect } from 'react';
import { useArtContext } from '../utils/GlobalState';
import { authenticatedUser } from '../utils/API';
import { LOGIN } from '../utils/actions';

function WatchAuthenticatedUser() {
    const [state, dispatch] = useArtContext();

    useEffect(() => {
        authenticatedUser()
        .then(response => {
            if (response.data) {
                dispatch({
                    type: LOGIN,
                    user: response.data
                });
            }
        })
    }, [])

    return <></>;
}

export default WatchAuthenticatedUser;