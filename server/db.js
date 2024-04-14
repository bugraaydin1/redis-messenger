import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

// default .env values
const pool = new pg.Pool({
	database: process.env.PGDATABASE,
	port: process.env.PGPORT,
	host: process.env.PGHOST,
	user: process.env.PGUSER,
	password: process.env.PGPASSWORD,
});
await pool.connect();

export default pool;
