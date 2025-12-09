//imports
const express=require("express");
const router=express.Router();
const{registerUser,loginUser}=require("../controllers/authController");

//route : POST /api/auth/register
//when someone goes here then run the registerUSer function

router.post("/register",registerUser);

//route: POST /api/auth/login
//wehen someonone goes here run the login function
router.post("/login",loginUser);

module.exports=router;