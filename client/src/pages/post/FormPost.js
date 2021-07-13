import React, { useState, useRef, useEffect } from 'react';
import validate from './validateInfo';

// Global Context
import { useArtContext } from "../../utils/GlobalState";
import { ADD_ART } from "../../utils/actions";
import { createArt, updateUser, getArtist } from "../../utils/API";
// ...

// Styling imports
import useForm from './useForm';
import './Post.css';
import { Spinner } from 'react-bootstrap';
// ...

// Image Uploader and Environment vars
import { uploadFile } from 'react-s3';
import env from "react-dotenv";
// Image processer(Width and Height)
import reactImageSize from 'react-image-size';
// ...

// Dom reloader
import { useHistory } from 'react-router-dom';
// ...

// const config = {
//     bucketName: 'myminigallery',
//     region: 'us-east-2',
//     accessKeyId: env.REACT_APP_ACCESS_KEY,
//     secretAccessKey: env.REACT_APP_SECRET_ACCESS_KEY
// }

const FormPost = ({ submitForm }) => {
    
    // eslint-disable-next-line no-unused-vars
    const { handleChange, handleSubmit, values, errors } = useForm(
        submitForm,
        validate
    );

    // Global state and Dom reloader
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
    const [artIds, setArtIds] = useState();
    


    const handleFileInput = event => {
        event.preventDefault();
        const data = new FormData();
        data.append('image', event.target.files[0]);
        setSelectedFile(event.target.files[0]);
        const postImage = async () => {
            try {
                const res = await fetch('/api/image-upload', {
                    mode: 'cors',
                    method: 'POST',
                    body: data
                })
                if (!res.ok) throw new Error(res.statusText);
                
                const postResponse = await res.json();
                
                setReadyImage(postResponse.Location)
                reactImageSize(postResponse.Location)
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
                // setFormState({ ...formState, image: postResponse.Location })
                console.log("postImage: ", postResponse.Location)
                return postResponse.Location;
            } catch (error) {
                console.log(error);
            }
        };
        postImage();
    };

    // console.log(readyImage)

    // Begin function - AWS S3 uploader
    // const handleFileInput = (event) => {
    //     event.preventDefault();
    //     setSelectedFile(event.target.files[0]);
    //     // console.log(config);
    //     uploadFile(event.target.files[0], config)
    //         .then(data => {
    //             // console.log(data.location)
    //             setReadyImage(data.location)
    //             reactImageSize(data.location)
    //                 .then(({ width, height }) => {
    //                     setWidth(width);
    //                     setHeight(height);
    //                     if (width > height) {
    //                         setWidthRatio(Math.round(width / height))
    //                         setHeightRatio(1)
    //                     } else {
    //                         setHeightRatio(Math.round(height / width))
    //                         setWidthRatio(1)
    //                     }
    //                 })
    //                 .catch(errorMessage => {
    //                     console.error(errorMessage)
    //                 })
    //         })
    //         .catch(errorMessage => {
    //             console.error(errorMessage)
    //         })
    // }
    // ... End Function

    // Begin Function - Form Submit, Rest API
    const handleFormSubmit = () => {
        // console.log(_)
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
                if(_.user){
                    updateUser(_.user, { _id:response.data._id })
                        .then(response => {
                            getArtist(_.user)
                                .then(response => {
                                    dispatch({
                                        type: ADD_ART,
                                        art: response.data.art
                                    })
                                })
                                // Catch block
                        })
                        .catch(error => console.log(error))
                }
                // console.log(_)
                formRef.current.reset();
                history.push("/postSuccess");
            })
            .catch(error => console.log(error))
        }

    }
    // ... End Function


    return (
        <form onSubmit={handleSubmit} className='submit-form' ref={formRef} noValidate>
            <div className="row">
                <div className="col-lg-6 col-md-12 photoUploader">
                    <div>
                        {readyImage ? <img src={readyImage} alt="" style={{ width: `${widthRatio * 40}%`, height: `${heightRatio * 40}%` }} /> : <Spinner animation="grow" variant="dark" />}
                        {/* {!readyImage ? <Spinner animation="border" role="status"><span className="sr-only"></span></Spinner> : null} */}
                        {(imgwidth && imgheight) ? <h3><strong>{imgwidth} X {imgheight}</strong></h3> : null}
                        <div>Choose your Art to Upload</div>
                        <input type="file" onChange={handleFileInput} />
                    </div>
                </div>

                <div className='form-inputs col-lg-6 col-md-12 justify-content-center'>
                    <label className='form-label2'>Art Title</label>
                    <div className='col-6'>
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

                    <label className='form-label2'>Tags</label>
                    <div className='col-6'>
                        <input
                            className='form-input'
                            type='text'
                            name='tags'
                            placeholder='Enter a maximum of 5 tags, separate with a comma'
                            ref={tagsRef}
                        />
                    </div>

                    <div className='form-group'>
                        <label className='form-label2'>Description</label>
                        <div className='col-7'>
                            <textarea className="form-control" id="artDescription" rows="2" ref={descriptionRef}></textarea>
                        </div>
                    </div>

                    <div className="form-row align-items-center">
                        <div className="col-auto my-1">
                            <label className="form-label2" htmlFor="inlineFormCustomSelect">Choose a Genre for your Artwork</label>
                            <div className="col">
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
                    {
                        (selectedFile && imgheight && imgwidth) &&
                        <button className='form-input-btn' type='submit' onClick={handleFormSubmit}>
                            Submit
                        </button>
                    }
                </div>
            </div>
        </form>
    );
};

export default FormPost;
