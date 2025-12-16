//1 import multer
const multer=require("multer");

//2 import the storage object we just created in cloudinary.js
const {cloudinary,storage}=require("./cloudinary");

//3 initialize multer with cloudinary storage
const upload=multer({storage:storage,
    limits:{fileSize:5*1024*1024},
});


//expot it 
module.exports=upload;