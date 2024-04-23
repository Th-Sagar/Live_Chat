import express from "express";
import {
  userController,
  loginController,
  readUsers,
} from "../controller/auth-controller.js";

const router = express.Router();

router.route("/register").post(userController);
router.route("/login").post(loginController);

router.route("/users/:userId").get(readUsers);

export default router;
