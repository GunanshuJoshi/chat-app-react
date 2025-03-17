import jwt from "jsonwebtoken";
const generateJWTToken = async (_id, res) => {
  const token = jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("chatAppJwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "dev",
  });
};
export default generateJWTToken;
