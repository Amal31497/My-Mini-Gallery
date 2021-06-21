import React, { useState, useRef } from 'react';
import validate from './validateInfo';
import { useArtContext } from "../../utils/GlobalState";
import { CREATE_ART, UPDATE_ARTIST } from "../../utils/actions";
import { createArt, updateArtist } from "../../utils/API";
import useForm from './useForm';
import './Post.css';
import { uploadFile } from 'react-s3';
import reactImageSize from 'react-image-size';
import env from "react-dotenv";
import { useHistory } from 'react-router-dom';
// import { Spinner } from 'react-bootstrap';

const config = {
    bucketName: 'miniartworks',
    region: 'us-west-2',
    accessKeyId: env.REACT_APP_ACCESS_KEY,
    secretAccessKey: env.REACT_APP_SECRET_ACCESS_KEY
}

const FormPost = ({ submitForm }) => {
    // eslint-disable-next-line no-unused-vars
    const { handleChange, handleSubmit, values, errors } = useForm(
        submitForm,
        validate
    );

    const [_, dispatch] = useArtContext();
    const history = useHistory();

    const titleRef = useRef();
    const descriptionRef = useRef();
    const tagsRef = useRef();
    const genreRef = useRef();
    const formRef = useRef();

    const [selectedFile, setSelectedFile] = useState("");
    const [readyImage, setReadyImage] = useState("");
    const [imgwidth, setWidth] = useState();
    const [imgheight, setHeight] = useState();
    const [widthRatio, setWidthRatio] = useState();
    const [heightRatio, setHeightRatio] = useState();

    const handleFileInput = (event) => {
        event.preventDefault();
        setSelectedFile(event.target.files[0]);
        console.log(event.target.files[0]);
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
    }
    const handleFormSubmit = () => {
        const art = {
            src: readyImage,
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            tags: tagsRef.current.value,
            genre: {keyword:genreRef.current.value},
            width: widthRatio,
            height: heightRatio,
            user: _.user.user_id
        }
        // console.log(art)
        if (readyImage) {
            createArt(art)
                .then(response => {
                    console.log(response)
                    dispatch({
                        type: CREATE_ART,
                        art: response.data
                    })
                    formRef.current.reset();
                    history.push("/postSuccess");
                })
                .catch(error => {
                    console.log(error)
                });
            if(_.user.user_id){
                updateArtist(_.user.user_id,{art:art})
                    .then(response => {
                        console.log(response)
                        dispatch({
                            type: UPDATE_ARTIST,
                            artist: response.data,
                            art:art
                        })
                    })
                    .catch(error => {
                        console.log(error)
                    });
            }
        } else {
            return
        }
    }


    return (
        <form onSubmit={handleSubmit} className='submit-form' ref={formRef} noValidate>
            <div>
                <div>
                    {readyImage ? <img src={readyImage} alt="" style={{width:`${widthRatio*130}px`, height:`${heightRatio*130}px`}}/> : null}
                    {/* {!readyImage ? <Spinner animation="border" role="status"><span className="sr-only"></span></Spinner> : null} */}
                    {(imgwidth && imgheight) ? <h3><strong>{imgwidth} X {imgheight}</strong></h3> : null}
                    <div>Choose your Art to Upload</div>
                    <input type="file" onChange={handleFileInput} />
                </div>
            </div>

            <div className='form-inputs'>
                <label className='form-label2'>Art Title</label>
                <div className='col-7'>
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

            <div className='form-group'>
                <label className='form-label2'>Description</label>
                <div className='col-7'>
                    <textarea className="form-control" id="artDescription" rows="2" ref={descriptionRef}></textarea>
                </div>
            </div>

            <div className='form-inputs'>
                <label className='form-label2'>Tags</label>
                <div className='col-7'>
                    <input
                        className='form-input'
                        type='text'
                        name='tags'
                        placeholder='Enter a maximum of 5 tags, separate with a comma'
                        ref={tagsRef}
                    />
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

            <div className='col-7'>
                {
                    (selectedFile && imgheight && imgwidth) &&
                    <button className='form-input-btn' type='submit' onClick={handleFormSubmit}>
                        Submit
                </button>
                }
            </div>

        </form>
    );
};

export default FormPost;