import cheerio from 'cheerio';
import express from 'express';
import { Types } from 'mongoose';
import fetch from 'node-fetch';
import url from 'url';
import { SENDGRID_EMAIL } from '../utils/config';
import { sendEmail } from '../utils/email';
import auth from '../middleware/auth';
import { Link } from '../models/link.model';
import { User } from '../models/user.model';
import { Like } from '../models/like.model';
import errorHandler from './error';

const router = express.Router();

const validateUrl = (inputURL: string): boolean => {
  const urlRegexp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  return urlRegexp.test(inputURL);
};

// send new link
router.post('/create', auth, async (req, res) => {
  const { linkUrl } = req.body;
  const { recipientEmail } = req.body;
  const { message } = req.body;
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
      subject: `${senderName} just sent you a new link!`,
      html: `Hey there! ${senderName} just sent you a new link here: ${linkUrl}. Send with ❤️ by Pigeon Team.`,
    };

    await sendEmail(email);
    return res.status(200).json({
      success: true,
      message: 'Recipient does not exist. New link sent via email.',
    });
  }
  const recipientId = String(recipient._id);

  if (recipientId !== senderId && !sender.friendships.includes(recipientId))
    return errorHandler(res, 'Recipient is not your friend yet.');

  const newLink = new Link({
    linkUrl,
    recipientId,
    senderId,
    senderName,
    message,
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
// supports search by: sender, like, archive, link keywords (in URL, description, etc.)
router.get('/me', auth, async (req, res) => {
  const { userId } = req;
  const user = await User.findById(userId);
  if (!user) return errorHandler(res, 'User does not exist.');

  const {
    limit: qlimit,
    archive: qarchive,
    author: qauthor,
    like: qlike,
  } = req.query;

  const limit = Number(qlimit);
  const archive = String(qarchive) === 'true';
  const author = String(qauthor).toLowerCase();
  const like = String(qlike) === 'true';

  return Link.find({
    recipientId: userId,
  })
    .sort({ timestamp: 'desc' })
    .exec(async (err, links) => {
      if (err) return errorHandler(res, err.message);
      let resultLinks = links;

      if (qarchive && !archive) {
        resultLinks = resultLinks.filter(
          (val) => !user.archivedLinks.includes(val._id)
        );
      }

      if (qlimit && limit) {
        resultLinks = resultLinks.slice(0, Number(limit));
      }

      if (qauthor && author) {
        resultLinks = resultLinks.filter((val) => {
          return val.senderName.toLowerCase() === author;
        });
      }

      if (qlike && like) {
        const allLikesObj = await Like.find({ userId });
        const allLikedLinks = allLikesObj.map((val) => val.linkId);
        resultLinks = resultLinks.filter((val) => {
          const isLiked = allLikedLinks.includes(String(val._id));
          return isLiked;
        });
      }

      return res.status(200).json({ success: true, links: resultLinks });
    });
});

// get link preview
router.post('/preview', async (req, res) => {
  const { previewUrl } = req.body;

  if (!validateUrl(previewUrl)) return errorHandler(res, 'Invalid URL.');

  const resp = await fetch(previewUrl);
  const html = await resp.text();
  const $ = cheerio.load(html);
  const domain = url.parse(previewUrl).hostname;
  let beautifiedDomain = previewUrl;
  if (domain) {
    const upperDomain = domain.charAt(0).toUpperCase() + domain.slice(1);
    beautifiedDomain = upperDomain.substring(0, upperDomain.lastIndexOf('.'));
  }

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
    domain,
    title: getMetaTag('title') || $('title').text() || beautifiedDomain,
    img: getMetaTag('image'),
    description:
      getMetaTag('description') || $('p').text() || 'No description available',
    favicon: `https://s2.googleusercontent.com/s2/favicons?domain_url=${previewUrl}`,
  };

  const { description } = metaTagData;

  // avoiding description to be more then 200 chars
  if (description.length > 200) {
    metaTagData.description = `${description.substring(0, 200)}...`;
  }

  return res.status(200).json({ success: true, data: metaTagData });
});

// toggle archive a link
router.post('/archive/:id', auth, async (req, res) => {
  const { id: linkId } = req.params;
  const { userId } = req;
  if (!Types.ObjectId.isValid(linkId))
    return errorHandler(res, 'Invalid link id.');
  const targetLink = await Link.findById(linkId);
  if (!targetLink) return errorHandler(res, 'Link does not exist.');

  const user = await User.findById(userId);
  if (!user) return errorHandler(res, 'User does not exist.');

  // if link is archived already, unarchive it
  // else archive it
  if (user.archivedLinks.includes(linkId)) {
    user.archivedLinks = user.archivedLinks.filter((val) => val !== linkId);

    await user.save();
    return res
      .status(200)
      .json({ success: true, message: 'Link is unarchived from user.' });
  }

  user.archivedLinks.push(linkId);
  await user.save();
  return res
    .status(200)
    .json({ success: true, message: 'Link is archived to user.' });
});

// toggle like a link
router.post('/like/:id', auth, async (req, res) => {
  const { id: linkId } = req.params;
  const { userId } = req;
  if (!Types.ObjectId.isValid(linkId))
    return errorHandler(res, 'Invalid link id.');
  const targetLink = await Link.findById(linkId);
  if (!targetLink) return errorHandler(res, 'Link does not exist.');

  const user = await User.findById(userId);
  if (!user) return errorHandler(res, 'User does not exist.');

  const targetLike = await Like.findOne({
    $and: [{ userId }, { linkId: targetLink._id }],
  });

  if (targetLike) {
    await Like.deleteOne({ _id: targetLike._id });
    return res
      .status(200)
      .json({ success: true, message: 'Link is unliked by user.' });
  }

  const newLike = new Like({
    linkId,
    userId,
  });

  await newLike.save();

  return res
    .status(200)
    .json({ success: true, message: 'Link is liked by user.' });
});

// get my like status
router.get('/like/:id', auth, async (req, res) => {
  const { id: linkId } = req.params;

  const targetLike = await Like.findOne({ linkId });

  if (targetLike) {
    return res.status(200).json({ success: true, liked: true });
  }

  return res.status(200).json({ success: true, liked: false });
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
