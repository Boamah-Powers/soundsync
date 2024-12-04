import { User } from "../models/user.js";

export const updateUser = async (req, res) => {
  try {
    const userId = req.user;
    const { profilePicture, instruments, genres } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!profilePicture && !instruments && !genres) {
      return res.status(400).json({ message: "No fields to update provided" });
    }

    const updateData = {};
    if (profilePicture) {updateData.profilePicture = profilePicture;}
    if (instruments) {updateData.instruments = instruments;}
    if (genres) {updateData.genres = genres;}

    // Update the user in the database
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true, 
      runValidators: true,
    }).populate([
      { path: "snippets"},
      {
        path: "collaborations",
        populate: [
          { path: "requester", select: "username" }, // Populate requester with only username
          { path: "recipient", select: "username" }, // Populate recipient with only username
          { path: "snippet", select: "audioUrl" }, // Populate snippet with only audioUrl
        ],
      },
    ]);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const userObject = updatedUser.toObject();
    delete userObject.salt;
    delete userObject.hash;

    res.status(200).json({
      message: "User updated successfully",
      user: userObject,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};
