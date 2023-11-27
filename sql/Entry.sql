CREATE TABLE Entry (
  id INT PRIMARY KEY,
  userId INT,
  date DATE,
  text TEXT,
  moodId INT,
  FOREIGN KEY (userId) REFERENCES User(id),
  FOREIGN KEY (moodId) REFERENCES Mood(id)
);