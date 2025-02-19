const mongoose = require("mongoose");
const validator = require("validator");

const voteSchema = new mongoose.Schema({
    category_type: {
        type: String,
        required: true
    },
    vote_to: {
        type: String,
        required: true,
    },
    user_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true, // Converts to lowercase before saving
        validate: {
            validator: validator.isEmail,
            message: "Please enter a valid email address"
        }
    },    
    phone_no: {
        type: String,
        required: true
    },
    rating_1: {
        type: Number, // Changed to Number for ratings between 1 to 10
        required: true,
        min: 1,
        max: 10
    },
    rating_2: {
        type: Number, // Changed to Number for ratings between 1 to 10
        required: true,
        min: 1,
        max: 10
    },
    rating_3: {
        type: Number, // Changed to Number for ratings between 1 to 10
        required: true,
        min: 1,
        max: 10
    },
    rating_4: {
        type: Number, // Changed to Number for ratings between 1 to 10
        required: true,
        min: 1,
        max: 10
    },
    nominee_reason: {
        type: [Number], // Changed to an array of numbers
        required: true
    },
    rec_nominee: {
        type: [Number], // Changed to an array of numbers
        required: true
    },
    justification: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Vote = mongoose.model("Vote", voteSchema);

module.exports = Vote;