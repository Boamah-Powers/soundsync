import express from "express";
import {
	getSnippets,
	getSnippet,
	createSnippet,
	updateSnippet,
	deleteSnippet,
} from "../controllers/snippet.controller.js";
import { authenticateJWT } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getSnippets);
router.get("/:id", getSnippet);
router.post("/", authenticateJWT, createSnippet);
router.put("/:id", authenticateJWT, updateSnippet);
router.delete("/:id", authenticateJWT, deleteSnippet);

export default router;