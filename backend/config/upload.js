
const multer=require("multer");
const path=require("path");

// 1 storage engine //this defines where and how the files will be stored and saved
const storage=multer.diskStorage({
    //destination is where the file will be stored or the file go
    destination:function(req,file,cb){
        //cb  means callback fucntion like "error ,success path"
        //null means  NO Error , "uploads/" is the folder path where file will be stored
        cb(null,"uploads/");

    },
    //filename is the name of the file how the file will be saved
    //what do we call the file?
    filename:function(req,file,cb){
        //problem is if user a uploads food.jpg and user B uploads food.jpg thenthe first one gets deleted
        //solution  add a timestamp to the name
        //food.jsp becomes food-1549334-343.jpg like that so it doenot get merger or get deleted

     const uniqueSuffix=Date.now() + "-" + Math.round(Math.random()*1E9);  //this is to make the name uniew the formaul is date.now() is current time and math.random is random number and 1E9 means 10^9
     //file.fieldname is image (the key we send from frontend)
     //path.extran gets ".jpg or .png"
     cb(null,file.filename + '-' + uniqueSuffix + path.extname(file.originalname)); //file.originalname is the original name of the file
    }
});
     

 // 2 filter securty purpose
 //here we dont want users uploading  .exe viruses or PDF documents
 //we only accept images format like .jpg .png .jpeg

 const fileFilter=(req,file,cb)=>{
    if(file.mimetype.startsWith("image/")){
        cb(null,true); //accept the file

    }else{
        cb(new Error("Not an image Please upload only image"),false); //reject the file 
    }
 };

 // 3 initialize multer with storage engine and file filter

 const upload=multer({
    storage:storage,
    fileFilter:fileFilter,
    limits:{
        fileSize:1024*1024*5  //limit of file sixe to 5MB
    }

 });

 module.exports=upload;