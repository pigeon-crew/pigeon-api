const sender = require('./mailer.js');

const data = {
  // name of the email template that we will be using
  templateName: 'new_user',
  // sender's and receiver's email
  sender: 'leyton_ho@brown.edu',
  receiver: 'jsieger44@gmail.com',
  // name of the user
  name: 'Madara',
};
// pass the data object to send the email
sender.sendEmail(data);
