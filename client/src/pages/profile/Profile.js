import React, { useState, useCallback } from "react";
import './Profile.css';

import artistPic from "../assets/artist.jpg";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { Button } from 'react-bootstrap'
import { getAllArt, getArtist } from "../../utils/API";
import { useArtContext } from "../../utils/GlobalState";
import { GET_ARTIST } from "../../utils/actions";

function Profile() {
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);
    const [images, setImages] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [_, dispatch] = useArtContext();
    const [display, setDisplay] = useState("none")


    const hideModal = (event) => {
        event.preventDefault();
        setDisplay("none")
    }

    const showModal = (event) => {
        event.preventDefault();
        setDisplay("show")
    }


    const findArtist = () => {
        if (!_.artist.firstName && _.user.user_id) {
            getArtist(_.user.user_id)
                .then(response => {
                    dispatch({
                        type: GET_ARTIST,
                        artist: response.data
                    })
                    getAllArt()
                        .then(res => {
                            const profileArt = [];
                            res.data.forEach(art => {
                                if (response.data.art.includes(art._id)) {
                                    profileArt.push(art)
                                }
                            })
                            setImages(profileArt)
                        })
                })
                .catch(err => console.log(err))
        }
    }

    findArtist();

    const openLightbox = useCallback((event, { photo, index }) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    return (
        <div className="background2">
            <div id="about" className="container py-5">
                <div className="row">
                    <div className="col-lg-3 col-xm-12">
                        <div className="row">
                            <div className="col-lg-1" >
                                <Button variant="outline-light" onClick={showModal}
                                    style={{ width: "2rem", height: "100%", display: "flex", textAlign: "center", justifyContent: "center" }}>
                                    <p style={{ textOrientation: "mixed", writingMode: "vertical-rl", alignSelf: "center", padding: "0", letterSpacing: "2px" }}>
                                        Edit
                                    </p>
                                </Button>
                                {display === "show" ?
                                    <div className="modal" tabIndex="-1" style={{ display: "block" }}>
                                        <div className="modal-dialog modal-lg modal-dialog-centered">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title">Edit your profile</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={hideModal}></button>
                                                </div>
                                                <div className="modal-body" style={{height:"55vh"}}>
                                                    <div className="row" style={{display:"flex",justifyContent:"center", alignContent:"center"}}>
                                                        <img className="artistPic col-lg-2 col-md-12 col-sm-12 col-xs-12" src={artistPic} alt="profile pic" />
                                                        <div className="col-lg-5 col-md-9 col-sm-9">
                                                            <div><span><strong>Name - </strong></span><input defaultValue={_.artist.firstName}></input></div>
                                                            <div><span><strong>Username - </strong></span><input defaultValue={_.artist.username}></input></div>
                                                        </div>
                                                        <div className="col-lg-5 col-md-9 col-sm-9">
                                                            <div><span><strong>Email - </strong></span><input defaultValue={_.artist.email}></input></div>
                                                            <div><span><strong>Password - </strong></span><input defaultValue={_.artist.password}></input></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div style={{ display: "flex", justifyContent: "center", paddingTop:"10px"}}>
                                                            <p className="row"><strong>Description</strong></p>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div style={{ display: "flex", justifyContent: "center", width:"100%", height:"6rem" }}>
                                                            <textarea defaultValue={_.artist.description} style={{width:"90%", height:"100%"}}></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={hideModal}>Close</button>
                                                    <button type="button" className="btn btn-primary">Update Profile</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div> : null}
                            </div>
                            <div className="photo-wrap mb-5c col-lg-11">
                                <img className="artistPic" src={artistPic} alt="profile pic" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9 col-xm-12">
                        <div className="username">{_.artist.username}</div>
                        <div className="artistName">{_.artist.firstName}</div>
                        <div className="row contact">
                            <button type="button" className="btn btn-dark">Contact Me</button>
                        </div>
                    </div>
                </div>
                <div className="gallery">
                    <Gallery key={images.key} photos={images} onClick={openLightbox} />
                    <ModalGateway>
                        {viewerIsOpen ? (
                            <Modal onClose={closeLightbox}>
                                <Carousel
                                    currentIndex={currentImage}
                                    views={images.map(x => ({
                                        ...x,
                                        srcset: x.srcSet,
                                        caption: x.title
                                    }))}
                                />
                            </Modal>
                        ) : null}
                    </ModalGateway>
                </div>
            </div>
        </div>
    )
}

export default Profile;