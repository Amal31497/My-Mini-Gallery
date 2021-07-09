import React, { useState, useEffect } from "react";
import Gallery from "react-photo-gallery";
import { useHistory } from 'react-router-dom';
import './gallery.css';
import { Spinner } from 'react-bootstrap';
import { useArtContext } from "../utils/GlobalState";
import { getAllArt } from "../utils/API"
import uuid from 'react-uuid';


const Gallery2 = () => {
    const [openedImage, setOpenedImage] = useState({});
    const [images, setImages] = useState();
    const history = useHistory();

    useEffect(() => {
        getAllArt()
            .then(response => {
                setImages(response.data)
                if (response.data) {
                    var allPhotos = response.data.map(art => {
                        return {
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
                    });
                    setImages(allPhotos)
                }
            })
            .catch(error => console.log(error))
    },[])

    // console.log(images)

    const selectImage = (event) => {
        event.preventDefault();
        var selected = {id:event.target.getAttribute("id")}
        setOpenedImage(selected);
        history.push(`artPage?${selected.id}`)
    }
    
    return (
        <div className="gallery" style={{ width:"90%" }}>
            {images?
                <Gallery key={images.key} photos={images} onClick={selectImage}/>
                :
                <Spinner animation="grow" variant="dark" />
            }
        </div>
    )
}

export default Gallery2
