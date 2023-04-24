import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/slices/user.slice';
import { setIsShowingPassword } from '../store/slices/isShowingPassword.slice';
import { useEffect } from 'react';
import { getCartThunk } from '../store/slices/cart.slice';

const Login = () => {

  const [ isSelected, setIsSelected ] = useState(false);

  const navigate = useNavigate('/')
  const { register, reset, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const isShowingPassword = useSelector(state => state.isShowingPassword);

  useEffect(() => {
    dispatch(setIsShowingPassword(false))
    window.scrollTo(0, 0);
  }, [])

  const userFormSubmit = (obj) => {
    //console.log(obj)

    axios.post('https://e-commerce-api-v2.academlo.tech/api/v1/users/login', obj)
      .then(res => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', `${res.data.user.firstName} ${res.data.user.lastName}`);
        dispatch(setUser(res.data.data));
        navigate('/');
        window.scrollTo(0, 0);
        //console.log(res.data)
      })
      .catch(err => {
        if(err){
          //alert('Invalid username and/or password');
          //console.error(err);
          document.getElementById('login-failed').classList.add('active__login-failed');
          setTimeout(() => {
            document.getElementById('login-failed').classList.remove('active__login-failed');
          }, 3000);
        }
      });
    /*reset({
      email: '',
      password: ''
    });*/
  }

  const useTestCredentials = () => {
    setIsSelected(true)
    register({
      email: 'abisai@test.com',
      password: 'test1234'
    })
  }

  const fillLineEmail = () => {
    document.getElementById('line-bar__email').classList.add('fill');
  };
  const unfillLineEmail = () => {
    document.getElementById('line-bar__email').classList.remove('fill');
  };

  const fillLinePassword = () => {
    document.getElementById('line-bar__pw').classList.add('fill');
  };
  const unfillLinePassword = () => {
    document.getElementById('line-bar__pw').classList.remove('fill');
  };

  return (
    <div className='login-container'>
      <div className="pop-up__login-failed" id='login-failed'>
        <p>Invalid username or password</p>
      </div>
      <div className="login-form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(userFormSubmit)}>
          <div className="login-input-container">
            <label htmlFor="email">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              id='email'
              placeholder='name@example.com'
              onFocus={fillLineEmail}
              {...register('email')}
              onBlur={unfillLineEmail}
              required
            />
            <div className="line-bar" id='line-bar__email'></div>
          </div>
          <div className="login-input-container">
            <label htmlFor="password">
              PASSWORD
            </label>
            <div className="lg-input-container">
              <input
                type={isShowingPassword ? "text" : 'password'}
                id='password'
                placeholder='Password'
                onFocus={fillLinePassword}
                {...register('password')}
                onBlur={unfillLinePassword}
                required
              />
              {isShowingPassword ?
              (
                <i className='bx bx-hide bx-sm'
                  onClick={() => dispatch(setIsShowingPassword(!isShowingPassword))}
                ></i>
              ) : (
                <i className='bx bx-show bx-sm'
                  onClick={() => dispatch(setIsShowingPassword(!isShowingPassword))}
                ></i>
              )}
            </div>
            <div className="line-bar" id='line-bar__pw'></div>
          </div>
          <button><h3>LOGIN</h3></button>
        </form>
      </div>
      <div className="login-test-container">
        <p><b>Don't have an account? No worries! You can use the following credentials {':)'}</b></p>
        <div className="login-test-credentials-container">
          <p>abisai@test.com</p>
          <p>test1234</p>
          {/*<button onClick={useTestCredentials}>Use credentials</button>*/}
        </div>
      </div>

      <div className="login-extra-data"></div>
      
    </div>
  );
};

export default Login;