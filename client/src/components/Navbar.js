import React, { useState, useRef } from "react";
import LoginOrOut from "./LoginOrOut";
import logo from "../logo.png";
import { useHistory } from 'react-router-dom';


const Navbar = () => {
    const history = useHistory();
    const queryRef = useRef();
    
    const runQuery = (event) => {
        event.preventDefault();
        history.push(`search?${queryRef.current.value}`)
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand" href="/"><img className="logo" src={logo} alt="logo" /></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

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
        </nav >
    )
}

export default Navbar
