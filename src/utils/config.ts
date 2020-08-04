import { config as configDotenv } from 'dotenv';
import { resolve } from 'path';

switch (process.env.NODE_ENV) {
  case 'development':
    console.log("Environment is 'development'");
    configDotenv({
      path: resolve(__dirname, '../../.env.development'),
    });
    break;
  case 'production':
    console.log("Environment is 'production'");
    break;
  default:
    throw new Error(`'NODE_ENV' ${process.env.NODE_ENV} is not handled!`);
}

const ATLAS_URI = process.env.ATLAS_URI || '';
const JWT_SECRET = process.env.JWT_SECRET || '';

// sendgrid configs
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || '';
const SENDGRID_EMAIL = 'leyton_ho@brown.edu';
const SG_SIGNUP_TEMPLATE_ID = 'd-eb590ef4bbe4415eb4afd675b0b03dbc';
const SG_INVITE_TEMPLATE_ID = 'd-a545cbca1f9b4ff5b30a26aa77e7ae3e';

export {
  ATLAS_URI,
  JWT_SECRET,
  SENDGRID_API_KEY,
  SENDGRID_EMAIL,
  SG_SIGNUP_TEMPLATE_ID,
  SG_INVITE_TEMPLATE_ID,
};
