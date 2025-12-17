// imports
const express = require("express");
const router = express.Router();
// FIX 1: Import googleAuthCallback here
const { registerUser, loginUser, verifyUser, googleAuthCallback } = require("../controllers/authController");
const passport = require("passport"); // import passport
const { generateToken } = require("../controllers/authController"); 

// route : POST /api/auth/register
// when someone goes here then run the registerUser function
router.post("/register", registerUser);

// route: POST /api/auth/login
// when someone goes here run the login function
router.post("/login", loginUser);

// add the verify route
// the :token part tell express: whatever comes after /verify/ is a variable
router.get("/verify/:token", verifyUser);

// 1 send user to google for authentication
// we ask for profile and email permissions
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// 2 User comes back from google
// passport middleware handles the check
// if it fails, we redirect to login failure so we go back to login
// if success, we manually generate a JWT token

// FIX 2: We removed the long (req, res) function here.
// Instead, we just put 'googleAuthCallback' which handles the redirect.
router.get("/google/callback", 
    passport.authenticate("google", { failureRedirect: "/login", session: false }),
    googleAuthCallback
);

module.exports = router;