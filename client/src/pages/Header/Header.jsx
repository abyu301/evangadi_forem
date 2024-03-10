import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classes from './Header.module.css';
import MenuIcon from '@mui/icons-material/Menu';
import ClearIcon from '@mui/icons-material/Clear';
import logo from '../../Components/SignUpPage/img/logo.png';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate(); 

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    

const handleLogout = () => {
    fetch('/users/logout')
        .then(response => {
            if (response.ok) {
                
                localStorage.removeItem('userData');
                
                localStorage.removeItem('token');
                
                navigate('/login');
            }
        })
        .catch(error => console.error('Error logging out:', error));
};


    return (
        <div>
            <section className={classes.header__wrapper}>
                <div className={classes.header_wrapper_logo}>
                    <Link to="/"><img src={logo} alt="" /></Link>
                </div>
                <div className={`${classes.menuIcon} ${menuOpen ? classes.open : ''}`}>
                    <button onClick={toggleMenu}>
                        <span><MenuIcon /></span>
                    </button>
                    <div className={classes.dropdown_content} style={{ display: menuOpen ? 'block' : 'none' }}>
                        <Link to=""><ClearIcon onClick={closeMenu} /></Link>
                        <Link to="/">Home</Link>
                        <Link to="/">How it Works</Link>
                        <button onClick={handleLogout}>LOG OUT</button>
                    </div>
                </div>
                <div className={classes.header_manubar}>
                    <div className={classes.header_middle_wrapper}>
                        <ul>
                            <li><Link to="/"><span>Home</span></Link></li>
                            <li><Link to="/"><span>How it Works</span></Link></li>
                        </ul>
                    </div>
                    <div className={classes.header_signin_wrapper}>
                        <button onClick={handleLogout}><p>LOG OUT</p></button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Header;
