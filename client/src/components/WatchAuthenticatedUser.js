import React, { useEffect } from 'react';
import { useArtContext } from '../utils/GlobalState';
import { authenticatedUser } from '../utils/API';
import { LOGIN } from '../utils/actions';

function WatchAuthenticatedUser() {
    // eslint-disable-next-line no-unused-vars
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
        .catch(err => console.error(err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <></>;
}

export default WatchAuthenticatedUser;