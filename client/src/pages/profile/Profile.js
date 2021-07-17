import React, { useState, useCallback, useRef, useEffect } from "react";
import './Profile.css';
import Gallery from "react-photo-gallery";
import { useArtContext } from "../../utils/GlobalState";
import { LOGOUT } from "../../utils/actions";
import { updateUser, getAllArt, getArtist, dropArtistArt, deleteArtist, dropUserComments, logout } from "../../utils/API";
import { useHistory } from 'react-router-dom';
import reactImageSize from 'react-image-size';
import artistPic from "../../assets/backgroundsAndEssentials/artist.jpg";

import { Button, Spinner } from 'react-bootstrap'
import { uploadFile } from 'react-s3';
import env from "react-dotenv";
import uuid from 'react-uuid';
import Moment from 'react-moment';
import axios from 'axios';
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { IoMdContact } from 'react-icons/io';


function Profile() {

    const [keyA, setKeyA] = useState();
    const [keyB, setKeyB] = useState();

    const getConfig = () => {
        axios.get('/getconfig')
            .then(res => {
                setKeyA(res.data.accessKey);
                setKeyB(res.data.secretAccessKEY);
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        getConfig();
    },[])

    const config = {
        bucketName: 'myminigallery',
        region: 'us-east-2',
        accessKeyId: keyA,
        secretAccessKey: keyB
    }


    var query = window.location.search.split("?")[1];
    const [personalProfile, setPersonalProfile] = useState();
    const [images, setImages] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [openedImage, setOpenedImage] = useState({});
    const [selection, setSelection] = useState("gallery");
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

    useEffect(() => {
        setPersonalProfile(query === _.state)
    },[])


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
            firstName: nameRef.current.value||document.querySelector(".artistName").getAttribute("name"),
            username: userNameRef.current.value||document.querySelector(".username").getAttribute("name"),
            email: emailRef.current.value||artist.email,
            description: descriptionRef.current.value||document.querySelector(".descriptionText").getAttribute("name")||`This user does not have a description yet`,
            avatar: {
                avatarSrc:readyImage,
                avatarWidthRatio:widthRatio,
                avatarHeightRatio:heightRatio
            }
        }

        console.log(update)

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
        window.scrollTo(0, 0)
    }

    
    useEffect(() => {
        var targetLookUp;

        if(query){
            targetLookUp = query;
        } else {
            targetLookUp = _.user;
        }

        if(targetLookUp){
            getArtist(targetLookUp)
                .then(response => {
                    // console.log(response.data)
                    setArtist(response.data)
                    getAllArt()
                        .then(res => {
                            const profileArt = [];
                            const profileFavorites = [];
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
                                if(response.data.favorites.includes(art._id)){
                                    profileFavorites.push(
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
                            setImages(profileArt);
                            setFavorites(profileFavorites);
                        })
                        .catch(error => console.log(error.message))
                })
            .catch(error => console.error(error.message))
        }
    },[_.user,selection])

    const selectImage = (event) => {
        event.preventDefault();
        var selected = {id:event.target.getAttribute("id")}
        setOpenedImage(selected);
        history.push(`artPage?${selected.id}`)
        window.scrollTo(0, 0)
    }

    const selectGallery = (event) => {
        event.preventDefault();
        setSelection("gallery")
    }

    const selectFavorites = (event) => {
        event.preventDefault();
        setSelection("favorites")
    }

    const deleteOpen = (event) => {
        event.preventDefault();
        setDeleteModal(true);
    }

    const deleteClose = (event) => {
        event.preventDefault();
        setDeleteModal(false);
    }

    const deleteAccount = (event) => {
        event.preventDefault();
        if(_.user){
            dropArtistArt(_.user)
                .then(response => console.log(response))
                .catch(error => console.log(error))
            dropUserComments(_.user)
                .then(response => console.log(response))
                .catch(error => console.log(error))
            deleteArtist(_.user)
                .then(response => {
                    deleteClose(event);
                    logout()
                        .then(response => {
                            dispatch({
                                type: LOGOUT
                            });
                            history.push("/");
                        })
                        .catch(error => console.log(error))
                })
                .catch(error => console.log(error))
        }
    }

    return (
        <div className="background2">
            {personalProfile === true ?
                <h3 className="title">Your Mini Gallery</h3>
                :
                null
            }
            <div id="about" className="container py-5">
                <div>
                    <div className="mainProfile row">
                        <div className="photo-wrap aboutArtistSection mb-5c col-lg-5 col-md-5 col-sm-12 col-xs-12">
                            <div className="artistPicWrapper">
                                {(artist && artist.avatar) ?
                                    <img className="artistPic" src={artist.avatar.avatarSrc} style={{ height: `${artist.avatar.avatarHeightRatio * 100}px`, width: `${artist.avatar.avatarWidthRatio * 100}px` }} alt="profile pic" />
                                    :
                                    <img className="artistPic" src={artistPic} alt="profile pic" style={{ height: "100px", width: "100px" }} />
                                }
                            </div>
                            <div className="username" name={artist ? artist.username : null}>{artist ? artist.username : <Spinner animation="grow" variant="dark" />}</div>
                            <div className="artistName" name={artist ? artist.firstName : null}>{artist ? artist.firstName : <Spinner animation="grow" variant="dark" />}</div>
                            <div className="artistName">User since: {artist ? <Moment format="MMMM D / YYYY">{artist.date}</Moment> : <Spinner animation="grow" variant="dark" />}</div>
                            <div className="row" style={{width:"30%",marginLeft:"10px",display:"flex", justifyContent:"space-between"}}>
                                <IoMdContact size={26} style={{ color: "white" }} className="contactProfileButton" />
                                {personalProfile === true ? <BiEditAlt size={26} style={{ color: "white" }} className="updateProfileButton" onClick={showModal} /> : null}
                                {personalProfile === true ? <RiDeleteBin6Line size={26} style={{ color: "white" }} className="deleteProfileButton" onClick={deleteOpen} /> : null}
                            </div>
                        </div>
                        <div className="aboutMe col-lg-6 col-md-7 col-sm-12 col-xs-12">
                            <p style={{fontWeight:"600"}}>About me</p>
                            <p className="descriptionText" name={artist ? artist.description : null} >{artist?artist.description:<Spinner animation="grow" variant="dark" />}</p>
                        </div>
                    </div>
                    {/* Begin Edit Modal */}
                    {display === "show" ?
                        <div className="modal" tabIndex="-1" style={{ display: "block" }}>
                            <div className="modal-dialog modal-lg modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={hideModal}>x</button>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 modalImageContent">
                                            <div className="row modalImageContentWrapper">
                                                {readyImage ?
                                                    <img className="col-12" src={readyImage} alt="profile pic" id="avatar" style={{ width: `${widthRatio * 130}px`, height: `${heightRatio * 130}px` }} />
                                                    :
                                                    <img className="col-12 artistPic" src={(artist && artist.avatar) ? artist.avatar.avatarSrc : artistPic} alt="profile pic" id="avatar" />
                                                }
                                                <div className="col-12">Change Avatar</div>
                                                <input className="col-12" type="file" onChange={handleFileInput} />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 modalInfoLeftContent">

                                            <strong className="row modalLabelInfoLeftElement">Name</strong>
                                            <input
                                                type="text"
                                                className="row modalTextInfoLeftElement"
                                                name={artist ? artist.firstName : null}
                                                placeholder={artist ? artist.firstName : null}
                                                ref={nameRef}
                                            />

                                            <strong className="row modalLabelInfoLeftElement">Username</strong>
                                            <input
                                                type="text"
                                                className="row modalTextInfoLeftElement"
                                                name={artist ? artist.username : null}
                                                placeholder={artist ? artist.username : null}
                                                ref={userNameRef}
                                            />

                                            <strong className="row modalLabelInfoLeftElement">Email</strong>
                                            <input
                                                type="text"
                                                className="row modalTextInfoLeftElement"
                                                name={artist ? artist.email : null}
                                                placeholder={artist ? artist.email : null}
                                                ref={emailRef}
                                            />

                                            <strong className="row modalLabelInfoLeftElement">Old Password</strong>
                                            <input
                                                type="text"
                                                className="row modalTextInfoLeftElement"
                                                name="Old"
                                                placeholder="In Development"
                                            />

                                            <strong className="row modalLabelInfoLeftElement">New Password</strong>
                                            <input
                                                type="text"
                                                className="row modalTextInfoLeftElement"
                                                name="New"
                                                placeholder="In Development"
                                            />

                                        </div>

                                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 modalInfoRightContent">
                                            <p className="row modalLabelInfoRightElement"><strong>Description</strong></p>
                                            <textarea
                                                type="text"
                                                className="row modalTextInfoRightElement" 
                                                name={artist ? artist.description : null}
                                                placeholder={artist ? artist.description : null}
                                                ref={descriptionRef}
                                            />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={hideModal}>Close</button>
                                        <button type="button" className="btn btn-primary" onClick={(event) => handleFormSubmit(event)}>Update Profile</button>
                                    </div>
                                </div>
                            </div>
                        </div> : null}
                    {/* End Edit Modal */}

                    {/* Begin Delete Modal */}
                    {deleteModal === true ?
                        <div className="modal" tabIndex="-1" style={{ display: "block" }}>
                            <div className="modal-dialog modal-md modal-dialog-centered">
                                <div className="modal-content">
                                    <h4 style={{marginLeft:"auto", marginRight:"auto"}}>Are you sure you want to delete your account?</h4>
                                    <p style={{marginLeft:"auto", marginRight:"auto"}}>All your art and comments will be deleted too.</p>
                                    <div className="row" style={{width:"80%", marginLeft:"auto", marginRight:"auto"}}>
                                        <button onClick={deleteClose} type="button" className="col-6 btn btn-light">No!</button>
                                        <button onClick={deleteAccount} type="button" className="col-6 btn btn-danger">Yes, Delete my Account</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        null
                    }
                    {/* End Delete Modal */}
                </div>
                <div className="profileArt row">
                    {images?
                        <>
                            <div className="col-6 profileConsoleElement" onClick={selectGallery}>
                                <div className="row" style={{width:"85px"}}>
                                    <p className="col-12">GALLERY</p>
                                    {selection === "gallery" ?
                                        <hr className="col-12 lineSelection" />
                                        :
                                        null
                                    }
                                </div>
                            </div>
                            <div className="col-6 profileConsoleElement" onClick={selectFavorites}>
                                <div className="row" style={{width:"75px"}}>
                                    <p className="col-12">FAVORITES</p>
                                    {selection === "favorites" ?
                                        <hr className="col-12 lineSelection" />
                                        :
                                        null
                                    }
                                </div>
                            </div>
                            <div className="col-12 gallery">
                                {selection === "gallery" ?
                                    <Gallery key={images.key} photos={images} onClick={selectImage} />
                                    :
                                selection === "favorites"?
                                    <Gallery key={favorites.key} photos={favorites} onClick={selectImage} />
                                    :
                                    null
                                }
                            </div>
                        </>
                        :
                        null
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile;
