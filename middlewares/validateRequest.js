const Joi = require("joi");

const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false }); // Validate the request body
        if (error) {
            return res.status(400).json({ message: error.details.map(err => err.message) });
        }
        next(); // Proceed to the next middleware/controller if validation passes
    };
};

module.exports = validateRequest;
