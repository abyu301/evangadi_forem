import {  useRef } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from '../../API/axiosConfig.js'
import classes from './Login.module.css'



function Login() {
  const naviget = useNavigate()
  const emailDom = useRef(null)
  const passwordDom = useRef(null)

  async function handleSubmit(e) {
    e.preventDefault();
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;
  
      if (
        !emailValue || !passwordValue) {
        alert("Please provide all required fields");
        return;
      }
  
      try {
        const {data} = await axios.post('users/login', {
          email: emailValue,
          password: passwordValue,
        });
        alert("User login successfully.");
        localStorage.setItem("token", data.token);
        naviget('/');
        console.log(data)
  
      } catch (error) {
        alert(error?.response?.data?.msg);
        console.error(error.response.data.msg);
      }
  }

  return (
    <section className={classes.login__wrapper}>
      <div className={classes.login_page_wrapper}>
        <h2>Login to your account</h2>
        <p>Don't have an account? <Link to={"/register"}>Create a new account</Link></p>
        <form onSubmit={handleSubmit}>
          <div className={classes.login_input_wrapper}>  
            <input  ref={emailDom} 
                    type="text" 
                    placeholder='Your Email'/>
          </div>
          <br />
          <div className={classes.login_input_wrapper}>
            <input  ref={passwordDom} 
                    type="password" placeholder='Your Password'/>
          </div>
          <div className={classes.login_login_wrapper}>
          <button type='submit'>Login</button>
          </div>
        </form>
        <Link to={"/register"}>Forgot Password?</Link>
      </div>
    </section>
  )
}

export default Login