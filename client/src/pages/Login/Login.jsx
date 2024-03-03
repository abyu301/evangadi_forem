import React, { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from '../../API/axiosConfig.js';
import classes from './Login.module.css';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AppState } from '../../App';

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { setUser } = useContext(AppState);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const navigate = useNavigate();
  const emailDom = useRef(null);
  const passwordDom = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;
  
    if (!emailValue || !passwordValue) {
      alert("Please provide all required fields");
      return;
    }
  
    try {
      const response = await axios.post('users/login', {
        email: emailValue,
        password: passwordValue,
      });
      const userData = response.data;
      alert("User login successfully.");
      localStorage.setItem("token", userData.token);
      setUser(userData);
      console.log(userData);
      navigate('/');
      
    } catch (error) {
      if (error?.response?.data?.msg) {
        alert(error?.response?.data?.msg);
        console.error(error.response.data.msg);
      } else {
        alert("An error occurred. Please try again later.");
        console.log("An error occurred:", error.message);
      }
      
    }
  }

  return (
    <section className={classes.login__wrapper}>
      <div className={classes.login_page_wrapper}>
        <h2>Login to your account</h2>
        <p>Don't have an account? <Link to={"/register"}>Create a new account</Link></p>
        <form onSubmit={handleSubmit}>
          <div className={classes.login_input_wrapper}>  
            <input  
              ref={emailDom} 
              type="text" 
              placeholder='Your Email'
            />
          </div>
          <br />
          <div className={classes.login_input_wrapper}>
            <input
              ref={passwordDom}
              type={passwordVisible ? 'text' : 'password'}
              placeholder='Password'
            />
            <InputAdornment position="start">
              <IconButton onClick={togglePasswordVisibility} edge="end" className={`${classes.visibilityIcon}`}>
                {passwordVisible ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          </div>
          <div className={classes.login_login_wrapper}>
            <button type='submit'>Login</button>
          </div>
        </form>
        <Link to={"/register"}>Forgot Password?</Link>
      </div>
    </section>
  );
}

export default Login;
