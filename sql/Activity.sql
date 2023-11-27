CREATE TABLE Activity (
  id INT PRIMARY KEY,
  title VARCHAR(50)
);

CREATE TABLE Activity_Entry (
  activityId INT,
  entryId INT,
  PRIMARY KEY (activityId, entryId),
  FOREIGN KEY (activityId) REFERENCES Activity(id),
  FOREIGN KEY (entryId) REFERENCES Entry(id)
);