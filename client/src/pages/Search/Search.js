import React,{ useEffect, useRef, useState } from "react";
import { queryArt } from "../../utils/API";
import uuid from 'react-uuid'
import Gallery from "react-photo-gallery";
import { useHistory } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import "./Search.css";



const Search = () => {

    var query = window.location.search.split("?")[1];

    const [searchResult,setSearchResult] = useState();
    // const [openedImage, setOpenedImage] = useState({});
    const history = useHistory();

    const searchRef = useRef();

    const selectImage = (event) => {
        event.preventDefault();
        var selected = {id:event.target.getAttribute("id")}
        // setOpenedImage(selected);
        history.push(`artPage?${selected.id}`)
    }

    const runQuery = (event) => {
        event.preventDefault();
        history.push(`/search?${searchRef.current.value.toLowerCase()}`)
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        queryArt(query)
        .then(response => {
            if (response.data) {
                var allPhotos = response.data.map(art => {
                    return {
                        key: JSON.stringify(uuid()),
                        id: art._id,
                        title: art.title,
                        description: art.description,
                        comments: art.comments,
                        genre: art.genre,
                        user: art.user,
                        src: art.src,
                        height: art.height,
                        width: art.width
                    }
                });
                setSearchResult(allPhotos);
            }
        })
        .catch(error => console.log(error.message))
    },[query])
    
    return (
        <div className="mainSearch">
            
            <div className="searchBar row" style={{ width: "100%" }}>
                <p className="col-12 searchBarElement" id="searchTitleTag">Search <BsSearch size={15} /></p>
                <input className="col-lg-11 col-md-10 col-sm-9 col-xs-8 searchBarElement" id="input" ref={searchRef} defaultValue={query}></input><BsSearch className="col-lg-1 col-md-2 col-sm-3 col-xs-4" id="searchButtonMain" onClick={runQuery} size={20} />
                <p className="col-12 searchBarElement" id="searchResultNumber" >{searchResult ? searchResult.length : null} &nbsp; results</p>
            </div>
            <div className="resultsWrapper">
                {searchResult ?
                    (searchResult.length > 0) ?
                        <div className={searchResult.length === 1 ? "galleryWrapperSingle" : "galleryWrapperMultiple"}>
                            <Gallery className="galleryResult" key={searchResult.key} photos={searchResult} onClick={selectImage} />
                        </div>
                        :
                        <div className="row">
                            <p className="col-12 noResults">No results were found for the search term "{query}"</p>
                            <p className="col-12 noResults">Try a different term</p>
                        </div>
                    :
                    <Spinner animation="grow" variant="dark" />
                }
            </div>

        </div>
    )
}

export default Search;