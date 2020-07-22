import express from 'express';
import { Link, ILink } from '../models/link.model';
import { User } from '../models/user.model';
import errorHandler from './error';
import auth from '../middleware/auth';

const router = express.Router();

// send new link
router.post('/create', auth, async (req, res) => {
  const { linkUrl } = req.body;
  const { recipientEmail } = req.body;
  const { userId: senderId } = req;

  // need to check if recipient is sender's friend or not
  const recipient = await User.findOne({ email: recipientEmail });
  if (!recipient) return errorHandler(res, 'Recipient does not exist.');

  const sender = await User.findById(senderId);
  if (!sender) return errorHandler(res, 'Sender does not exist.');

  const recipientId = recipient._id;

  const newLink = new Link({
    linkUrl,
    recipientId,
    senderId,
    senderName: `${sender.firstName} ${sender.lastName}`,
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
router.post('/me', auth, async (req, res) => {
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
router.post('/', (_, res) => {
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
