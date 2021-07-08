import React, { useEffect } from "react";
import Header from "../components/Header";
import Gallery from "../components/Gallery";
import Particles from 'react-particles-js';
import { getAllArt } from "../utils/API";
import { useArtContext } from "../utils/GlobalState";
import { GET_ALL_ART } from "../utils/actions";


function Home() {

    // eslint-disable-next-line no-unused-vars
    const [state, dispatch] = useArtContext();
    // console.log(state)
    // console.log(state)
    // const findArt = () => {
    //     getAllArt()
    //         .then(response => {
    //             dispatch({
    //                 type: GET_ALL_ART,
    //                 arts: response.data
    //             })
    //         })
    //         .catch(err => console.log(err))
    // }

    // useEffect(() => {
    //     findArt()
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])


    return (
        <div>
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
            <div>
                <Header />
                <Gallery />
            </div>
        </div>
    )
}

export default Home;