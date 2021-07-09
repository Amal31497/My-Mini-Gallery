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
                src={props.genres.img} 
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
            img:threeD,
            href:"/genresearch?3D"
        },
        {
            name:"Anime/Manga",
            img:AnimeManga,
            href:"/genresearch?AnimeAndManga"
        },
        {
            name:"Crafts",
            img:crafts,
            href:"/genresearch?ArtisanCraft"
        },
        {
            name:"Comics",
            img:comics,
            href:"/genresearch?Comic"
        },
        {
            name:"Customization",
            img:customization,
            href:"/genresearch?Customization"
        },
        {
            name:"Cosplay",
            img:cosplay,
            href:"/genresearch?Cosplay"
        },
        {
            name:"Digital Art",
            img:digital,
            href:"/genresearch?DigitalArt"
        },
        {
            name:"Fantasy",
            img:fantasy,
            href:"/genresearch?Fantasy"
        },
        {
            name:"Fanart",
            img:fanart,
            href:"/genresearch?FanArt"
        },
        {
            name:"Photo Manipulation",
            img:photoManipulation,
            href:"/genresearch?PhotoManipulation"
        },
        {
            name:"Photography",
            img:photography,
            href:"/genresearch?Photography"
        },
        {
            name:"Traditional",
            img:traditional,
            href:"/genresearch?TraditionalArt"
        }
    ]


    const takeMeToGenre = (event,genre) => {
        event.preventDefault();
        if(genre){
            history.push(genre)
        }
    }

    return(
        <div  className="row" style={{display:"block", justifyContent:"center", marginTop:"50px", width:"80%"}}>
            <h4 style={{marginBottom:"50px", display:"flex",justifyContent:"center"}}>Explore More Genres</h4>
            {genres.map(genre => {
                return (
                    <div className="genreWrapper" onClick={(event) => takeMeToGenre(event,genre.href)}>
                        <Card
                            genres={genre}
                            className="genreCard col-12"
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default Genres;