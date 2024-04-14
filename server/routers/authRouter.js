import express from "express";
import validateAuth from "../middlewares/validateAuth.js";
import bcrypt from "bcrypt";
import pool from "../db.js";

const router = express.Router();

router.post("/login", validateAuth, async (req, res) => {
	const { email, password } = req.body;

	console.log("session user:", req.session);

	const userQuery = await pool.query(
		`SELECT id, email, password FROM users WHERE email=$1`,
		[email]
	);

	console.log(userQuery.rows);

	if (userQuery.rowCount === 1) {
		const hashedPwd = await userQuery.rows[0].password;
		const isMatchingPassword = await bcrypt.compare(password, hashedPwd);

		if (isMatchingPassword) {
			req.session.user = {
				email,
				id: userQuery.rows[0].id,
			};
			return res.json({ loggedIn: true, email });
		}
	}

	res
		.status(401)
		.json({ loggedIn: false, status: "Email or password is invalid" });
});

router.post("/register", validateAuth, async (req, res) => {
	const { email, password } = req.body;

	const existingUser = await pool.query(
		`SELECT email FROM users WHERE email=$1`,
		[email]
	);

	if (existingUser.rowCount === 0) {
		const hashedPw = await bcrypt.hash(password, 10);
		const userQuery = await pool.query(
			`INSERT INTO users(email, password) values($1, $2) RETURNING id, email`,
			[email, hashedPw]
		);

		req.session.user = {
			email,
			id: userQuery.rows[0].id,
		};
		return res.status(201).json({ loggedIn: true, email });
	}

	res
		.status(401)
		.json({ loggedIn: false, status: "this email is already registered" });
});

export default router;
