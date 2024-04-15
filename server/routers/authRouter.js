import express from "express";
import validateAuthForm from "../middlewares/validateAuthForm.js";
import {
	handleLogin,
	handleLoginSession,
	handleSignup,
} from "../controllers/authController.js";
import rateLimiter from "../middlewares/rateLimiter.js";

const router = express.Router();

router.get("/login", handleLoginSession);
router.post("/login", rateLimiter(30, 60), validateAuthForm, handleLogin);
router.post("/register", rateLimiter(50, 60), validateAuthForm, handleSignup);

export default router;
