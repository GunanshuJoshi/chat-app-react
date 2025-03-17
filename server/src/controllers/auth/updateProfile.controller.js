import { User } from "../../model/index.js";
import cloudInary from "../../lib/cloudInary.lib.js";
export const updateProfile = async (req, res) => {
  try {
    const user = req.user;
    const { dp } = req.body;
    if (!dp) {
      return res.status(400).json({ message: "Profile Picture not provided" });
    }
    const response = await cloudInary.uploader.upload(dp);
    if (!response.secure_url) {
      return res
        .status(404)
        .json({ message: "Failed to upload profile picture" });
    }
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { dp: response.secure_url },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Profile Updated successfully!!!", user: updatedUser });
  } catch (error) {
    console.log("Error while updating the profile: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
