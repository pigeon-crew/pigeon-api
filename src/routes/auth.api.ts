import express from 'express';
import { User, IUser } from '../models/user.model';
import { errorHandler } from './error';
import { hash, compare } from 'bcrypt';
import { generateAccessToken, generateRefreshToken, validateRefreshToken } from './auth.util';
import auth from '../middleware/auth';

const router = express.Router();

const saltRounds = 10;

// create new user
router.post('/signup', async (req, res) => {
    const firstName = req.body.firstName,
        lastName = req.body.lastName,
        email = req.body.email,
        password = req.body.password;

    if (await User.findOne({ email: email })) {
        return errorHandler(res, 'User already exists.');
    }

    // hash + salt password
    hash(password, saltRounds, (err, hash) => {
        if (err) {
            return errorHandler(res, err.message);
        }

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hash,
        });

        newUser
            .save()
            .then(() => {
                return res.status(200).json({ success: true });
            })
            .catch((err) => {
                return errorHandler(res, err);
            });
    });
});

// login user
router.post('/login', async (req, res) => {
    const email = req.body.email,
        password = req.body.password;

    User.findOne({ email: email }).then((user) => {
        // user does not exist
        if (!user) return errorHandler(res, 'User email or password is incorrect.');

        compare(password, user.password, (err, result) => {
            if (err) return errorHandler(res, err.message);

            if (result == true) {
                // password matched
                const accessToken = generateAccessToken(user);
                const refreshToken = generateRefreshToken(user);

                Promise.all([accessToken, refreshToken]).then((tokens) => {
                    return res.status(200).json({
                        success: true,
                        accessToken: tokens[0],
                        refreshToken: tokens[1],
                    });
                });
            } else {
                // wrong password
                return errorHandler(res, 'User email or password is incorrect.');
            }
        });
    });
});

// refresh token
router.post('/refreshToken', (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return errorHandler(res, 'No token provided.');
    }

    validateRefreshToken(refreshToken)
        .then((tokenResponse: IUser) => {
            return generateAccessToken(tokenResponse);
        })
        .then((accessToken: string) => {
            res.status(200).json({
                success: true,
                accessToken: accessToken,
            });
        })
        .catch((err: { code: string; message: string }) => {
            if (err.code) {
                return errorHandler(res, err.message, err.code);
            } else {
                return errorHandler(res, err.message);
            }
        });
});

// TESTING ROUTES BELOW
// get all users
router.post('/', auth, (_, res) => {
    User.find({})
        .then((result) => {
            return res.status(200).json({ success: true, result: result });
        })
        .catch((e) => {
            return errorHandler(res, e);
        });
});

// delete all users
router.delete('/', (_, res) => {
    User.deleteMany({})
        .then(() => {
            return res.status(200).json({ success: true });
        })
        .catch((e) => {
            return errorHandler(res, e);
        });
});

export default router;
