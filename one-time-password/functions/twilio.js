const twilio = require('twilio');

const accountSid = 'AC6e245b1c34e87143be8c4afd88fe7ff6';
const authToken = '272ca9c39fa3cc8b2cef3049dfd7df3a';

module.exports = new twilio.Twilio(accountSid, authToken);
