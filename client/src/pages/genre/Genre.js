import React from 'react';
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

export const Genre = () => {
    return (
        <div className="background">
            <div className="container">
                <div class="card-group">
                    <a href="" className="card">
                        <img src={threeD} alt="3D thumbnail" />
                        <div className="card-img-overlay">
                            <h5 className="card-title">3D</h5>
                        </div>
                    </a>

                    <a href="" className="card">
                        <img src={AnimeManga} className="card-img" alt="3D thumbnail" />
                        <div className="card-img-overlay">
                            <h5 className="card-title">Anime and Manga</h5>
                        </div>
                    </a>

                    <a href="" className="card">
                        <img src={crafts} className="card-img" alt="3D thumbnail" />
                        <div className="card-img-overlay">
                            <h5 className="card-title">Artisan Crafts</h5>
                        </div>
                    </a>

                    <a href="" className="card">
                        <img src={comics} className="card-img" alt="3D thumbnail" />
                        <div className="card-img-overlay">
                            <h5 className="card-title">Comics</h5>
                        </div>
                    </a>
                </div>

                <div className="card-group">
                    <a href="" className="card">
                        <img src={customization} className="card-img" alt="3D thumbnail" />
                        <div className="card-img-overlay">
                            <h5 className="card-title">Customization</h5>
                        </div>
                    </a>

                    <a href="" className="card">
                        <img src={cosplay} className="card-img" alt="3D thumbnail" />
                        <div className="card-img-overlay">
                            <h5 className="card-title">Cosplay</h5>
                        </div>
                    </a>

                    <a href="" className="card">
                        <img src={digital} className="card-img" alt="3D thumbnail" />
                        <div className="card-img-overlay">
                            <h5 className="card-title">Digital Arts</h5>
                        </div>
                    </a>

                    <a href="" className="card">
                        <img src={fantasy} className="card-img" alt="3D thumbnail" />
                        <div className="card-img-overlay">
                            <h5 className="card-title">Fantasy</h5>
                        </div>
                    </a>
                </div>

                <div className="card-group">
                    <a href="" className="card">
                        <img src={fanart} className="card-img" alt="3D thumbnail" />
                        <div className="card-img-overlay">
                            <h5 className="card-title">Fan Art</h5>
                        </div>
                    </a>

                    <a href="" className="card">
                        <img src={photoManipulation} className="card-img" alt="3D thumbnail" />
                        <div className="card-img-overlay">
                            <h5 className="card-title">Photo Manipulation</h5>
                        </div>
                    </a>

                    <a href="" className="card">
                        <img src={photography} className="card-img" alt="3D thumbnail" />
                        <div className="card-img-overlay">
                            <h5 className="card-title">Photography</h5>
                        </div>
                    </a>

                    <a href="" className="card">
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