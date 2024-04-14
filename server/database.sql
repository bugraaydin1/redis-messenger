CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR NOT NULL
);

INSERT INTO users(email, password) values($1, $2);