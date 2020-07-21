import express from 'express';
import { FriendReq, FriendReqStatus } from '../models/friendReq.model';
import { User } from '../models/user.model';
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
router.post('/request', auth, (req, res) => {
  const { userId } = req;

  FriendReq.find({ recipientId: userId })
    .then((friendReqs) => {
      if (!friendReqs) {
        return errorHandler(res, 'Invalid recipient id');
      }
      // only return reqs that are pending
      const pendingReqs = friendReqs.filter(
        (val) => val.status === FriendReqStatus.requested
      );

      return res.status(200).json({ success: true, data: pendingReqs });
    })
    .catch((err) => {
      return errorHandler(res, err.message);
    });
});

// accept friend request
router.post('/accept', auth, async (req, res) => {
  const { friendReqId } = req.body;
  const { userId } = req;

  const friendReq = await FriendReq.findOne({ _id: friendReqId });

  if (!friendReq) return errorHandler(res, 'Friend request does not exist');
  if (!(friendReq.recipientId === userId))
    return errorHandler(res, 'You are not the recipient');

  friendReq.status = FriendReqStatus.accepted;

  return friendReq.save().then(async (updatedReq) => {
    const { requesterId } = updatedReq;
    const { recipientId } = updatedReq;

    await User.update(
      { _id: requesterId },
      { $push: { friendships: recipientId } }
    );

    await User.update(
      { _id: recipientId },
      { $push: { friendships: requesterId } }
    );

    return res.json({ success: true });
  });
});

// reject friend request
router.post('/reject', auth, async (req, res) => {
  const { friendReqId } = req.body;
  const { userId } = req;

  const friendReq = await FriendReq.findOne({ _id: friendReqId });

  if (!friendReq) return errorHandler(res, 'Friend request does not exist');
  if (!(friendReq.recipientId === userId))
    return errorHandler(res, 'You are not the recipient');

  friendReq.status = FriendReqStatus.rejected;

  return friendReq.save().then(() => {
    return res.json({ success: true });
  });
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
