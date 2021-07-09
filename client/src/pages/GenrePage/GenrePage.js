import React, { useEffect, useState } from "react";
import Gallery from "react-photo-gallery";
import { useHistory } from 'react-router-dom';
import { getAllArt } from "../../utils/API";
import uuid from 'react-uuid';
import threeD from '../genre/pics/3d.jpg';
import AnimeManga from '../genre/pics/AnimeManga.jpg';
import Crafts from '../genre/pics/crafts.jpg';
import Comic from '../genre/pics/comics.jpg';
import Customizations from '../genre/pics/customization.jpg';
import Cosplays from '../genre/pics/cosplay.jpg';
import Digital from '../genre/pics/digital.jpg';
import FantasyArt from '../genre/pics/fantasy.jpg';
import Fanarts from '../genre/pics/fanart.jpg';
import PhotoManipulation from '../genre/pics/photomanipulation.jpg';
import Photos from '../genre/pics/photography.jpg';
import Traditionals from '../genre/pics/traditional.jpg';
import { TiChevronLeftOutline } from 'react-icons/ti';
import { BiRightArrow } from 'react-icons/bi';
import { useArtContext } from "../../utils/GlobalState";

import './GenrePage.css';

const GenrePage = () => {
    const [state, dispatch] = useArtContext();
    const history = useHistory();
    const selectedGenre = window.location.search.split("?")[1].split("%20").join(" ")||window.location.search.split("?")[1];
    const [artWork, setArtwork] = useState();
    console.log(selectedGenre.split(" ").join(""))

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
    console.log(state.user)
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
            <h4 className="backToGenres" onClick={takeMeBack}><span><TiChevronLeftOutline size={20} /></span> Back to Genres</h4>
            <div className="imagePart">
                <h4 className="mainGenreText">{selectedGenre}</h4>
                <img className="mainImage" src={src} alt="mainImage" />
            </div>
            <div className="galleryPart">
                {artWork&&artWork.length > 0 ? 
                    <div style={{width:"700px",height:"600px"}}>
                        <Gallery key={artWork.key} photos={artWork} onClick={selectImage} />
                    </div>
                    :
                    <h3 onClick={uploadArt} className="addGenreText" style={{opacity:"30%", color:"rgb(231,233,235)"}}>Be the first one to add to this genre! <BiRightArrow size={24}/> </h3>
                }
            </div>
        </div>
    )
}

export default GenrePage;