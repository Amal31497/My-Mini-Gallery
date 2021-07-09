import React, { useState, useCallback, useRef, useEffect } from "react";
import './Profile.css';
import { useArtContext } from "../../utils/GlobalState";
import { updateUser, getAllArt, getArtist } from "../../utils/API";
import { useHistory } from 'react-router-dom';
import reactImageSize from 'react-image-size';
import artistPic from "../assets/artist.jpg";
import Gallery from "react-photo-gallery";
import { Button, Spinner } from 'react-bootstrap'
import { uploadFile } from 'react-s3';
import env from "react-dotenv";
import uuid from 'react-uuid';


const config = {
    bucketName: 'myminigallery',
    region: 'us-east-2',
    accessKeyId: env.REACT_APP_ACCESS_KEY,
    secretAccessKey: env.REACT_APP_SECRET_ACCESS_KEY
}

function Profile() {
    const [images, setImages] = useState([]);
    const [openedImage, setOpenedImage] = useState({});
    // eslint-disable-next-line no-unused-vars
    const [_, dispatch] = useArtContext();
    const [artist, setArtist] = useState();
    const [display, setDisplay] = useState("none")
    const [readyImage, setReadyImage] = useState("");

    const nameRef = useRef();
    const userNameRef = useRef();
    const emailRef = useRef();
    const descriptionRef = useRef();

    const [imgwidth, setWidth] = useState();
    const [imgheight, setHeight] = useState();
    const [widthRatio, setWidthRatio] = useState();
    const [heightRatio, setHeightRatio] = useState();

    const history = useHistory();

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
                    // console.log(height/width)
                    if (width > height) {
                        setWidthRatio((width / height))
                        setHeightRatio(1)
                    } else {
                        setHeightRatio((height / width))
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
            firstName: nameRef.current.value||document.querySelector(".firstNameInput").getAttribute("name"),
            username: userNameRef.current.value||document.querySelector(".userNameInput").getAttribute("name"),
            email: emailRef.current.value||document.querySelector(".emailInput").getAttribute("name"),
            description: descriptionRef.current.value||document.querySelector(".descriptionInput").getAttribute("name"),
            avatar: {
                avatarSrc:readyImage,
                avatarWidthRatio:widthRatio,
                avatarHeightRatio:heightRatio
            }
        }
        console.log(_.user)

        if (readyImage && _.user) {
            updateUser(_.user, update)
                .then(res => {
                    console.log(res)
                })
                .catch(error => {
                    console.log(error)
                });
        }
        hideModal(event);
        window.location.reload();
    }



    // const findArtist = () => {
        
    // }
    
    useEffect(() => {
        if(_.user){
            getArtist(_.user)
                .then(response => {
                    // console.log(response.data)
                    setArtist(response.data)
                    getAllArt()
                        .then(res => {
                            const profileArt = [];
                            res.data.forEach(art => {
                                if (response.data.art.includes(art._id)) {
                                    profileArt.push(
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
                            setImages(profileArt)
                        })
                        .catch(error => console.log(error.message))
                })
            .catch(error => console.error(error.message))
        }
    },[_.user])

    const selectImage = (event) => {
        event.preventDefault();
        var selected = {id:event.target.getAttribute("id")}
        setOpenedImage(selected);
        history.push(`artPage?${selected.id}`)
    }


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
                            {(artist && artist.avatar) ?
                                <img className="artistPic" src={artist.avatar.avatarSrc} style={{height:`${artist.avatar.avatarHeightRatio*200}px`,width:`${artist.avatar.avatarWidthRatio*200}px`}} alt="profile pic" />
                                :
                                <img className="artistPic" src={artistPic} alt="profile pic" />
                            }
                        </div>
                        <div className="profileInfo col-lg-3 col-md-6 col-sm-4 col-xs-12">
                            <div className="username">{artist?artist.username:<Spinner animation="grow" variant="dark" />}</div>
                            <div className="artistName">{artist?artist.firstName:<Spinner animation="grow" variant="dark" />}</div>
                            <div className="row contact">
                                <button type="button" className="btn btn-dark">Contact Me</button>
                            </div>
                        </div>
                        <div className="aboutMe col-lg-5 col-md-12 col-sm-8 col-xs-12">
                            <h2>About me</h2>
                            <p>{artist?artist.description:<Spinner animation="grow" variant="dark" />}</p>
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
                                    <div className="modal-body" style={{ height: "69vh" }}>
                                        <div className="row" style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                            <div className="col-lg-2 col-md-12 col-sm-12 col-xs-12">
                                                {readyImage ?
                                                    <img className="artistPicModal" src={readyImage} alt="profile pic" id="avatar" style={{ width: `${widthRatio * 130}px`, height: `${heightRatio * 130}px`}} />
                                                    :
                                                    <img className="artistPic" src={(artist&&artist.avatar)?artist.avatar.avatarSrc:artistPic} alt="profile pic" id="avatar" />
                                                }
                                                <div>Change Avatar</div>
                                                <input type="file" onChange={handleFileInput} />
                                            </div>
                                            <br />
                                            <div className="col-lg-5 col-md-9 col-sm-9">
                                                <div style={{ marginBottom: "4px" }}><span><strong>Name - </strong></span><input type="text" className="firstNameInput" name={artist?artist.firstName:null} placeholder={artist?artist.firstName:null} ref={nameRef}></input></div>
                                                <div style={{ marginBottom: "4px" }}><span><strong>Username - </strong></span><input type="text" className="userNameInput" name={artist?artist.username:null} placeholder={artist?artist.username:null} ref={userNameRef}></input></div>
                                            </div>
                                            <div className="col-lg-5 col-md-9 col-sm-9">
                                                <div style={{ marginBottom: "4px" }}><span><strong>Email - </strong></span><input type="text" className="emailInput" name={artist?artist.email:null} placeholder={artist?artist.email:null} ref={emailRef}></input></div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div style={{ display: "flex", justifyContent: "center", paddingTop: "10px" }}>
                                                <p className="row"><strong>Description</strong></p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div style={{ display: "flex", justifyContent: "center", width: "100%", height: "6rem" }}>
                                                <textarea type="text" classnName="descriptionInput" name={artist?artist.description:null} placeholder={artist?artist.description:null} style={{ width: "90%", height: "100%" }} ref={descriptionRef}></textarea>
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
                    <Gallery key={images.key} photos={images} onClick={selectImage} />
                </div>
            </div>
        </div>
    )
}

export default Profile;