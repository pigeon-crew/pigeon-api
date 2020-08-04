import express from 'express';
import sendEmailTemplate from '../utils/mailer';
import errorHandler from './error';
import { SENDGRID_EMAIL } from '../utils/config';

const router = express.Router();

// send email
router.post('/signup', async (req, res) => {
  const { email, name } = req.body;

  const payload = {
    templateName: 'd-eb590ef4bbe4415eb4afd675b0b03dbc',
    sender: SENDGRID_EMAIL,
    receiver: email,
    template_id: 'd-eb590ef4bbe4415eb4afd675b0b03dbc',
    name,
  };

  try {
    await sendEmailTemplate(payload);
    console.log('Signup email sent!');
    return res.status(200).json({ success: true, message: 'Email sent.' });
  } catch (error) {
    return errorHandler(res, error.message);
  }
});

export default router;
