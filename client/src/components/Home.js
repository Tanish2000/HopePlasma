import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Donation from '../images/front_image.png';
import PlasmaDonation from '../images/blood-donation.svg';
import PatientIcon from '../images/medical.svg';
import algo from '../images/illustrations/algo.svg'
import emailConfirm from '../images/illustrations/emailConfirm.svg'
import exchange from '../images/illustrations/exchange.svg'
import register from '../images/illustrations/register.svg'
import TextTransition, { presets } from "react-text-transition";
import { NavLink } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";


const TEXTS = [
    `"Donate Plasma Save Lives."`,
    `"प्लाज्मा दान करें जीवन बचाएं"`,
    `"प्लाझ्मा सेव्ह लाईव्ह दान करा"`,
    `"Lets fight against COVID-19"`,
    `"ಪ್ಲ್ಯಾಸ್ಮಾ ದಾನ ಮಾಡಿ"`
];

const Home = () => {

    const [index, setIndex] = useState(0);
    const [numbers , setNumbers] = useState([]);

    useEffect(() => {
        AOS.init();   //Animate on scroll intialization
        AOS.refresh();

        //Fetching number of donor from DB
        fetch('/DonorNumber', {
            method: 'GET'
        }).then(res => {
            res.json().then(data => {
                setNumbers(numbers => [...numbers , data.message])
            })
        }).catch(error => {
                console.log(error);
        })

        //Fetching number of patient from DB
        fetch('/PatientNumber', {
            method: 'GET'
        }).then(res => {
            res.json().then(data => {
                setNumbers(numbers => [...numbers , data.message])
            })
        }).catch(error => {
                console.log(error);
        })

        const intervalId = setInterval(() =>
            setIndex(index => index + 1),
            2500 // every 2 seconds
        );
        return () => clearTimeout(intervalId);
    }, [numbers]);

    const styles = {
        donation: {
            height: 'auto',
            maxWidth: '95%',
        },
        landingCard: {
            backgroundImage: 'linear-gradient(to left, #eaced9, #f3d6d5, #f5e1d6, #f3ecdd, #f1f6e9)',
        },
        heading: {
            textShadow: '0px 15px 5px rgba(0,0,0,0.1),10px 20px 5px rgba(0,0,0,0.05),-10px 20px 5px rgba(0,0,0,0.05)'
        },
        Icon: {
            height: 'auto',
            maxWidth: '12%',
        },
        Illustration: {
            height: 'auto',
            maxWidth: '55%'
        },
        Illustration2: {
            height: 'auto',
            maxWidth: '80%'
        },
        smIcons: {
            height: 'auto',
            maxWidth: '10%',
        }
    }
    return (
        <>
            <div className="container-fluid" style={styles.landingCard}>

                {/* Front Section */}
                <section className="row px-md-3 py-4" >
                    <div className="col-12 col-md-6 my-md-3">
                        <img src={Donation} style={styles.donation} alt="Donation_image" />
                    </div>
                    <div className="col-12 col-md-6 my-md-3 my-4 d-flex flex-column my-4 justify-content-center align-self-start pt-md-5">
                        <TextTransition
                            text={TEXTS[index % TEXTS.length]}
                            springConfig={presets.gentle}
                            direction="up"
                            className="text-center text-dark display-2 m-3 p-md-3"
                            style={styles.heading}
                        />
                        <div className="d-flex row align-items-center mx-md-3 px-md-3 justify-content-around">
                            <div className="col-md-5 col-10">
                                <NavLink to='/donor'>
                                    <button type="button" className="btn btn-outline-primary btn-lg btn-block">
                                        <img src={PlasmaDonation} style={styles.Icon} className="mx-md-2 mx-1" alt="donation_svg" />
                                        <span className="h5">Register as Donor</span>
                                    </button>
                                </NavLink>
                            </div>
                            <div className="col-md-5 col-10 my-2">
                                <NavLink to='/patient'>
                                    <button type="button" className="btn btn-outline-danger btn-lg btn-block">
                                        <img src={PatientIcon} style={styles.Icon} className="mx-md-2 mx-1" alt="patient_svg" />
                                        <span className="h5">Register as Patient</span>
                                    </button>
                                </NavLink>
                            </div>
                            <div className="col-md-12 text-center col-10 my-2">
                                <h6>
                                    <a href="/update">
                                        Update existing information
                                   </a>
                                </h6>
                            </div>
                            <div className="col-md-8 text-center col-10 my-4">
                                <div className="text-center text-muted">
                                    * Plasma therapy is an experimental COVID therapy. Please consult your doctor before donating plasma.*
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Recent registrations */}
                <section className="my-5">
                    <h2 className="text-center bold" style={styles.heading}>
                        <u>Registrations</u>
                    </h2>
                    <div className="row p-3 m-md-4 d-flex align-items-center justify-content-center m-1">
                        <div className="col-md-5 col-12 shadow-lg border rounded-lg text-center p-md-5 p-2 my-2 m-md-3" data-aos="zoom-in">
                            <div className="d-flex align-items-center justify-content-center my-3">
                                <img src={PlasmaDonation} style={styles.smIcons} className="mx-md-2 mx-1" alt="donation_svg" />
                                <h4><u>Donor</u></h4>
                            </div>
                            <div className="row">
                                <div className="col-md-6 col-12 mt-3">
                                    <h5>Latest</h5>
                                    <p>18 May 2021  09:00 PM</p>
                                </div>
                                <div className="col-md-6 col-12 mt-3">
                                    <h5>Total Registered Donors</h5>
                                    <p>{numbers[0]}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5 col-12 shadow-lg border rounded-lg text-center p-md-5 p-2 my-2 m-md-3" data-aos="flip-up">
                            <div className="d-flex align-items-center justify-content-center my-3">
                                <img src={PatientIcon} style={styles.smIcons} className="mx-md-2 mx-1" alt="donation_svg" />
                                <h4><u>Patient</u></h4>
                            </div>
                            <div className="row">
                                <div className="col-md-6 col-12 mt-3">
                                    <h5>Latest</h5>
                                    <p>18 May 2021  09:40 PM</p>
                                </div>
                                <div className="col-md-6 col-12 mt-3">
                                    <h5>Total Registered Patients</h5>
                                    <p>{numbers[1]}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                {/* How it works section  */}
                <section className="py-4" id="how_it_works">
                    <h3 className="text-center bold" style={styles.heading}>
                        <u>How it works</u>
                    </h3>
                    <div className="row py-4 d-flex justify-content-around">
                        <div className="col-md-2 shadow-sm mt-3 col-10 d-flex flex-column align-items-center justify-content-center p-md-4 p-2 border rounded-top" data-aos="flip-right">
                            <h5 className="text-center"><u>Step 1</u></h5>
                            <img src={register} style={styles.Illustration} className="my-2" alt="patient_svg" />
                            <h5 className="my-4 text-center">Registration</h5>
                            <p className="text-center text-muted">
                                Donor or Patient register themselves. We need some basic details like location,blood group etc.
                                </p>
                        </div>
                        <div className="col-md-2 mt-3 shadow-sm col-10 d-flex flex-column align-items-center justify-content-center p-md-4 p-2  rounded" data-aos="flip-left">
                            <h5 className="text-center"><u>Step 2</u></h5>
                            <img src={algo} style={styles.Illustration2} className="my-2" alt="patient_svg" />
                            <h5 className="my-4 fw-italic text-center">Matching</h5>
                            <p className="text-center text-muted">
                                Our algorithm will search for a suitable match for you in our database. Once found we will notify you through your E-mails.
                                </p>
                        </div>
                        <div className="col-md-2 mt-3 col-10 shadow-sm d-flex flex-column align-items-center justify-content-center p-md-4 p-2  rounded" data-aos="flip-right">
                            <h5 className="text-center"><u>Step 3</u></h5>
                            <img src={emailConfirm} style={styles.Illustration} className="my-2" alt="patient_svg" />
                            <h5 className="my-4 fw-italic text-center">Confirmation</h5>
                            <p className="text-center text-muted">
                                Once a match found , we will try to contact you through E-mail for a final confirmation.
                                </p>
                        </div>
                        <div className="col-md-2 mt-3 col-10 shadow-sm d-flex flex-column align-items-center justify-content-center p-md-4 p-2 rounded" data-aos="flip-left">
                            <h5 className="text-center"><u>Step 4</u></h5>
                            <img src={exchange} style={styles.Illustration2} className="my-2" alt="patient_svg" />
                            <h5 className="my-4 fw-italic text-center">Exchanging Details</h5>
                            <p className="text-center text-muted">
                                Once we got confirmation from both patient and donor, we will share the donor's details with the patient.
                                </p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Home;
