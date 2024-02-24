import {  useRef } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from '../API/axiosConfig.js'



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
        // naviget('/');
        console.log(data)
  
      } catch (error) {
        alert(error?.response?.data?.msg);
        console.error(error.response.data.msg);
      }
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
        <span>email :---</span>
        <input  ref={emailDom} 
                type="text" 
                placeholder='email'/>
        </div>
        <br />
        <div>
          <span>Password :---</span>
          <input  ref={passwordDom} 
                  type="password" placeholder='password'/>
        </div>
        <br />
        <button type='submit'>Login</button>
      </form>
      <Link to={"/register"}>Register</Link>
    </section>
  )
}

export default Login