const mongoose = require("mongoose");
// const geocoder = require("../utils/geocoder"); // Geocoder commented out for now

const DonationSchema = new mongoose.Schema({
    donor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: [true, "Please add a title"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please add a description"]
    },
    quantity: {
        type: String,
        required: [true, "Please add quantity"]
    },
    image: {
        type: String,
        default: "no-photo.jpg"
    },
    status: {
        type: String,
        enum: ["available", "claimed", "picked_up"],
        default: "available"
    },
    address: {
        type: String,
        required: [true, "Please add an address"]
    },
    location: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point"
        },
        coordinates: {
            type: [Number],
            index: "2dsphere",
            default: [0, 0]
        },
        formattedAddress: String
    },
    expiresAt: {
        type: Date,
        required: [true, "Please add expiration date"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// --- THE FIX ---
// 1. Remove 'next' from the parenthesis: async function()
DonationSchema.pre("save", async function() {
    console.log("✅ BYPASSING MAPS - SAVING DIRECTLY");
    
    // Create a dummy location so MongoDB is happy
    if (!this.location.formattedAddress) {
        this.location = {
            type: "Point",
            coordinates: [0, 0], 
            formattedAddress: this.address 
        };
    }
    
    // 2. DO NOT CALL next() here. 
    // Mongoose knows it's done when the function finishes.
});

module.exports = mongoose.model("Donation", DonationSchema);