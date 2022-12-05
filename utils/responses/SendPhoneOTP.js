import twilio from "twilio";
var accountSid = process.env.TWILLO_SID; // Your Account SID from www.twilio.com/console
var authToken = process.env.TWILLO_TOKEN;   // Your Auth Token from www.twilio.com/console
const client =twilio(accountSid, authToken);



export const sendOTpPhoneMsg = (phone, otp) => { 
    client.messages
        .create({
            from: process.env.TWILLO_PHONE ,// From a valid Twilio number
            to: `+880 1843 687579`,  // Text this number
            body: `Your otp is ${otp}`,
        })
        .then((message) => console.log("meassage is sent"))
        .catch((err) => console.log(err));
};