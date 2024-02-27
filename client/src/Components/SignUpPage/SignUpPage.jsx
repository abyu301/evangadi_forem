import React, { useState } from 'react'
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
import CodeIcon from '@mui/icons-material/Code';
import BuildIcon from '@mui/icons-material/Build';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MenuIcon from '@mui/icons-material/Menu';


function SignUpPage() {
    const [menuOpen, setMenuOpen] = useState(false)

    const toggleMenu = () => {
        // console.log("first")
        setMenuOpen(!menuOpen)
    }
  return (
    <section>
        <section className={classes.header__wrapper}>
            <div className={classes.header_wrapper_logo}>
                <Link to="/"><img src={logo} alt="" /></Link> 
            </div>
            {/* {menuOpen && ( */}
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
            {/* )} */}
            <div className={classes.menuIcon}>
            <button onClick={toggleMenu}>
                <span><MenuIcon /></span>
            </button>
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
                    Welcome to Evangadi Tech Q&A, your gateway to software development, AI, and technology. Join our vibrant community for insightful discussions, expert guidance, and career insights. 
                    </p>
                    <p>
                    Evangadi Networks welcomes all – from beginners to seasoned professionals. Share knowledge, connect, and grow with us today.
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
        <h4 className={classes.footer_abyu}> Developed <p><BuildIcon/></p> By <p><ArrowForwardIcon/></p>Abyu Ezezew <p><CodeIcon/></p></h4>
    </section>
  )
}

export default SignUpPage;