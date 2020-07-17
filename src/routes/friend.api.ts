import express from 'express';
import {
  FriendReq,
  IFriendReq,
  FriendReqStatus,
} from '../models/friendReq.model';
import { User, IUser } from '../models/user.model';
import errorHandler from './error';
import auth from '../middleware/auth';

const router = express.Router();

// send friend request
router.post('/request', auth, async (req, res) => {
  const { recipientEmail } = req.body;
  const { userId: requesterId } = req;

  return User.findOne({ email: recipientEmail }).then((recipient) => {
    if (!recipient) {
      return errorHandler(res, 'Recipient does not exist');
    }
    const recipientId = recipient._id;
    if (recipientId === requesterId)
      return errorHandler(res, 'You cannot friend yourself.');

    const newFriendReq = new FriendReq({
      requesterId,
      recipientId,
      status: FriendReqStatus.requested,
    });

    return newFriendReq
      .save()
      .then(() => {
        return res
          .status(200)
          .json({ success: true, message: 'Friend Request created.' });
      })
      .catch((err) => {
        return errorHandler(res, err.message);
      });
  });
});

// get my pending friend requests
router.get('/request', auth, (req, res) => {
  const { userId } = req;

  FriendReq.find({ recipientId: userId })
    .then((friendReqs) => {
      if (!friendReqs) {
        return errorHandler(res, 'Invalid recipient id');
      }

      return res.status(200).json({ success: true, data: friendReqs });
    })
    .catch((err) => {
      return errorHandler(res, err.message);
    });
});

// accept friend request
router.post('/accept', (req, res) => {
  const { friendReqId } = req.body;

  return res.json({ success: true });
});

// reject friend request
router.post('/reject', (req, res) => {
  const { friendReqId } = req.body;

  return res.json({ success: true });
});

// TESTING ROUTES BELOW
// get all friend requests
router.post('/', (_, res) => {
  FriendReq.find({})
    .then((result) => res.status(200).json({ success: true, result }))
    .catch((e) => errorHandler(res, e));
});

// delete all friend requests
router.delete('/', (_, res) => {
  FriendReq.deleteMany({})
    .then(() => res.status(200).json({ success: true }))
    .catch((e) => errorHandler(res, e));
});

export default router;
