import bcryptjs from "bcryptjs";
import crypto from "crypto";

import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import {
	sendPasswordResetEmail,
	sendResetSuccessEmail,
	sendVerificationEmail,
	sendWelcomeEmail,
} from "../mailtrap/emails.js";
import { User } from "../models/user.model.js";

/**
 * Handles user signup by creating a new user in the database.
 * Sends a verification email to the user.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const signup = async (req, res) => {
	const { email, password, name } = req.body;

	try {
		if (!email || !password || !name) {
			throw new Error("All fields are required");
		}

		// Check if user already exists
		const userAlreadyExists = await User.findOne({ email });
		console.log("userAlreadyExists", userAlreadyExists);

		if (userAlreadyExists) {
			return res.status(400).json({ success: false, message: "User already exists" });
		}

		// Hash password and generate verification token
		const hashedPassword = await bcryptjs.hash(password, 10);
		const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

		// Create new user
		const user = new User({
			email,
			password: hashedPassword,
			name,
			verificationToken,
			verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
		});

		await user.save();

		// Generate JWT and set cookie
		generateTokenAndSetCookie(res, user._id);

		// Send verification email
		await sendVerificationEmail(user.email, verificationToken);

		res.status(201).json({
			success: true,
			message: "User created successfully",
			user: {
				...user._doc,
				password: undefined, // Do not expose the password
			},
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

/**
 * Verifies the user's email using a verification code.
 * Updates the user status to verified.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const verifyEmail = async (req, res) => {
	const { code } = req.body;
	try {
		// Find user with the provided verification token
		const user = await User.findOne({
			verificationToken: code,
			verificationTokenExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
		}

		// Update user verification status
		user.isVerified = true;
		user.verificationToken = undefined;
		user.verificationTokenExpiresAt = undefined;
		await user.save();

		// Send welcome email
		await sendWelcomeEmail(user.email, user.name);

		res.status(200).json({
			success: true,
			message: "Email verified successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		console.log("error in verifyEmail ", error);
		res.status(500).json({ success: false, message: "Server error" });
	}
};

/**
 * Handles user login by validating credentials.
 * Sets a JWT token in a cookie for authentication.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		// Check if user exists
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}

		// Validate password
		const isPasswordValid = await bcryptjs.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}

		// Generate JWT and set cookie
		generateTokenAndSetCookie(res, user._id);

		// Update last login time
		user.lastLogin = new Date();
		await user.save();

		res.status(200).json({
			success: true,
			message: "Logged in successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		console.log("Error in login ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

/**
 * Logs out the user by clearing the authentication cookie.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const logout = async (req, res) => {
	res.clearCookie("token");
	res.status(200).json({ success: true, message: "Logged out successfully" });
};

/**
 * Sends a password reset email with a unique token.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const forgotPassword = async (req, res) => {
	const { email } = req.body;
	try {
		// Check if user exists
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		// Generate reset token and expiration time
		const resetToken = crypto.randomBytes(20).toString("hex");
		const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

		user.resetPasswordToken = resetToken;
		user.resetPasswordExpiresAt = resetTokenExpiresAt;

		await user.save();

		// Send password reset email
		await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

		res.status(200).json({ success: true, message: "Password reset link sent to your email" });
	} catch (error) {
		console.log("Error in forgotPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

/**
 * Resets the user's password using a reset token.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const resetPassword = async (req, res) => {
	try {
		const { token } = req.params;
		const { password } = req.body;

		// Find user by reset token and check token validity
		const user = await User.findOne({
			resetPasswordToken: token,
			resetPasswordExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
		}

		// Update user password
		const hashedPassword = await bcryptjs.hash(password, 10);

		user.password = hashedPassword;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpiresAt = undefined;
		await user.save();

		// Send reset success email
		await sendResetSuccessEmail(user.email);

		res.status(200).json({ success: true, message: "Password reset successful" });
	} catch (error) {
		console.log("Error in resetPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

/**
 * Checks the authentication status of the user.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const checkAuth = async (req, res) => {
	try {
		// Find user by ID and exclude the password field
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};
