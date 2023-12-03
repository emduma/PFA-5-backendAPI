CREATE DATABASE pfa5_cafe_finder;
USE pfa5_cafe_finder;

-- Create users table
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(25) NOT NULL
);

-- Create cafes table
CREATE TABLE cafes (
    cafe_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    wifi BOOLEAN NOT NULL,
    music BOOLEAN NOT NULL,
    coffee_quality INT NOT NULL
);
ALTER TABLE cafes
MODIFY COLUMN coffee_quality INT CHECK(coffee_quality BETWEEN 1 AND 5);

-- Create favorites table
CREATE TABLE IF NOT EXISTS favorites (
    favorite_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    cafe_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (cafe_id) REFERENCES cafes(cafe_id)
);

/* ========= TESTS ============= */

SELECT * FROM cafes;
SELECT * FROM cafes WHERE wifi = 1;
SELECT * FROM users;

-- ADD DATA TO TEST IF ENDPOINT WORKS
INSERT INTO users (user_id, username, email, password)
VALUES ('2', 'john', 'john@gmail.com', '12345678');

INSERT INTO cafes (cafe_id, name, city, wifi, music, coffee_quality)
VALUES ('3', 'Costa', 'Aarhus', 1, 0, '4');
