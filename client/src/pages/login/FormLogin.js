import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from "../../utils/API";
import { useArtContext } from '../../utils/GlobalState';
import { LOGIN } from "../../utils/actions"
import validate from './validateInfo';
import useForm from './useForm';
import './Login.css';

const FormLogin = ({ submitForm }) => {

  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useArtContext();
  const history = useHistory();

  const usernameRef = useRef();
  const passwordRef = useRef()

  const handleLogin = (event) => {
    event.preventDefault()
    login({
      username: usernameRef.current.value,
      password: passwordRef.current.value
    })
      .then(response => {
        console.log(response)
        dispatch({
          type: LOGIN,
          user: response.data.user
        });

        history.push("/");
      })
      .catch(error => {
        console.log(error)
      })
  }



  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validate
  );

  return (
    <div className='form-content-right'>
      <form onSubmit={handleSubmit} className='form' noValidate>
        <h1> Welcome Back!</h1>
        <div className='form-inputs'>
          <label className='form-label'>Username</label>
          <input
            className='form-input'
            type='text'
            name='username'
            placeholder='Enter your username'
            value={values.username}
            onChange={handleChange}
            ref={usernameRef}
          />
          {errors.username && <p>{errors.username}</p>}
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

        <button className='form-input-btn' type='submit' onClick={handleLogin}>
          Login
        </button>
        <span className='form-input-login'>
          Forgot your password? Reset your password <a href='/'>here</a>
        </span>
        <br></br>
        <span className='form-input-login'>
          Don't have an account? Signup <a href='/signup'>here</a>
        </span>
      </form>
    </div>
  );
};

export default FormLogin;


