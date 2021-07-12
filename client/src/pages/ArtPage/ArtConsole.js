import React, { useEffect, useState } from 'react';
import logo from '../../logo.png'
import { FaRegStar } from 'react-icons/fa';
import { AiOutlineMessage } from 'react-icons/ai';
import { FcHighPriority } from 'react-icons/fc';
import { FcRating } from 'react-icons/fc';

import { updateUserFavorites, updateArt, getArtist } from "../../utils/API";
import { useArtContext } from "../../utils/GlobalState";
import { useHistory } from 'react-router-dom';


const ArtConsole = (props) => {
    const [_,dispatch] = useArtContext();
    const history = useHistory();
    const [added, setAdded] = useState(false);
    var author = props.author;
    var targetArt = window.location.search.split("?")[1];
    console.log(_.user)

    const addFavorite = (event) => {
        event.preventDefault();

        if(_.user.length > 0){
            updateUserFavorites(_.user, { favorite: targetArt })
                .then(response => {
                    findCurrentUser();
                    window.location.reload();
                })
            updateArt(targetArt, { savedFavorite: 1 })
        } else {
            history.push("/login")
            window.scrollTo(0, 0)
        }
    }

    const findCurrentUser = () => {
        getArtist(_.user)
            .then(response => {
                if(response.data.favorites.includes(targetArt)){
                    setAdded(true);
                }
            })
    }   
    

    useEffect(() => {
        findCurrentUser();
    },[])

    return(
        <>
            <img className="logoSmall consoleElement" src={logo} alt="logo" />
            {added === true ? 
                <>
                    <p className="consoleElement" style={{paddingLeft:"50px"}} >Added | </p> &nbsp;
                    <FcRating className="consoleElement" size={17} style={{marginBottom:"3px"}}/>
                </>
                :
                <>
                    <p className="consoleElement" id="favoriteHoverElement" onClick={addFavorite}>Add to favorites | </p> &nbsp;
                    <FaRegStar className="consoleElement" size={14} style={{marginBottom:"3px"}}/>
                </>
            }
            <a href="#" class="cross_line">BUY</a>
            <p className="dmArtist consoleElement">DM {author.username} | <AiOutlineMessage style={{marginBottom:"3px"}} size={14}/></p>
            <p className="flagThis">Flag | <FcHighPriority style={{marginBottom:"3px"}} size={14}/></p>
        </>
    )
}

export default ArtConsole;