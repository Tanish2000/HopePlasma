import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import Love from '../images/love.svg';
import fb from '../images/SMedia Icons/fb.svg';
import insta from '../images/SMedia Icons/insta.svg';
import tweet from '../images/SMedia Icons/tweet.svg';
import bg from '../images/background.svg'


const Navbar = () => {
    const styles = {
        title: {
            fontFamily: "'Satisfy', cursive",
            fontSize: 25,
            margin: 10
        },
        icons : {
            height : '40px',
            width : '40px',
            margin : '0px 3px'
        },
        header : {
            backgroundColor : '#00008a',
            backgroundImage : `url(${bg})`
        }
    }
    return (
        <>
            <header style={styles.header}>
                <nav className="navbar navbar-expand-lg navbar-dark">
                    <NavLink className="navbar-brand" to="/">
                        <div className="d-flex align-items-center px-3">
                            <img src={Love} width="35" height="35" className="" alt="" />
                            <h4 className="px-2" style={styles.title}>Hope Plasma</h4>
                        </div>
                    </NavLink>
                    <button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse mx-md-5" id="navbarNavDropdown">
                        <ul className="navbar-nav px-5">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/" data-toggle="collapse" data-target=".navbar-collapse.show">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/donor" data-toggle="collapse" data-target=".navbar-collapse.show">Donor</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/patient" data-toggle="collapse" data-target=".navbar-collapse.show">Patient</NavLink>
                            </li>
                            {/* <li className="nav-item">
                                <NavLink className="nav-link" to="/stats" data-toggle="collapse" data-target=".navbar-collapse.show">Stats</NavLink>
                            </li> */}
                            <li className="nav-item">
                                <a className="nav-link" href="/#how_it_works">How it works</a>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/team" data-toggle="collapse" data-target=".navbar-collapse.show">Team</NavLink>
                            </li>
                            {/* <li className="nav-item">
                                <NavLink className="nav-link" to="/aboutus" data-toggle="collapse" data-target=".navbar-collapse.show">About us</NavLink>
                            </li> */}
                        </ul>
                        <div className="d-flex justify-content-center align-items-center flex-wrap">
                            <div className="text-light my-3 mx-md-5">
                                Contact : <a className="link-secondary" href="mailto:hopeplasmaofficial@gmail.com">hopeplasmaofficial@gmail.com</a>
                            </div>
                            <div className="text-light my-2 d-flex align-items-center">
                                <div className="text-light">Social:</div>
                                <div className="d-flex mx-2">
                                    <img style={styles.icons} alt="" src={fb}/>
                                    <img style={styles.icons} alt="" src={insta}/>
                                    <img style={styles.icons} alt="" src={tweet}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Navbar;
