import React from 'react'
import classes from './signUpPage.module.css'
import { Link } from 'react-router-dom'
import Header from '../../pages/Header/Header'
import Login from '../../pages/Login/Login'
import Footer from '../../pages/Footer/Footer'


function SignUpPage() {

    return (
        <section>
            <div>
                <Header />
            </div>
            <section className={`${classes.detail__wrapper} ${classes.parentClass}`}>
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
                    Welcome to Evangadi Tech Q&A, No matter what stage of life you are in, whether you’re just starting elementary school or being promoted to CEO of a Fortune 500 company, you have much to offer to those who are trying to follow in your footsteps. 
                    </p>
                    <p>
                    Wheather you are willing to share your knowledge or you are just looking to meet mentors of your own, please start by joining the network here.
                    </p>
                </div>
                <div className={classes.howitwork__wrapper}>
                    <button>
                        <Link to="/">HOW IT WORKS</Link>
                    </button>
                </div>
            </div>
        </section>
        <Footer />
    </section>
  )
}

export default SignUpPage;