const sgMail = require("@sendgrid/mail");
sgMail.setApiKey("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");

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
         firstName: data.name,
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