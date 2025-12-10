//imports
const express=require("express");
const router=express.Router();
const{registerUser,loginUser,verifyUser}=require("../controllers/authController");

//route : POST /api/auth/register
//when someone goes here then run the registerUSer function

router.post("/register",registerUser);

//route: POST /api/auth/login
//wehen someonone goes here run the login function
router.post("/login",loginUser);

//add the cerify route
//the :token part tell exprss: whatever comes after /verify/is a varaible"
router.get("/verify/:token",verifyUser);


module.exports=router;