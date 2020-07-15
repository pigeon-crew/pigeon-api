import { sign } from "jsonwebtoken";
import * as _ from "lodash";
import { User, IUser } from "../models/user.model";
import "../utils/config";

const generateAccessToken = (user: IUser) => {
  const JWT_SECRET = process.env.JWT_SECRET;

  return sign(_.omit(user.toObject(), "password"), JWT_SECRET!, {
    expiresIn: "10s", // for testing purposes
  });
};

const generateRefreshToken = (user: IUser) => {
  const JWT_SECRET = process.env.JWT_SECRET;

  const refreshToken = sign({ type: "refresh" }, JWT_SECRET!, {
    expiresIn: "20s", // 1 hour
  });

  return User.findOneAndUpdate(
    { email: user.email },
    { refreshToken: refreshToken }
  )
    .then(() => {
      return refreshToken;
    })
    .catch((err) => {
      throw err;
    });
};

export { generateAccessToken, generateRefreshToken };
