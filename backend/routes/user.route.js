import express from "express";
import { updateUser } from "../controllers/user.controller.js";
import { authenticateJWT } from "../middleware/verifyToken.js";

const router = express.Router();

router.put("/update-profile", authenticateJWT, updateUser);

export default router;