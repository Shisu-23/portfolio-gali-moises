import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const uploadImage = async (file) => {
  try {
    if (!file) throw new Error("No file provided");

    const result = await cloudinary.uploader.upload(file.path, {
      folder: "uploads",
      resource_type: "auto",
    });

    return result;
  } catch (error) {
    throw error;
  }
};
