import React, { useState, useCallback, useRef, useEffect } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { Button, Card, Image } from "react-bootstrap";
import './gallery.css';
import { useArtContext } from "../utils/GlobalState";
import { getArtist, getAllArt } from "../utils/API"
import uuid from 'react-uuid';
import { GET_ARTIST } from "../utils/actions";
const Gallery2 = () => {
    const [modalOpen, setModalOpen] = useState("none");
    const [openedImage, setOpenedImage] = useState({});
    const [openedArtist, setOpenedArtist] = useState({});
    const [modalGallery, setModalGallery] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [state, _] = useArtContext()
    const images = state.arts.map(art => {
        return {
            key: JSON.stringify(uuid()),
            title: art.title,
            description: art.description,
            comments: art.comments,
            genre: art.genre,
            user: art.user,
            src: art.src,
            height: art.height,
            width: art.width
        }
    })

    const selectImage = (event) => {
        event.preventDefault();
        var selected = {
            title:event.target.getAttribute("title"),
            description:event.target.getAttribute("description"),
            comments:event.target.getAttribute("comments"),
            genre:event.target.getAttribute("genre"),
            user:event.target.getAttribute("user"),
            src:event.target.getAttribute("src"),
            height:event.target.getAttribute("height"),
            width:event.target.getAttribute("width")
        }
        setOpenedImage(selected);
        getArtist(selected.user)
            .then(artist => {
                // console.log(artist.data)
                setOpenedArtist(artist.data)
                setModalOpen("opened");
                getAllArt()
                .then(res => {
                    const profileArt = [];
                    res.data.forEach(art => {
                        if (artist.data.art.includes(art._id)) {
                            profileArt.push(art)
                        }
                    })
                    setModalGallery(profileArt)
                })
            })
            .catch(error => console.error(error));
    }
    
    return (
        <div className="gallery">
            <Gallery key={images.key} photos={images} onClick={selectImage} />
            {modalOpen === "opened" ? 
                <div className="modal" tabIndex="-1" style={{ display: "block" }}>
                    <div className="modal-dialog modal-fullscreen">
                        <div className="modal-content">
                            <div className="row">
                                <div className="col-lg-6">
                                    <img src={openedImage.src} alt={openedImage.title} style={{ height: `${parseInt(openedImage.height) * 1.4}px`, width: `${parseInt(openedImage.width) * 1.4}px` }} />
                                </div>
                                <div className="col-lg-6">
                                    <h3 style={{display:"flex", justifyContent:"center", marginTop:"5px"}}>More by {openedArtist.username}</h3>
                                    <Gallery key={modalGallery.key} photos={modalGallery} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col" style={{ display: "flex", float: "left", margin: "5px" }}>
                                    <img
                                        className="img-thumbnail"
                                        src={openedArtist.avatar.avatarSrc}
                                        alt={openedArtist.username}
                                        style={{
                                            height: `${openedArtist.avatar.avatarHeightRatio * 60}px`,
                                            width: `${openedArtist.avatar.avatarWidthRatio * 60}px`
                                        }}
                                    />
                                    <h3>| {openedImage.title} |</h3>
                                    <h5> made by: <a href="/profile">{openedArtist.username}</a></h5>
                                </div>
                                <div className="row">
                                    <p>{openedImage.description}</p>
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>
                :null
            }
        </div>
    )
}

export default Gallery2
