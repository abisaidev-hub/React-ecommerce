import React from 'react';
import { useNavigate } from 'react-router-dom'
import { setIsShowingCart } from '../store/slices/isShowingCart.slice'
import { useDispatch, useSelector } from 'react-redux';
import { getCartThunk } from '../store/slices/cart.slice';
import { useEffect } from 'react';
import icon from '../images/icon.png';

const NavBar = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartThunk());
  }, []);

  const isCartWithProducts = useSelector(state => state.isCartWithProducts);

  let navBar = document.querySelector('nav');
  window.addEventListener('scroll', () =>{

      if(window.scrollY){
          navBar?.classList.add('nav-scroll')
      }else{
          navBar?.classList.remove('nav-scroll')
      }

  });

  return (
    <nav>
      <div className="nav__container">
        <div className="nav__icon" data-aos="fade-down-right" onClick={() => {
          navigate('/')
          window.scrollTo(0, 0)}  
          }>
          <img src={icon} alt="icon" />
          <p>{"ELECTROMART"}</p>
        </div>
        <div className="nav__options" data-aos="fade-down-left">
          <ul>
            <li onClick={() => token ? navigate('/user') : navigate('/login')}>
              <i className='bx bxs-user bx-sm'></i>
            </li>
            <li onClick={() => token ? navigate('/purchases') : navigate('/login')}>
              <i className='bx bxs-basket bx-sm' ></i>
            </li>
            <li onClick={() => token ? dispatch(setIsShowingCart(true)) : navigate('/login')}>
              {isCartWithProducts ?
                (
                  <i className='bx bxs-cart bx-sm' ></i>
                ) : (
                  <i className='bx bx-cart bx-sm' ></i>
                )
              }
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;