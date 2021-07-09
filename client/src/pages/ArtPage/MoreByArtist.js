import React, { useEffect, useState } from 'react';
// import Gallery from "react-photo-gallery";
import { getAllArt } from '../../utils/API'
import { Spinner } from 'react-bootstrap';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

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
                // <Gallery style={{width:"60%"}} key={artwork._id} photos={artwork} />
                <div id="surrounding" style={{width:"450px"}}>
                    <Carousel
                        plugins={[
                            'centered',
                            'arrows',
                            'infinite'
                        ]}
                    >
                        {artwork.map(art => {
                            return (
                                <div classname="row">
                                    <img className="col-12" src={art.src} alt={art.title} style={{
                                        height: `${art.heightRatio * 140}px`,
                                        width: `${art.widthRatio * 140}px`
                                    }} />
                                    <h5 className="col-12" style={{display:"flex",justifyContent:"center", marginTop:"10px"}}>{art.title}</h5>
                                </div>
                            )
                        })}
                    </Carousel>
                </div>
                :
                <Spinner animation="grow" variant="dark" />
            }
        </>
    )
}

export default MoreByArtist;