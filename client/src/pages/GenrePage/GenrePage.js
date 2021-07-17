import React, { useEffect, useState } from "react";
import Gallery from "react-photo-gallery";
import { useHistory } from 'react-router-dom';
import { getAllArt } from "../../utils/API";
import uuid from 'react-uuid';
import threeD from '../Genre/pics/3d.jpg';
import AnimeManga from '../Genre/pics/AnimeManga.jpg';
import Crafts from '../Genre/pics/crafts.jpg';
import Comic from '../Genre/pics/comics.jpg';
import Customizations from '../Genre/pics/customization.jpg';
import Cosplays from '../Genre/pics/cosplay.jpg';
import Digital from '../Genre/pics/digital.jpg';
import FantasyArt from '../Genre/pics/fantasy.jpg';
import Fanarts from '../Genre/pics/fanart.jpg';
import PhotoManipulation from '../Genre/pics/photomanipulation.jpg';
import Photos from '../Genre/pics/photography.jpg';
import Traditionals from '../Genre/pics/traditional.jpg';
import { TiChevronLeftOutline } from 'react-icons/ti';
import { BiRightArrow } from 'react-icons/bi';
import { useArtContext } from "../../utils/GlobalState";

import './GenrePage.css';

const GenrePage = () => {
    const [state, dispatch] = useArtContext();
    const history = useHistory();
    const selectedGenre = window.location.search.split("?")[1].split("%20").join(" ")||window.location.search.split("?")[1];
    const [artWork, setArtwork] = useState();

    var src;
    if(selectedGenre === "3D") {
        src = threeD;
    } else if(selectedGenre.split(" ").join("") === "AnimeandManga") {
        src = AnimeManga;
    } else if(selectedGenre.split(" ").join("") === "ArtisanCraft") {
        src = Crafts;
    } else if(selectedGenre.split(" ").join("") === "Comic") {
        src = Comic;
    } else if(selectedGenre.split(" ").join("") === "DigitalArt") {
        src = Digital;
    } else if(selectedGenre.split(" ").join("") === "TraditionalArt") {
        src = Traditionals;
    } else if(selectedGenre.split(" ").join("") === "Customization") {
        src = Customizations;
    } else if(selectedGenre.split(" ").join("") === "Cosplay") {
        src = Cosplays;
    } else if(selectedGenre.split(" ").join("") === "Fantasy") {
        src = FantasyArt;
    } else if(selectedGenre.split(" ").join("") === "FanArt") {
        src = Fanarts;
    } else if(selectedGenre.split(" ").join("") === "PhotoManipulation") {
        src = PhotoManipulation;
    } else if(selectedGenre.split(" ").join("") === "Photography") {
        src = Photos;
    }
    
    const takeMeBack = () => {
        history.push("/genre")
    }
    
    const uploadArt = () => {
        if(state.user.length > 0){
            history.push("/post")
        } else {
            history.push("/login")
        }
        
    }

    useEffect(() => {
        getAllArt()
            .then(response => {
                var selectedArt = [];
                response.data.map(art => {
                    if(art.genre === selectedGenre) {
                        selectedArt.push(
                            {
                                key: JSON.stringify(uuid()),
                                id: art._id,
                                title: art.title,
                                description: art.description,
                                comments: art.comments,
                                genre: art.genre,
                                user: art.user,
                                src: art.src,
                                height: art.height,
                                width: art.width
                            }
                        )
                    }
                })
                setArtwork(selectedArt)
            })
    },[])

    const selectImage = (event) => {
        event.preventDefault();
        var selected = {id:event.target.getAttribute("id")}
        history.push(`artPage?${selected.id}`)
    }

    return(
        <div className="genreSearchPageMain">
            <p className="backToGenres" onClick={takeMeBack}><span><TiChevronLeftOutline size={20} /></span> Back to Genres</p>
            <h4 className="titleGenre">{window.location.search.split("?")[1].replace("%20", " ")}</h4>
            <div className="galleryPart">
                {artWork&&artWork.length > 0 ? 
                    <div className="gallery">
                        <Gallery key={artWork.key} photos={artWork} onClick={selectImage} />
                    </div>
                    :
                    <h3 onClick={uploadArt} className="addGenreText" style={{color:"rgb(231,233,235)"}}>Be the first one to add to this genre! <BiRightArrow size={24}/> </h3>
                }
            </div>
        </div>
    )
}

export default GenrePage;