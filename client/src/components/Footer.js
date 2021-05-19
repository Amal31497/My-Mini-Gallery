import React from "react";
import Amal from "../assets/Amal.jpg";
import Jasur from "../assets/Jasur.jpg";
import Jenni from "../assets/Jenni.jpg";
import Greg from "../assets/Greg.jpg";
import Hanh from "../assets/Hanh.jpg";
import Faiz from "../assets/Faiz.jpg";

export const Footer = () => {
    return (

        <footer className="mt-auto text-white-50 footer">
            <footer className="container">
                <div className="row row-cols-auto align-items-center copyright">
                    <div className="col">
                        <a href="https://github.com/Amal31497"><img className="profilePic" src={Amal} alt="Amal Janabayev" /></a>
                        <p>Amal Janabayev</p>
                    </div>

                    <div className="col">
                        <a href="https://github.com/Amal31497"><img className="profilePic" src={Jasur} alt="Jasur Amirov" /></a>
                        <p>Jasur Amirov</p>
                    </div>

                    <div className="col">
                        <a href="https://github.com/Amal31497"><img className="profilePic" src={Jenni} alt="Jenny Detmering" /></a>
                        <p>Jenny Detmering</p>
                    </div>

                    <div className="col">
                        <a href="https://github.com/Amal31497"><img className="profilePic" src={Greg} alt="Greg Harris" /></a>
                        <p>Greg Harris</p>
                    </div>

                    <div className="col">
                        <a href="https://github.com/Amal31497"><img className="profilePic" src={Hanh} alt="Hanh Le" /></a>
                        <p>Hanh Le</p>
                    </div>

                    <div className="col">
                        <a href="https://github.com/Amal31497"><img className="profilePic" src={Faiz} alt="Faiz Azeem" /></a>
                        <p>Faiz Azeem</p>
                    </div>

                </div>
                <div className="row copyright">
                    © 2021 My Mini Gallery
                </div>
            </footer>
        </footer>
    )
}

export default Footer