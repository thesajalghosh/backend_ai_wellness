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
            user_name: user_name.trim()
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

/**
 * Get the nominee details by name
 */
async function getNomineeDetailsByName(req,res){
    try{
        const {category_type, nominee_name} = req.params;
        // Validate required fields
        if (!category_type || !nominee_name) {
            return res.status(400).json({ message: "Type and Name are required" });
        }
        // Fetch nominee details based on type and nominee name
        const nominee = await Nominee.findOne({ type: category_type, name: nominee_name });
        // Check if nominee exists
        if (!nominee) {
            return res.status(404).json({ message: "No nominee found for this category" });
        }
        // Return the nominee details
        res.status(200).json(nominee);
    }catch(error){
        console.error("Error fetching nominee details by name:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

/**
 * Function to get the nominees by time basis
 * @param {String} category_type - category type
 * @param {String} filter_by_time - time filter ['last_one_hour','last_twelve_hour','last_twenty_four_hour','last_week']
 */
async function getNomineesByTimeBasis(req, res) {
    try {
        const { category_type, filter_by_time } = req.params;

        let filter = { type: category_type }; // Base filter with category

        // taking the current date
        const now = new Date();

        if (filter_by_time === "last_one_hour") {
            const oneHourAgo = new Date(now - 60 * 60 * 1000);
            filter.updatedAt = { $gte: oneHourAgo, $lte: now };
        } else if (filter_by_time === "last_twelve_hour") {
            const twelveHoursAgo = new Date(now - 12 * 60 * 60 * 1000);
            filter.updatedAt = { $gte: twelveHoursAgo, $lte: now };
        } else if (filter_by_time === "last_twenty_four_hour") {
            const twentyFourHoursAgo = new Date(now - 24 * 60 * 60 * 1000);
            filter.updatedAt = { $gte: twentyFourHoursAgo, $lte: now };
        } else if (filter_by_time === "last_week") {
            const oneWeekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
            filter.updatedAt = { $gte: oneWeekAgo, $lte: now };
        }
       
        // get the nominees based on the filter 
        const nominees = await Nominee.find(filter).sort({ vote_count: -1  });
        
        res.status(200).json(nominees);
    } catch (error) {
        console.error("Error fetching nominee details by time:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

/**
 * Get the all voters by time basis
 * @param {String} category_type - category type
 * @param {String} nominee_name - name of the nominee eho got the vote
 * @param {String} filter_by_time - time filter ['last_one_hour','last_twelve_hour','last_twenty_four_hour','last_week']
 */
async function getVoterListByTimeBasis(req, res) {
    try {
        const { category_type, filter_by_time , nominee_name} = req.params;

        let filter = { category_type: category_type, vote_to: nominee_name }; // Base filter with category

        // taking the current date
        const now = new Date();

        if (filter_by_time === "last_one_hour") {
            const oneHourAgo = new Date(now - 60 * 60 * 1000);
            filter.createdAt = { $gte: oneHourAgo, $lte: now };
        } else if (filter_by_time === "last_twelve_hour") {
            const twelveHoursAgo = new Date(now - 12 * 60 * 60 * 1000);
            filter.createdAt = { $gte: twelveHoursAgo, $lte: now };
        } else if (filter_by_time === "last_twenty_four_hour") {
            const twentyFourHoursAgo = new Date(now - 24 * 60 * 60 * 1000);
            filter.createdAt = { $gte: twentyFourHoursAgo, $lte: now };
        } else if (filter_by_time === "last_week") {
            const oneWeekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
            filter.createdAt = { $gte: oneWeekAgo, $lte: now };
        }
       
        // get the nominees based on the filter 
        const voters = await Vote.find(filter).sort({ vote_count: -1  });
        
        res.status(200).json(voters);
    } catch (error) {
        console.error("Error fetching voters detail by time:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = {
    getNomineeByType,
    getAllVoterList,
    getUserVotingData,
    getNomineeDetailsByName,
    getNomineesByTimeBasis,
    getVoterListByTimeBasis
};