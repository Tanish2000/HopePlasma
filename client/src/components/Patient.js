import React, { useState } from 'react';
import PatientIcon from '../images/medical.svg';
import Virus from '../images/virus.svg';
import Donation from '../images/blood-transfusion.svg';
import BloodBottle from '../images/iv-bag.svg';
import 'bootstrap/dist/css/bootstrap.css';
import './Form.css';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Patient = () => {

    const [patient, setPatient] = useState({
        name: "", email: "", phone: "", city: "", age: "", hospitalName: "", bloodGroup: "",
        gender: "", doctorCaseSheet: ""
    });

    let name, value;

    const handleInputs = (e) => {
        // console.log(e);
        name = e.target.name;
        value = e.target.value;
        setPatient({ ...patient, [name]: value });
    }

    const notify = (message) => toast.dark( message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });

    const postData = async (e) => {

        e.preventDefault();

        try {

            var { name, email, phone, city, age, hospitalName, bloodGroup, gender, doctorCaseSheet } = patient;

            name = name.trim().toUpperCase();
            city = city.trim().toUpperCase();
            gender = gender.trim().toUpperCase();
            email = email.trim();
            hospitalName = hospitalName.trim().toUpperCase();

            const res = await fetch('/patient', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name, email, phone, city, age, hospitalName, bloodGroup, gender, doctorCaseSheet
                })
            });

            const data = await res.json();

            if(res.status === 200)
            {
                notify(data.message);
            }
            else
            {
                notify(data.message)
            }           
            
            console.log(data);         
            

        } catch (error) {
            console.log(error)
        }
    }




    const styles = {
        Card: {
            backgroundImage: 'linear-gradient(to left, #eaced9, #f3d6d5, #f5e1d6, #f3ecdd, #f1f6e9)',
        },
        verticalLine: {
            borderRight: '2px solid #000000'
        },
        smIcon: {
            height: 'auto',
            width: '13%'
        },
        SVG: {
            height: 'auto',
            width: '40%',
        },
        ques: {
            fontSize: '16px',
        }
    }

    return (
        <>
            <section style={styles.Card} className="p-md-3 p-2 d-flex">
                <div className="container shadow-lg row mx-md-auto mx-auto p-3 m-md-4 m-2">

                    {/* Left Section */}
                    <div className="d-flex flex-column justify-content-center mx-md-5 col-md-7 col-12 p-2">
                        <div className="py-3 text-center h2">
                            <img alt="" src={PatientIcon} style={styles.smIcon} />
                            <u>Patient Registration</u>
                        </div>
                        <div>
                            <p className="text-justify text-muted mx-md-5 ">
                                *All fields are required.
                            </p>
                            <p className="text-justify text-muted mx-md-5 ">
                                *Please provide an active email as it's our primary mode of communication.
                            </p>
                        </div>
                        <form method="POST" >
                            <div>
                                <div className="form-group mx-md-5 m-2" >
                                    <label htmlFor="name">
                                        <i className="zmdi zmdi-account"></i>
                                    </label>
                                    <input
                                        type="text"
                                        value={patient.name}
                                        onChange={handleInputs}
                                        placeholder="Your name" name="name" required />
                                </div>
                                <div className="form-group mx-md-5 m-2" >
                                    <label htmlFor="email">
                                        <i className="zmdi zmdi-email"></i>
                                    </label>
                                    <input
                                        type="email"
                                        value={patient.email}
                                        onChange={handleInputs}
                                        placeholder="Email" name="email" required />
                                </div>
                                <div className="form-group mx-md-5 m-2" >
                                    <label htmlFor="phone">
                                        <i className="zmdi zmdi-phone-in-talk"></i>
                                    </label>
                                    <input
                                        type="tel"
                                        value={patient.phone}
                                        onChange={handleInputs}
                                        maxLength="10" name="phone" placeholder="Mobile No. (India Only)" required />
                                </div>
                                <div className="form-group mx-md-5 m-2" >
                                    <label htmlFor="city">
                                        <i className="zmdi zmdi-city-alt"></i>
                                    </label>
                                    <input
                                        type="text"
                                        value={patient.city}
                                        onChange={handleInputs} placeholder="City" name="city" required />
                                </div>
                                <div className="form-group mx-md-5 m-2" >
                                    <label htmlFor="age">
                                        <i className="zmdi zmdi-face"></i>
                                    </label>
                                    <input
                                        type="number"
                                        value={patient.age}
                                        onChange={handleInputs}
                                        placeholder="Age" min="18" max="65" name="age" required />
                                </div>
                                <div className="form-group2 mx-md-5 m-2 my-3" >
                                    <label htmlFor="bloodGroup" className="d-flex">
                                        <i className="zmdi zmdi-eyedropper"></i>
                                        <span style={styles.ques} className="mx-2">Blood Group</span>
                                    </label>
                                    <select
                                        className="drop-down rounded"
                                        name="bloodGroup"
                                        value={patient.bloodGroup}
                                        onChange={handleInputs} required>
                                        <option value="">Choose..</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                    </select>
                                </div>
                                <div className="form-group2 mx-md-5 m-2 my-3">
                                    <label htmlFor="gender" className="d-flex">
                                        <i className="zmdi zmdi-run"></i>
                                        <span style={styles.ques} className="mx-2">Gender</span>
                                    </label>
                                    <select
                                        className="drop-down rounded"
                                        name="gender"
                                        value={patient.gender}
                                        onChange={handleInputs}
                                        required>
                                        <option value="">Choose..</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                <div className="form-group mx-md-5 m-2" >
                                    <label htmlFor="hospitalName">
                                        <i className="zmdi zmdi-hospital"></i>
                                    </label>
                                    <input type="text"
                                        value={patient.hospitalName}
                                        onChange={handleInputs}
                                        placeholder="Hospital Name" name="hospitalName" required />
                                </div>
                                <div className="form-group2 mx-md-5 m-1 my-3" >
                                    <label htmlFor="doctorCaseSheet" className="d-flex">
                                        <i className="zmdi zmdi-star"></i>
                                        <span style={styles.ques} className="px-1 text-justify">Do you have any case sheet from doctor for Plasma therapy?</span>
                                    </label>
                                    <div className="my-2 mx-4">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="doctorCaseSheet" id="inlineRadio1" value="true" onChange={handleInputs} required />
                                            <label className="form-check-label options" htmlFor="inlineRadio1">Yes</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="doctorCaseSheet" id="inlineRadio2" value="false" onChange={handleInputs} />
                                            <label className="form-check-label options" htmlFor="inlineRadio2">No</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center flex-column mx-md-5 m-1 my-3 my-md-4">
                                    <div className="d-flex flex-column">
                                        <h5>By submitting this form,</h5>
                                        <ul>
                                            <li className="my-2">
                                                I confirm that the information I have provided in here is complete and accurate to best of my knowledge.
                                            </li>
                                            <li>
                                                I confirm that I wish to share the information provided in here with HopePlasma for the exclusive purpose of matching with donors from the database of donors registered with HopePlasma.
                                            </li>
                                        </ul>
                                    </div>
                                    <input type="submit" onClick={postData} className="btn btn-danger w-50 text-center" value="Submit" />
                                </div>
                                <ToastContainer
                                    position="bottom-center"
                                    autoClose={5000}
                                    hideProgressBar={false}
                                    newestOnTop={false}
                                    closeOnClick
                                    rtl={false}
                                    pauseOnFocusLoss
                                    draggable
                                    pauseOnHover
                                />
                            </div>
                        </form>
                    </div>

                    {/* Right Section */}
                    <div className="text-white col-md-4">
                        <div className="d-flex flex-column align-items-center justify-content-around h-100">
                            <img alt="" src={Virus} style={styles.SVG} />
                            <img alt="" src={Donation} style={styles.SVG} className="d-md-block d-none" />
                            <img alt="" src={BloodBottle} style={styles.SVG} className="d-md-block d-none" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Patient;
