import React, { useState, useEffect } from 'react';
import { getArtist,  getOneArt } from "../../utils/API";
// Sub-components
import ArtConsole from './ArtConsole';
import AboutAuthor from './AboutAuthor';
import MoreByArtist from './MoreByArtist';
import CommentSection from './CommentSection';
import Genres from './Genres';
// Styling
import { Spinner } from 'react-bootstrap';
import './ArtPage.css';



const ArtPage = () => {
    var targetArt = window.location.search.split("?")[1];
    const [art, setArt] = useState();
    const [artist, setArtist] = useState({});

    useEffect(() => {
        getOneArt(targetArt)
            .then(artData => {
                setArt(artData.data);
                if (artData.data.user) {
                    getArtist(artData.data.user)
                        .then(artistData => setArtist(artistData.data))
                        .catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err))
    }, [targetArt])

    // console.log(artist)
    return (
        <div className="artPage">
            {(art && artist) ?
                <div className="row">
                    <div className="art col-12">
                        <img
                            className="actualImage"
                            src={art.src}
                            alt={art.title}
                            style={{
                                height: `${art.heightRatio * 450}px`,
                                width: `${art.widthRatio * 450}px`
                            }}
                        />
                    </div>
                    <div className="artistInfo col-12" style={{ height: `50%`, width: "100%" }}>
                        <div className="col-12"><ArtConsole author={artist} className="artConsole" /></div>
                        <br /><br />
                        <AboutAuthor
                            art={art}
                            author={artist}
                            className="aboutAuthor"
                        />
                    </div>

                    <div className="moreByAuthor col-12">
                        <div className="row">
                            <h4 className="col-12 moreByAuthorTitle" style={{ color: "white" }}>
                                More by {artist.username}
                            </h4>
                            <div className="col-12" style={{ height: "112vh" }}>
                                <MoreByArtist
                                    artist={artist}
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className="commentSection col-12">
                        <div className="row" style={{ width: "100%", height: "25px" }}>
                            <CommentSection />
                        </div>
                    </div>
                </div>
                :
                null
            }
        </div>
    )
}

export default ArtPage;