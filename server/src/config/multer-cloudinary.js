import multer from "multer";
import cloudinaryV2 from "cloudinary";
// Explanation: This is a multer storage engine for storing files on cloudinary.
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
dotenv.config();
// Explanation: This is a cloud service that offers a solution to a web application's entire image management pipeline.
const cloudinary = cloudinaryV2.v2;
// The cloudinary.config() method is used to configure the cloudinary instance.
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Explanation: This is a multer storage engine for storing files on cloudinary.
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "SocialAppMERN",
    format: async (req, file) => {
      //      console.log('The file inside multer: ', file)
      console.log(req, file);
      let extension = "";
      if (file.mimetype.includes("image")) extension = file.mimetype.slice(6);
      return extension;
    },
    public_id: (req, file) =>
      `${req.user}-${
        file.originalname === "coverImage"
          ? "coverImage"
          : file.originalname === "profileImage"
          ? "profileImage"
          : `postImage${file.size + file.originalname}`
      }`,
  },
});
export default multer({ storage });

// for uploading user images
