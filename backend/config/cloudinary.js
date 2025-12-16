const cloudinary=require("cloudinary").v2;  //import cloudinary

//we need to extract the specific tool{CloudinaryStorage} from the package multer-storage-cloudinary
const {CloudinaryStorage}=require("multer-storage-cloudinary"); //import multer storage cloudinary

//logs 
console.log("CLoudinary Library Loaded:", typeof cloudinary);
console.log("Storage Library Loaded:", typeof CloudinaryStorage);



//configure the main cloudinary instance
cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET  
});

//the storage enigne 
const storage= new CloudinaryStorage({
    cloudinary:cloudinary, //the main cloudinary instance
    params:{
        folder:"resq_donations", //the folder in cloudinary where the images will be stored under folder name resq_donations
        allowed_formats:["jpg","png","jpeg"],
    },
});

//export it
module.exports={cloudinary,storage};