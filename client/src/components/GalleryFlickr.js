import React, { useState, useEffect, useRef } from "react";
import Gallery from "react-photo-gallery";
import { Spinner } from 'react-bootstrap';
import uuid from 'react-uuid';
import axios from 'axios';
import "./gallery.css";
import reactImageSize from 'react-image-size';
import { BsSearch } from 'react-icons/bs';


const GalleryFlickr = () => {
    // const [openedImage, setOpenedImage] = useState({});
    // const [state,dispatch] = useArtContext();
    // const history = useHistory();
    const ref = useRef()
    // const onScreen = useOnScreen(ref);
    
    const [currentSearch, setCurrentSearch] = useState("art");
    const searchRef = useRef();

    const [flickrPhotos, setFlickrPhotos] = useState();

    useEffect(() => {
        axios.get("/getconfig")
            .then(res => {
                console.log(res.data.flickrKey)
                if(res.data.flickrKey) {
                    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${res.data.flickrKey}&tags=${currentSearch}&per_page=500&page=1&format=json&nojsoncallback=1&content_type=1&safe_search=1&extras=description,owner_name,o_dims,date_upload,tags,license,url_m,url_l`)
                        .then(response => {
                            // console.log(response.data.photos.photo)
                            var results = [];
                            response.data.photos.photo.forEach(photo => {
                                let resultObj = {}
                                resultObj.id = photo.id;
                                resultObj.key = JSON.stringify(uuid());
                                resultObj.src = photo.url_m;
                                resultObj.srcLg = photo.url_l;
                                resultObj.date = photo.dateupload;
                                resultObj.description = photo.description._content;
                                resultObj.ownerId = photo.owner;
                                resultObj.ownername = photo.ownername;
                                resultObj.tags = photo.tags.split(" ");
                                resultObj.title = photo.title;
                                resultObj.className = "lazy-image";
                                if (photo.height_m && photo.width_m) {
                                    resultObj.height = parseInt(photo.height_m);
                                    resultObj.width = parseInt(photo.width_m);
                                } else {
                                    reactImageSize(photo.url_m)
                                        .then(({ width, height }) => {
                                            resultObj.height = height;
                                            resultObj.width = width;
                                        })
                                        .catch(errorMessage => {
                                            console.error(errorMessage)
                                        })
                                }

                                if (resultObj.src) {
                                    results.push(resultObj)
                                }

                            })
                            setFlickrPhotos(results)

                        })
                }

            })
            .catch(error => console.log(error))
    },[currentSearch])
    
    // console.log(flickrPhotos)

    const selectImage = (event) => {
        event.preventDefault();
        var targetImage = {
            src:event.target.getAttribute("srcLg"),
            date:event.target.getAttribute("date"),
            description:event.target.getAttribute("description"),
            ownerId:event.target.getAttribute("ownerId"),
            ownername:event.target.getAttribute("ownername"),
            tags:event.target.getAttribute("tags"),
            title:event.target.getAttribute("title")
        };
        console.log(targetImage)
        // var selected = {id:event.target.getAttribute("id")}
        // setOpenedImage(selected);
        // history.push(`artPage?${selected.id}`)
        // window.scrollTo(0, 0)
    }
    
    const runQuery = (event) => {
        event.preventDefault();
        setCurrentSearch(searchRef.current.value);
    }

    

    return (
        <div className="flickrGallery" style={{ width:"100%" }}>
            <div className="searchBar row" style={{ width: "100%" }}>
                <p className="col-12 searchBarElement" id="searchTitleTag">Search <BsSearch size={15} /></p>
                <input className="col-lg-11 col-md-10 col-sm-9 col-xs-8 searchBarElement" id="input" ref={searchRef}></input><BsSearch className="col-lg-1 col-md-2 col-sm-3 col-xs-4" id="searchButtonMain"  size={20} onClick={runQuery}/>
                <p className="col-12 searchBarElement" id="searchResultNumber" >{flickrPhotos ? flickrPhotos.length : null} &nbsp; results</p>
            </div>
            {flickrPhotos?
                <Gallery key={flickrPhotos.key} photos={flickrPhotos} onClick={selectImage} ref={ref} />             
                :
                <Spinner animation="grow" variant="dark" />
            }
        </div>
    )
}

export default GalleryFlickr;