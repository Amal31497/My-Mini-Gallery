import React, { useEffect } from 'react';
import { useArtContext } from '../utils/GlobalState';
import { authenticatedUser } from '../utils/API';
import { LOGIN, LOGOUT } from '../utils/actions';

function WatchAuthenticatedUser() {
    // eslint-disable-next-line no-unused-vars
    const [state, dispatch] = useArtContext();
    // console.log(state)
    useEffect(() => {
        authenticatedUser()
            .then(response => {
                if (response.data) {
                    dispatch({
                        type: LOGIN,
                        user: response.data.user_id
                    });
                }
            })
            .catch(err => console.error(err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return <></>;
}

export default WatchAuthenticatedUser;