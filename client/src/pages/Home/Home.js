// React
import React, { useState } from "react";

// Components
import Header from "../../components/Header";
import Gallery from "../../components/Gallery";
import GalleryFlickr from '../../components/GalleryFlickr';

// Third Party Dependencies
import Particles from 'react-particles-js';

// Global State(Redux)
import { useArtContext } from "../../utils/GlobalState";


function Home() {
    // eslint-disable-next-line no-unused-vars
    const [state, dispatch] = useArtContext();
    const [selectedGallery, setSelectedGallery] = useState('flickr-gallery')

    // Toggle to My Mini Gallery Function
    const selectMyMiniGallery = (event) => {
        event.preventDefault();
        setSelectedGallery("my-mini-gallery");
    }

    // Toggle to Flickr API gallery function
    const selectFlickrGallery = (event) => {
        event.preventDefault();
        setSelectedGallery("flickr-gallery");
    }

    return (
        <div style={{height:"400vh", background:"black" }}>
            {/* Third party effect - Particles */}
            <Particles
                params={{
                    particles: {
                        number: {
                            value: 150,
                            density: {
                                enable: true,
                                value_area: 1000
                            }
                        },
                        opacity: {
                            value: 1,
                            random: true,
                            anim: {
                                encable: true,
                                speed: 0.2,
                                opacity_min: 0,
                                sync: false
                            }
                        },
                        size: {
                            value: 1.5,
                            random: true,
                            anim: {
                                encable: true,
                                speed: 2,
                                opacity_min: 5,
                                sync: false
                            }
                        },
                        line_linked: {
                            enable: false,
                            distance: 150,
                            opacity: 0.4,
                            width: 1
                        },
                        move: {
                            enable: true,
                            speed: 1.5,
                            direction: "left",
                            random: true,
                            straight: false,
                            out_mode: "out",
                            bounce: false,
                            attract: {
                                enable: false,
                                rotateX: 600,
                                rotateY: 1200
                            }
                        }
                    }
                }}
            />
            {/* End Particles */}
            {/* Main */}
            <div style={{ background: "black" }}>
                {/* Header Component */}
                <Header />
                {/* Gallery Section (Main gallery or Flickr - both Components) */}
                <div className="gallery">
                    <div className="homeConsole">
                        {/* Event click -> open main gallery */}
                        <div className="homeConsoleElement" onClick={selectMyMiniGallery}>
                            <p>My Mini Gallery</p>
                        </div>
                         {/* Event click -> open Flickr gallery */}
                        <div className="homeConsoleElement" onClick={selectFlickrGallery}>
                            <p>Flickr API Gallery</p>
                        </div>
                    </div>
                    {selectedGallery === "my-mini-gallery" ? 
                        <Gallery />
                        :
                        <GalleryFlickr />
                    }
                </div>
                {/* End Gallery Section */}
            </div>
            {/* End Main */}
        </div>
    )
}

export default Home;

