import React from "react"
import Typed from "react-typed"

export const Header = () => {
    return (
        <div className="header-wrapper">
            <div className="main-info">
                <h1>WELCOME TO MY MINI GALLERY. DISCOVER...</h1>
                <Typed
                className="typed-text"
                strings={["Digital Arts", "Traditional Arts", "Fan Art", "Photography", "Photo Manipulation", "3D Arts", "Artisan Crafts", "Comics", "Cosplay", "Fantasy Arts"]}
                typeSpeed={70}
                backSpeed={50}
                loop
                />
                <a href="#" className="btn-sign-up">be a part of our community</a>
            </div>
        </div>
    )
}

export default Header