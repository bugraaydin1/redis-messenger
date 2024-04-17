CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    userid VARCHAR NOT NULL UNIQUE,
    email VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR NOT NULL,
    name VARCHAR(30) NOT NULL
);

INSERT INTO users(email, password) values($1, $2);