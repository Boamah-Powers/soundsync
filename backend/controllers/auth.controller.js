import { User } from "../models/user.js";
import { Collaboration } from "../models/collaboration.js"
import passport from "passport";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
	const { username, email, password, instruments, genres, profilePicture } =
		req.body;

	if (!username || !email || !password) {
		return res
			.status(400)
			.json({ message: "Please fill in all required fields" });
	}

	try {
		const newUser = new User({
			username,
			email,
			instruments: instruments || [],
			genres: genres || [],
			profilePicture: profilePicture || "",
		});

		User.register(newUser, password, (err) => {
			if (err) {
				return res.status(400).json({
					message: "Registration failed",
					error: err.message,
				});
			}
			res.status(201).json({
				message: "User registered successfully",
			});
		});
	} catch (error) {
		res.status(500).json({ message: "Registration failed", error });
	}
};

export const login = async (req, res) => {
	passport.authenticate("local", async (err, user) => {
		if (err) {
			return res.status(500).json({ message: "Authentication error", error: err.message });
		}
		if (!user) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		try {
			// Populate user snippets and collaborations with specific fields
			await user.populate([
				{ path: "snippets"},
				{
					path: "collaborations",
					populate: [
						{ path: "requester", select: "username" }, // Populate requester with only username
						{ path: "recipient", select: "username" }, // Populate recipient with only username
						{ path: "snippet", select: "audioUrl" },   // Populate snippet with only audioUrl
					],
				},
			]);

			// Convert user to a plain object and remove sensitive fields
			const userInfo = user.toObject();
			delete userInfo.salt;
			delete userInfo.hash;

			// Create and send a JWT
			const age = "7d";
			const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: age });

			// Send response with populated user info and token
			res
				.cookie("token", token, { httpOnly: true })
				.status(200)
				.json({ userInfo });
		} catch (populateError) {
			return res.status(500).json({ message: "Error populating user information", error: populateError.message });
		}
	})(req, res);
};

export const logout = (_, res) => {
    res
        .clearCookie("token")
        .status(200)
        .json({message: "Logout successful"});
};