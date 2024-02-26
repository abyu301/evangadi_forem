import React from 'react'
import classes from './signUpPage.module.css'
import { Link } from 'react-router-dom'
import Login from '../../pages/Login/Login'
// img
import logo from './img/logo.png'
import footer_logo from './img/logo-footer.png'
// icons
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';


function SignUpPage() {
  return (
    <section>
        <section className={classes.header__wrapper}>
            <div className={classes.header_wrapper_logo}>
                <Link to="/"><img src={logo} alt="" /></Link> 
            </div>
            <div className={classes.header_manubar}>
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
            </div>
        </section>
        <section className={classes.detail__wrapper}>
            <div>
                <Login />
            </div>
            <div>
                <div style={{color:'rgb(254,131,3)'}}>
                    <h4>About</h4>
                </div>
                <div>
                    <h2>Evangadi Networks Q&A</h2>
                </div>
                <div>
                    <p>
                    Welcome to Evangadi Tech Q&A, where the worlds of software development, AI, and technology converge to ignite your innovation journey. 
                    </p>
                    <p>
                    No matter what stage of life you are in, whether you're just starting elementary school or being promoted to CEO of a Fortune 500 company, you have much to offer to those who are trying to follow in your footsteps.!
                    Wheather you are willing to share your knowledge or you are just looking to meet mentors of your own, please start by joining the network here.
                    Whether you're a seasoned coding pro or venturing into the realms of artificial intelligence, our vibrant community provides a space for meaningful discussions, expert guidance, and invaluable career insights.
                    Join us to share your expertise, connect with industry pioneers, and stay at the forefront of technological evolution. 
                    </p>
                    <p>
                    No matter your stage in life, whether you're starting elementary school or climbing the corporate ladder, your knowledge and experience are valuable. Whether you're eager to share your wisdom or seeking mentorship, start your journey by joining our network today.
                    </p>
                </div>
                <div className={classes.howitwork__wrapper}>
                    <button>
                        <Link to="/">HOW IT WORKS</Link>
                    </button>
                </div>
            </div>
        </section>
        <section className={classes.footer__wrapper}>
            <div>
                <div className={classes.footer_wrapper_logo}>
                <Link to="/"><img src={footer_logo} alt="" /></Link> 
                </div>
                <div className={classes.footer_icons_logo}>
                    <ul>
                        <li><span className={classes.icon_circle}><FacebookIcon/></span></li>
                        <li><span className={classes.icon_circle}><InstagramIcon/></span></li>
                        <li><span className={classes.icon_circle}><YouTubeIcon/></span></li>
                    </ul>
                </div>
            </div>
            <div className={classes.footer_usefullinks}>
                <div>
                    <h2>Useful Link</h2>
                </div>
                <ul>
                    <li><Link to="/"><p>How it works</p></Link></li>
                    <li><Link to="/"><p>Terms of Service</p></Link></li>
                    <li><Link to="/"><p>Privacy policy</p></Link></li>
                </ul>
            </div>
            <div className={classes.footer_contact}>
                <h2>Contact info</h2>
                <p>Evangadi Networks</p>
                <p>support@evangadi.com</p>
                <p>+1-202-386-2702</p>
            </div>
        </section>
    </section>
  )
}

export default SignUpPage;