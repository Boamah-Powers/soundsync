import { Collaboration } from "../models/collaboration.js";
import { User } from "../models/user.js";

export const createRequest = async (req, res) => {
  try {
    const { requesterId, recipientId, snippetId } = req.body;

    // Validate required fields
    if (!requesterId || !recipientId || !snippetId) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    // Create the collaboration request
    const newRequest = new Collaboration({
      requester: requesterId,
      recipient: recipientId,
      snippet: snippetId,
    });

    // Save to the database
    const savedRequest = await newRequest.save();

    // Update requester and recipient collaboration fields
    await User.findByIdAndUpdate(requesterId, {
      $push: { collaborations: savedRequest._id },
    });
    await User.findByIdAndUpdate(recipientId, {
      $push: { collaborations: savedRequest._id },
    });

    // Populate the collaboration request with the desired fields
    const populatedRequest = await Collaboration.findById(savedRequest._id)
      .populate("requester", "username") // Populate only the 'username' of the requester
      .populate("recipient", "username") // Populate only the 'username' of the recipient
      .populate("snippet", "audioUrl"); // Populate only the 'audioUrl' of the snippet

    res.status(201).json({
      message: "Collaboration request created successfully",
      collaboration: populatedRequest,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

export const getCollaborations = async (req, res) => {
  try {
    const userId = req.user;

    // Retrieve collaborations for the user
    const collaborations = await Collaboration.find({
      $or: [{ requester: userId }, { recipient: userId }],
    })
      .populate({
        path: "requester",
        select: "username", 
      })
      .populate({
        path: "recipient",
        select: "username email",
      })
      .populate({
        path: "snippet",
        select: "audioUrl",
      });

    // Process the result to conditionally include email only for "accepted" status
    const updatedCollaborations = collaborations.map((collab) => {
      const updatedCollab = collab.toObject();
      
      // Include `email` for `requester` and `recipient` only if status is "accepted"
      if (updatedCollab.status !== "accepted") {
        if (updatedCollab.recipient) delete updatedCollab.recipient.email;
      }

      return updatedCollab;
    });

    res.status(200).json({ collaborations: updatedCollaborations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { collaborationId, accepted } = req.body;

    if (!collaborationId || typeof accepted === "undefined") {
      return res.status(400).json({ message: "Collaboration ID and acceptance flag are required" });
    }

    const newStatus = accepted ? "accepted" : "declined";

    // Update the collaboration status
    const updatedCollaboration = await Collaboration.findByIdAndUpdate(
      collaborationId,
      { status: newStatus },
      { new: true }
    )
      .populate({ path: "requester", select: "username" })
      .populate({ path: "recipient", select: "username" })
      .populate({ path: "snippet", select: "audioUrl" });

    if (!updatedCollaboration) {
      return res.status(404).json({ message: "Collaboration not found" });
    }

    // Return the updated collaboration
    res.status(200).json({
      message: "Collaboration status updated successfully",
      collaboration: updatedCollaboration,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};