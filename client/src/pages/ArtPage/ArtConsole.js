import React from 'react';
import logo from '../../logo.png'
import { FaRegStar } from 'react-icons/fa';
import { AiOutlineMessage } from 'react-icons/ai';
import { FcHighPriority } from 'react-icons/fc';



const ArtConsole = (props) => {
    var author = props.author;
    console.log(author)
    return(
        <>
            <img className="logoSmall consoleElement" src={logo} alt="logo" />
            <p className="consoleElement" id="favoriteHoverElement">Add to favorites | </p>&nbsp;
            <FaRegStar className="consoleElement" size={14} />
            <a href="#" class="cross_line">BUY</a>
            <p className="dmArtist consoleElement">DM {author.username} | <AiOutlineMessage size={14}/></p>
            <p className="flagThis">Flag | <FcHighPriority size={14}/></p>
        </>
    )
}

export default ArtConsole;