import express from "express";
import { User } from "../models/user.model";
import { errorHandler } from "./error";

const router = express.Router();

// create new user
router.post("/", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;

  const newUser = new User({
    name,
    email,
  });

  newUser
    .save()
    .then((data) => {
      return res.status(200).json({ message: "success", user: data });
    })
    .catch((e) => {
      return errorHandler(res, e);
    });
});

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
