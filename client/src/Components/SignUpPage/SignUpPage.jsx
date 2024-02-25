import React from 'react'
import classes from './signUpPage.module.css'
import { Link } from 'react-router-dom'
import Login from '../../pages/Login'
// img
import logo from './img/logo.png'
import footer_logo from './img/logo-footer.png'
// icons
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { blue } from '@mui/material/colors'


function SignUpPage() {
  return (
    <section>
        <section className={classes.header__wrapper}>
            <div className={classes.header_wrapper_logo}>
                <Link to="/"><img src={logo} alt="" /></Link> 
            </div>
            <div className={classes.header_middle_wrapper}>
                <ul>
                    <li><Link to="/"><span>Home</span></Link></li>
                    <li><Link to="/"><span>How it Works</span></Link></li>
                </ul>
            </div>
            <div className={classes.header_signin_wrapper}>
                <button>
                    <Link to="/signin"><p>SIGN IN</p></Link>
                </button>
            </div>
        </section>
        <section>
            <div>
                <Login />
            </div>
            <div>
                <div>
                    <p>About</p>
                </div>
                <div>
                    <h1>Evangadi Networks Q&A</h1>
                </div>
                <div>
                    <p>No matter what stage of life you are in, whether you’re just starting elementary school or being promoted to CEO of a Fortune 500 company, you have much to offer to those who are trying to follow in your footsteps.!

                    Wheather you are willing to share your knowledge or you are just looking to meet mentors of your own, please start by joining the network here.</p>
                </div>
                <div>
                    <button>
                        <Link to="/">HOW IT WORKS</Link>
                    </button>
                </div>
            </div>
        </section>
        <section>
            <div>
                <div>
                <Link to="/"><img src={footer_logo} alt="" /></Link> 
                </div>
                <div style={{backgroundColor: blue}}>
                    <ul>
                        <li><FacebookIcon/></li>
                        <li><InstagramIcon/></li>
                        <li><YouTubeIcon/></li>
                    </ul>
                </div>
            </div>
            <div >
            <div className={classes.usefulLinkContainer}>
                    <h1>Useful Link</h1>
                </div>
                <div>
                    <ul>
                        <li><Link to="/">How it works</Link></li>
                        <li><Link to="/">Terms of Service</Link></li>
                        <li><Link to="/">Privacy policy</Link></li>
                    </ul>
                </div>
            </div>
            <div>
                <p>Evangadi Networks</p>
                <p>support@evangadi.com</p>
                <p>+1-202-386-2702</p>
            </div>
        </section>
    </section>
  )
}

export default SignUpPage;