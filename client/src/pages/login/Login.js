import React, { useState } from 'react';
import './Login.css';
import FormLogin from './FormLogin';
import Home from "../Home";

const Login = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }
  return (
    <div className="formBackground2">
      <div className="container">
        <div className="form-container">
          {!isSubmitted ? (
            <FormLogin submitForm={submitForm} />
          ) : (
            <Home />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
