import express from 'express';
import sgMail from '@sendgrid/mail';
import { Email } from '../utils/email';
import errorHandler from './error';

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || '';
sgMail.setApiKey(SENDGRID_API_KEY);

const router = express.Router();
const sendgrid = Email.getInstance();

// send email
router.post('/send', async (req, res) => {
  const { email } = req.body;
  try {
    sendgrid.sendTemplate(email);
    return res.status(200).json({ success: true, message: 'Email sent.' });
  } catch (error) {
    return errorHandler(res, error.message);
  }
});

export default router;