import pg from "pg";
import dotenv from "dotenv";
import fs from "fs";

const pool = process.env.DATABASE_URL
	? new pg.Pool({
			connectionString: process.env.DATABASE_URL,
			// ssl: { rejectUnauthorized: false },
	  })
	: new pg.Pool({
			// default .env keys
			database: process.env.PGDATABASE,
			port: process.env.PGPORT,
			host: process.env.PGHOST,
			user: process.env.PGUSER,
			password: process.env.PGPASSWORD,
	  });
await pool.connect();

const createUsersTableSql = fs.readFileSync("database.sql", "utf-8");
await pool.query(createUsersTableSql);

export default pool;
