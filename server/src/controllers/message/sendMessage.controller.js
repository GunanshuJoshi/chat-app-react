import cloudInary from "../../lib/cloudInary.lib.js";
import { Message } from "../../model/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    let imageUrl;

    if (image) {
      const response = await cloudInary.uploader.upload(image);
      if (!response.secure_url) {
        return res
          .status(404)
          .json({ message: "Failed to upload profile picture" });
      }
      imageUrl = response.secure_url;
    }

    const newMessage = new Message({
      senderId: senderId,
      receiverId: receiverId,
      text: text,
      image: imageUrl,
    });
    await newMessage.save();
    res
      .status(201)
      .send({ message: "Message Sent successfully", message: newMessage });
      
  } catch (error) {
    console.error("Error sending chat ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
