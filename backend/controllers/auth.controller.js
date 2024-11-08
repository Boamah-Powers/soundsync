import { User } from "../models/user.js";
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
	passport.authenticate("local", (err, user) => {
		if (err)
			{return res.status(500).json({ message: "Authentication error", error: err.message });}
		if (!user)
			{return res.status(401).json({ message: "Invalid credentials" });}

		// Create and send a JWT
		const age = "7d";
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
			expiresIn: age,
		});

		const userInfo = user.toObject();
    delete userInfo.salt;  
    delete userInfo.hash; 

		res
            .cookie("token", token, {
                httpOnly: true,
            })
			.status(200)
			.json({
				userInfo
			});
	})(req, res);
};

export const logout = (_, res) => {
    res
        .clearCookie("token")
        .status(200)
        .json({message: "Logout successful"});
};