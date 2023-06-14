import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {

  const navigate = useNavigate();

  return (
    <div className='not-found-container'>
      <div className="not-found-container__description">
        <h2>Oops! Page not found!</h2>
        <p>We are very sorry for the inconvenience. It looks like you're trying to access a page that has been deleted or never existed!</p>
        <span>404</span>
          <i className="bi bi-exclamation-octagon-fill"></i>
        <button onClick={() => navigate('/')}>
          BACK TO HOME
          <div className="line-bar"></div>
        </button>
      </div>
    </div>
  );
};

export default NotFound;