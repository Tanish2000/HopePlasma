var unirest = require("unirest");

var req = unirest("GET", "https://www.fast2sms.com/dev/bulkV2");


const message = (name) => {
    req.query({
        "authorization": process.env.FAST_SMS_API_KEY,
        "message": `Hey ${name}!! \nWelcome to HopePlasma as donor.\nDonate Plasma Save Lives.`,
        "language": "english",
        "route": "q",
        "numbers": "7477224690",
    });

    req.headers({
        "cache-control": "no-cache"
    });


    req.end(function (res) {
        if (res.error) throw new Error(res.error);

        console.log(res.body);
    });

}

module.exports = message;
