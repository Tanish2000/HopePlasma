import React  , { useState } from 'react';
import DonorIcon from '../images/blood-donation.svg';
import Virus from '../images/virus.svg';
import Donation from '../images/blood-transfusion.svg';
import BloodBottle from'../images/iv-bag.svg';
import 'bootstrap/dist/css/bootstrap.css';
import './Form.css';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Donor = () => {

    const [donor,setDonor] = useState({
        ever_covid:"",name:"",email:"",mob:"",city:"",age:"",blood_group:"",gender:"",recoveryDate:"",weight:"",donatedPlasma:"",
        DiabetesORBP:"",HIVorHepetitis:""
    })

    let name,value;

    const handleInputs=(e)=>{
        // console.log(e);
        name = e.target.name;
        value = e.target.value;
        setDonor({ ...donor, [name]: value });
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

            const { ever_covid,name,email,mob,city,age,blood_group,gender,recoveryDate,weight,donatedPlasma,
            DiabetesORBP,HIVorHepetitis } = donor;

            const res = await fetch('/donor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ever_covid,name,email,mob,city,age,blood_group,gender,recoveryDate,weight,donatedPlasma,
                    DiabetesORBP,HIVorHepetitis
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
                <div className="container shadow-lg row mx-auto mx-md-auto p-3 m-md-4 m-2">
                    {/* Left Section */}
                    <div className="d-flex flex-column justify-content-center mx-md-5 col-md-7 col-12 p-2">
                        <div className="py-3 text-center h2">
                            <img alt="" src={DonorIcon} style={styles.smIcon} />
                            <u>Donor Registration</u>
                        </div>
                        <div>
                        <p className="text-justify text-muted mx-md-5 ">
                                *It only takes less than 2 minutes to save someone's life.
                            </p>
                            <p className="text-justify text-muted mx-md-5 ">
                                *Please check the eligibility crieteria <a href='/'>here</a>. All fields are required.
                            </p>
                        </div>
                        <form method="POST">
                            <div>
                                <div className="form-group2 mx-md-5 m-1" >
                                    <label htmlFor="name" className="d-flex">
                                        <i className="zmdi zmdi-star"></i>
                                        <span style={styles.ques} className="px-2">Did you ever get COVID?</span>
                                    </label>
                                    <div className="my-2 mx-4">
                                        <div className="form-check form-check-inline">
                                            <input 
                                                className="form-check-input"  
                                                type="radio"
                                                name="ever_covid" 
                                                id="inlineRadio1"
                                                value="true" 
                                                onChange={handleInputs}
                                                required/>
                                            <label className="form-check-label options" htmlFor="ever_covid" >Yes</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input 
                                                className="form-check-input"
                                                type="radio"
                                                name="ever_covid" 
                                                id="inlineRadio2" 
                                                value="false"
                                                onChange={handleInputs}
                                                />
                                            <label className="form-check-label options" htmlFor="ever_covid">No</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mx-md-5 m-2" >
                                    <label htmlFor="name">
                                        <i className="zmdi zmdi-account"></i>
                                    </label>
                                    <input 
                                        type="text"
                                        placeholder="Your name"
                                        name="name"
                                        value={donor.name}
                                        onChange={handleInputs}
                                        required />
                                </div>
                                <div className="form-group mx-md-5 m-2" >
                                    <label htmlFor="email">
                                        <i className="zmdi zmdi-email"></i>
                                    </label>
                                    <input 
                                        type="email"
                                        placeholder="Email"
                                        name="email"
                                        value={donor.email}
                                        onChange={handleInputs} 
                                        required />
                                </div>
                                <div className="form-group mx-md-5 m-2" >
                                    <label htmlFor="mob">
                                        <i className="zmdi zmdi-phone-in-talk"></i>
                                    </label>
                                    <input 
                                        type="tel"
                                        name="mob"
                                        placeholder="Mobile No. (+91 not required)"
                                        maxLength="10"
                                        value={donor.mob}
                                        onChange={handleInputs}
                                        required />
                                </div>
                                <div className="form-group mx-md-5 m-2" >
                                    <label htmlFor="city">
                                        <i className="zmdi zmdi-city-alt"></i>
                                    </label>
                                    <input 
                                        type="text"
                                        placeholder="City"
                                        name="city"
                                        value={donor.city}
                                        onChange={handleInputs}
                                        required />
                                </div>
                                <div className="form-group mx-md-5 m-2" >
                                    <label htmlFor="age">
                                        <i className="zmdi zmdi-face"></i>
                                    </label>
                                    <input 
                                        type="number"
                                        name="age"
                                        placeholder="Age (Min. 18 Years)"
                                        
                                        max="65"
                                        value={donor.age}
                                        onChange={handleInputs}
                                        required />
                                </div>
                                <div className="form-group2 mx-md-5 m-2 my-3" >
                                    <label htmlFor="blood_group" className="d-flex">
                                        <i className="zmdi zmdi-eyedropper"></i>
                                        <span style={styles.ques} className="mx-2">Blood Group</span>
                                    </label>
                                    <select 
                                        className="drop-down rounded"
                                        name="blood_group"
                                        value={donor.blood_group}
                                        onChange={handleInputs}
                                        required>
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
                                        value={donor.gender}
                                        onChange={handleInputs}
                                        required>
                                        <option value="">Choose..</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                <div className="form-group2 mx-md-5 m-2 my-3" >
                                    <label htmlFor="recoveryDate">
                                         <i className="zmdi zmdi-calendar-note"></i>
                                         <span style={styles.ques} className="mx-2">Date of recovery</span>
                                    </label>
                                    <input 
                                        type="date"
                                        name="recoveryDate" 
                                        placeholder="Date of Recovery" 
                                        min="18" 
                                        max="65"
                                        value={donor.recoveryDate}
                                        onChange={handleInputs}
                                        required />
                                </div>
                                <div className="form-group mx-md-5 m-2" >
                                    <label htmlFor="weight">
                                        <i className="zmdi zmdi-group-work"></i>
                                    </label>
                                    <input 
                                        type="number" 
                                        name="weight" 
                                        placeholder="Weight &nbsp;(Min. 50 KG)" 
                                        min="50"
                                        value={donor.weight}
                                        onChange={handleInputs} 
                                        required />
                                </div>
                                <div className="form-group2 mx-md-5 m-1 my-3" >
                                    <label htmlFor="donatedPlasma" className="d-flex">
                                        <i className="zmdi zmdi-star"></i>
                                        <span style={styles.ques} className="px-1 text-justify">Have you donated plasma in last 28 days?</span>
                                    </label>
                                    <div className="my-2 mx-4">
                                        <div className="form-check form-check-inline">
                                            <input 
                                                className="form-check-input"
                                                type="radio"
                                                name="donatedPlasma" 
                                                id="inlineRadio1" 
                                                value="true"
                                                onChange={handleInputs} 
                                                required/>
                                            <label className="form-check-label options" htmlFor="inlineRadio1" >Yes</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input 
                                                className="form-check-input" 
                                                type="radio" 
                                                name="donatedPlasma" 
                                                id="inlineRadio2" 
                                                value="false"
                                                onChange={handleInputs} />
                                            <label className="form-check-label options" htmlFor="inlineRadio2" >No</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group2 mx-md-5 m-1 my-3" >
                                    <label htmlFor="DiabetesORBP" className="d-flex">
                                        <i className="zmdi zmdi-star"></i>
                                        <span style={styles.ques} className="px-1 text-justify">Are you suffering from diseases like Diabetes or High Blood pressure?</span>
                                    </label>
                                    <div className="my-2 mx-4">
                                        <div className="form-check form-check-inline">
                                            <input 
                                                className="form-check-input" 
                                                type="radio" 
                                                name="DiabetesORBP" 
                                                id="inlineRadio1" 
                                                value="true"
                                                onChange={handleInputs}
                                                required/>
                                            <label className="form-check-label options" htmlFor="inlineRadio1" >Yes</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input 
                                                className="form-check-input" 
                                                type="radio" 
                                                name="DiabetesORBP" 
                                                id="inlineRadio2" 
                                                value="false"
                                                onChange={handleInputs} />
                                            <label className="form-check-label options" htmlFor="inlineRadio2">No</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group2 mx-md-5 m-1 my-3" >
                                    <label htmlFor="HIVorHepetitis" className="d-flex">
                                        <i className="zmdi zmdi-star"></i>
                                        <span style={styles.ques} className="px-1 text-justify">Are you suffering from diseases like HIV or Hepetitis?</span>
                                    </label>
                                    <div className="my-2 mx-4">
                                        <div className="form-check form-check-inline">
                                            <input 
                                                className="form-check-input" 
                                                type="radio" 
                                                name="HIVorHepetitis" 
                                                id="inlineRadio1" 
                                                value="true" 
                                                onChange={handleInputs}
                                                required/>
                                            <label className="form-check-label options" htmlFor="inlineRadio1" >Yes</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input 
                                                className="form-check-input" 
                                                type="radio" 
                                                name="HIVorHepetitis" 
                                                id="inlineRadio2" 
                                                value="false"
                                                onChange={handleInputs} />
                                            <label className="form-check-label options" htmlFor="inlineRadio2" >No</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center flex-column mx-md-5 m-1 my-3 my-md-4">
                                    <div className="d-flex flex-column">
                                        <h5>By submitting this form,</h5>
                                        <ul>
                                            <li className="my-2 text-justify">
                                                I confirm that the information I have provided in here is complete and accurate to best of my knowledge.
                                            </li>
                                            <li className="text-justify">
                                                I confirm that I wish to share the information provided in here with HopePlasma for the exclusive purpose of matching with patients from the database of patients registered with HopePlasma.
                                            </li>
                                        </ul>
                                    </div>
                                    <input type="submit" onClick={postData} className="btn btn-danger w-50 text-center" value="Submit"/>
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
                            <img alt="" src={Donation} style={styles.SVG} className="d-md-block d-none"/>
                            <img alt="" src={BloodBottle} style={styles.SVG} className="d-md-block d-none"/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Donor;
