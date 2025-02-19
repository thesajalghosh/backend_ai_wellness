const Joi = require("joi");

const voteSchema = Joi.object({
    category_type: Joi.string()
        .valid("forward_thinker", "fitness", "clinics", "innovations")
        .required()
        .messages({
            "any.only": "Category type must be one of: forward_thinker, fitness, clinics, or innovations",
            "any.required": "Category type is required",
        }),
    vote_to: Joi.string()
        .min(2)
        .max(100)
        .required()
        .messages({
            "string.min": "Vote to must be at least 2 characters",
            "string.max": "Vote to cannot exceed 100 characters",
            "any.required": "Vote to is required",
        }),
    user_name: Joi.string()
        .min(2)
        .max(50)
        .required()
        .messages({
            "string.min": "User name must be at least 2 characters",
            "string.max": "User name cannot exceed 50 characters",
            "any.required": "User name is required",
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.email": "Invalid email format",
            "any.required": "Email is required",
        }),
    phone_no: Joi.string()
        .pattern(/^\d{10}$/)
        .required()
        .messages({
            "string.pattern.base": "Phone number must be exactly 10 digits",
            "any.required": "Phone number is required",
        }),
    rating_1: Joi.number()
        .min(1)
        .max(10)
        .required()
        .messages({
            "number.min": "Rating 1 must be at least 1",
            "number.max": "Rating 1 cannot exceed 10",
            "any.required": "Rating 1 is required",
        }),
    rating_2: Joi.number()
        .min(1)
        .max(10)
        .required()
        .messages({
            "number.min": "Rating 2 must be at least 1",
            "number.max": "Rating 2 cannot exceed 10",
            "any.required": "Rating 2 is required",
        }),
    rating_3: Joi.number()
        .min(1)
        .max(10)
        .required()
        .messages({
            "number.min": "Rating 3 must be at least 1",
            "number.max": "Rating 3 cannot exceed 10",
            "any.required": "Rating 3 is required",
        }),
    rating_4: Joi.number()
        .min(1)
        .max(10)
        .required()
        .messages({
            "number.min": "Rating 4 must be at least 1",
            "number.max": "Rating 4 cannot exceed 10",
            "any.required": "Rating 4 is required",
        }),
    nominee_reason: Joi.array()
        .items(Joi.number().valid(1, 2, 3, 4, 5,6,7))
        .min(1)
        .required()
        .messages({
            "array.min": "At least one nominee reason is required",
            "any.required": "Nominee reason is required",
        }),
    rec_nominee: Joi.array()
        .items(Joi.number().valid(1, 2, 3, 4, 5,6,7,8,9,10,11))
        .min(1)
        .required()
        .messages({
            "array.min": "At least one recommended nominee is required",
            "any.required": "Recommended nominee is required",
        }),
    justification: Joi.string()
        .min(5)
        .max(500)
        .required()
        .messages({
            "string.min": "Justification must be at least 5 characters",
            "string.max": "Justification cannot exceed 500 characters",
            "any.required": "Justification is required",
        }),
}).options({ allowUnknown: false }) // Rejects extra fields
.messages({
    "object.unknown": "Unknown field is not allowed",
});

module.exports = voteSchema;
