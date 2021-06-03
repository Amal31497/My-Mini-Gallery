import React, { useState } from 'react';
import {createArt} from "../../utils/API";
import {useArtContext} from "../../utils/GlobalState";
import {CREATE_ART} from "../../utils/actions"
// import validate from './validateInfo';
// import useForm from './useForm';
import './Post.css';
import { uploadFile } from 'react-s3';
import envVar from "../../envVar"

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

const FormPost = React.memo(() => {
    // const { handleChange, values, errors } = useForm(
    //     submitForm,
    //     validate
    // );

    const [_, dispatch] = useArtContext();
    const [selectedFile, setSelectedFile] = useState(null);
    const [readyImage, setReadyImage] = useState("")
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState([]);
    const [genre, setGenre] = useState("");

    const [searchActivated, setSearchActivated] = useState(false)


    const handleTitleChange = (event) => {
        event.preventDefault()

        setTitle(event.target.value)
    }

    const handleDescriptionChange = (event) => {
        event.preventDefault()

        setDescription(event.target.value)
    }

    const handleTagsChange = (event) => {
        event.preventDefault()

        setTags(event.target.value)
    }

    const handleGenreChange = (event) => {
        event.preventDefault()

        setGenre(event.target.value)
    }

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const handleUpload = (file) => {
        if (searchActivated === true) {
            uploadFile(file, config)
                .then(data => {
                    console.log(data.location)
                    setReadyImage(data.location)
                })
                .catch(err => console.error(err))
        }
    }

    const handleArtSubmit = () => {
        if (searchActivated === true) {
            createArt(
                {
                    imgSrc: readyImage,
                    title: title,
                    description: description,
                    tags: tags,
                    genre: genre,
                    user: _.user.user_id
                }
            )
                .then(response => {
                    console.log(response)
                    dispatch({
                        type: CREATE_ART,
                        art: response.data
                    });
                })
                .catch(err => console.error(err))
        }
    }

    const handleFormSubmit = async () => {
        await setSearchActivated(true)
        await handleUpload(selectedFile)
        await handleArtSubmit()
    }


    return (
        <form  className='submit-form' noValidate>
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
                    value={title}
                    onChange={handleTitleChange}
                />
                {/* {errors.artTitle && <p>{errors.artTitle}</p>} */}
            </div>

            <div className='form-group'>
                <label className='form-label2'>Description</label>
                <textarea 
                    className="form-control" 
                    id="artDescription" 
                    value={description} 
                    onChange={handleDescriptionChange}
                    rows="3"
                >
                </textarea>
            </div>

            <div className='form-inputs'>
                <label className='form-label2'>Tags</label>
                <input
                    className='form-input'
                    type='text'
                    name='tags'
                    placeholder='Enter a maximum of 5 tags, separate with a comma'
                    value={tags}
                    onChange={handleTagsChange}
                />
            </div>

            <div className="form-row align-items-center">
                <div className="col-auto my-1">
                    <label className="form-label2" for="inlineFormCustomSelect">Choose a Genre for your Artwork</label>
                    <div className="col">
                        <select className="custom-select mr-sm-2" id="genreSelects" onChange={handleGenreChange}>
                            {/* //need to validate value.genre// */}
                            <option selected>Choose...</option>
                            <option value={genre}>3D</option>
                            <option value={genre}>Anime and Manga</option>
                            <option value={genre}>Artisan Craft</option>
                            <option value={genre}>Comic</option>
                            <option value={genre}>Customization</option>
                            <option value={genre}>Cosplay</option>
                            <option value={genre}>Digital Art</option>
                            <option value={genre}>Fantasy</option>
                            <option value={genre}>Fan Art</option>
                            <option value={genre}>Photo Manipulation</option>
                            <option value={genre}>Photography</option>
                            <option value={genre}>Traditional Art</option>
                        </select>
                    </div>
                </div>
                {/* {errors.genre && <p>{errors.genre}</p>} */}
            </div>

            <button
                className='form-input-btn' type='submit'
                onSubmit={handleFormSubmit()}
            >
                Submit
        </button>
        </form>
    );
});

export default FormPost;