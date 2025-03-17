import { v2 as cloudInary } from "cloudinary";
import { config } from "dotenv";
config();
const cloudInaryConfig = {
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};

cloudInary.config(cloudInaryConfig);

export default cloudInary;
