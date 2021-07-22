import React from 'react';

// Styling
import { Spinner } from 'react-bootstrap';
import Moment from 'react-moment'; // Moment.js date formatting

// React DOM
import { useHistory } from 'react-router-dom';

import uuid from 'react-uuid';

const AboutAuthor = (props) => {

    // Props
    var artist = props.author;
    var art = props.art;

    // User history hook for dom manipulation
    const history = useHistory();

    // Init search when clicking on a tag button
    const runQuery = (event) => {
        event.preventDefault();
        history.push(`/search?${event.target.getAttribute("value")}`)
        window.scrollTo(0, 0)
    }

    // Go to artist personal page
    const checkoutArtist = (event) => {
        event.preventDefault();
        history.push(`/profile?${event.target.getAttribute("id")}`)
        window.scrollTo(0, 0)
    }

    return (
        <>
            <div className="row" style={{ marginBottom: "30px", scrollBehavior: "smooth" }}>
                {/* Artist Avatar */}
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

                {/* Artist/Art info : (Art title, name, genre, length and width, description) */}
                <div className="artistInfo col-lg-3 col-md-9 col-sm-8 col-xs-11">
                    {art ? <h3>{art.title}</h3> : <Spinner animation="grow" variant="dark" />}
                    {art ?
                        // Id attribute use int find artist function to view profile
                        <h6 className="artistLink" id={artist._id} onClick={checkoutArtist}>
                            by  <span id={artist._id} onClick={checkoutArtist} >{artist.username}</span>{" "}
                            on  <Moment format="MMMM D / YYYY" id={artist._id} onClick={checkoutArtist}>{art.date}</Moment>
                        </h6>
                        :
                        <Spinner animation="grow" variant="dark" />
                    }
                    {art ? <i><h6>{art.genre}</h6></i> : <Spinner animation="grow" variant="dark" />}
                    {art ? <h6>{art.width}x{art.height}px</h6> : <Spinner animation="grow" variant="dark" />}
                </div>

                {art ?
                    <p className="col-lg-8 col-md-12 col-sm-12 col-xs-12 artDescription">{art.description}</p>
                    :
                    <Spinner animation="grow" variant="dark" />
                }

            </div>

            {/* Tags -> Links to search based on tag value */}
            <div className="row justify-content-center">
                {art.tags.map(tag => {
                    return (<div key={JSON.stringify(uuid())}>
                        {/* Tag button, each is a link to quick search */}
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            value={tag}
                            onClick={runQuery}>
                            {tag}
                        </button>
                            &nbsp;&nbsp;
                        </div>)
                })}
            </div>

        </>
    )
}

export default AboutAuthor;