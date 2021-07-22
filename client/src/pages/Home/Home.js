// React
import React from "react";

// Components
import Header from "../../components/Header";
import Gallery from "../../components/Gallery";

// Third Party Dependencies
import Particles from 'react-particles-js';

// Global State(Redux)
import { useArtContext } from "../../utils/GlobalState";


function Home() {
    // eslint-disable-next-line no-unused-vars
    const [state, dispatch] = useArtContext();

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
                <Header />
                <div className="gallery">
                    <Gallery />
                </div>
            </div>
            {/* End Main */}
        </div>
    )
}

export default Home;

