import mongoose from "mongoose";
import { Message } from "../../model/index.js";

export const getChats = async (req, res) => {
  try {
    const { id: secondUserId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(secondUserId)) {
      return res.status(400).json({ message: "Invalid user ID." });
    }

    const currentUserId = req.user._id;
    const messageData = await Message.find({
      $or: [
        { senderId: secondUserId, receiverId: currentUserId },
        { senderId: currentUserId, receiverId: secondUserId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json({
      message: "List of all the chats",
      messageData,
    });
  } catch (error) {
    console.error("Error fetching chats:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
