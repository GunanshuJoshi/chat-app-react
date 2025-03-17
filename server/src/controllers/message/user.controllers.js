import { User } from "../../model/index.js";

export const getUser = async (req, res) => {
  try {
    const user = await User.find({ _id: { $ne: req.user._id } }).select(
      "-password"
    );

    res.status(200).json({
      message: "List of users",
      userData: user,
    });
  } catch (error) {
    console.log("Error while updating the profile: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
