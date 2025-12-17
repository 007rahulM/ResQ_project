const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendemail");

// --- Helper: Generate JWT Token ---
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

// --- 1. Register User (Send Email) ---
// POST /api/auth/register
const registerUser = async (req, res) => {
    try {
        const { username, email, password, role, phone, address } = req.body;

        // Validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please fill in all required fields" });
        }

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Generate Verification Token (Random hex string)
        const verifyToken = crypto.randomBytes(20).toString('hex');

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create User (isVerified defaults to false in model)
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            role,
            phone,
            address,
            verificationToken: verifyToken
        });

        // Create Verification URL
        const verifyUrl = `http://localhost:5000/api/auth/verify/${verifyToken}`;

        const message = `
            <h1>Welcome to ResQ!</h1>
            <p>Please click the link below to verify your email address and unlock your account:</p>
            <a href="${verifyUrl}" clicktracking=off>${verifyUrl}</a>
        `;

        // Send Email
        try {
            await sendEmail(user.email, "ResQ - Verify Your Email", message);
            console.log("Verification email sent to:", user.email);
        } catch (err) {
            console.log("Email failed to send:", err);
        }

        // Send Response
        res.status(201).json({
            message: "Registration Successful! Please check your email to verify your account.",
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

// --- 2. Verify User (The Link Click) ---
// GET /api/auth/verify/:token
const verifyUser = async (req, res) => {
    try {
        const { token } = req.params;

        // Find user with this specific verification token
        const user = await User.findOne({ verificationToken: token });

        if (!user) {
            return res.status(400).json({ message: "Invalid or Expired Token" });
        }

        // Verify them
        user.isVerified = true;
        user.verificationToken = undefined; // Clear the token
        await user.save();

        // Redirect user to the Frontend Login page
        res.redirect('http://localhost:5173/login?verified=true');

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

// --- 3. Login User ---
// POST /api/auth/login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check user exists
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Check Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Check verification
        if (!user.isVerified) {
            return res.status(401).json({ message: "Please verify your email first!" });
        }

        // Success: Send Token
        res.status(200).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            token: generateToken(user.id)
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

// --- 4. Google Auth Callback ---
// GET /api/auth/google/callback
const googleAuthCallback = (req, res) => {
    const token = generateToken(req.user.id);
    // ⚠️ CRITICAL: Redirects back to React with the token
    res.redirect(`http://localhost:5173?token=${token}`);
};

module.exports = { 
    registerUser, 
    loginUser, 
    verifyUser, 
    googleAuthCallback, 
    generateToken 
};