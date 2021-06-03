import React from 'react';
import Love from '../images/love.svg';
import bg from '../images/background.svg';
import footer_img from "../images/footer_img.svg";
import { NavLink } from 'react-router-dom';

const Footer = () => {

    const styles = {
        title: {
            fontFamily: "'Satisfy', cursive",
            fontSize: 25,
            margin: 10
        },
        font: {
            fontSize: '16px'
        },
        footer: {
            backgroundColor: '#000000',
            backgroundImage: `url(${bg})`,
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover'
        }
    }
    return (
        // 
        <footer className="bg-dark container-fluid" style={styles.footer}>
            <div className="row d-flex align-items-center justify-content-center">

                {/* Quick Links */}
                <div className="col-md-3 col-12 py-4">
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <h5 className="text-light"><u>Quick Links</u></h5>
                        <nav className="nav flex-column text-center">
                            <NavLink className="nav-link link-secondary" to="/patient">Are you a Patient?</NavLink>
                            <NavLink className="nav-link link-secondary" to="/donor">Are you a Donor?</NavLink>
                            {/* <NavLink className="nav-link link-secondary" to="/stats">Statistics</NavLink> */}
                            <NavLink className="nav-link link-secondary" to="/team">Team</NavLink>
                            {/* <NavLink className="nav-link link-secondary" to="/aboutus">About Us</NavLink> */}
                        </nav>
                    </div>
                </div>


                {/* Center Image */}
                <div className="col-md-4 col-9 d-flex align-items-center justify-content-end justify-content-md-center">
                    <img src={footer_img} width="200" height="200" alt="" />
                </div>

                {/* Mission Section */}
                <div className="col-md-4 col-12 pt-3">
                    <div className="d-flex align-items-center px-3">
                        <img src={Love} width="35" height="35" className="" alt="" />
                        <h4 className="px-1 text-light" style={styles.title}>Hope Plasma</h4>
                    </div>
                    <div className="d-flex flex-column p-3 w-md-50 text-justify">
                        <p className="text-light lead" style={styles.font}>Our mission is to connect eligble plasma donors to pateints. We are trying to eradicate plasma availability problem that will help the COVID infected patients.</p>

                        <p className="text-light lead" style={styles.font}>
                            Kindly register if you are an eligible plasma donor. Please check your plasma donation eligibilty <a href="/">here.</a>
                        </p>

                        <p className="text-light lead text-center" style={styles.font}>
                            Made with <span className="text-danger">&#9829;</span> in India
                        </p>
                    </div>
                </div>
            </div>
        </footer >
    )
}

export default Footer;
