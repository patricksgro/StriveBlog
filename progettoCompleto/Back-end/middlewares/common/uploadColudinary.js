import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storageCloudinary = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'epicodeTest',
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_APY_KEY,
        api_secret: process.env.CLOUDINARY_APY_SECRET
    }
})

const uploadCloudinary = multer({ storage: storageCloudinary }) //volendo si puo configuarare anche il disco C come spazio per i file

export default uploadCloudinary