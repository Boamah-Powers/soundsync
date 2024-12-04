import { User } from "../models/user.js";
import { Snippet } from "../models/snippet.js";
import { Comment } from "../models/comment.js";
import { v2 as cloudinary } from 'cloudinary';

// cloudinary
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getSnippets = async (req, res) => {
	try {
		const searchTerm = req.query.searchTerm || "";
		const keywords = searchTerm.split(" ").filter(Boolean); // Split by spaces and remove empty strings

		// Step 1: Find users with matching usernames based on any keyword
		const matchingUsers = await User.find({
			$or: keywords.map((word) => ({
				username: { $regex: word, $options: "i" },
			})),
		});
		const matchingUserIds = matchingUsers.map((user) => user._id);

		// Step 2: Find snippets that match any keyword in description, tags, genre, or user
		const snippets = await Snippet.find({
			$or: [
				...keywords.map((word) => ({
					description: { $regex: word, $options: "i" },
				})),
				...keywords.map((word) => ({
					tags: { $regex: word, $options: "i" },
				})),
				...keywords.map((word) => ({
					genre: { $regex: word, $options: "i" },
				})),
				{ user: { $in: matchingUserIds } },
			],
		}).populate("user");

		res.status(200).json(snippets);
	} catch (error) {
		console.error("Error searching snippets:", error);
		res.status(500).json({ message: "Failed to get snippets!" });
	}
};

export const getSnippet = async (req, res) => {
	try {
		const snippetId = req.params.id;

		// Validate that an ID is provided
		if (!snippetId) {
			return res.status(400).json({ message: "Snippet ID is required." });
		}

		// Find the snippet by ID and populate the user and comments
		const snippet = await Snippet.findById(snippetId)
			.populate("user", "username profilePicture") // Populate user with selected fields
			.populate({
				path: "comments",
				populate: { path: "user", select: "username profilePicture" }, // Populate user inside comments
			});

		// If the snippet is not found, return an error
		if (!snippet) {
			return res.status(404).json({ message: "Snippet not found." });
		}

		// Send the snippet back to the client
		return res.status(200).json(snippet);
	} catch (error) {
		console.error("Error fetching snippet:", error);
		return res
			.status(500)
			.json({ message: "Server error", error: error.message });
	}
};

export const createSnippet = async (req, res) => {
	try {
		if (!req.body) {
			return res.status(400).json({ message: "Invalid request" });
		}

		const { audioUrl, description, tags, genre, public_id: publicId } = req.body;
		const userId = req.user;

		// Validate input
		if (!audioUrl || !description || !tags || !genre || !publicId) {
			return res
				.status(400)
				.json({ message: "All fields are required." });
		}

		// Check if user exists
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ message: "User not found." });
		}

		// Create new snippet
		const snippet = new Snippet({
			user: userId,
			audioUrl,
			description,
			tags,
			genre,
			publicId,
		});

		// Save the snippet
		const savedSnippet = await snippet.save();

		// Add the snippet reference to the user's snippets array
		user.snippets.push(savedSnippet._id);
		await user.save();

		// Respond with the created snippet
		res.status(201).json({
			message: "Snippet created successfully",
			snippet: savedSnippet,
		});
	} catch (error) {
		console.error("Error creating snippet:", error);
		res.status(500).json({ message: "Server error", error });
	}
};

export const updateSnippet = async () => {};

export const deleteSnippet = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: "Snippet ID is required" });
    }

    // Find the snippet by ID
    const snippet = await Snippet.findById(id);

    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }

    // Remove the snippet ID from the user's snippets field
    await User.findByIdAndUpdate(snippet.user, {
      $pull: { snippets: id },
    });

    // Delete the snippet file from Cloudinary
    await cloudinary.uploader.destroy(snippet.public_id, {
      resource_type: "video",
    });

    // Delete all comments associated with the snippet
    await Comment.deleteMany({ snippet: id });

    // Delete the snippet
    await Snippet.findByIdAndDelete(id);

    res.status(200).json({ message: "Snippet and associated comments deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};