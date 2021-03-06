import React, { useState, useRef, useEffect } from 'react';
import validate from './validateInfo';

// Global Context
import { useArtContext } from "../../utils/GlobalState";
import { createArt, addNewArtToUser } from "../../utils/API";

// Styling imports
import useForm from './useForm';
import './Post.css';
import { Spinner } from 'react-bootstrap';

// Image Uploader and Environment vars
import { uploadFile } from 'react-s3';

// Image processer(Width and Height)
import reactImageSize from 'react-image-size';

// Dom reloader
import { useHistory } from 'react-router-dom';

import axios from 'axios';


const FormPost = ({ submitForm }) => {
    
    // Rest API endpoint to get secret keys from backend
    const [keyA, setKeyA] = useState();
    const [keyB, setKeyB] = useState();

    const getConfig = () => {
        axios.get('/getconfig')
            .then(res => {
                setKeyA(res.data.accessKey);
                setKeyB(res.data.secretAccessKEY);
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        getConfig();
    },[])


    // AWS S3 config
    const config = {
        bucketName: 'myminigallery',
        region: 'us-east-2',
        accessKeyId: keyA,
        secretAccessKey: keyB
    }

    // eslint-disable-next-line no-unused-vars
    const { handleChange, handleSubmit, values, errors } = useForm(
        submitForm,
        validate
    );

    // Global state and Dom reloader
    // eslint-disable-next-line no-unused-vars
    const [_, dispatch] = useArtContext();
    const history = useHistory();

    // Refs
    const titleRef = useRef();
    const descriptionRef = useRef();
    const tagsRef = useRef();
    const genreRef = useRef();
    const formRef = useRef();

    // States...
    const [selectedFile, setSelectedFile] = useState("");
    const [readyImage, setReadyImage] = useState("");
    const [imgwidth, setWidth] = useState();
    const [imgheight, setHeight] = useState();
    const [widthRatio, setWidthRatio] = useState();
    const [heightRatio, setHeightRatio] = useState();
    // const [artIds, setArtIds] = useState();
    

    // Begin function - AWS S3 uploader
    const handleFileInput = (event) => {
        event.preventDefault();
        setSelectedFile(event.target.files[0]);
        uploadFile(event.target.files[0], config)
            .then(data => {
                setReadyImage(data.location)
                reactImageSize(data.location)
                    .then(({ width, height }) => {
                        setWidth(width);
                        setHeight(height);
                        if (width > height) {
                            setWidthRatio(Math.round(width / height))
                            setHeightRatio(1)
                        } else {
                            setHeightRatio(Math.round(height / width))
                            setWidthRatio(1)
                        }
                    })
                    .catch(errorMessage => {
                        console.error(errorMessage)
                    })
            })
            .catch(errorMessage => {
                console.error(errorMessage)
            })
    }
    // ... End Function


    // Begin Function - Form Submit, Rest API
    const handleFormSubmit = () => {

        let trimmedTags = [];

        tagsRef.current.value.split(",").forEach(tag => {
            trimmedTags.push(tag.trim())
        })

        const art = {
            src: readyImage,
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            tags: tagsRef.current.value.split(","),
            genre: genreRef.current.value,
            width: imgwidth,
            height: imgheight,
            widthRatio: widthRatio,
            heightRatio: heightRatio,
            date: Date.now(),
            user: _.user
        }
        
        if(readyImage){
            createArt(art)
                .then(response => {
                    if (_.user) {
                        addNewArtToUser(_.user, { _id: response.data._id })
                            .then(response => {
                                // getArtist(_.user)
                                //     .then(response => {
                                //     })
                                //     .catch(error => console.log(error))
                            })
                            .catch(error => console.log(error))
                    }
                    formRef.current.reset();
                    history.push("/postSuccess");
                })
                .catch(error => console.log(error))
        }
    }
    // ... End Function


    return (

        <form onSubmit={handleSubmit} className='submit-form' ref={formRef} noValidate>
            <div className="container">
                <div className="row">
                    {/* Photo Uploader */}
                    <div className="col-lg-6 col-md-12 photoUploader">
                        {readyImage ? <img src={readyImage} alt="" style={{ width: `${widthRatio * 20}%`, height: `${heightRatio * 20}%` }} /> : <Spinner animation="grow" variant="dark" />}
                        {/* {!readyImage ? <Spinner animation="border" role="status"><span className="sr-only"></span></Spinner> : null} */}
                        {(imgwidth && imgheight) ? <h3><strong>{imgwidth} X {imgheight}</strong></h3> : null}
                        <div>Choose your Art to Upload</div>
                        <input type="file" onChange={handleFileInput} />
                    </div>

                    {/* Input uploader : (Title, tags, description, genre) */}
                    <div className='form-inputs col-lg-6 col-md-12 justify-content-center'>

                        <div className="titleField row">
                            <label className='form-label2 col-12'>Art Title</label>
                            <div className='col-12'>
                                <input
                                    className='form-input'
                                    type='text'
                                    name='artTitle'
                                    placeholder='Enter a title for your art'
                                    onChange={handleChange}
                                    ref={titleRef}
                                />
                                {errors.artTitle && <p>{errors.artTitle}</p>}
                            </div>
                        </div>

                        <div className="tagsField row">
                            <label className='form-label2 col-12'>Tags</label>
                            <div className='col-12'>
                                <input
                                    className='form-input'
                                    type='text'
                                    name='tags'
                                    placeholder='Enter a maximum of 5 tags, separate with a comma'
                                    ref={tagsRef}
                                />
                            </div>
                        </div>

                        <div className="descriptionField row">
                            <div className='form-group col-12'>
                                <label className='form-label2'>Description</label>
                                <div>
                                    <textarea className="form-control" id="artDescription" rows="2" ref={descriptionRef}></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="genreField row">
                            <div className="form-row" style={{ width: "104%" }}>
                                <div className="col-12">
                                    <label className="form-label2 col-12" htmlFor="inlineFormCustomSelect">Choose a Genre for your Artwork</label>
                                    <div className="col-12" >
                                        <select className="custom-select mr-sm-2" id="genreSelects" ref={genreRef}>
                                            <option defaultValue>Choose...</option>
                                            <option value="3D">3D</option>
                                            <option value="Anime and Manga">Anime and Manga</option>
                                            <option value="Artisan Craft">Artisan Craft</option>
                                            <option value="Comic">Comic</option>
                                            <option value="Customization">Customization</option>
                                            <option value="Cosplay">Cosplay</option>
                                            <option value="Digital Art">Digital Art</option>
                                            <option value="Fantasy">Fantasy</option>
                                            <option value="Fan Art">Fan Art</option>
                                            <option value="Photo Manipulation">Photo Manipulation</option>
                                            <option value="Photography">Photography</option>
                                            <option value="Traditional Art">Traditional Art</option>
                                        </select>
                                    </div>
                                </div>
                                {errors.genre && <p>{errors.genre}</p>}
                            </div>
                        </div>

                        <div className="submitButtonField row">
                            {/* Submit button */}
                            {
                                (selectedFile && imgheight && imgwidth) &&
                                <button className='form-input-btn' type='submit' onClick={handleFormSubmit}>
                                    Submit
                            </button>
                            }
                        </div>

                    </div>
                </div>
            </div>
        </form>


    );
};

export default FormPost;
