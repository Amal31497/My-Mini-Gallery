import React, { useState, useCallback } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { Button, Card, Image } from "react-bootstrap";
import './gallery.css';
import { useArtContext } from "../utils/GlobalState";
import uuid from 'react-uuid';
const Gallery2 = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [state, _] = useArtContext()
    const images = state.arts.map(art => {
        return {
            key: JSON.stringify(uuid()),
            title: art.title,
            src: art.src,
            height: art.height,
            width: art.width
        }
    })


    const openLightbox = useCallback((event, { photo, index }) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    return (
        <div className="gallery">
            <Gallery key={images.key} photos={images}  onClick={openLightbox} />
            <ModalGateway>
                {viewerIsOpen ? (
                    <Modal onClose={closeLightbox}>
                        <div>
                            <Carousel
                                currentIndex={currentImage}
                                views={images.map(x => ({
                                    ...x,
                                    srcset: x.srcSet,
                                    caption: x.title
                                }))}
                            >
                            </Carousel>
                        </div>
                    </Modal>
                ) : null}
            </ModalGateway>
        </div>
    )
}

export default Gallery2
