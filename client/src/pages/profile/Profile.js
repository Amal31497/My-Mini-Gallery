import React, { useState, useCallback, useRef } from "react";
import './Profile.css';

import { useArtContext } from "../../utils/GlobalState";
import { UPDATE_ARTIST, GET_ARTIST } from "../../utils/actions";
import { updateUser, getAllArt, getArtist } from "../../utils/API";
import reactImageSize from 'react-image-size';
import artistPic from "../assets/artist.jpg";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { Button } from 'react-bootstrap'
import { uploadFile } from 'react-s3';
import env from "react-dotenv";

const config = {
    bucketName: 'miniartworks',
    region: 'us-west-2',
    accessKeyId: env.REACT_APP_ACCESS_KEY,
    secretAccessKey: env.REACT_APP_SECRET_ACCESS_KEY
}

function Profile() {
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);
    const [images, setImages] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [_, dispatch] = useArtContext();
    const [display, setDisplay] = useState("none")
    const [readyImage, setReadyImage] = useState("");

    const nameRef = useRef();
    const userNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const descriptionRef = useRef();

    const [imgwidth, setWidth] = useState();
    const [imgheight, setHeight] = useState();
    const [widthRatio, setWidthRatio] = useState();
    const [heightRatio, setHeightRatio] = useState();


    const hideModal = (event) => {
        event.preventDefault();
        setDisplay("none")
    }

    const showModal = (event) => {
        event.preventDefault();
        setDisplay("show")
    }

    const handleFileInput = (event) => {
        event.preventDefault();
        uploadFile(event.target.files[0], config)
            .then(data => {
                console.log(data.location)
                setReadyImage(data.location)
                reactImageSize(data.location)
                .then(({ width, height }) => {
                    setWidth(width);
                    setHeight(height);
                    if (width > height) {
                        setWidthRatio(Math.round(width / height))
                        setHeightRatio(1)
                    } else {
                        setHeightRatio(Math.round(height / width))
                        setWidthRatio(1)
                    }
                })
                .catch(errorMessage => {
                    console.error(errorMessage)
                })
            })
    }

    const handleFormSubmit = (event) => {
        event.preventDefault()
        const update = {
            firstName: nameRef.current.value,
            username: userNameRef.current.value,
            password: passwordRef.current.value,
            description: descriptionRef.current.value,
            avatar: readyImage
        }

        if (readyImage && _.user.user_id) {
            updateUser(_.user.user_id, update)
                .then(res => {
                    console.log(res)
                    dispatch({
                        type: UPDATE_ARTIST,
                        artist: res.data
                    })
                })
                .catch(error => {
                    console.log(error)
                });
        }
        hideModal(event);
        window.location.reload();
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
                <div>
                    <div className="mainProfile row">
                        <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1">
                            <Button variant="outline-light" onClick={showModal}
                                style={{ width: "2rem", height: "100%", display: "flex", textAlign: "center", justifyContent: "center" }}>
                                <p style={{ textOrientation: "mixed", writingMode: "vertical-rl", alignSelf: "center", padding: "0", letterSpacing: "2px" }}>
                                    Edit
                                </p>
                            </Button>
                        </div>
                        <div className="photo-wrap mb-5c col-lg-3 col-md-5 col-sm-11 col-xs-11">
                            {_.artist.avatar ?
                                <img className="artistPic" src={_.artist.avatar} alt="profile pic" />
                                :
                                <img className="artistPic" src={artistPic} alt="profile pic" />
                            }
                        </div>
                        <div className="profileInfo col-lg-3 col-md-6 col-sm-4 col-xs-12">
                            <div className="username">{_.artist.username}</div>
                            <div className="artistName">{_.artist.firstName}</div>
                            <div className="row contact">
                                <button type="button" className="btn btn-dark">Contact Me</button>
                            </div>
                        </div>
                        <div className="aboutMe col-lg-5 col-md-12 col-sm-8 col-xs-12">
                            <h2>About me</h2>
                            <p>{_.artist.description}</p>
                        </div>
                    </div>
                    {/* Begin Modal */}
                    {display === "show" ?
                        <div className="modal" tabIndex="-1" style={{ display: "block" }}>
                            <div className="modal-dialog modal-lg modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Edit your profile</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={hideModal}></button>
                                    </div>
                                    <div className="modal-body" style={{ height: "60vh" }}>
                                        <div className="row" style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                            <div className="col-lg-2 col-md-12 col-sm-12 col-xs-12">
                                                {readyImage ?
                                                    <img className="artistPicModal" src={readyImage} alt="profile pic" id="avatar" style={{ width: `${widthRatio * 130}px`, height: `${heightRatio * 130}px`}} />
                                                    :
                                                    <img className="artistPic" src={artistPic} alt="profile pic" id="avatar" />
                                                }
                                                <div>Change Avatar</div>
                                                <input type="file" onChange={handleFileInput} />
                                            </div>
                                            <br />
                                            <div className="col-lg-5 col-md-9 col-sm-9">
                                                <div style={{ marginBottom: "4px" }}><span><strong>Name - </strong></span><input placeholder={_.artist.firstName} ref={nameRef}></input></div>
                                                <div style={{ marginBottom: "4px" }}><span><strong>Username - </strong></span><input placeholder={_.artist.username} ref={userNameRef}></input></div>
                                            </div>
                                            <div className="col-lg-5 col-md-9 col-sm-9">
                                                <div style={{ marginBottom: "4px" }}><span><strong>Email - </strong></span><input placeholder={_.artist.email} ref={emailRef}></input></div>
                                                <div style={{ marginBottom: "4px" }}><span><strong>Password - </strong></span><input placeholder={_.artist.password} ref={passwordRef}></input></div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div style={{ display: "flex", justifyContent: "center", paddingTop: "10px" }}>
                                                <p className="row"><strong>Description</strong></p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div style={{ display: "flex", justifyContent: "center", width: "100%", height: "6rem" }}>
                                                <textarea placeholder={_.artist.description} style={{ width: "90%", height: "100%" }} ref={descriptionRef}></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={hideModal}>Close</button>
                                        <button type="button" className="btn btn-primary" onClick={(event) => handleFormSubmit(event)}>Update Profile</button>
                                    </div>
                                </div>
                            </div>
                        </div> : null}
                    {/* End Modal */}
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