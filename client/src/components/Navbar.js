import React, { useState, useRef } from "react";
import LoginOrOut from "./LoginOrOut";
import logo from "../assets/logo/logo.png";
import { useHistory } from 'react-router-dom';


const Navbar = () => {
    const history = useHistory();
    const queryRef = useRef();
    
    const [navigationOpened, setNavigationOpened] = useState(false);

    const runQuery = (event) => {
        event.preventDefault();
        history.push(`search?${queryRef.current.value}`)
    }

    const openNavigation = (event) => {
        event.preventDefault();
        setNavigationOpened(true)
    }

    const closeNavigation = (event) => {
        event.preventDefault();
        setNavigationOpened(false);
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="/"><img className="logo" src={logo} alt="logo" /></a>
                    {
                        navigationOpened === true ?
                            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop" onClick={closeNavigation}>
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            :
                            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop" onClick={openNavigation}>
                                <span className="navbar-toggler-icon"></span>
                            </button>
                    }

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mv-auto">
                            <LoginOrOut />
                            <li className="nav-item">
                                <a className="nav-link" href="/genre">Browse Art</a>
                            </li>
                        </ul>
                    </div>

                    <form className="d-flex navBarSearch">
                        <input className="form-control me-2" type="search" placeholder="Search" ref={queryRef} aria-label="Search" />
                        <button className="btn btn-outline-light" onClick={runQuery}>Search</button>
                    </form>
                </div>
                {
                    navigationOpened === true ?
                        <div className="narrowWidthNavigation">
                            <LoginOrOut />
                            <div className="nav-item">
                                <a className="nav-link" href="/genre">Browse Art</a>
                            </div>
                        </div>
                        :
                        null
                }
            </nav >

        </>
    )
}

export default Navbar
