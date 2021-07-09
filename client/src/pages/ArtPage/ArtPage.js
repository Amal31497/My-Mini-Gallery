import React, { useState, useEffect } from 'react';

// Sub-components
import ArtConsole from './ArtConsole';
import AboutAuthor from './AboutAuthor';
import MoreByArtist from './MoreByArtist';
import CommentSection from './CommentSection';
import Genres from './Genres';
// Styling
import { Spinner } from 'react-bootstrap';
import './ArtPage.css';


// import { useHistory } from 'react-router-dom';
import { getArtist, getAllArt, getOneArt } from "../../utils/API";
// import { useArtContext } from "../../utils/GlobalState";
// import { GET_ARTIST } from "../../utils/actions";


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
                    <div className="main col-lg-7 col-md-12">
                        <div className="row" style={{width:"100%"}}>
                            <div className="imageInfo col-12" style={{ height:`${(art.heightRatio * 200) + 680}px` }}>
                                <div className="row" style={{width:"100%", height: `${art.heightRatio * 200}px`}}>
                                    <div className="artImage col-12" style={{  marginTop:"30px", marginBottom:"30px" }}>
                                        <div className="art col-12">
                                            <img
                                                className="actualImage"
                                                src={art.src}
                                                alt={art.title}
                                                style={{
                                                    height: `${art.heightRatio * 200}px`,
                                                    width: `${art.widthRatio * 200}px`
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="artistInfo col-12" style={{height:`50%`, width:"100%"}}>
                                        <div className="col-12"><ArtConsole author={artist}  className="artConsole" /></div>
                                        <br /><br />
                                        <AboutAuthor
                                            art={art}
                                            author={artist}
                                            className="aboutAuthor"
                                        />
                                    </div> 
                                </div>
                            </div>
                            <div className="commentSection col-12">
                                <div className="row" style={{width:"100%", height:"25px"}}>
                                    <CommentSection />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="side col-lg-5 col-md-12">
                        <div className="row" style={{ width: "96%" }}>
                            <div className="moreByAuthor col-lg-12 col-md-6">
                                <div className="row" style={{height:"120vh"}}>
                                    <h4 className="col-12 moreByAuthorTitle">
                                        More by {artist.username}
                                    </h4>
                                    <div className="col-12" style={{height:"112vh"}}>
                                        <MoreByArtist
                                            artist={artist}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="categories col-lg-12 col-md-6">
                                <Genres />
                            </div>
                        </div>
                    </div>
                </div>
                :
                <h1>Ooops, no page found...404</h1>
            }
        </div>
    )
}

export default ArtPage;



                // <div className="row">
                //     <div className="main col-lg-8 col-md-12">
                //         {art ?
                //             <div className="row">
                //                 {/* Image */}
                //                 <div className="col-12">
                //                     <img
                //                         className="artImage"
                //                         src={art.src}
                //                         alt={art.title}
                //                         style={{
                //                             height: `${art.heightRatio * 250}px`,
                //                             width: `${art.widthRatio * 250}px`,
                //                             padding: "0px"
                //                         }}
                //                     />
                //                 </div>
                                
                //                 {/* About Author Section */}
                //                 <div className="col-12 aboutAuthor">
                //                     <AboutAuthor
                //                         art={art}
                //                         author={artist}
                //                     />
                //                 </div>
                                
                //                 <div className="col-12 commentSection">
                //                     <CommentSection
                //                         art={art}
                //                         className="row"
                //                     />
                //                 </div>
                //             </div>
                //             :
                //             <Spinner animation="grow" variant="dark" />
                //         }
                //     </div>
                //     <div classname="side col-lg-4 col-md-12" style={{ width: `${100 / 12 * 3.5}%` }}>
                //         <h4>
                //             More by {artist.username}
                //         </h4>
                //         <MoreByArtist
                //             artist={artist}
                //         />
                //     </div>
                // </div>
                // :
                // <Spinner animation="grow" variant="dark" />