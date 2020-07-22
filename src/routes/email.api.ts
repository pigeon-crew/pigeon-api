import express from 'express';
import sgMail from '@sendgrid/mail';
import errorHandler from './error';

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || '';
sgMail.setApiKey(SENDGRID_API_KEY);

const router = express.Router();

// send email
router.post('/send', async (req, res) => {
  const { email } = req.body;
  const msg = {
    to: email,
    from: 'leyton_ho@brown.edu',
    subject: 'Welcome to Pigeon',
    text: 'Spark great conversations with friends thru link sharing',
    html:
      '<strong>Spark great conversations with friends thru link sharing</strong>',
  };
  sgMail
    .send(msg)
    .then(() => {
      return res.status(200).json({ success: true, message: 'Email sent.' });
    })
    .catch((err: any) => {
      return errorHandler(res, err.message);
    });
});

export default router;
