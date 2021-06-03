const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: {
        type : String,
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    bloodGroup: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    hospitalName : {
        type : String,
        rerquired : true
    },
    doctorCaseSheet : {
        type : Boolean,
        required : true
    }
});


const Patient = mongoose.model('PATIENT',patientSchema);

module.exports =  Patient;