import express from 'express';
import { FriendReq, IFriendReq } from '../models/friendReq.model';
import { User, IUser } from '../models/user.model';
import errorHandler from './error';

const router = express.Router();

// send friend request
router.post('/request', (req, res) => {
  const { email } = req.body;

  return res.json({ success: true });
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

export default router;
