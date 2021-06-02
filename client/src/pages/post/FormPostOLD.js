import React, { useState, useRef } from 'react';
// import { useArtContext } from "../../utils/GlobalState";
// import { CREATE_ART } from "../../utils/actions";
// import { createArt } from "../../utils/API";
import validate from './validateInfo';
import useForm from './useForm';
import './Post.css';
import { uploadFile } from 'react-s3';
require('dotenv').config()



// const S3_BUCKET ='miniartworks';
// const REGION ='us-west-2';
// const ACCESS_KEY ='AKIASQKFA6TJFWCNHBHY';
// const SECRET_ACCESS_KEY ='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';

// const config = {
//     bucketName: S3_BUCKET,
//     region: REGION,
//     accessKeyId: ACCESS_KEY,
//     secretAccessKey: SECRET_ACCESS_KEY,
// }

const config = {
  bucketName: process.env.S3_BUCKET,
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
}

const FormPost = ({ submitForm }) => {
  const { handleChange, values, errors } = useForm(
    submitForm,
    validate
  );

  const titleRef = useRef();
  const descriptionRef = useRef();
  const tagsRef = useRef();
  const genreRef = useRef();
  const formRef = useRef();

  // const [_, dispatch] = useArtContext();


  const [selectedFile, setSelectedFile] = useState(null);
  // const [readyImage, setReadyImage] = useState("")


  const handleFileInput = (e) => {
    e.preventDefault();
    setSelectedFile(e.target.files[0]);
  }

  const handleUpload = async (file) => {
    uploadFile(file, config)
      .then(data => console.log(data.location))
      .catch(err => console.error(err))
  }

  // const handleArtSubmit = (event) => {
  //   event.preventDefault();

  //   const art = {
  //     imgSrc: readyImage,
  //     title: titleRef.current.value,
  //     description: descriptionRef.current.value,
  //     tags: tagsRef.current.value,
  //     // genre: genreRef.current.value,
  //     user: _.user.user_id
  //   }
  //   // console.log(readyImage)
  //   createArt(art)
  //     .then(response => {
  //       console.log(response);
  //       dispatch({
  //         type: CREATE_ART,
  //         art: response.data
  //       });

  //       formRef.current.reset();
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }





  return (
    <form className='submit-form' ref={formRef} noValidate>
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
          <label className="form-label2" for="inlineFormCustomSelect">Choose a Genre for your Artwork</label>
          <div className="col">
            <select className="custom-select mr-sm-2" id="genreSelects" ref={genreRef}>

              {/* //need to validate value.genre// */}
              <option selected>Choose...</option>
              <option value={values.genre}>3D</option>
              <option value={values.genre}>Anime and Manga</option>
              <option value={values.genre}>Artisan Craft</option>
              <option value={values.genre}>Comic</option>
              <option value={values.genre}>Customization</option>
              <option value={values.genre}>Cosplay</option>
              <option value={values.genre}>Digital Art</option>
              <option value={values.genre}>Fantasy</option>
              <option value={values.genre}>Fan Art</option>
              <option value={values.genre}>Photo Manipulation</option>
              <option value={values.genre}>Photography</option>
              <option value={values.genre}>Traditional Art</option>
            </select>
          </div>
        </div>
        {errors.genre && <p>{errors.genre}</p>}
      </div>

      <button
        className='form-input-btn' type='submit'
        onClick={() => handleUpload(selectedFile)}
      >
        Submit
        </button>
    </form>
  );
};

export default FormPost;
