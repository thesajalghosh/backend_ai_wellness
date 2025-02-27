const mongoose = require("mongoose");
const Nominee = require("../models/nominee");
const Vote = require("../models/vote");

/**
 * Function to get nominees by category, with optional search by name
 * @param {*} req 
 * @param {*} res 
 */
async function getNomineeByType(req, res) {
    try {
        const { category_type } = req.params;
        const { name } = req.query; // Extract name from query parameter

        // Validate category type
        const validCategories = ["fitness", "clinics", "forward_thinker", "innovations","original_geniuses"];
        if (!validCategories.includes(category_type)) {
            return res.status(400).json({ message: "Invalid category type" });
        }
        // Build query object
        let query = { type: category_type };
        // If a name is provided, perform a case-insensitive search
        if (name && name.trim() !== "") {
            query.name = { $regex: name, $options: "i" }; // Partial match, case-insensitive
        }
        // Fetch matching nominees sorted by vote_count (highest first)
        const nominees = await Nominee.find(query).sort({ vote_count: -1 });
        // Check if nominees exist
        if (nominees.length === 0) {
            return res.status(404).json({ message: "No nominees found" });
        }
        // Return the nominees
        res.status(200).json(nominees);
    } catch (error) {
        console.error("Error fetching nominees:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

/**
 * Function to get all the voter listing of a particular nominee
 * @param {*} req 
 * @param {*} res 
 */
async function getAllVoterList(req, res) {
    try {
        const { category_type , nominee_name} = req.params; // Get type and name from query parameters
        // const { nominee_name } = req.query; // Get type and name from query parameters
        // Validate required fields
        if (!category_type || !nominee_name) {
            return res.status(400).json({ message: "Type and Name are required" });
        }
        // Fetch voters based on type and nominee name
        const voters = await Vote.find({ category_type: category_type, vote_to: nominee_name });
        // Check if voters exist
        if (voters.length === 0) {
            return res.status(404).json({ message: "No voters found for this nominee" });
        }
        // Return the voter list
        res.status(200).json(voters);
    } catch (error) {
        console.error("Error fetching voter list:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

/**
 * Function to get the user voting details from the vote model 
 * based on category_type, nominee_name, and user_name from query parameters
 * @param {*} req 
 * @param {*} res 
 */
async function getUserVotingData(req, res) {
    try {
        const { category_type, nominee_name } = req.params;
        const { user_name } = req.query; // Extract user_name from query params
        // Validate required parameters
        if (!category_type || !nominee_name || !user_name) {
            return res.status(400).json({ error: "category_type, nominee_name, and user_name are required" });
        }
        // Find the vote record based on provided criteria
        const vote = await Vote.findOne({
            category_type: category_type,
            vote_to: nominee_name,
            user_name: user_name
        });        
        // Check if the vote record exists
        if (!vote) {
            return res.status(404).json({ message: "No voting data found for the specified criteria" });
        }
        res.status(200).json(vote);
    } catch (error) {
        console.error("Error fetching user voting data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    getNomineeByType,
    getAllVoterList,
    getUserVotingData
};