import React, { useState } from 'react';
import './Signup.css';
import FormSignup from './FormSignup';
import FormSuccess from './FormSuccess';

const Signup = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }
  return (
    <div className='formBackground'>
      <div className="container">
        <div className='form-container'>
          {!isSubmitted ? (
            <FormSignup submitForm={submitForm} />
          ) : (
            <FormSuccess />
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
