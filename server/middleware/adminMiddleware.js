
const newuser = require('../models/user'); // Make sure to require your user model here

const isAdminWithVerifiedDetails = async (req, res, next) => {
    try {
        // Assuming user data is stored in req.user or req.body.id, adjust as needed
        const user = await newuser.findById(req.body.id);

        // Check if the user is authenticated
        if (!user) {
            return res.status(401).json({ message: "Authentication required" });
        }

        // Check if the user is an admin
        if (!user.isAdmin) {
            return res.status(403).json({ message: "Access forbidden. You are not authorized for this action." });
        }

        // Check if the user is verified
        if (!user.verified) {
            return res.status(403).json({ message: "Access forbidden. Your account is not verified." });
        }

        // If the user is an admin with verified details, proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = isAdminWithVerifiedDetails;
