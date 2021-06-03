const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


const messenger = (number) => {
    client.messages
        .create({
            body: '\nHey Tanish!! \nThanks for registering with Hope Plasma as a donor.',
            from: process.env.PHONE_NUMBER,
            to: number
        })
        .then(message => console.log(message.sid , `Message Sent to $number`))
        .catch(error =>  console.log(error))
}

module.exports = messenger;


