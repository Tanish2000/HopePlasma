const express = require('express');
const router = express.Router();
const message = require('../messenger/messenger');


require('../db/conn');

//Database Schemas
const Donor = require('../model/donorSchema');
const Patient = require('../model/patientSchema');
const SMSQueue = require('../model/SMSQueueSchema')


//Post Request Routes

//For Donors
router.post('/donor', (req, res) => { //For donor's registration

    const { ever_covid, name, email, mob, city, age, blood_group, gender, recoveryDate, weight, donatedPlasma,
        DiabetesORBP, HIVorHepetitis, status, mapped } = req.body;  //Destructuring Response Object

    if (!name || !email || !city || !age || !blood_group || !gender || !recoveryDate || !weight || !mob || ever_covid == "") //Form Validation
    {
        return res.status(422).json({ message: "🛑 All fields are required." });
    }

    if (ever_covid == "false") {
        return res.json({ message: "🔴 Only Covid survivors can donate plasma!" });
    }

    if (donatedPlasma == "true" || DiabetesORBP == "true" || HIVorHepetitis == "true") {
        return res.json({ message: "🔴 Sorry, you can't donate plasma!" })
    }

    if (age < 18 || age > 65) // Age validation 
    {
        return res.status(500).json({ message: "🔴 You are not in age criteria." });
    }

    if (weight < 50) // Weight validation
    {
        return res.json({ message: "🔴 You are underweight for Plasma Donation" });
    }

    if (mob > 9999999999 || mob < 6000000000) {
        return res.json({ message: "🔴 Enter a valid mobile number." })
    }

    var validEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum|in)\b/;

    if (!email.match(validEmail)) {
        return res.json({ message: "🔴 Enter a valid email address." })
    }

    var recDate = new Date(recoveryDate);
    var today = new Date();

    if (recDate.getTime() > today.getTime()) {
        return res.json({ message: "🔴 Enter a valid date of recovery." });
    }

    //Creating Donor document
    Donor.findOne({ email: email }).then((donorExist) => {
        if (donorExist) {
            return res.status(500).json({ message: "🔴 Donor already registered" });
        }

        const donor = new Donor({
            ever_covid, name, email, mob, city, age, blood_group, gender, recoveryDate, weight, donatedPlasma,
            DiabetesORBP, HIVorHepetitis, status, mapped
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


const Message = async () => {
    const count = await SMSQueue.countDocuments();
    if (count > 0) {
        try {
            SMSQueue.findOne().then(record => {
                console.log(record);
                message(record);
                SMSQueue.deleteOne({ _id: record._id });
            })
        } catch (error) {
            console.log(error);
        }
    }
}


const SearchDonor = async (patient) => {

    Donor.findOne({ city: patient.city, blood_group: patient.bloodGroup, status: true, mapped: false }).then((donorExist) => {
        if (donorExist) {
            console.log(donorExist);

            Donor.updateOne({ email: donorExist.email }, {
                $set: {
                    mapped: true,
                    status: false
                }
            }).then(() => console.log("Updated Donor Details"))

            const details = new SMSQueue({
                patient_name: patient.name,
                to_num: patient.phone,
                donor_name: donorExist.name,
                city: donorExist.city,
                blood_group: donorExist.blood_group,
                age: donorExist.age,
                gender: donorExist.gender,
                donor_mob: donorExist.mob
            })

            details.save(details).then(() => {
                console.log("SMS stored succesfully")
            })

            // Message()

        }
        else {
            console.log("No match found...")
        }
    }).catch(err => console.log(err));
}



//For Patients
router.post('/patient', (req, res) => {  //For Patient's registration

    //Destructuring response object
    const { name, phone, email, age, bloodGroup, city, gender, hospitalName, doctorCaseSheet } = req.body;

    //Validations
    if (!name || !phone || !email || !age || !bloodGroup || !city || !gender || !hospitalName || doctorCaseSheet == "") {
        return res.status(422).json({ message: "🛑 All fields are required." });
    }

    if (!doctorCaseSheet) {
        return res.json({ message: "🔴 Doctor case sheet required." })
    }
    if (phone > 9999999999 || phone < 6000000000) {
        return res.json({ message: "🔴 Enter a valid mobile number." })
    }
    var validEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum|in)\b/;

    if (!email.match(validEmail)) {
        return res.json({ message: "🔴 Enter a valid email address." })
    }

    // Donor.findOne({ city: city, blood_group: bloodGroup, status: true, mapped: false }).then((donorExist) => {
    //     if (donorExist) {
    //         console.log("Donor Found...")
    //     }
    //     else{
    //         // return res.status(500).json({ message : "No donor found in your city.."})
    //         console.log("Donor Not found")
    //         return res.status(404).json({ message : "No donor found"});
    //     }
    // }).catch(err=> console.log(err.message))


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
            SearchDonor(patient);
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
router.get('/getNumbers', async (req, res) => {
    try {
        const donorCount = await Donor.countDocuments();
        const patientCount = await Patient.countDocuments();
        return res.status(200).json({ donorCount: `${donorCount}`, patientCount: `${patientCount}` })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

module.exports = router;