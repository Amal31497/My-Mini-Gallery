import React, {useState} from 'react';
import { Spinner } from 'react-bootstrap';
import placeholder from "../../pages/assets/artist.jpg";
import { useArtContext } from "../../utils/GlobalState";

const AboutAuthor = (props) => {
    var artist = props.author;
    var art = props.art;
    console.log(art)
    return (
        <>
            <div className="row" style={{marginBottom:"30px"}}>
                {artist ?
                    <div className="artistImage col-lg-3 col-md-3 col-sm-4 col-xs-12">
                        <img
                            className="authorAvatar"
                            src={artist.avatar ? artist.avatar.avatarSrc : placeholder}
                            alt={artist.username}
                            style={{
                                height: `${artist.avatar ? artist.avatar.avatarHeightRatio * 100 : null}px`,
                                width: `${artist.avatar ? artist.avatar.avatarWidthRatio * 100 : null}px`
                            }}
                        />
                    </div>
                    :
                    <Spinner animation="grow" variant="dark" />
                }

                <div className="artistInfo col-lg-9 col-md-9 col-sm-8 col-xs-12">
                    {art ? <h3>{art.title}</h3> : <Spinner animation="grow" variant="dark" />}
                    {art ? <h6>by &nbsp; {artist.username}</h6> :  <Spinner animation="grow" variant="dark" />}
                    <br />
                    {art ? <i><h6>{art.genre}</h6></i> : <Spinner animation="grow" variant="dark" />}
                    {art ? <h6>{art.width}x{art.height}px</h6> : <Spinner animation="grow" variant="dark" />}
                </div>
            </div>
            <div className="row justify-content-center">
                {art.tags.map(tag => {
                    return(
                        <>
                        <button type="button" class="btn btn-outline-secondary">{tag}</button>
                        &nbsp;&nbsp;
                        </>
                    )
                })}
            </div>
            {art ? 
                <p className="row artDescription">{art.description}</p>
                :
                <Spinner animation="grow" variant="dark" />
            }
        </>
    )
} 

export default AboutAuthor;