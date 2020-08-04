import { SENDGRID_API_KEY } from './config';

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(SENDGRID_API_KEY);

interface Input {
  templateName: string;
  receiver: string;
  sender: string;
  name: string;
}

/*
const templates = {
  new_user: 'd-eb590ef4bbe4415eb4afd675b0b03dbc',
  invited_user: 'd-a545cbca1f9b4ff5b30a26aa77e7ae3e',
};
*/

function sendEmailTemplate(data: Input) {
  const msg = {
    // extract the email details
    to: data.receiver,
    from: data.sender,
    templateId: data.templateName,
    // extract the custom fields
    dynamic_template_data: {
      firstName: data.name,
    },
  };
  // send the email
  sgMail.send(msg, (error: any, result: any) => {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
    }
  });
}
export default sendEmailTemplate;
