import React, { useEffect, useState } from 'react';
import Gallery from "react-photo-gallery";
import { getAllArt } from '../../utils/API'
import { Spinner } from 'react-bootstrap';


const MoreByArtist = (props) => {
    const currentArt = window.location.search.split("?")[1];
    const [artwork, setArtwork] = useState();

    useEffect(() => {
        if(props.artist){
            getAllArt()
            .then(response => {
                var foundArtwork = [];
                if(response && props.artist.art){
                    response.data.map(art => {
                        if(props.artist.art.includes(art._id) && art._id !== currentArt) foundArtwork.push(art)
                    })
                    setArtwork(foundArtwork)
                }
                return;
            })
        }
    },[props.artist,currentArt])


    return(
        <>
            {artwork ?
                <Gallery key={artwork._id} photos={artwork} />
                :
                <Spinner animation="grow" variant="dark" />
            }
        </>
    )
}

export default MoreByArtist;