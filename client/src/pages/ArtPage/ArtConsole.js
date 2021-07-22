/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

// Styling
import logo from '../../assets/logo/logo.png'
import { FaRegStar } from 'react-icons/fa';
import { AiOutlineMessage } from 'react-icons/ai';
import { FcHighPriority } from 'react-icons/fc';
import { FcRating } from 'react-icons/fc';

// Global context
import { addNewFavoriteArt, updateArt, getArtist } from "../../utils/API";
import { useArtContext } from "../../utils/GlobalState";

// React DOM
import { useHistory } from 'react-router-dom';


const ArtConsole = (props) => {

    // Global context
    const [_,dispatch] = useArtContext();

    // UseHistory Hook
    const history = useHistory();

    // States
    const [added, setAdded] = useState(false);

    // Props
    var author = props.author;

    // Window related vars
    var targetArt = window.location.search.split("?")[1];

    const findCurrentUser = () => {
        if (_.user.length > 0) {
            getArtist(_.user)
                .then(response => {
                    if (response.data.favorites.includes(targetArt)) {
                        setAdded(true);
                    }
                })
                .catch(error => console.log(error))
        }
    }

    // Find current user when page loads
    useEffect(() => {
        findCurrentUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_.user])


    // Adding to the favorite collection function
    const addFavorite = (event) => {
        event.preventDefault();

        if(_.user.length > 0){
            addNewFavoriteArt(_.user, { favorite: targetArt })
                .then(response => {
                    findCurrentUser();
                    updateArt(targetArt, { savedFavorite: 1 })
                    window.location.reload();
                    window.scrollTo(300,0)
                })
        } else {
            history.push("/login")
            window.scrollTo(0, 0)
        }
    }

    const takeMeHome = (event) => {
        event.preventDefault();
        history.push("/")
    }

    return(
        <>
            <img className="smallLogo" src={logo} alt="logo" onClick={takeMeHome} />
            {/* Favorite or not */}
            {added === true ?
                <>
                    <p className="consoleElement" style={{ marginLeft: "50px" }} >Added | </p> &nbsp;
                    <FcRating className="consoleElement" size={17} style={{ marginBottom: "3px" }} />
                </>
                :
                <>
                    <p className="consoleElement" id="favoriteHoverElement" onClick={addFavorite}>Add to favorites | </p> &nbsp;
                    <FaRegStar className="consoleElement" size={14} style={{ marginBottom: "3px" }} />
                </>
            }
            {/* DM artist - IN DEVELOPMENT */}
            <p className="dmArtist consoleElement">DM {author.username} | <AiOutlineMessage style={{ marginBottom: "3px" }} size={14} /></p>
            {/* Flag artist for inappropriate use - IN DEVELOPMENT */}
            <p className="flagThis">Flag | <FcHighPriority style={{ marginBottom: "3px" }} size={14} /></p>
        </>
    )
}

export default ArtConsole;