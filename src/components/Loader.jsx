import React from 'react';
import { useEffect } from 'react';

const Loader = () => {

  useEffect(() => {
    setTimeout(() => {
      document.getElementById('loader-overlay').classList.add('loader-overlay__appear');
    }, 1)
  }, [])

  return (
    <div className='loader-overlay' id='loader-overlay'>
      <span className="loader"></span>
    </div>
  );
};

export default Loader;