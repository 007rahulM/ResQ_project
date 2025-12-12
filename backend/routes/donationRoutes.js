
const express=require("express");
const router=express.Router();
const {createDonation}=require("../controllers/donationController"); //import the controller function
const {protect}=require("../middleware/authMiddleware"); //import the auth middleware the bouncer
const upload=require("../config/upload"); //the machine multer 

//POST /api/donations
//chain of commandas:
//1 protect check if user is logged in if yes add teh user info in teh thhe conlole then move to 
//2 uploads.single("image") it porcess the file upload field name must be image if success move to
//then 3 createDonation in controller and dave data to db

router.post("/",protect,upload.single("image"),createDonation);

module.exports=router;
