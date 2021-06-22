import React, { useState, useCallback } from "react";
import './Profile.css';

import artistPic from "../assets/artist.jpg";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

import { getAllArt, getArtist } from "../../utils/API";
import { useArtContext } from "../../utils/GlobalState";
import { GET_ARTIST } from "../../utils/actions";

function Profile() {
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);
    const [images, setImages] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [_, dispatch] = useArtContext();

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
                                if(response.data.art.includes(art._id)){
                                    profileArt.push(art)
                                }
                            })
                            setImages (profileArt)
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
                    <div className="col-lg-2 col-xm-12">
                        <div className="photo-wrap mb-5c">
                            <img className="artistPic" src={artistPic} alt="profile pic" />
                        </div>

                    </div>
                    <div className="col-lg-8 col-xm-12">
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