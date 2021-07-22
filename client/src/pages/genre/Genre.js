/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import './Genre.css';

import threeD from './pics/3d.jpg';
import AnimeManga from './pics/AnimeManga.jpg';
import crafts from './pics/crafts.jpg';
import comics from './pics/comics.jpg';
import customization from './pics/customization.jpg';
import cosplay from './pics/cosplay.jpg';
import digital from './pics/digital.jpg';
import fantasy from './pics/fantasy.jpg';
import fanart from './pics/fanart.jpg';
import photoManipulation from './pics/photomanipulation.jpg';
import photography from './pics/photography.jpg';
import traditional from './pics/traditional.jpg';
import { useHistory } from 'react-router-dom';


const Genre = () => {
    const history = useHistory();
    const getArt = (event, option) => {
        event.preventDefault()
        history.push(`/genresearch?${option}`)
    }



    return (
        <div className="background">
            <div className="container">
                <div className="card-group" >
                    <a href="/genresearch?3D" className="card" onClick={(event) => getArt(event, "3D")} >
                        <img src={threeD} alt="3D thumbnail" />
                        <div className="card-img-overlay">
                            <h5 className="card-title">3D</h5>
                        </div>
                    </a>
                    <a href="/genresearch?AnimeAndManga" className="card" onClick={(event) => getArt(event, "Anime and Manga")} >
                        <img src={AnimeManga} className="card-img" alt="3D thumbnail" />
                        <div className="card-img-overlay">
                            <h5 className="card-title">Anime and Manga</h5>
                        </div>
                    </a>
                    <a href="/genresearch?ArtisanCraft" className="card" onClick={(event) => getArt(event, "Artisan Craft")}>
                        <img src={crafts} className="card-img" alt="3D thumbnail" />
                        <div className="card-img-overlay">
                            <h5 className="card-title">Artisan Crafts</h5>
                        </div>
                    </a>

                    <a href="/genresearch?Comic" className="card" onClick={(event) => getArt(event, "Comic")}>
                        <img src={comics} className="card-img" alt="3D thumbnail" />
                        <div className="card-img-overlay">
                            <h5 className="card-title">Comics</h5>
                        </div>
                    </a>
                </div>

                <div className="card-group">
                    <a href="/genresearch?Customization" className="card" onClick={(event) => getArt(event, "Customization")}>
                        <img src={customization} className="card-img" alt="3D thumbnail" />
                        <div className="card-img-overlay">
                            <h5 className="card-title">Customization</h5>
                        </div>
                    </a>

                    <a href="/genresearch?Cosplay" className="card" onClick={(event) => getArt(event, "Cosplay")}>
                        <img src={cosplay} className="card-img" alt="3D thumbnail" />
                        <div className="card-img-overlay">
                            <h5 className="card-title">Cosplay</h5>
                        </div>
                    </a>

                    <a href="/genresearch?DigitalArt" className="card" onClick={(event) => getArt(event, "Digital Art")}>
                        <img src={digital} className="card-img" alt="3D thumbnail" />
                        <div className="card-img-overlay">
                            <h5 className="card-title">Digital Arts</h5>
                        </div>
                    </a>

                    <a href="/genresearch?Fantasy" className="card" onClick={(event) => getArt(event, "Fantasy")}>
                        <img src={fantasy} className="card-img" alt="3D thumbnail" />
                        <div className="card-img-overlay">
                            <h5 className="card-title">Fantasy</h5>
                        </div>
                    </a>
                </div>

                <div className="card-group">
                    <a href="/genresearch?FanArt" className="card" onClick={(event) => getArt(event, "Fan Art")}>
                        <img src={fanart} className="card-img" alt="3D thumbnail" />
                        <div className="card-img-overlay">
                            <h5 className="card-title">Fan Art</h5>
                        </div>
                    </a>

                    <a href="/genresearch?PhotoManipulation" className="card" onClick={(event) => getArt(event, "Photo Manipulation")}>
                        <img src={photoManipulation} className="card-img" alt="3D thumbnail" />
                        <div className="card-img-overlay">
                            <h5 className="card-title">Photo Manipulation</h5>
                        </div>
                    </a>

                    <a href="/genresearch?Photography" className="card" onClick={(event) => getArt(event, "Photography")} >
                        <img src={photography} className="card-img" alt="3D thumbnail" />
                        <div className="card-img-overlay">
                            <h5 className="card-title">Photography</h5>
                        </div>
                    </a>

                    <a href="/genresearch?TraditionalArt" className="card" onClick={(event) => getArt(event, "Traditional Art")}>
                        <img src={traditional} className="card-img" alt="3D thumbnail" />
                        <div className="card-img-overlay">
                            <h5 className="card-title">Traditional Arts</h5>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Genre;