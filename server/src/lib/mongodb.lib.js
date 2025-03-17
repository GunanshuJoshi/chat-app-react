import mongoose from "mongoose";

export const mongoDB = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGODB_URL);
    console.log(
      "MongoDB connected connected successfullly!!!",
      res.connection.host
    );
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};
