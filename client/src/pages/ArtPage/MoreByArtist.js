import React, { useEffect, useState } from 'react';

// Api Endpoints
import { getAllArt } from '../../utils/API'

// Styling
import { Spinner } from 'react-bootstrap';
import Carousel, { slidesToShowPlugin, autoplayPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

// React DOM
import { useHistory } from 'react-router-dom';

const MoreByArtist = (props) => {

    // Window Related vars
    const currentArt = window.location.search.split("?")[1];

    // UseHistory DOM hook
    const history = useHistory();

    // States
    const [artwork, setArtwork] = useState([]);


    // Load all art when page loads a filter out only author's art except the one already on the screen
    useEffect(() => {
        const artist = props.artist;
        getAllArt()
            .then(response => {
                var foundArtwork = [];
                if (artist.art) {
                    // eslint-disable-next-line array-callback-return
                    response.data.map(art => {
                        if (artist.art.includes(art._id) && art._id !== currentArt) return foundArtwork.push(art)
                    })
                    setArtwork(foundArtwork)
                }
            })
    }, [props.artist, currentArt])

    // Open art listener
    const openArt = (event) => {
        event.preventDefault();
        history.push(`/artPage?${event.target.getAttribute("value")}`)
        window.scrollTo(0, 0)
    }

    return(
        <>
            {artwork ?
                artwork.length > 0 ?
                // Third party carousel component
                <div className="moreByArtistWrapper">
                    <Carousel
                        plugins={[
                            'centered',
                            'arrows',
                            {
                                resolve: autoplayPlugin,
                                options: {
                                    interval: 3000,
                                }
                            },
                            {
                                resolve: slidesToShowPlugin,
                                options: {
                                    numberOfSlides: 3
                                }
                            }
                        ]}
                        animationSpeed={1400}
                        breakpoints={{
                            640: {
                                plugins: [
                                    'centered',
                                    'arrows',
                                    {
                                        resolve: autoplayPlugin,
                                        options: {
                                            interval: 3000,
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
                                    {
                                        resolve: autoplayPlugin,
                                        options: {
                                            interval: 3000,
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
                                    {
                                        resolve: autoplayPlugin,
                                        options: {
                                            interval: 3000,
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
                                <div className="row" key={art._id}>
                                    <img className="col-12 moreByArtistImage" id={art._id} src={art.src} alt={art.title} value={art._id} onClick={openArt} style={{
                                        height: `${art.heightRatio * 140}px`,
                                        width: `${art.widthRatio * 100}px`
                                    }} />
                                    <h5 className="col-12" style={{display:"flex",justifyContent:"center", marginTop:"10px"}}>{art.title}</h5>
                                </div>
                            )
                        })}
                    </Carousel>
                </div>
                :
                <p style={{color:"white",display:"flex",justifyContent:"center"}}>This artist hasn't posted anything else yet</p>
                :
                <Spinner animation="grow" variant="dark" />
            }
        </>
    )
}

export default MoreByArtist;