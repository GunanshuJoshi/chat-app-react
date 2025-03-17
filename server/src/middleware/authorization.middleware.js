import jwt from "jsonwebtoken";
import { User } from "../model/index.js";
export const authorizationChecker = async (req, res, next) => {
  try {
    const token = req.cookies?.chatAppJwt;
    if (!token) {
      return res
        .status(401)
        .send("Unauthorized, Please login to perform this actions.");
    }
    const response = jwt.verify(token, process.env.JWT_SECRET);
    if (!response) {
      return res
        .status(403)
        .json({ message: "Not authorized to perform this action." });
    }
    const user = await User.findOne({ _id: response._id }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error while checking the authorization of token ", error);
    res.send(500).json({ message: "Internal Server Error" });
  }
};
