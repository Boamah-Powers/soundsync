import express from "express";
import { createComment } from "../controllers/comment.controller.js";
import { authenticateJWT } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", authenticateJWT, createComment);

export default router;
