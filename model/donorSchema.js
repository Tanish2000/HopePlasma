const mongoose = require('mongoose');

const donorSchema =  new mongoose.Schema({
    ever_covid : {
        type : Boolean,
        required : true
    },
    name: {
        type: String,
        required: true
    },
    mob: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    blood_group: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    recoveryDate: {
        type: Date,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    gender: {
        type: String
    },
    HIVorHepetitis: {
        type: Boolean,
        required: true
    },
    DiabetesORBP: {
        type: Boolean,
        required: true
    },
    donatedPlasma : {
        type : Boolean,
        required: true
    },
    mapped : {
        type : Boolean,
        required : true
    },
    status : {
        type : Boolean,
        required : true
    }
});


const Donor = mongoose.model('DONOR',donorSchema);

module.exports =  Donor;