import { Conversation } from "../modules/conversationModal.js";
import { Message } from "../modules/messageModal.js";
export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const { message } = req.body;

    if (!senderId) {
      return res.status(400).json({ message: "Please login first" });
    }
    if (!receiverId) {
      return res.status(400).json({ message: "Please send Receivers Id" });
    }
    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    console.log(!gotConversation, "messages23333");

    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    console.log(newMessage, "newMessage");

    if (newMessage) {
      gotConversation.messages.push(newMessage._id);
    }

    await gotConversation.save();

    return res.status(201).json({ message: "Message send successfully" });
  } catch (error) {
    console.log(error, "error");
  }
};

export const getMessage = async (req, res) => {
  try {
    const recieverId = req.params.id;
    const senderId = req.id;
    const coversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] },
    }).populate({
      path: "messages",
      // Or remove this if you're excluding fields
    });
    console.log(coversation, "conversation");
  } catch (error) {
    console.log(error, "error");
  }
};
