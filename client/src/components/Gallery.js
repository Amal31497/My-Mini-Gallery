import React, { useState, useCallback } from "react";
//import { render } from "react-dom";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
//import { photos } from "./photos";

import img1 from '../img/img1.jpg';
import img2 from '../img/img2.jpg';
import img3 from '../img/img3.jpg';
import img4 from '../img/img4.jpg';
import img5 from '../img/img5.jpg';
import img6 from '../img/img6.jpg';
import img7 from '../img/img7.jpg';
import img8 from '../img/img8.jpg';
import img9 from '../img/img9.jpg';
import img10 from '../img/img10.jpg';
import img11 from '../img/img11.jpg';
import img12 from '../img/img12.jpg';
import img13 from '../img/img13.jpg';
import img14 from '../img/img14.jpg';
import img15 from '../img/img15.jpg';
import img16 from '../img/img16.jpg';
import './gallery.css';
import { useArtContext } from "../utils/GlobalState";
import uuid from 'react-uuid'



let photos = [
    {
        src: img1,
        width: 1.5,
        height: 1
    },
    {
        src: img2,
        width: 1,
        height: 1
    },
    {
        src: img3,
        width: 1,
        height: 1
    },
    {
        src: img4,
        width: 1,
        height: 1
    },
    {
        src: img5,
        width: 1,
        height: 1
    },
    {
        src: img6,
        width: 2,
        height: 1
    },
    {
        src: img7,
        width: 1,
        height: 1
    },
    {
        src: img8,
        width: 1,
        height: 2
    },
    {
        src: img9,
        width: 3,
        height: 1
    },
    {
        src: img10,
        width: 2,
        height: 1
    },
    {
        src: img11,
        width: 1.5,
        height: 1
    },
    {
        src: img12,
        width: 1,
        height: 1
    },
    {
        src: img13,
        width: 2,
        height: 1
    },
    {
        src: img14,
        width: 1,
        height: 1
    },
    {
        src: img15,
        width: 1.5,
        height: 1
    },
    {
        src: img16,
        width: 1,
        height: 1
    }
];

const Gallery2 = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [state, _] = useArtContext()

    const images = state.arts.map(art => {
        return {
            key:JSON.stringify(uuid()),
            src:art.src,
            height:1,
            width:2
        }
    })


    console.log(images)

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

            <Gallery key={images.key} photos={images} onClick={openLightbox} />



            <ModalGateway>
                {viewerIsOpen ? (
                    <Modal onClose={closeLightbox}>
                        <Carousel
                            currentIndex={currentImage}
                            views={photos.map(x => ({
                                ...x,
                                srcset: x.srcSet,
                                caption: x.title
                            }))}
                        />
                    </Modal>
                ) : null}
            </ModalGateway>
        </div>
    )
}

export default Gallery2
