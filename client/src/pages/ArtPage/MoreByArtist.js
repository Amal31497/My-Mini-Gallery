import React, { useEffect, useState } from 'react';
// import Gallery from "react-photo-gallery";
import { getAllArt } from '../../utils/API'
import { Spinner } from 'react-bootstrap';
import Carousel, { slidesToShowPlugin, autoplayPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { useHistory } from 'react-router-dom';

const MoreByArtist = (props) => {
    const currentArt = window.location.search.split("?")[1];
    const history = useHistory();
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

    const openArt = (event) => {
        event.preventDefault();
        history.push(`/artPage?${event.target.getAttribute("value")}`)
        window.scrollTo(0, 0)
    }

    return(
        <>
            {artwork ?
                // <Gallery style={{width:"60%"}} key={artwork._id} photos={artwork} />
                <div className="moreByArtistWrapper">
                    <Carousel
                        plugins={[
                            'centered',
                            'arrows',
                            'infinite',
                            {
                                resolve: autoplayPlugin,
                                options: {
                                    interval: 1000,
                                }
                            },
                            {
                                resolve: slidesToShowPlugin,
                                options: {
                                    numberOfSlides: 3
                                }
                            }
                        ]}
                        animationSpeed={1000}
                        breakpoints={{
                            640: {
                                plugins: [
                                    'centered',
                                    'arrows',
                                    'infinite',
                                    {
                                        resolve: autoplayPlugin,
                                        options: {
                                            interval: 1000,
                                        }
                                    },
                                    {
                                        resolve: slidesToShowPlugin,
                                        options: {
                                            numberOfSlides: 1
                                        }
                                    },
                                ]
                            },
                            1100: {
                                plugins: [
                                    'centered',
                                    'arrows',
                                    'infinite',
                                    {
                                        resolve: autoplayPlugin,
                                        options: {
                                            interval: 1000,
                                        }
                                    },
                                    {
                                        resolve: slidesToShowPlugin,
                                        options: {
                                            numberOfSlides: 2
                                        }
                                    },
                                ]
                            },
                            1400: {
                                plugins: [
                                    'centered',
                                    'arrows',
                                    'infinite',
                                    {
                                        resolve: autoplayPlugin,
                                        options: {
                                            interval: 1000,
                                        }
                                    },
                                    {
                                        resolve: slidesToShowPlugin,
                                        options: {
                                            numberOfSlides: 3
                                        }
                                    },
                                ]
                            }
                        }}
                    >
                        {artwork.map(art => {
                            return (
                                <div classname="row">
                                    <img className="col-12 moreByArtistImage" src={art.src} alt={art.title} value={art._id} onClick={openArt} style={{
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