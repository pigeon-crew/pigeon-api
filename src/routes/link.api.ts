import express from 'express';
import { Link, ILink } from '../models/link.model';
import errorHandler from './error';
import auth from '../middleware/auth';

const router = express.Router();

// send new link
router.post('/create', (req, res) => {
  const { linkUrl } = req.body;
  const { recipientId } = req.body;
  const { senderId } = req.body;

  res.status(200).json({ success: true });
});

// get all links sent from friends
router.get('/', (req, res) => {
  res.status(200).json({ success: true });
});

export default router;
