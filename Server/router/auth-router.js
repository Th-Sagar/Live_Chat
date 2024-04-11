import express from "express";
import {userController,loginController} from "../controller/auth-controller.js";

const router = express.Router();

router.route("/register").post(userController);
router.route("/login").post(loginController);

export default router;
