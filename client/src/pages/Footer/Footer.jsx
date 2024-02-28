import React from 'react'
import classes from './Footer.module.css'
import { Link } from 'react-router-dom';
import footer_logo from '../../Components/SignUpPage/img/logo-footer.png'
// icons
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import CodeIcon from '@mui/icons-material/Code';
import BuildIcon from '@mui/icons-material/Build';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function Footer() {
  return (
    <div>
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
    </div>
  )
}

export default Footer