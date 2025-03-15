const validateRequest = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    // Overwrite req.body with the validated and trimmed data
    req.body = value;
    next();
};

module.exports = validateRequest;
