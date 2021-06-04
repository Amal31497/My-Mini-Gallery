import React, { useState, useRef } from 'react';
import validate from './validateInfo';
import { useArtContext } from "../../utils/GlobalState";
import { CREATE_ART } from "../../utils/actions";
import { createArt } from "../../utils/API";
import useForm from './useForm';
import './Post.css';
import { uploadFile } from 'react-s3';
import envVar from "../../envVar"

import reactImageSize from 'react-image-size';

const S3_BUCKET ='miniartworks';
const REGION ='us-west-2';
const ACCESS_KEY =envVar.ACCESS_KEY;
const SECRET_ACCESS_KEY =envVar.SECRET_ACCESS_KEY;

const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
}

const FormPost = ({ submitForm }) => {
    const { handleChange, handleSubmit, values, errors } = useForm(
        submitForm,
        validate
    );

    const [_,dispatch] = useArtContext()
    const titleRef = useRef();
    const descriptionRef = useRef();
    const tagsRef = useRef();
    const genreRef = useRef();
    const formRef = useRef();

    const [selectedFile, setSelectedFile] = useState(null);
    const [readyImage, setReadyImage] = useState("");
    const [imgwidth, setWidth] = useState();
    const [imgheight, setHeight] = useState();

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]); 
    }

    const handleArtSubmit =  () => {
        console.log(readyImage)

        const art = {
            src: readyImage,
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            tags: tagsRef.current.value,
            genre: genreRef.current.value,
            width:imgwidth,
            height:imgheight,
            user: _.user.user_id
        }
        console.log(art)
        if(readyImage){
            createArt(art)
            .then(response => {
                console.log(response)
                dispatch({
                    type: CREATE_ART,
                    art: response.data
                })
                formRef.current.reset();
            })
            .catch(error => {
                console.log(error)
            });
        } else {
            return
        }
        
    }

    const handleUpload = (file) => {
        uploadFile(file, config)
            .then(data => {
                setReadyImage(data.location)
            })
            .then(() => {
                reactImageSize(readyImage)
                .then(({ width, height }) => {
                    setWidth(width);
                    setHeight(height);
                })
                .catch(errorMessage => {
                    console.error(errorMessage)
                }) 
            })
            .then(() => {
                handleArtSubmit()
            })
            .catch(err => console.error(err))
    }

    return (
        <form onSubmit={handleSubmit} className='submit-form' ref={formRef} noValidate>
            <div>
                <div>
                    <div>Choose your Art to Upload</div>
                    <input type="file" onChange={handleFileInput} />
                </div>
            </div>

            <div className='form-inputs'>
                <label className='form-label2'>Art Title</label>
                <input
                    className='form-input'
                    type='text'
                    name='artTitle'
                    placeholder='Enter a title for your art'
                    value={values.artTitle}
                    onChange={handleChange}
                    ref={titleRef}
                />
                {errors.artTitle && <p>{errors.artTitle}</p>}
            </div>

            <div className='form-group'>
                <label className='form-label2'>Description</label>
                <textarea className="form-control" id="artDescription" rows="3" ref={descriptionRef}></textarea>
            </div>

            <div className='form-inputs'>
                <label className='form-label2'>Tags</label>
                <input
                    className='form-input'
                    type='text'
                    name='tags'
                    placeholder='Enter a maximum of 5 tags, separate with a comma'
                    ref={tagsRef}
                />
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
                selectedFile &&
                <button
                    className='form-input-btn' type='submit'
                    onClick={() => handleUpload(selectedFile)}>
                    Submit
                </button>
            }
        </form>
    );
};

export default FormPost;