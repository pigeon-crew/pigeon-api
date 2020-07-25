import sgMail from '@sendgrid/mail';
import { SENDGRID_API_KEY } from './config';

sgMail.setApiKey(SENDGRID_API_KEY);

type Email = {
  to: string;
  from: string;
  subject: string;
  html: string;
};

const sendEmail = (email: Email) => {
  sgMail.send(email);
};

export default sendEmail;
