import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { filterByCategoryThunk, getProductsThunk } from '../store/slices/products.slice';
import { setShowAll } from '../store/slices/showAll.slice';
import { useNavigate } from 'react-router-dom';
import { setIsShowing } from '../store/slices/isShowing.slice';

const Footer = () => {

  const [ categories, setCategories ] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showAll = useSelector(state => state.showAll);

  useEffect(() => {
    axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/categories')
    .then(res => setCategories(res.data))
  }, [])

  return (
    <div className='footer-container'>
      <div className="ft-top">        
        <div className="ft-our-information-container">
          <h3>Our information</h3>
          <ul>
            <li>
              Puebla, Mexico
            </li>
          </ul>
        </div>
        <div className="ft-about-container">
          <h3>About</h3>
          <ul>
            <li>Support Center</li>
            <li>Costumer Support</li>
            <li>Bugs</li>
            <li>About us</li>
          </ul>
        </div>
        <div className="ft-product-container">
          <h3>Products</h3>
          <ul>
            {showAll &&
              <li onClick={() => {
                dispatch(getProductsThunk())
                window.scrollTo(0, 0)
              }}>
                Show all
              </li>
            }
            {categories.map(category => (
                  <li key={category.id} onClick={() => {navigate('/')
                  dispatch(setShowAll(true))
                  dispatch(filterByCategoryThunk(category.id))
                  window.scrollTo(0, 0)
                  }}>
                    {category.name}
                  </li>
                ))}
          </ul>
        </div>
        <div className="ft-ecommerce-social-media-container">
          <h3>Social media</h3>
          <ul>
            <li>
              <a href="https://www.instagram.com/" target='_blank'>
                <i className='bx bxl-instagram-alt bx-md' ></i>
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/" target='_blank'>
                <i className='bx bxl-facebook bx-md'></i>
              </a>
            </li>
            <li>
              <a href="https://twitter.com/" target='_blank'>
                <i className='bx bxl-twitter bx-md' ></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="ft-bottom">
        </div>
        <div className="ft-social-media-container">
          <ul>
            <li>
              <a href="https://www.linkedin.com/in/abisaidev" target="_blank">
                <i className='bx bxl-linkedin-square bx-md' ></i>
              </a>
            </li>
            <li>
              <a href="https://github.com/abisaidev-hub" target='_blank'>
                <i className='bx bxl-github bx-md' ></i>
              </a>
            </li>
          </ul>
        </div>
        <p>© Abisai Luna</p>
    </div>
  );
};

export default Footer;