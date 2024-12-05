import express from "express";
import { register, login, logout } from "../controllers/auth.controller.js";
// import { authenticateJWT } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// router.post("/test", authenticateJWT, (_, res) => {
//     res.status(200).json({message: "Authenticated"});
// });

export default router;