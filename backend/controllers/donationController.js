const Donation = require("../models/Donation"); 

// --- 1. CREATE DONATION ---
// POST /api/donations
const createDonation = async (req, res) => {
    try {
        // Check if file exists
        if (!req.file) {
            return res.status(400).json({ message: "Please upload a food image" });
        }

        const { title, description, quantity, address, expiresAt } = req.body;

        // Validation
        if (!title || !description || !quantity || !address || !expiresAt) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // --- WINDOWS PATH FIX ---
        // Windows saves paths like "uploads\image.jpg". We need "uploads/image.jpg"
        const imagePath = req.file.path.replace(/\\/g, "/");

        const donation = await Donation.create({
            donor: req.user._id, // Use _id for safety
            title,
            description,
            address,
            quantity,
            expiresAt,
            image: imagePath // Save the fixed path
        });

        res.status(201).json(donation);

    } catch (err) {
        console.error("❌ Create Donation Error:", err.message);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

// --- 2. GET ALL DONATIONS (Filtered) ---
// GET /api/donations
const getDonations = async (req, res) => {
    try {
        let query;
        const { lat, lng, radius } = req.query;

        // --- FILTER LOGIC ---
        // 1. Status must be "available"
        // 2. Expiry Date must be GREATER THAN ($gt) Now (Future)
        let filter = { 
            status: "available",
            expiresAt: { $gt: new Date() } 
        };

        // If Geo-Location is provided
        if (lat && lng) {
            const latNum = parseFloat(lat);
            const lngNum = parseFloat(lng);
            const radNum = parseFloat(radius) || 10;
            const radiusInRadians = radNum / 6378;

            query = Donation.find({
                ...filter, // Keep the status & date filter!
                location: {
                    $geoWithin: {
                        $centerSphere: [[lngNum, latNum], radiusInRadians]
                    }
                }
            });
        } else {
            // Normal search
            query = Donation.find(filter).sort({ createdAt: -1 });
        }

        const donations = await query.populate("donor", "username phone");

        res.status(200).json({
            count: donations.length,
            data: donations
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

// --- 3. GET SINGLE DONATION ---
// GET /api/donations/:id
const getDonationById = async (req, res) => {
    try {
        const donation = await Donation.findById(req.params.id).populate("donor", "username phone email");

        if (!donation) {
            return res.status(404).json({ message: "Donation not found" });
        }

        res.status(200).json(donation);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

// --- 4. CLAIM DONATION ---
// PUT /api/donations/:id/claim
const claimDonation = async (req, res) => {
    try {
        const donation = await Donation.findById(req.params.id);

        if (!donation) {
            return res.status(404).json({ message: "Donation not found" });
        }

        if (donation.status !== "available") {
            return res.status(400).json({ message: "This donation is already claimed!" });
        }

        donation.status = "claimed";
        await donation.save();

        res.status(200).json({ message: "Donation claimed successfully!", donation });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

// --- 5. GET MY DONATIONS ---
// GET /api/donations/my-donations
const getMyDonations = async (req, res) => {
    try {
        const donations = await Donation.find({ donor: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(donations);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

// --- 6. DELETE DONATION ---
// DELETE /api/donations/:id
const deleteDonation = async (req, res) => {
    try {
        const donation = await Donation.findById(req.params.id);

        if (!donation) {
            return res.status(404).json({ message: "Donation not found" });
        }

        if (donation.donor.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized to delete this" });
        }

        await donation.deleteOne(); 
        res.status(200).json({ message: "Donation removed" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { 
    createDonation, 
    getDonations, 
    getDonationById, 
    claimDonation,
    getMyDonations, 
    deleteDonation 
};