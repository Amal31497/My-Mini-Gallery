import React, { useState, useEffect } from 'react';
import { getArtist, getOneArt, deleteArt, dropArtComments } from "../../utils/API";
import { useArtContext } from "../../utils/GlobalState";
import { useHistory } from 'react-router-dom';
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
    const history = useHistory();
    var targetArt = window.location.search.split("?")[1];
    const [art, setArt] = useState();
    const [artist, setArtist] = useState({});
    const [state,dispatch] = useArtContext();
    const [deleteModal, setDeleteModal] = useState(false);

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

    
    const openDeleteModal = (event) => {
        event.preventDefault();
        setDeleteModal(true);
    }   

    const closeDeleteModal = (event) => {
        event.preventDefault();
        setDeleteModal(false);
    }

    const deleteThisArt = (event) => {
        event.preventDefault();
        dropArtComments(targetArt)
            .then(response => {
                deleteArt(targetArt)
                    .then(response => {
                        console.log(response);
                        history.push("/")
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
    }


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
                    {art.user === state.user ?
                        <div className="artDeleteOrUpdate col-12">
                            <p>This is your posting</p>
                            <button type="button" class="btn btn-danger btn-xs" onClick={openDeleteModal}>Delete</button>
                        </div>
                        :
                        null
                    }
                    {/* Delete Modal Begin */}
                    {deleteModal === true ?
                        <div className="modal" tabIndex="-1" style={{ display: "block" }}>
                            <div className="modal-dialog modal-md modal-dialog-centered">
                                <div className="modal-content">
                                    <h4 style={{marginLeft:"auto", marginRight:"auto"}}>Are you sure you want to delete this art?</h4>
                                    <p style={{marginLeft:"auto", marginRight:"auto"}}>All comments for this art will be deleted too.</p>
                                    <div className="row" style={{width:"80%", marginLeft:"auto", marginRight:"auto"}}>
                                        <button onClick={closeDeleteModal} type="button" className="col-6 btn btn-light">No!</button>
                                        <button onClick={deleteThisArt} type="button" className="col-6 btn btn-danger">Yes, Delete my Account</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        null
                    }
                    {/* Delete Modal End */}
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