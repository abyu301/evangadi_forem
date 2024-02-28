import { useRef } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from '../../API/axiosConfig.js'
import classes from './Register.module.css'

function Register() {
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
      <form onSubmit={handleSubmit}>
      <div className={classes.register_input_wraper}>
        <div>
          <input ref={userNameDom} 
                  type="text" 
                  placeholder='User Name'/>
        </div>
        <br />
        <div>
        <input  ref={firstNameDom} 
                type="text" 
                placeholder='First Name'/>
        </div>
        <br />
        <div>
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
        <div>
          <input  ref={passwordDom} 
                  type="password" placeholder='Password'/>
        </div>
        <br />
        <div className={classes.register_submit_wraper}>
          <button type='submit'>Agree and join</button>
        </div>
      </div>
      </form>
      <div className={classes.register_terms_wraper}>
        <p>
          i Agree to the <span>Privacy Policy</span> and <span>Term of Service</span>
        </p>
        <div>
          <span>
          <Link to={"/login"}>Already have an account?</Link>
          </span>
        </div>
      </div>
      </div>
    </section>
  )
}

export default Register