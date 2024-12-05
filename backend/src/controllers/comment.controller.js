import { Comment } from "../models/comment.js";
import { Snippet } from "../models/snippet.js";

export const createComment = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const { text, snippetId } = req.body;
    const userId = req.user;

    // Validate input
    if (!text || !snippetId) {
      return res.status(400).json({ message: "Text and Snippet ID are required." });
    }

    // Check if the snippet exists
    const snippet = await Snippet.findById(snippetId);
    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found." });
    }

    // Create a new comment
    const newComment = new Comment({
      user: userId,
      snippet: snippetId,
      text,
    });

    // Save the comment to the database
    const savedComment = await newComment.save();

    // Optionally add the comment to the snippet's comments array
    snippet.comments = snippet.comments || [];
    snippet.comments.push(savedComment._id);
    await snippet.save();

    // Return the created comment
    res.status(201).json(savedComment);
  } catch (err) {
    console.error("Error creating comment:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
