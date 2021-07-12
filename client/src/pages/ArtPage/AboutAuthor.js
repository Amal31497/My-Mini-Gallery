import React, {useState} from 'react';
import { Spinner } from 'react-bootstrap';
import placeholder from "../../pages/assets/artist.jpg";
import { useArtContext } from "../../utils/GlobalState";
import { useHistory } from 'react-router-dom';
import Moment from 'react-moment';
const AboutAuthor = (props) => {
    var artist = props.author;
    var art = props.art;
    const history = useHistory();

    const runQuery = (event) => {
        event.preventDefault();
        history.push(`/search?${event.target.getAttribute("value")}`)
        window.scrollTo(0, 0)
    }
    
    const checkoutArtist = (event) => {
        event.preventDefault();
        history.push(`/profile?${event.target.getAttribute("id")}`)
        window.scrollTo(0, 0)
    }


    return (
        <>
            <div className="row" style={{marginBottom:"30px", scrollBehavior:"smooth"}}>
                {artist ?
                    <div className="artistImage col-lg-1 col-md-3 col-sm-4 col-xs-1">
                        <img
                            className="authorAvatar artistLink"
                            src={artist.avatar ? artist.avatar.avatarSrc : null}
                            alt={artist.username}
                            id={artist._id}
                            style={{
                                height: `${artist.avatar ? artist.avatar.avatarHeightRatio * 100 : null}px`,
                                width: `${artist.avatar ? artist.avatar.avatarWidthRatio * 100 : null}px`
                            }}
                            onClick={checkoutArtist}
                        />
                    </div>
                    :
                    <Spinner animation="grow" variant="dark" />
                }

                <div className="artistInfo col-lg-3 col-md-9 col-sm-8 col-xs-11">
                    {art ? <h3>{art.title}</h3> : <Spinner animation="grow" variant="dark" />}
                    {art ? <h6 className="artistLink" id={artist._id} onClick={checkoutArtist}>by <span id={artist._id} onClick={checkoutArtist} >{artist.username}</span> on <Moment format="MMMM D / YYYY" id={artist._id} onClick={checkoutArtist}>{art.date}</Moment></h6> : <Spinner animation="grow" variant="dark" />}
                    {art ? <i><h6>{art.genre}</h6></i> : <Spinner animation="grow" variant="dark" />}
                    {art ? <h6>{art.width}x{art.height}px</h6> : <Spinner animation="grow" variant="dark" />}
                </div>

                {art ?
                    <p className="col-lg-8 col-md-12 col-sm-12 col-xs-12 artDescription">{art.description}</p>
                    :
                    <Spinner animation="grow" variant="dark" />
                }

            </div>
            <div className="row justify-content-center">
                {art.tags.map(tag => {
                    return(
                        <>
                            <button type="button" class="btn btn-outline-secondary" value={tag} onClick={runQuery}>{tag}</button>
                            &nbsp;&nbsp;
                        </>
                    )
                })}
            </div>
            
        </>
    )
} 

export default AboutAuthor;