import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import pool from "../db.js";

const handleValidateLogin = (req, res) => {
	const token = req.headers["authorization"]?.split(" ")?.[1];

	if (!token) {
		return res.json({ loggedIn: false });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		return res.json({ loggedIn: true, token });
	} catch (err) {
		return res.json({ loggedIn: false });
	}
};

const handleLogin = async (req, res) => {
	const { email, password } = req.body;

	const userQuery = await pool.query(
		`SELECT id, userid, name, email, password FROM users WHERE email=$1`,
		[email]
	);

	if (userQuery.rowCount === 1) {
		const hashedPwd = await userQuery.rows[0].password;
		const isMatchingPassword = await bcrypt.compare(password, hashedPwd);

		if (isMatchingPassword) {
			const id = userQuery.rows[0].id;
			const userId = userQuery.rows[0].userid;
			const name = userQuery.rows[0].name;

			try {
				const token = jwt.sign(
					{ name, email, userId },
					process.env.JWT_SECRET,
					{ expiresIn: "1d" }
				);
				return res.json({
					loggedIn: true,
					token,
					name,
					email,
					userId,
				});
			} catch (error) {
				return res.json({
					loggedIn: false,
					status: "Invalid token.",
				});
			}
		}
	}

	res
		.status(401)
		.json({ loggedIn: false, status: "Email or password is invalid" });
};

const handleSignup = async (req, res) => {
	const { name, email, password } = req.body;

	const existingUser = await pool.query(
		`SELECT email FROM users WHERE email=$1`,
		[email]
	);

	if (existingUser.rowCount === 0) {
		const userId = uuid();
		const hashedPw = await bcrypt.hash(password, 10);
		const userQuery = await pool.query(
			`INSERT INTO users(userid, name, email, password) values($1, $2, $3, $4) RETURNING id, userid`,
			[userId, name, email, hashedPw]
		);

		try {
			const token = jwt.sign({ name, email, userId }, process.env.JWT_SECRET, {
				expiresIn: "1min",
			});
			return res.json({ loggedIn: true, token });
		} catch (error) {
			return res.json({
				loggedIn: false,
				status: "Invalid token.",
			});
		}
	}

	res
		.status(401)
		.json({ loggedIn: false, status: "this email is already registered" });
};

export { handleLogin, handleValidateLogin, handleSignup };
