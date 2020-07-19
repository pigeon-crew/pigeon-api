import express from 'express';
import { Link } from '../models/link.model';
import { User } from '../models/user.model';
import errorHandler from './error';
import auth from '../middleware/auth';

const router = express.Router();

// send new link
router.post('/create', auth, async (req, res) => {
  const { linkUrl } = req.body;
  const { recipientEmail } = req.body;
  const { userId: senderId } = req;

  const recipient = await User.findOne({ email: recipientEmail });
  if (!recipient) return errorHandler(res, 'Recipient does not exist.');
  const recipientId = recipient._id;
  if (recipientId === senderId)
    return errorHandler(res, 'You cannot send links to yourself.');

  const newLink = new Link({
    linkUrl,
    recipientId,
    senderId,
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

  const userLinks = await Link.find({ recipientId: userId });

  res.status(200).json({ success: true, data: userLinks });
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
