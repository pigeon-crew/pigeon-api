import sgMail from '@sendgrid/mail';
import { SENDGRID_API_KEY } from './config';

sgMail.setApiKey(SENDGRID_API_KEY);
type Personalization = {
  to: To[];
  dynamic_template_data: DTD;
}

type To = {
  email: string;
}

type DTD = {
  firstName: string;
}

type Email = {
  from: string;
  personalizations: Personalization[];
  template_id: string;
};

const validateEmail = (email: string): boolean => {
  const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegexp.test(email);
};

const sendEmail = (email: Email) => {
  if (!validateEmail(email.to)) throw new Error('Email validation failed.');
  sgMail.send(email);
};


export default sendEmail;
