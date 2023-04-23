import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/slices/user.slice';
import { setIsShowingPassword } from '../store/slices/isShowingPassword.slice';
import { useEffect } from 'react';

const Login = () => {

  const [ isSelected, setIsSelected ] = useState(false);

  const navigate = useNavigate('/')
  const { register, reset, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const isShowingPassword = useSelector(state => state.isShowingPassword);

  useEffect(() => {
    dispatch(setIsShowingPassword(false))
  }, [])

  const userFormSubmit = (obj) => {
    //console.log(obj)

    axios.post('https://e-commerce-api-v2.academlo.tech/api/v1/users/login', obj)
      .then(res => {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('username', `${res.data.user.firstName} ${res.data.user.lastName}`)
        dispatch(setUser(res.data.data))
        navigate('/')
        window.scrollTo(0, 0)
        //console.log(res.data)
      })
      .catch(err => {
        if(err){
          alert('Invalid username and/or password')
          console.error(err)
        }
      })
    reset({
      email: '',
      password: ''
    })
  }

  const useTestCredentials = () => {
    setIsSelected(true)
    register({
      email: 'abisai@test.com',
      password: 'test1234'
    })
  }

  return (
    <div className='login-container'>
      <div className="login-form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(userFormSubmit)}>
          <div className="login-input-container">
            <label htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id='email'
              placeholder='Your email'
              {...register('email')}
            />
          </div>
          <div className="login-input-container">
            <label htmlFor="password">
              Password
            </label>
            <div className="lg-input-container">
              <input
                type={isShowingPassword ? "text" : 'password'}
                id='password'
                placeholder='Your password'
                {...register('password')}
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