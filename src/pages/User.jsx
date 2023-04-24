import React from 'react';
import defaultpp from '../images/default-pp.jpg'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setIsCartWithProducts } from '../store/slices/isCartWithProducts.slice';
import { useEffect } from 'react';
import { setIsPurchases } from '../store/slices/isPurchases';

const User = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    dispatch(setIsCartWithProducts(false));
    navigate('/');
  }

  return (
    <div className='user-view-container'>
      <div className="user-data-container">
        <div className="user-data-img-container">
          <img src={defaultpp}/>
        </div>
        <div className="user-data-name-container">
          <p><b>{localStorage.getItem('username')}</b></p>
        </div>
        <button onClick={logout}><h3>LOGOUT</h3></button>
      </div>

      <div className="user-extra-data"></div>
      
    </div>
  );
};

export default User;