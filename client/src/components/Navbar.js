import React from "react";
import LoginOrOut from "./LoginOrOut"
import logo from "../logo.png"

export const Navbar = () => {

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
                        <li className="nav-item">
                            <a className="nav-link" href="/post">Submit Art</a>
                        </li>
                    </ul>
                </div>

            <form class="d-flex navBarSearch">
                <input className="form-control me-2" type="search" placeholder="Search For An Artist" aria-label="Search" />
                <button className="btn btn-outline-light" type="submit">Search</button>
            </form>
            </div>
        </nav >
    )
}

export default Navbar
