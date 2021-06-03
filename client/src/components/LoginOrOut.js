import React from "react";
// import { useHistory } from "react-router-dom";
import { LOGOUT } from "../utils/actions";
import { logout } from "../utils/API"
import { useArtContext } from "../utils/GlobalState";

function LoginOrOut(){

    const [state, dispatch] = useArtContext();
    // const history = useHistory();

    const handleLogOut = (event) => {
        event.preventDefault();
        logout()
            .then(response => {
                console.log(response)
                dispatch({
                    type: LOGOUT
                });
                // history.push("/");
            })
    }
    console.log(state.user)
    return(
        <>
            {!state.user.user_id
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
                </>
            }
        </>
    )
}

export default LoginOrOut;