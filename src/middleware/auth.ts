import { verify } from 'jsonwebtoken';
import '../utils/config';
import * as express from 'express';
import { errorHandler } from '../routes/error';

const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req: express.Request, res: express.Response, next: express.NextFunction): void | Response => {
    let token = req.headers['authorization'];
    if (!token) return errorHandler(res, 'Your access token is invalid.', 'invalidToken');
    token = token.replace('Bearer ', '');

    return verify(token, JWT_SECRET!, (jwtErr) => {
        if (jwtErr) {
            return errorHandler(res, 'Your access token is invalid.', 'invalidToken');
        } else {
            next();
        }
    });
};

export default auth;
