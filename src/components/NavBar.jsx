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

  const cart = useSelector(state => state.cart);

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

  const cartQuantity = () => {
    let totalQuantity = 0;
    for (const item of cart) {
      totalQuantity += item.quantity;
    }
  
    return totalQuantity;
  };

  return (
    <nav>
      <div className="nav__container">
        <div className="nav__icon" data-aos="fade-down" onClick={() => {
          navigate('/')
          window.scrollTo(0, 0)}  
          }>
          <img src={icon} alt="icon" />
          <p>{"ELECTROMART"}</p>
        </div>
        <div className="nav__options" data-aos="fade-down">
          <ul>
            <li onClick={() => token ? navigate('/user') : navigate('/login')}>
              <i className="bi bi-person-fill"></i>
              <p className='nav__option-text show-desktop'>Account</p>
            </li>
            <li onClick={() => token ? navigate('/purchases') : navigate('/login')}>
              <i className="bi bi-handbag-fill"></i>
              <p className="nav__option-text show-desktop">Purchases</p>
            </li>
            <li onClick={() => token ? dispatch(setIsShowingCart(true)) : navigate('/login')}>
              {isCartWithProducts ?
                (
                  //<i className='bx bxs-cart bx-sm' ></i>
                  <i className="bi bi-cart-fill"></i>
                ) : (
                  //<i className='bx bx-cart bx-sm' ></i>
                  <i className="bi bi-cart"></i>
                )
              }
              <p className="nav__option-text show-desktop">Cart </p><p>&#40;{cartQuantity()}&#41;</p>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;