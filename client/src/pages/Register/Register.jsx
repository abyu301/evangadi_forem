import { useRef, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from '../../API/axiosConfig.js'
import classes from './Register.module.css'
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Register() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

 const naviget = useNavigate()
 const userNameDom = useRef(null)
 const firstNameDom = useRef(null)
 const lastNameDom = useRef(null)
 const emailDom = useRef(null)
 const passwordDom = useRef(null)

 async function handleSubmit(e) {
  e.preventDefault();
  
  const usernameValue = userNameDom.current.value;
  const firstnameValue = firstNameDom.current.value;
  const lastnameValue = lastNameDom.current.value;
  const emailValue = emailDom.current.value;
  const passwordValue = passwordDom.current.value;

    if (
      !usernameValue || 
      !firstnameValue || 
      !lastnameValue || 
      !emailValue || 
      !passwordValue) {
      alert("Please provide all required fields");
      return;
    }

    try {
      await axios.post('users/register', {
        username: usernameValue,
        firstname: firstnameValue,
        lastname: lastnameValue,
        email: emailValue,
        password: passwordValue
      });
      alert("User registered successfully. Please login.");
      naviget('/login');

    } catch (error) {
      alert(error.response.data.msg);
      console.error(error.response.data.msg);
    }
}


  return (
    <section className={classes.register_wraper}>
      <div className={classes.Register_page_wraper}>
          <div>
            <h2>Join the Evangadi Network</h2>
            <p>Already have an account? <Link to={"/login"}>Sign in</Link></p>
          </div>
          <form onSubmit={handleSubmit}>
              <div className={classes.register_input_wraper}>
                <div>
                  <input ref={userNameDom} 
                          type="text" 
                          placeholder='User Name'/>
                </div>
                <br />
                <div className={classes.register_input_name_wraper}>
                <input  ref={firstNameDom} 
                        type="text" 
                        placeholder='First Name'/>
                
                <input  ref={lastNameDom} 
                        type="text" 
                        placeholder='Last Name'/>
                </div>
                <br />
                <div>
                <input  ref={emailDom} 
                        type="text" 
                        placeholder='Email'/>
                </div>
                <br />
                <div className={classes.password_input}>
                <div className={classes.password_input_wrapper}>
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

</div>

                <br />
                <div className={classes.register_last_wraper}>
                <p>
                  I Agree to the <Link to={"/"}>Privacy Policy</Link> and <Link to={"/"}>Term of Service</Link>
                </p>
                </div>
                <div className={classes.register_submit_wraper}>
                  <button type='submit'>Agree and join</button>
                </div>
              </div>
          </form>
      <div>
        <div className={classes.register_last_wraper}>
          <span>
          <Link to={"/login"}><h4>Already have an account?</h4> </Link>
          </span>
        </div>
      </div>
      </div>
    </section>
  )
}

export default Register