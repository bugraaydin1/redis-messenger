import express from "express";
import validateAuthForm from "../middlewares/validateAuthForm.js";
import {
	handleLogin,
	handleLoginSession,
	handleSignup,
} from "../controllers/authController.js";

const router = express.Router();

router.get("/login", handleLoginSession);
router.post("/login", validateAuthForm, handleLogin);
router.post("/register", validateAuthForm, handleSignup);

export default router;
