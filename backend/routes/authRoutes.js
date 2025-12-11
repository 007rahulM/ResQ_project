//imports
const express=require("express");
const router=express.Router();
const{registerUser,loginUser,verifyUser}=require("../controllers/authController");
const passport=require("passport"); //import passprt
const{generateToken}=require("../controllers/authController"); //
//route : POST /api/auth/register
//when someone goes here then run the registerUSer function

router.post("/register",registerUser);

//route: POST /api/auth/login
//wehen someonone goes here run the login function
router.post("/login",loginUser);

//add the cerify route
//the :token part tell exprss: whatever comes after /verify/is a varaible"
router.get("/verify/:token",verifyUser);

// 1 send user to google for authentication
//we ask for profile and email permissions
router.get("/google",passport.authenticate("google",{scope:["profile","email"]}));

//2 User comes back from google
//passport middleware handles the check
//if it fails , we redirect to login failure so we go back to login
//if success, we manually genearate a JWT token

router.get("/google/callback", passport.authenticate("google",{failureRedirect:"/login",session:false}),
(req,res)=>{
    //this runs only if login succeeded
    //req.user contains the user data from the database

    //we create a wristabant JWT for them
    const token=require("../controllers/authController").generateToken(req.user.id);

    //temporary:send token to browser
    //in real frontend ,we would redirect to : http://localhost:5173?token=...
    res.json({
        message:"Google Login Successful!",
        token:token,
        user:req.user
    });
}
),






module.exports=router;