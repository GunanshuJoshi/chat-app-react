import bcrypt from "bcryptjs";
import generateJWTToken from "../../utils/jwtToken.utils.js";
import { User } from "../../model/index.js";

export const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      res.status(400).json({ message: "All fields must be correct." });
      return;
    }
    if (password.length < 8) {
      res.status(400).json({ message: "Please use a password of length 8." });
      return;
    }
    const user = await User.findOne({ email: email });
    if (user) {
      res.status(400).json({ message: "User already exists. Try login" });
      return;
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const createUser = new User({
      name: name,
      email,
      email,
      password: hashPassword,
    });

    if (createUser) {
      generateJWTToken(createUser._id, res);
      await createUser.save();
      res.status(201).json({
        message: "User created successfully!!!",
        user: {
          _id: createUser._id,
          name: createUser.name,
          email: createUser.email,
          dp: createUser.dp,
          createdAt: createUser.createdAt,
          updatedAt: createUser.updatedAt,
        },
      });
    } else {
      res.status(400).json({ message: "Invalid User data" });
    }
  } catch (error) {
    console.log("Error in sign up function: ", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
