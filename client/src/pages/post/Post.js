import React, { useState } from 'react';
import './Post.css';
import FormPost from './FormPost';
import Home from "../Home/Home";

const Post = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }
  return (
    <div className="formBackground3">
      <div className="container">
        <div className="form-container">
          {!isSubmitted ? (
            <FormPost submitForm={submitForm} />
          ) : (
            <Home />
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
