import React, { useState } from 'react';
import threeD from '../genre/pics/3d.jpg';
import AnimeManga from '../genre/pics/AnimeManga.jpg';
import crafts from '../genre/pics/crafts.jpg';
import comics from '../genre/pics/comics.jpg';
import customization from '../genre/pics/customization.jpg';
import cosplay from '../genre/pics/cosplay.jpg';
import digital from '../genre/pics/digital.jpg';
import fantasy from '../genre/pics/fantasy.jpg';
import fanart from '../genre/pics/fanart.jpg';
import photoManipulation from '../genre/pics/photomanipulation.jpg';
import photography from '../genre/pics/photography.jpg';
import traditional from '../genre/pics/traditional.jpg';

import Gallery from "react-photo-gallery";
import Carousel, { slidesToShowPlugin, autoplayPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';


import { useHistory } from 'react-router-dom';
const Card = (props) => {

    

    const [hover,setHover] = useState(false);

    const flipOn = () => {
        setHover(true)
    }

    const flipOff = () => {
        setHover(false)
    }


    if(hover === false){
        return(
            <img 
                className="col-12 categoryElement" 
                onMouseEnter={flipOn} 
                onMouseLeave={flipOff} 
                src={props.genres.src} 
                alt={props.genres.name} 
                
            />
            
        )
    } else {
        return(
            <h4 
                className="col-12 categoryElement" 
                onMouseEnter={flipOn} 
                onMouseLeave={flipOff}>{props.genres.name}
            </h4>
        )
    }
}


const Genres = () => {
    const history = useHistory();
    const genres = [
        {
            name:"3D",
            src:threeD,
            href:"/genresearch?3D",
            width:1,
            height:1
        },
        {
            name:"Anime/Manga",
            src:AnimeManga,
            href:"/genresearch?AnimeAndManga",
            width:1,
            height:1
        },
        {
            name:"Crafts",
            src:crafts,
            href:"/genresearch?ArtisanCraft",
            width:1,
            height:1
        },
        {
            name:"Comics",
            src:comics,
            href:"/genresearch?Comic",
            width:1,
            height:1
        },
        {
            name:"Customization",
            src:customization,
            href:"/genresearch?Customization",
            width:1,
            height:1
        },
        {
            name:"Cosplay",
            src:cosplay,
            href:"/genresearch?Cosplay",
            width:1,
            height:1
        },
        {
            name:"Digital Art",
            src:digital,
            href:"/genresearch?DigitalArt",
            width:1,
            height:1
        },
        {
            name:"Fantasy",
            src:fantasy,
            href:"/genresearch?Fantasy",
            width:1,
            height:1
        },
        {
            name:"Fanart",
            src:fanart,
            href:"/genresearch?FanArt",
            width:1,
            height:1
        },
        {
            name:"Photo Manipulation",
            src:photoManipulation,
            href:"/genresearch?PhotoManipulation",
            width:1,
            height:1
        },
        {
            name:"Photography",
            src:photography,
            href:"/genresearch?Photography",
            width:1,
            height:1
        },
        {
            name:"Traditional",
            src:traditional,
            href:"/genresearch?TraditionalArt",
            width:1,
            height:1
        }
    ]


    const takeMeToGenre = (event,genre) => {
        event.preventDefault();
        if(genre){
            history.push(genre)
            window.scrollTo(0, 0)
        }
    }

    return(
        <div  className="row" style={{display:"block", justifyContent:"center", marginTop:"50px", width:"90%"}}>
            <h4 style={{marginBottom:"50px", display:"flex",justifyContent:"center"}}>Explore</h4>

            <div className="row">
                {genres.map(genre => {
                    return (
                        <div className="col-lg-6 col-md-3" onClick={(event) => takeMeToGenre(event, genre.href)}>
                            <Card
                                genres={genre}
                                className="genreCard col-12"
                            />
                        </div>
                    )
                })}
            </div>

            {/* <Gallery key={genres.key} photos={genres}  />        */}
        </div>
    )
}

export default Genres;





{/* <Carousel
                plugins={[
                    'centered',
                    'arrows',
                    'infinite',
                    {
                        resolve: autoplayPlugin,
                        options: {
                            interval: 1000,
                        }
                    },
                    {
                        resolve: slidesToShowPlugin,
                        options: {
                            numberOfSlides: 1
                        }
                    }
                ]}
                animationSpeed={1000}
                breakpoints={{
                    640: {
                        plugins: [
                            'centered',
                            'arrows',
                            'infinite',
                            {
                                resolve: autoplayPlugin,
                                options: {
                                    interval: 1000,
                                }
                            },
                            {
                                resolve: slidesToShowPlugin,
                                options: {
                                    numberOfSlides: 1
                                }
                            },
                        ]
                    },
                    1100: {
                        plugins: [
                            'centered',
                            'arrows',
                            'infinite',
                            {
                                resolve: autoplayPlugin,
                                options: {
                                    interval: 1000,
                                }
                            },
                            {
                                resolve: slidesToShowPlugin,
                                options: {
                                    numberOfSlides: 2
                                }
                            },
                        ]
                    },
                    1400: {
                        plugins: [
                            'centered',
                            'arrows',
                            'infinite',
                            {
                                resolve: autoplayPlugin,
                                options: {
                                    interval: 1000,
                                }
                            },
                            {
                                resolve: slidesToShowPlugin,
                                options: {
                                    numberOfSlides: 3
                                }
                            },
                        ]
                    }
                }}
            >
                {genres.map(genre => {
                    return (
                        <div className="genreWrapper" onClick={(event) => takeMeToGenre(event, genre.href)}>
                            <Card
                                genres={genre}
                                className="genreCard col-12"
                            />
                        </div>
                    )
                })}
            </Carousel> */}