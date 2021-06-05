import React from "react";
import './Profile.css';

import artistPic from "../assets/artist.jpg";
import Gallery from "../../components/Gallery";

import { getAllArt, getArtist } from "../../utils/API";
import { useArtContext } from "../../utils/GlobalState";
import { GET_ALL_ART, GET_ARTIST } from "../../utils/actions";

function Profile() {

    // eslint-disable-next-line no-unused-vars
    const [_, dispatch] = useArtContext();

    console.log(_.user.user_id)
    console.log(_.artist)

    const findArtist = () => {
        if (!_.artist.firstName && _.user.user_id) {
            getArtist(_.user.user_id)
                .then(response => {
                    console.log(response)
                    dispatch({
                        type: GET_ARTIST,
                        artist: response.data
                    })
                })
                .catch(err => console.log(err))
        }
    }

    findArtist();

    const findArt = () => {
        getAllArt()
            .then(response => {
                dispatch({
                    type: GET_ALL_ART,
                    arts: response.data
                })
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="background2">
            <div id="about" className="container py-5">
                <div className="row">
                    <div className="col-lg-2 col-xm-12">
                        <div className="photo-wrap mb-5c">
                            <img className="artistPic" src={artistPic} alt="profile pic" />
                        </div>

                    </div>
                    <div className="col-lg-8 col-xm-12">
                        <div className="username">{_.artist.username}</div>
                        <div className="artistName">{_.artist.firstName}</div>
                        <div className="row contact">
                            <button type="button" className="btn btn-dark">Contact Me</button>
                        </div>
                    </div>
                </div>

                <Gallery />
            </div>
        </div>
    )
}

export default Profile;