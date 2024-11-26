import express from "express";
import {
	createRequest,
	getCollaborations,
	updateStatus,
} from "../controllers/collaboration.controller.js";
import { authenticateJWT } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", authenticateJWT, getCollaborations);
router.post("/request", authenticateJWT, createRequest);
router.post("/update-status", authenticateJWT, updateStatus);

export default router;
