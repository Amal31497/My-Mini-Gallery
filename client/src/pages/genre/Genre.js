/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useCallback } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import './Genre.css';
import threeD from './pics/3d.jpg';
import AnimeManga from './pics/AnimeManga.jpg';
import crafts from './pics/crafts.jpg';
import comics from './pics/comics.jpg';
import customization from './pics/customization.jpg';
import cosplay from './pics/cosplay.jpg';
import digital from './pics/digital.jpg';
import fantasy from './pics/fantasy.jpg';
import fanart from './pics/fanart.jpg';
import photoManipulation from './pics/photomanipulation.jpg';
import photography from './pics/photography.jpg';
import traditional from './pics/traditional.jpg';
import { getAllArt } from "../../utils/API";

const Genre = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);
    const [genre, setGenre] = useState("");
    const [images, setArt] = useState([])
    const [orig, setOrig] = useState([])


    const getArt = (event,option) => {
        event.preventDefault()
        if(option){
            setGenre(option)
        }

        getAllArt()
            .then(response => {
                if(response.data){
                    setArt(response.data.filter(art => {return art.genre[0].keyword === genre}))
                    setOrig(response.data.filter(art => {return art.genre[0].keyword === genre}))
                }
            })
    }


    const openLightbox = useCallback((event, { photo, index }) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    return (
            <div className="background">
                <div className="container">
                    <div className="card-group" >
                        <a className="card"  onClick={(event) => getArt(event,"3D")} >
                            <img src={threeD} alt="3D thumbnail" />
                            <div className="card-img-overlay">
                                <h5 className="card-title">3D</h5>
                            </div>
                        </a>
                        <a href="" className="card" onClick={(event) => getArt(event,"Anime and Manga")} >
                            <img src={AnimeManga} className="card-img" alt="3D thumbnail"  />
                            <div className="card-img-overlay">
                                <h5 className="card-title">Anime and Manga</h5>
                            </div>
                        </a>

                        <a href="" className="card" onClick={(event) => getArt(event,"Artisan Crafts")}>
                            <img src={crafts} className="card-img" alt="3D thumbnail"  />
                            <div className="card-img-overlay">
                                <h5 className="card-title">Artisan Crafts</h5>
                            </div>
                        </a>

                        <a href="" className="card" onClick={(event) => getArt(event,"Comic")}>
                            <img src={comics} className="card-img" alt="3D thumbnail"  />
                            <div className="card-img-overlay">
                                <h5 className="card-title">Comics</h5>
                            </div>
                        </a>
                    </div>

                    <div className="card-group">
                        <a href="" className="card" onClick={(event) => getArt(event,"Customization")}>
                            <img src={customization} className="card-img" alt="3D thumbnail"  />
                            <div className="card-img-overlay">
                                <h5 className="card-title">Customization</h5>
                            </div>
                        </a>

                        <a href="" className="card" onClick={(event) => getArt(event,"Cosplay")}>
                            <img src={cosplay} className="card-img" alt="3D thumbnail"  />
                            <div className="card-img-overlay">
                                <h5 className="card-title">Cosplay</h5>
                            </div>
                        </a>

                        <a href="" className="card" onClick={(event) => getArt(event,"Digital Arts")}>
                            <img src={digital} className="card-img" alt="3D thumbnail"  />
                            <div className="card-img-overlay">
                                <h5 className="card-title">Digital Arts</h5>
                            </div>
                        </a>

                        <a href="" className="card" onClick={(event) => getArt(event,"Fantasy")}>
                            <img src={fantasy} className="card-img" alt="3D thumbnail"  />
                            <div className="card-img-overlay">
                                <h5 className="card-title">Fantasy</h5>
                            </div>
                        </a>
                    </div>

                    <div className="card-group">
                        <a href="" className="card" onClick={(event) => getArt(event,"Fan Art")}>
                            <img src={fanart} className="card-img" alt="3D thumbnail" />
                            <div className="card-img-overlay">
                                <h5 className="card-title">Fan Art</h5>
                            </div>
                        </a>

                        <a href="" className="card" onClick={(event) => getArt(event,"Photo Manipulation")}>
                            <img src={photoManipulation} className="card-img" alt="3D thumbnail"  />
                            <div className="card-img-overlay">
                                <h5 className="card-title">Photo Manipulation</h5>
                            </div>
                        </a>

                        <a href="" className="card" onClick={(event) => getArt(event,"Photography")} >
                            <img src={photography} className="card-img" alt="3D thumbnail" />
                            <div className="card-img-overlay">
                                <h5 className="card-title">Photography</h5>
                            </div>
                        </a>

                        <a href="" className="card" onClick={(event) => getArt(event,"Traditional Arts")}>
                            <img src={traditional} className="card-img" alt="3D thumbnail"  />
                            <div className="card-img-overlay">
                                <h5 className="card-title">Traditional Arts</h5>
                            </div>
                        </a>
                    </div>
                </div>
            <div className="gallery">
                <Gallery key={images.key} photos={images} onClick={openLightbox} />
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
                                />
                            </div>
                        </Modal>
                    ) : null}
                </ModalGateway>
            </div>
            </div>
    )
}

export default Genre;