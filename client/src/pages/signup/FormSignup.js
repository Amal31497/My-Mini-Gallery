import React, { useRef } from 'react';
import { signup } from '../../utils/API';
import { useArtContext } from '../../utils/GlobalState';
import { LOGIN } from "../../utils/actions";
import { useHistory } from 'react-router-dom';
import validate from './validateInfo';
import useForm from './useForm';
import './Signup.css';

function FormSignup( { submitForm } ){

  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useArtContext();
  const history = useHistory();
  

  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef()

  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validate
  );

  const handleSignup = (event) => {
    event.preventDefault();
    signup({

      username: userNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value
      
    })
      .then(res => {
        dispatch({
          type: LOGIN,
          user: res.data
        });
        
        history.push("/");
      })
      .catch(error => {
        console.error(error)
      })
  }


  return (
    <div className='form-content-right'>
      <form  onSubmit={handleSubmit} className='form' noValidate>
        <h1> Welcome To Your Online Art Community!</h1>
        <div className='form-inputs'>
          <label className='form-label'>Username</label>
          <input
            className='form-input'
            type='text'
            name='username'
            placeholder='Enter your username'
            value={values.username}
            onChange={handleChange}
            ref={userNameRef}
          />
          {errors.username && <p>{errors.username}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Email</label>
          <input
            className='form-input'
            type='email'
            name='email'
            placeholder='Enter your email'
            value={values.email}
            onChange={handleChange}
            ref={emailRef}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Password</label>
          <input
            className='form-input'
            type='password'
            name='password'
            placeholder='Enter your password'
            value={values.password}
            onChange={handleChange}
            ref={passwordRef}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Confirm Password</label>
          <input
            className='form-input'
            type='password'
            name='password2'
            placeholder='Confirm your password'
            value={values.password2}
            onChange={handleChange}
            ref={passwordRef}
          />
          {errors.password2 && <p>{errors.password2}</p>}
        </div>
        <button className='form-input-btn' type='submit' onClick={handleSignup}>
          Sign up
        </button>
        <span className='form-input-login'>
          Already have an account? Login <a href='/login'>here</a>
        </span>
      </form>
    </div>
  );
};

export default FormSignup;
