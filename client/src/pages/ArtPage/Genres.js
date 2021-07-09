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
            <h4 className="col-12 categoryElement" onMouseEnter={flipOn} onMouseLeave={flipOff}>{props.genres.name}</h4>
        )
    } else {
        return(
            <img className="col-12 categoryElement" onMouseEnter={flipOn} onMouseLeave={flipOff} src={props.genres.img} alt={props.genres.name} />
        )
    }
}


const Genres = () => {

    const genres = [
        {
            name:"3D",
            img:threeD
        },
        {
            name:"Anime/Manga",
            img:AnimeManga
        },
        {
            name:"Crafts",
            img:crafts
        },
        {
            name:"Comics",
            img:comics
        },
        {
            name:"Customization",
            img:customization
        },
        {
            name:"Cosplay",
            img:cosplay
        },
        {
            name:"Digital Art",
            img:digital
        },
        {
            name:"Fantasy",
            img:fantasy
        },
        {
            name:"Fanart",
            img:fanart
        },
        {
            name:"Photo Manipulation",
            img:photoManipulation
        },
        {
            name:"Photography",
            img:photography
        },
        {
            name:"Traditional",
            img:traditional
        }
    ]


    return(
        <div  className="row" style={{display:"block", justifyContent:"center", marginTop:"50px", width:"80%"}}>
            <h4 style={{marginBottom:"50px", display:"flex",justifyContent:"center"}}>Explore More Genres</h4>
            {genres.map(genre => {
                return (
                    <div>
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