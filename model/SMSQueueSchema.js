const mongoose = require('mongoose');

const QueueSchema = new mongoose.Schema({
    to_num  : {
        type : Number,
        required : true
    },
    patient_name  :{
        type : String,
        required : true
    },
    donor_name : {
        type : String,
        required: true
    },
    donor_mob : {
        type : Number,
        required :  true
    },
    city : {
        type : String,
        required : true
    },
    blood_group: {
        type : String,
        require : true
    },
    age : {
        type : Number,
        required : true
    },
    gender : {
        type : String,
        required : true
    }
})

const SMSQueueSchema = mongoose.model('SMSQueue',QueueSchema);

module.exports = SMSQueueSchema;