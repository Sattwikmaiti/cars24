// authMiddleware.js

const user = require('../models/user'); // Make sure to require your user model here

const verifyUserRole = (requiredRole) => async (req, res, next) => {
    try {
        const dealer = await user.findById(req.body.dealerId);

        // Check if the user is authenticated
        if (!dealer) {
            return res.status(401).json({ message: "Authentication required" });
        }

        // Check if the user is verified
        if (!dealer.verified) {
            return res.status(403).json({ message: "Access forbidden. Your account is not verified." });
        }

        // Check if the user has the required role
        if (dealer.role !== requiredRole) {
            return res.status(403).json({ message: "Access forbidden. You are not authorized for this action." });
        }

        // If the user is authenticated, verified, and has the required role, proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = verifyUserRole;
