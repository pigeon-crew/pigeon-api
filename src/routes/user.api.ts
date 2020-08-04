import { compare, hash } from 'bcrypt';
import express from 'express';
import auth from '../middleware/auth';
import { sendDynamicEmail } from '../utils/email';
import { SENDGRID_EMAIL, SG_SIGNUP_TEMPLATE_ID } from '../utils/config';
import { IUser, User } from '../models/user.model';
import errorHandler from './error';
import {
  generateAccessToken,
  generateRefreshToken,
  validateRefreshToken,
} from './user.util';

const router = express.Router();

const saltRounds = 10;

// create new user
router.post('/signup', async (req, res) => {
  const { firstName } = req.body;
  const { lastName } = req.body;
  const { email } = req.body;
  const { password } = req.body;

  if (await User.findOne({ email })) {
    return errorHandler(res, 'User already exists.');
  }

  // hash + salt password
  return hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      return errorHandler(res, err.message);
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return newUser
      .save()
      .then(async () => {
        // send sign up email
        const signupEmail = {
          templateId: SG_SIGNUP_TEMPLATE_ID,
          from: SENDGRID_EMAIL,
          to: email,
          dynamic_template_data: { firstName },
        };

        await sendDynamicEmail(signupEmail);

        return res.status(200).json({ success: true });
      })
      .catch((e) => errorHandler(res, e.message));
  });
});

// login user
router.post('/login', async (req, res) => {
  const { email } = req.body;
  const { password } = req.body;

  User.findOne({ email }).then((user):
    | Response
    | Promise<boolean>
    | boolean
    | PromiseLike<boolean> => {
    // user does not exist
    if (!user) return errorHandler(res, 'User email or password is incorrect.');

    return compare(password, user.password, (err, result) => {
      if (err) return errorHandler(res, err.message);

      if (result) {
        // password matched
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        return Promise.all([accessToken, refreshToken]).then((tokens) =>
          res.status(200).json({
            success: true,
            accessToken: tokens[0],
            refreshToken: tokens[1],
          })
        );
      }

      // wrong password
      return errorHandler(res, 'User email or password is incorrect.');
    });
  });
});

// refresh token
router.get('/refreshToken', (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return errorHandler(res, 'No token provided.');
  }

  return validateRefreshToken(refreshToken)
    .then((tokenResponse: IUser) => generateAccessToken(tokenResponse))
    .then((accessToken: string) => {
      res.status(200).json({
        success: true,
        accessToken,
      });
    })
    .catch((err: { code: string; message: string }) => {
      if (err.code) {
        return errorHandler(res, err.message, err.code);
      }
      return errorHandler(res, err.message);
    });
});

// me
router.get('/me', auth, (req, res) => {
  const { userId } = req;

  return User.findById(userId)
    .select('firstName lastName email _id notificationCount')
    .then((user) => {
      if (!user) return errorHandler(res, 'User does not exist.');

      return res.status(200).json({ success: true, data: user });
    })
    .catch((err) => errorHandler(res, err.message));
});

// TESTING ROUTES BELOW
// get all users
router.get('/', (_, res) => {
  User.find({})
    .then((result) => res.status(200).json({ success: true, result }))
    .catch((e) => errorHandler(res, e));
});

// delete all users
router.delete('/', (_, res) => {
  User.deleteMany({})
    .then(() => res.status(200).json({ success: true }))
    .catch((e) => errorHandler(res, e));
});

export default router;
