import express from "express";
import { User } from "../models/user.model";
import { errorHandler } from "./error";
import { hash, compare } from "bcrypt";
import { verify } from "jsonwebtoken";

const router = express.Router();

const saltRounds = 10;

// create new user
router.post("/signup", async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;

  if (await User.findOne({ email: email })) {
    return res
      .status(400)
      .json({ success: false, messsage: "User already exists." });
  }

  // hash + salt password
  hash(password, saltRounds, (err, hash) => {
    if (err) {
      return errorHandler(res, err);
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hash,
    });

    newUser
      .save()
      .then((data) => {
        return res.status(200).json({ success: true });
      })
      .catch((err) => {
        return errorHandler(res, err);
      });
  });
});

// TESTING ROUTES BELOW
// get all users
router.get("/", (_, res) => {
  User.find({})
    .then((result) => {
      return res.status(200).json({ message: "success", result: result });
    })
    .catch((e) => {
      return errorHandler(res, e);
    });
});

// delete all users
router.delete("/", (_, res) => {
  User.deleteMany({})
    .then(() => {
      return res.status(200).json({ message: "success" });
    })
    .catch((e) => {
      return errorHandler(res, e);
    });
});

export default router;
