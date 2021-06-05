const express = require('express');
const router = express.Router();
// const message = require('../mailer/fast2sms.js');


require('../db/conn');

//Database Schemas
const Donor = require('../model/donorSchema');
const Patient = require('../model/patientSchema');


//Post Request Routes

//For Donors
router.post('/donor', (req, res) => { //For donor's registration

    const { ever_covid, name, email, mob, city, age, blood_group, gender, recoveryDate, weight, donatedPlasma,
        DiabetesORBP, HIVorHepetitis } = req.body;  //Destructuring Response Object


    //Validations
    if (!name || !email || !city || !age || !blood_group || !gender || !recoveryDate || !weight || !mob || ever_covid=="") //Form Validation
    {
        return res.status(422).json({ message: "🛑 All fields are required." });
    }

    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(email.test(mailformat) == false)
    {
        return res.json({ message : "🔴 Enter a valid email address."})
    }
    
    if (ever_covid=="false") {
        return res.json({ message: "🔴 Only Covid survivors can donate plasma!" });
    }   

    if (donatedPlasma=="true" || DiabetesORBP=="true" || HIVorHepetitis=="true") {
        return res.json({ message: "🔴 Sorry, you can't donate plasma!" })
    }

    if ( age < 18 || age > 65) // Age validation 
    {
        return res.status(500).json({ message: "🔴 You are not in age criteria." });
    }
    
    if (weight < 50) // Weight validation
    {
        return res.json({ message: "🔴 You are underweight for Plasma Donation" });
    }

    if(mob > 9999999999 || mob < 6000000000)
    {
        return res.json({ message : "🔴 Enter a valid mobile number."})
    }

    var recDate = new Date(recoveryDate);
    var today = new Date();

    if(recDate.getTime() > today.getTime())
    {
        return res.json({ message: "🔴 Enter a valid date of recovery." }); 
    }

    //Creating Donor document
    Donor.findOne({ email: email }).then((donorExist) => {
        if (donorExist) {
            return res.status(500).json({ message: "🔴 Donor already registered" });
        }

        const donor = new Donor({
            ever_covid, name, email, mob, city, age, blood_group, gender, recoveryDate, weight, donatedPlasma,
            DiabetesORBP, HIVorHepetitis
        });

        donor.save().then(() => {

            console.log("Donor Registered Successfully");
            res.status(200).json({ message: "✔️ Donor registered successfully." })

        }).catch((error) => {
            res.status(500).json({ message: error.message });
            console.log(error.message);
        });

    }).catch(error => {
        console.log(error);
    })

});


//For Patients
router.post('/patient', (req, res) => {  //For Patient's registration

    //Destructuring response object
    const { name, phone, email, age, bloodGroup, city, gender, hospitalName, doctorCaseSheet } = req.body;

    //Validations
    if (!name || !phone || !email || !age || !bloodGroup || !city || !gender || !hospitalName || doctorCaseSheet=="") {
        return res.status(422).json({ message: "🛑 All fields are required." });
    }

    if(!doctorCaseSheet)
    {
        return res.json({ message : "🔴 Doctor case sheet required."})
    }
    if(phone > 9999999999 || phone < 6000000000)
    {
        return res.json({ message : "🔴 Enter a valid mobile number."})
    }


    //Creating patient record
    Patient.findOne({ email: email }).then((patientExist) => {
        if (patientExist) {
            return res.status(422).json({ message: "🔴 Patient already registered" });
        }

        const patient = new Patient({
            name, phone, email, age, bloodGroup, city, gender, hospitalName, doctorCaseSheet
        })

        patient.save().then(() => {

            console.log("Patient registered successfully");
            return res.status(200).json({ message: "✔️ Patient registered successfully" })

        }).catch((error) => {
            console.log(error.message);
            return res.status(500).json({ message: error.message });
        });
    }).catch((error) => {
        console.log(error);
    });

});


//GET requests
//Number of registered donors
router.get('/DonorNumber' , async(req,res) => {
    try {
        const data = await Donor.countDocuments();
        return res.status(200).json({message : `${data}`}) 
    } catch (error) {
        return res.status(500).json({message : error.message});
    }   
})

//Number of registered patients
router.get('/PatientNumber' , async(req,res) => {
    try {
        const data = await Patient.countDocuments();
        return res.status(200).json({message : `${data}`}) 
    } catch (error) {
        return res.status(500).json({message : error.message});
    }   
})

module.exports = router;