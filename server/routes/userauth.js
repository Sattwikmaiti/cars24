const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/user");

const JWT_SEC = "secret";

const router = express.Router();

// Function to send verification email
const sendVerificationEmail = async (email, verificationToken) => {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "maitisattwik@gmail.com",
            pass: "asiepkljrnykrrhw",
        },
    });

    // Compose email message
    const mailOptions = {
        from: "no-reply@gmail.com",
        to: email,
        subject: "Email Verification",
        text: `Please click the following link to verify your email: http://localhost:8000/api/auth/verify/${verificationToken}`,
    };

    // Send the email
    try {
        await transporter.sendMail(mailOptions);
        console.log("Verification email sent successfully");
    } catch (error) {
        console.error("Error sending verification email:", error);
    }
};

// Register a new user
router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("Email already registered:", email); // Debugging statement
            return res.status(400).json({ message: "Email already registered" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            email: req.body.email,
            password: hashedPass,
        });

        // Save the user to the database
        await newUser.save();

        // Debugging statement to verify data
        console.log("New User Registered:", newUser);

        // Send verification email to the user
        const accessToken = jwt.sign({ id: newUser._id }, JWT_SEC, { expiresIn: "3d" });
        sendVerificationEmail(newUser.email, accessToken);

        res.status(201).json({
            message: "Registration successful. Please check your email for verification.",
        });
    } catch (error) {
        console.log("Error during registration:", error); // Debugging statement
        res.status(500).json({ message: "Registration failed" });
    }
});

// Verify email
router.get("/verify/:token", async (req, res) => {
    try {
        const token = req.params.token;
        const { id } = jwt.verify(token, JWT_SEC);

        // Find the user by ID
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Mark the user as verified
        user.verified = true;

        // Save the updated user
        await user.save();

        res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        res.status(500).json({ message: "Email Verification Failed" });
    }
});

// User login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Validate password
        const validated = await bcrypt.compare(password, user.password);
        if (!validated) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const accessToken = jwt.sign({ id: user._id }, JWT_SEC, { expiresIn: "3d" });
        res.status(200).json({ message: "Login successful", accessToken});
    } catch (error) {
        res.status(500).json({ message: "Login Failed" });
    }
});

// User logout (invalidate token)
router.post("/logout", async (req, res) => {
    // Extract the token from the request headers or body
    const token = req.body.token;

    // Check if the token is provided
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        //remove token from frontend

        res.status(200).json({ message: "Logout Successful" });
    } catch (error) {
        // Handle any errors
        console.error("Error during logout:", error);
        res.status(500).json({ message: "Logout Failed" });
    }
});

module.exports = router;
