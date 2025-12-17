const express = require("express");
const router = express.Router();
const { 
    createDonation, 
    getDonations, 
    getDonationById, 
    claimDonation, 
    getMyDonations, 
    deleteDonation 
} = require("../controllers/donationController");

const { protect } = require("../middleware/authMiddleware");
const upload = require("../config/upload");

// --- CREATE DONATION (With Error Handling) ---
router.post("/", protect, (req, res, next) => {
    upload.single("image")(req, res, (err) => {
        if (err) {
            // This catches Multer errors (File too large, wrong type)
            return res.status(400).json({ message: err.message });
        }
        // If no error, continue to the controller
        next();
    });
}, createDonation);

router.get("/", getDonations);
router.get("/my-donations", protect, getMyDonations);
router.delete("/:id", protect, deleteDonation); 
router.get("/:id", getDonationById);
router.put("/:id/claim", protect, claimDonation);

module.exports = router;