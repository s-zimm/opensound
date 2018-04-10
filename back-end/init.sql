CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  email VARCHAR(50) UNIQUE,
  first_name VARCHAR(50),
  last_name VARCHAR(50)
);

CREATE TABLE sounds (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  title VARCHAR(50),
  file_path VARCHAR(200) UNIQUE
);

CREATE TABLE tracks (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  sound_id INTEGER NOT NULL REFERENCES sounds(id),
  title VARCHAR(50),
  file_path VARCHAR(200) UNIQUE
);

INSERT INTO users (username, email, first_name, last_name)
VALUES ('manuscriptmaster', 'the.manuscriptmaster@gmail.com', 'Joshua', 'Martin');

INSERT INTO users (username, email, first_name, last_name)
VALUES ('s-zimm', 's.zim517@gmail.com', 'Seth', 'Zimmerman');

INSERT INTO users (username, email, first_name, last_name)
VALUES ('nybblr', 'the.nybblr@gmail.com', 'Jonathan', 'Martin');