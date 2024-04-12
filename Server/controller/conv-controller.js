import Conversations from "../models/conversation-model.js";
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

export { conversation, conversationId };
