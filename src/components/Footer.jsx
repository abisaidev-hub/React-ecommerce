import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { filterByCategoryThunk, getProductsThunk } from '../store/slices/products.slice';
import { setShowAll } from '../store/slices/showAll.slice';
import { useNavigate } from 'react-router-dom';

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
          <h3 data-aos="flip-up">OUR INFORMATION</h3>
          <ul>
            <li data-aos="flip-up">
              CDMX, MÉXICO
            </li>
          </ul>
        </div>
        <div className="ft-about-container">
          <h3 data-aos="flip-up">COMPANY</h3>
          <ul>
            <li data-aos="flip-up">ABOUT</li>
            <li data-aos="flip-up">TERMS & CONDITIONS</li>
            <li data-aos="flip-up">PRIVACY POLICY</li>
          </ul>
        </div>
        <div className="ft-product-container">
          <h3 data-aos="flip-up">PRODUCTS</h3>
          <ul>
            {showAll &&
              <li data-aos="flip-up" onClick={() => {
                dispatch(getProductsThunk())
                window.scrollTo(0, 0)
              }}>
                SHOW ALL
              </li>
            }
            {categories.map(category => (
                  <li data-aos="flip-up" key={category.id} onClick={() => {
                  window.scrollTo(0, 0)
                  dispatch(filterByCategoryThunk(category.id))
                  dispatch(setShowAll(true))
                  navigate('/')
                  }}>
                    {category.name.toUpperCase()}
                  </li>
                ))}
          </ul>
        </div>
        <div className="ft-ecommerce-social-media-container">
          <h3 data-aos="flip-up">SOCIAL MEDIA</h3>
          <ul>
            <li data-aos="flip-up">
              <a href="https://www.instagram.com/" target='_blank'>
                <i className='bx bxl-instagram-alt bx-sm' ></i>
              </a>
            </li>
            <li data-aos="flip-up">
              <a href="https://www.facebook.com/" target='_blank'>
                <i className='bx bxl-facebook bx-sm'></i>
              </a>
            </li>
            <li data-aos="flip-up">
              <a href="https://twitter.com/" target='_blank'>
                <i className='bx bxl-twitter bx-sm' ></i>
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
                <i className='bx bxl-linkedin-square bx-sm' ></i>
              </a>
            </li>
            <li>
              <a href="https://github.com/abisaidev-hub" target='_blank'>
                <i className='bx bxl-github bx-sm' ></i>
              </a>
            </li>
          </ul>
        </div>
        <p >© ABISAI LUNA</p>
    </div>
  );
};

export default Footer;