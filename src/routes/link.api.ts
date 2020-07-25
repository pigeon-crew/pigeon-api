import express from 'express';
import auth from '../middleware/auth';
import { Link } from '../models/link.model';
import { User } from '../models/user.model';
import errorHandler from './error';
import sendEmail from '../utils/email';
import { SENDGRID_EMAIL } from '../utils/config';

const router = express.Router();

// send new link
router.post('/create', auth, async (req, res) => {
  const { linkUrl } = req.body;
  const { recipientEmail } = req.body;
  const { userId: senderId } = req;

  const sender = await User.findById(senderId);
  if (!sender) return errorHandler(res, 'Sender does not exist.');
  const senderName = `${sender.firstName} ${sender.lastName}`;

  const recipient = await User.findOne({ email: recipientEmail });
  if (!recipient) {
    // construct email object
    const email = {
      to: recipientEmail,
      from: SENDGRID_EMAIL,
      subject: 'You have a new link',
      html: `<p>${senderName} just sent you a new link here: ${linkUrl}<p>`,
    };
    await sendEmail(email);
    return res
      .status(200)
      .json({
        success: true,
        message: 'Recipient does not exist. New link sent via email.',
      });
  }
  const recipientId = recipient._id;

  if (!sender.friendships.includes(recipientId))
    return errorHandler(res, 'Recipient is not your friend yet.');

  const newLink = new Link({
    linkUrl,
    recipientId,
    senderId,
    senderName,
  });

  return newLink
    .save()
    .then(() => {
      // TODO: notify recipient here

      return res.status(200).json({ success: true, message: 'New link sent.' });
    })
    .catch((err) => {
      return errorHandler(res, err.message);
    });
});

// get all links sent to me
// TODO: paginate
// pagination tutorial:
// https://softwareontheroad.com/pagination-in-nodejs-mongo/
router.get('/me', auth, async (req, res) => {
  const { userId } = req;

  Link.find({
    $or: [{ recipientId: userId }, { senderId: userId }],
  })
    .sort({ timestamp: 'desc' })
    .exec((err, links) => {
      if (err) return errorHandler(res, err.message);
      return res.status(200).json({ success: true, links });
    });
});

// TESTING ROUTES BELOW
// get all links
router.get('/', (_, res) => {
  Link.find({})
    .then((result) => res.status(200).json({ success: true, result }))
    .catch((e) => errorHandler(res, e));
});

// delete all links
router.delete('/', (_, res) => {
  Link.deleteMany({})
    .then(() => res.status(200).json({ success: true }))
    .catch((e) => errorHandler(res, e));
});

export default router;
