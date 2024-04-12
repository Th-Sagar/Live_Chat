import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  convesationId: {
    type: String,
  },
  senderId: {
    type: String,
  },
  message: {
    type: String,
  },
});

const Message = new mongoose.model("Message", messageSchema);
export default Message;
