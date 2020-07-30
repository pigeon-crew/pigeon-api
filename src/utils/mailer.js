const sgMail = require("@sendgrid/mail");
import { SENDGRID_API_KEY } from './config';
sgMail.setApiKey(SENDGRID_API_KEY);

templates = {
    new_user : "d-eb590ef4bbe4415eb4afd675b0b03dbc",
    invited_user        : "d-a545cbca1f9b4ff5b30a26aa77e7ae3e",
};
function sendEmail(data) {
   const msg = {
      //extract the email details
      to: data.receiver,
      from: data.sender,
      templateId: templates[data.templateName],
      //extract the custom fields 
      dynamic_template_data: {
         name: data.name,
         confirm_account_url:  data.confirm_account__url,
         reset_password_url: data.reset_password_url
      }
    };
    //send the email
    sgMail.send(msg, (error, result) => {
      if (error) {
          console.log(error);
      } else {
          console.log("That's wassup!");
      }
    });
}
exports.sendEmail = sendEmail;