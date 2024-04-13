import express from "express";
import {
  conversation,
  conversationId,
  message,
  messageRead,
} from "../controller/conv-controller.js";

const router = express.Router();

router.route("/conversation").post(conversation);

router.route("/conversation/:userId").get(conversationId);

router.route("/message").post(message);
router.route("/message/:conversationId").get(messageRead);

export default router;
