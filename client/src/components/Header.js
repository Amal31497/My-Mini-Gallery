import React from "react"
import Typed from "react-typed"

const Header = () => {

    function test(event){
        event.preventDefault();
        console.log("hello")
    }

    return (
        <div className="header-wrapper" >
            <div className="main-info">
                <h1 >WELCOME TO MY MINI GALLERY. DISCOVER...</h1>
                <Typed
                className="typed-text"
                strings={["Digital Arts", "Traditional Arts", "Fan Art", "Photography", "Photo Manipulation", "3D Arts", "Artisan Crafts", "Comics", "Cosplay", "Fantasy Arts"]}
                typeSpeed={70}
                backSpeed={50}
                loop
                />
                <p className="btn-sign-up" onClick={test}>View Gallery</p>
            </div>
        </div>
    )
}

export default Header