import express from 'express';
import cheerio from 'cheerio';
import url from 'url';
import fetch from 'node-fetch';
import auth from '../middleware/auth';
import { Link } from '../models/link.model';
import { User } from '../models/user.model';
import errorHandler from './error';
import sendEmail from '../utils/email';

import { SENDGRID_EMAIL } from '../utils/config';

const router = express.Router();

const validateUrl = (url: string): boolean => {
  const urlRegexp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  return urlRegexp.test(url);
};

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
    return res.status(200).json({
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
  const { limit } = req.query;

  Link.find({
    recipientId: userId,
  })
    .sort({ timestamp: 'desc' })
    .exec((err, links) => {
      if (err) return errorHandler(res, err.message);
      // if there's not limit return everything
      if (!limit) return res.status(200).json({ success: true, links });

      return res
        .status(200)
        .json({ success: true, links: links.slice(0, Number(limit)) });
    });
});

// get link preview
router.get('/preview', async (req, res) => {
  const { previewUrl } = req.body;

  if (!validateUrl(previewUrl)) {
    return errorHandler(res, 'Invalid URL.');
  }

  const resp = await fetch(previewUrl);
  const html = await resp.text();
  const $ = cheerio.load(html);

  const getMetaTag = (name: string) => {
    return (
      $(`meta[name=${name}]`).attr('content') ||
      $(`meta[name="og:${name}"]`).attr('content') ||
      $(`meta[name="twitter:${name}"]`).attr('content') ||
      $(`meta[property=${name}]`).attr('content') ||
      $(`meta[property="og:${name}"]`).attr('content') ||
      $(`meta[property="twitter:${name}"]`).attr('content')
    );
  };

  const metaTagData = {
    url: previewUrl,
    domain: url.parse(previewUrl).hostname,
    title: getMetaTag('title') || $('h1').text(),
    img: getMetaTag('image') || './images/no-image.png',
    description:
      getMetaTag('description') || $('p').text() || 'No description available',
  };

  const { description } = metaTagData;

  // avoiding description to be more then 200 chars
  if (description.length > 200) {
    metaTagData.description = `${description.substring(0, 200)}...`;
  }

  return res.status(200).json({ success: true, data: metaTagData });
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
