import React from 'react';
import validate from './validateInfo';
import useForm from './useForm';
import './Post.css';

const FormPost = ({ submitForm }) => {
  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validate
  );

  return (
    <form onSubmit={handleSubmit} className='submit-form' noValidate>
      <div className="form-group">
        <label className='form-label2'>Choose a file to upload</label>
        <div className="col">
          <input
            className='form-control'
            type='file'
            name='browse'
            className='artPost'

            //need to validate fileInput//
            value=''
            onChange={handleChange}
          />
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
        />
        {errors.artTitle && <p>{errors.artTitle}</p>}
      </div>

      <div className='form-group'>
        <label className='form-label2'>Description</label>
        <textarea className="form-control" id="artDescription" rows="3"></textarea>
      </div>

      <div className='form-inputs'>
        <label className='form-label2'>Tags</label>
        <input
          className='form-input'
          type='text'
          name='tags'
          placeholder='Enter a maximum of 5 tags, separate with a comma'
        />
      </div>

      <div className="form-row align-items-center">
        <div className="col-auto my-1">
          <label className="form-label2" for="inlineFormCustomSelect">Choose a Genre for your Artwork</label>
          <div className="col">
            <select className="custom-select mr-sm-2" id="genreSelects">

            //need to validate value.genre//
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

      <button className='form-input-btn' type='submit'>
        Submit
        </button>
    </form>
  );
};

export default FormPost;
