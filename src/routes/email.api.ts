import express from 'express';
import errorHandler from './error';
import { sendDynamicEmail } from '../utils/email';
import { SENDGRID_EMAIL, SG_INVITE_TEMPLATE_ID } from '../utils/config';

const router = express.Router();

// send invite email
router.post('/invite', async (req, res) => {
  const { email, name } = req.body;

  const inviteEmail = {
    templateId: SG_INVITE_TEMPLATE_ID,
    from: SENDGRID_EMAIL,
    to: email,
    dynamic_template_data: { firstName: name },
  };

  try {
    await sendDynamicEmail(inviteEmail);

    return res.status(200).json({ success: true, message: 'Email sent.' });
  } catch (error) {
    return errorHandler(res, error.message);
  }
});

export default router;
