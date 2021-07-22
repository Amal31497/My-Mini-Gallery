/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

// Global context
import { getArtist, getOneArt, deleteArt, dropArtComments } from "../../utils/API";
import { useArtContext } from "../../utils/GlobalState";
import { useHistory } from 'react-router-dom';

// Sub-components
import ArtConsole from './ArtConsole';
import AboutAuthor from './AboutAuthor';
import MoreByArtist from './MoreByArtist';
import CommentSection from './CommentSection';

// Styling
import { Spinner } from 'react-bootstrap';
import { AiOutlineImport } from 'react-icons/ai';
import { RiDeleteBinLine } from 'react-icons/ri';

import './ArtPage.css';



const ArtPage = () => {
    // Global context
    const [state, dispatch] = useArtContext();

    // useHistory Dom Hook
    const history = useHistory();

    // Window related vars
    var targetArt = window.location.search.split("?")[1];

    // States
    const [art, setArt] = useState();
    const [artist, setArtist] = useState({});   
    const [deleteModal, setDeleteModal] = useState(false);

    // Return targeted art when page loads
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

    // Open Modal listener
    const openDeleteModal = (event) => {
        event.preventDefault();
        setDeleteModal(true);
    }   

    // Close Modal listener
    const closeDeleteModal = (event) => {
        event.preventDefault();
        setDeleteModal(false);
    }

    // Delete targeted art listener
    const deleteThisArt = (event) => {
        event.preventDefault();
        // First drop all comments related to this art from the database
        dropArtComments(targetArt)
            .then(response => {
                // Then delete the art itself
                deleteArt(targetArt)
                    .then(response => {
                        console.log(response);
                        history.push("/")
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
    }
    // Two separate routes for art deletion because comments have their own schema 
    // and will result in orphaned data if not deleted accordingly

    return (
        <div className="artPage">
            <div className="container">
                {(art && artist) ?
                    <div className="row">
                        {/* Art image and information whether it is current user's post or not */}
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
                        {/* If current user's posting that they are given option to delete */}
                        {art.user === state.user ?
                            <div className="artDeleteOrUpdate col-12">
                                <p>This is your posting</p>
                                <button type="button" className="btn btn-danger btn-xs" onClick={openDeleteModal}>Delete</button>
                            </div>
                            :
                            null
                        }
                        {/* Delete Modal Begin */}
                        {deleteModal === true ?
                            <div className="modal deleteModal" tabIndex="-1">
                                <div className="modal-dialog modal-md modal-dialog-centered">
                                    <div className="modal-content">
                                        <h4 style={{ marginLeft: "auto", marginRight: "auto" }}>Are you sure you want to delete this art?</h4>
                                        <p style={{ marginLeft: "auto", marginRight: "auto" }}>All comments for this art will be deleted too.</p>
                                        <div className="row" style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
                                            <AiOutlineImport onClick={closeDeleteModal} type="button" size={40} className="col-6 exitButtonDeleteModal" />
                                            <RiDeleteBinLine onClick={deleteThisArt} type="button" size={40} color="#ff6961" className="col-6 deleteButtonDeleteModal" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            null
                        }
                        {/* Delete Modal End */}

                        {/* About Author section */}
                        <div className="artistInfo col-12" style={{ height: `50%`, width: "100%" }}>
                            <div className="col-12"><ArtConsole author={artist} className="artConsole" /></div>
                            <br /><br />
                            <AboutAuthor
                                art={art}
                                author={artist}
                                className="aboutAuthor"
                            />
                        </div>
                        {/* End About Author Section */}

                        {/* More by author Section */}
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
                        {/* End More by Author Section */}

                        {/* Comment Section */}
                        <div className="commentSection col-12">
                            <div className="row" style={{ width: "100%", height: "25px" }}>
                                <CommentSection />
                            </div>
                        </div>
                        {/* End Comment Section */}
                    </div>
                    :
                    null
                }
            </div>
        </div>
    )
}

export default ArtPage;