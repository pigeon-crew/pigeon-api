import express from 'express';
import sendEmail from '../utils/email';
import errorHandler from './error';
import { SENDGRID_EMAIL } from '../utils/config';

const router = express.Router();

// send email
router.post('/send', async (req, res) => {
  const { email } = req.body;
  const payload = {
    to: email,
    from: SENDGRID_EMAIL,
    subject: 'Welcome to Pigeon',
    html: '<strong>Testing email</strong>',
  };

  try {
    await sendEmail(payload);
    return res.status(200).json({ success: true, message: 'Email sent.' });
  } catch (error) {
    return errorHandler(res, error.message);
  }
});

export default router;
