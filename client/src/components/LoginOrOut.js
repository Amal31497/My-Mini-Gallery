import React from "react";
import { useHistory } from "react-router-dom";
import { LOGOUT } from "../utils/actions";
import { logout } from "../utils/API"
import { useArtContext } from "../utils/GlobalState";

function LoginOrOut(){

    const [state, dispatch] = useArtContext();
    const history = useHistory();

    const handleLogOut = (event) => {
        event.preventDefault();
        logout()
            .then(response => {
                dispatch({
                    type: LOGOUT,
                    user:{}
                });
                history.push("/");
            })
    }
    // console.log(state)
    return(
        <>
            {!state.user.length
                ?
                <>
                    <li className="nav-item active">
                        <a className="nav-link" href="/signup">Signup <span className="sr-only"></span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/login">Login</a>
                    </li>
                </>
                
                :
                <>
                    <li className="nav-item">
                        <a className="nav-link" href="/" onClick={handleLogOut}>Logout</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/post">Submit Art</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/profile">Profile</a>
                    </li>
                </>
            }
        </>
    )
}

export default LoginOrOut;