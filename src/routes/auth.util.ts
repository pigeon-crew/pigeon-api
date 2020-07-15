import { sign, verify } from 'jsonwebtoken';
import * as _ from 'lodash';
import { User, IUser } from '../models/user.model';
import '../utils/config';

const JWT_SECRET = process.env.JWT_SECRET;

const generateAccessToken = (user: IUser): string => {
    return sign(_.omit(user.toObject(), 'password'), JWT_SECRET!, {
        expiresIn: '60s', // for testing purposes
    });
};

const generateRefreshToken = (user: IUser): any => {
    const refreshToken = sign({ type: 'refresh' }, JWT_SECRET!, {
        expiresIn: '9999 years',
    });

    return User.findOneAndUpdate({ email: user.email }, { refreshToken: refreshToken })
        .then(() => {
            return refreshToken;
        })
        .catch((err) => {
            throw err;
        });
};

const validateRefreshToken = (refreshToken: string): Promise<any> =>
    new Promise((res, rej) => {
        verify(refreshToken, JWT_SECRET!, (err) => {
            if (err) {
                rej({
                    code: 'refreshExpired',
                    message: 'Refresh token expired',
                });
            } else {
                User.findOne({ refreshToken: refreshToken })
                    .then((user) => {
                        res(user);
                    })
                    .catch((err) => {
                        rej(err);
                    });
            }
        });
    });

export { generateAccessToken, generateRefreshToken, validateRefreshToken };
