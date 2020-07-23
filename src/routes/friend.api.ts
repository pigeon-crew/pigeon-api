import express from 'express';
import { FriendReq, FriendReqStatus } from '../models/friendReq.model';
import { User, IUser } from '../models/user.model';
import errorHandler from './error';
import auth from '../middleware/auth';

const router = express.Router();

// send friend request
router.post('/request', auth, async (req, res) => {
  const { recipientEmail } = req.body;
  const { userId: requesterId } = req;

  return User.findOne({ email: recipientEmail }).then(async (recipient) => {
    if (!recipient) return errorHandler(res, 'Recipient does not exist');

    const recipientId = recipient._id;
    if (recipientId === requesterId)
      return errorHandler(res, 'You cannot friend yourself.');

    const requester = await User.findById(requesterId);
    if (!requester) return errorHandler(res, 'Invalid user');

    // check if user is friend already
    if (requester.friendships.includes(recipientId))
      return errorHandler(res, 'Recipient is friend already.');

    // delete any previous requests
    await FriendReq.deleteMany({
      $and: [{ recipientId }, { requesterId }],
    });

    const newFriendReq = new FriendReq({
      requesterId,
      requesterName: `${requester.firstName} ${requester.lastName}`,
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
router.get('/pending', auth, (req, res) => {
  const { userId } = req;

  FriendReq.find({
    $and: [{ recipientId: userId }, { status: FriendReqStatus.requested }],
  })
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

// get all of my current friends
router.get('/current', auth, (req, res) => {
  const { userId } = req;

  return User.findById(userId)
    .then(async (user) => {
      if (!user) {
        return errorHandler(res, 'User does not exists');
      }

      const friendsIds = user.friendships;

      const friends = await User.find({
        _id: {
          $in: friendsIds,
        },
      }).select('firstName lastName email _id');

      return res.status(200).json({ success: true, data: friends });
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
router.get('/', (_, res) => {
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
