const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


const messenger = (record) => {
    client.messages
        .create({
            body: 'Hey ' + record.patient_name + '!\n' + 'Here are the details of donor we have found for you.\n' + 'Name: ' + record.donor_name + '\nMobile No. : ' + record.donor_mob + '\nBlood Group: ' + record.blood_group + '\nCity: ' + record.city + '\nAge: ' + record.age + '\nGender: ' + record.gender,
            from: process.env.PHONE_NUMBER,
            to: '+91'+record.to_num
        })
        .then(message => console.log(message.sid , `Message Sent to $number`))
        .catch(error =>  console.log(error))
}

module.exports = messenger;


