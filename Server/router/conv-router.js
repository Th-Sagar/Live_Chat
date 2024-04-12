import express from "express";
import {conversation,conversationId} from "../controller/conv-controller.js"

const router = express.Router();

router.route("/conversation").post(conversation);

router.route("/conversation/:userId",).get(conversationId)

export default router;
