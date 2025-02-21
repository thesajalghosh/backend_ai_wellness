const mongoose = require("mongoose");
const Nominee = require("../models/nominee");

/**
 * Function to get all nominee list with respect to type
 * @param {*} req 
 * @param {*} res 
 */
async function getNomineeByType(req, res) {
    try {
        const { category_type } = req.params;
        // Validate category_type
        const validCategories = ["fitness", "clinics", "forward_thinker", "innovations"];
        if (!validCategories.includes(category_type)) {
            return res.status(400).json({ message: "Invalid category type" });
        }
        // Query the database and sort nominees by vote_count in descending order
        const nominees = await Nominee.find({ type: category_type }).sort({ vote_count: -1 });
        // Check if any nominees were found
        if (nominees.length === 0) {
            return res.status(404).json({ message: "No nominees found for the specified category type" });
        }
        // Return the sorted list of nominees
        res.status(200).json(nominees);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = {
    getNomineeByType,
    
};