USE MoodTracker;

CREATE TABLE Users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36),
  email VARCHAR(50) UNIQUE,
  password VARCHAR(255)
);

DELIMITER //
CREATE PROCEDURE CreateUser(IN userEmail VARCHAR(50), IN userPassword VARCHAR(255), OUT userUuid VARCHAR(36))
BEGIN
  SET userUuid = UUID();
  INSERT INTO Users (uuid, email, password) VALUES (userUuid, userEmail, userPassword);
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE GetUserByEmail(IN userEmail VARCHAR(50))
BEGIN
  SELECT * FROM Users WHERE email = userEmail;
END //
DELIMITER ;

CREATE TABLE MoodEntries (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT,
  mood VARCHAR(50),
  rating INT,
  timestamp DATETIME,
  FOREIGN KEY (userId) REFERENCES Users(id)
);


CREATE TABLE JournalEntries (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT,
  entry TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES Users(id)
);

DELIMITER //
CREATE PROCEDURE CreateJournalEntry(IN userId INT, IN entryText TEXT)
BEGIN
  INSERT INTO JournalEntries (userId, entry) VALUES (userId, entryText);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE GetJournalEntriesByUserId(IN userId INT)
BEGIN
  SELECT * FROM JournalEntries WHERE userId = userId ORDER BY timestamp DESC;
END //
DELIMITER ;