import Conversations from "../models/conversation-model.js";
import Message from "../models/message-model.js";
import User from "../models/user-model.js";

const conversation = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    const newConversation = new Conversations({
      members: [senderId, receiverId],
    });
    await newConversation.save();
    res.status(200).json({
      message: "Conversation created successfully!",
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

const conversationId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const conversation = await Conversations.find({
      members: {
        $in: [userId],
      },
    });

    const conversationUserData = Promise.all(
      conversation.map(async (conver) => {
        const receiverId = conver.members.find((member) => member !== userId);
        const user = await User.findById(receiverId);
        return {
          user: {
            receiverId: user._id,
            email: user.email,
            fullName: user.fullName,
          },
          conversationId: conver._id,
        };
      })
    );

    res.status(200).json(await conversationUserData);
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

const message = async (req, res) => {
  try {
    const { conversationId, senderId, message, receiverId = "" } = req.body;

    if (!senderId || !message) {
      return res.status(400).json({ message: " SenderId and message " });
    }
    if (conversationId === "new" && receiverId) {
      const newConversation = new Conversations({
        members: [senderId, receiverId],
      });
      await newConversation.save();
      const newMessage = new Message({
        conversationId: newConversation._id,
        senderId,
        message,
      });
      await newMessage.save();
      return res.status(200).send("Message sent successfully!");
    } else if (!conversationId && !receiverId) {
      return res
        .status(400)
        .json({ message: " Please fill all required fields " });
    }

    const newMessage = new Message({ conversationId, senderId, message });
    await newMessage.save();
    res.status(200).json({
      message: "Message sent successfully!",
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

const messageRead = async (req, res) => {
  try {
    const checkMessages = async (conversationId) => {
      const messages = await Message.find({ conversationId });
      const messageUserData = Promise.all(
        messages.map(async (message) => {
          const user = await User.findById(message.senderId);
          return {
            user: {
              id: user._id,
              email: user.email,
              fullName: user.fullName,
            },
            message: message.message,
          };
        })
      );
      res.status(200).json(await messageUserData);
    };

    const conversationId = req.params.conversationId;

    if (conversationId === "new") {
      const checkConversation = await Conversations.find({
        members: {
          $all: [req.query.senderId, req.query.receiverId],
        },
      });
      if (checkConversation.length > 0) {
        checkMessages(checkConversation[0]._id);
      } else {
        return res.status(200).json([]);
      }
    } else {
      checkMessages(conversationId);
    }
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

export { conversation, conversationId, message, messageRead };
